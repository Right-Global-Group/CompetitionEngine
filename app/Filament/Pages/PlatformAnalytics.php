<?php

namespace App\Filament\Pages;

use App\Models\Tenant;
use App\Models\TenantFeeReport;
use Carbon\Carbon;
use Filament\Pages\Page;

class PlatformAnalytics extends Page
{
    protected static ?string $navigationIcon  = 'heroicon-o-chart-bar';
    protected static ?string $navigationLabel = 'Platform Analytics';
    protected static ?string $navigationGroup = 'Tenant Portal';
    protected static ?int    $navigationSort  = 3;
    protected static string  $view            = 'filament.pages.platform-analytics';

    public int $rangeMonths = 12;

    // Per-render memo caches — Filament/Livewire re-renders call these
    // helpers multiple times from the blade (e.g. getMovers wraps
    // getTenantSnapshot). Caching here keeps a single render to one set of
    // DB queries instead of N.
    private ?array $kpisCache = null;
    private ?array $snapshotCache = null;
    private ?array $trendCache = null;
    private ?int $trendCacheRange = null;

    public function setRange(int $months): void
    {
        $this->rangeMonths = in_array($months, [3, 6, 12, 24]) ? $months : 12;
        $this->trendCache = null;
        $this->trendCacheRange = null;
    }

    public function getKpis(): array
    {
        if ($this->kpisCache !== null) {
            return $this->kpisCache;
        }

        $now = Carbon::now();
        $thisMonth = TenantFeeReport::where('year', $now->year)->where('month', $now->month);
        $lastMonthCarbon = $now->copy()->subMonth();
        $lastMonth = TenantFeeReport::where('year', $lastMonthCarbon->year)->where('month', $lastMonthCarbon->month);

        $mtdSubtotal = (float) (clone $thisMonth)->sum('subtotal');
        $mtdVat = (float) (clone $thisMonth)->sum('vat');
        $mtdTotal = (float) (clone $thisMonth)->sum('total');
        $lastTotal = (float) (clone $lastMonth)->sum('total');

        $daysInMonth = $now->daysInMonth;
        $daysElapsed = $now->day;
        $projectedTotal = $daysElapsed > 0 ? round(($mtdTotal / $daysElapsed) * $daysInMonth, 2) : $mtdTotal;

        $deltaPct = $lastTotal > 0 ? (($mtdTotal - $lastTotal) / $lastTotal) * 100 : null;
        $projectedVsLast = $lastTotal > 0 ? (($projectedTotal - $lastTotal) / $lastTotal) * 100 : null;

        $tenantsReporting = (clone $thisMonth)->distinct()->count('tenant_key');
        $activeTenants = Tenant::where('is_active', true)->count();

        $totalScratchy = (int) (clone $thisMonth)->sum('scratchy_only_count');
        $totalOther = (int) (clone $thisMonth)->sum('other_count');
        $totalOrders = $totalScratchy + $totalOther;
        $platformMix = $totalOrders > 0 ? round(($totalOther / $totalOrders) * 100, 1) : null;

        return $this->kpisCache = [
            'mtd_subtotal' => $mtdSubtotal,
            'mtd_vat' => $mtdVat,
            'mtd_total' => $mtdTotal,
            'projected_total' => $projectedTotal,
            'days_elapsed' => $daysElapsed,
            'days_in_month' => $daysInMonth,
            'last_total' => $lastTotal,
            'delta_pct' => $deltaPct,
            'projected_vs_last_pct' => $projectedVsLast,
            'tenants_reporting' => $tenantsReporting,
            'active_tenants' => $activeTenants,
            'platform_mix' => $platformMix,
            'platform_avg_rate' => $totalOrders > 0 ? round($mtdSubtotal / $totalOrders, 4) : null,
            'total_orders' => $totalOrders,
        ];
    }

    /**
     * Build the per-month-per-tenant series for the stacked area chart.
     * Tenants without reports for a given month show 0 — keeps the X axis stable.
     */
    public function getTrendSeries(): array
    {
        if ($this->trendCache !== null && $this->trendCacheRange === $this->rangeMonths) {
            return $this->trendCache;
        }

        $now = Carbon::now();
        $start = $now->copy()->startOfMonth()->subMonths($this->rangeMonths - 1);

        $reports = TenantFeeReport::query()
            ->whereRaw('(year * 100 + month) >= ?', [$start->year * 100 + $start->month])
            ->get(['tenant_key', 'year', 'month', 'subtotal', 'vat', 'total', 'scratchy_only_count', 'other_count']);

        $labels = [];
        $monthsKey = [];
        for ($i = $this->rangeMonths - 1; $i >= 0; $i--) {
            $d = $now->copy()->startOfMonth()->subMonths($i);
            $key = "{$d->year}-{$d->month}";
            $monthsKey[] = $key;
            $labels[] = $d->format('M Y');
        }

        // Group reports by tenant + month-key for O(1) lookup
        $byTenantMonth = $reports->groupBy('tenant_key')->map(
            fn ($rows) => $rows->keyBy(fn ($r) => "{$r->year}-{$r->month}")
        );

        $tenants = Tenant::where('is_active', true)->orderBy('name')->get();

        $tenantSeries = [];
        foreach ($tenants as $tenant) {
            $rowsByMonth = $byTenantMonth->get($tenant->tenant_key, collect());
            $data = [];
            foreach ($monthsKey as $key) {
                $r = $rowsByMonth->get($key);
                $data[] = $r ? (float) $r->total : 0.0;
            }
            // Only include tenants that have at least one non-zero month in range
            if (array_sum($data) > 0) {
                $tenantSeries[] = ['name' => $tenant->name, 'data' => $data];
            }
        }

        // Platform total trend line — sum across all tenants per month
        $platformTotals = [];
        foreach ($monthsKey as $key) {
            $sum = 0;
            foreach ($tenantSeries as $s) {
                $sum += $s['data'][array_search($key, $monthsKey)];
            }
            $platformTotals[] = round($sum, 2);
        }

        $this->trendCacheRange = $this->rangeMonths;
        return $this->trendCache = [
            'labels' => $labels,
            'tenants' => $tenantSeries,
            'platform_totals' => $platformTotals,
        ];
    }

    /**
     * Per-tenant current-month + previous-month + delta + mix score, sorted
     * by current-month total descending. This is the leaderboard + biggest
     * movers source — slice it on the view side.
     */
    public function getTenantSnapshot(): array
    {
        if ($this->snapshotCache !== null) {
            return $this->snapshotCache;
        }

        $now = Carbon::now();
        $prev = $now->copy()->subMonth();

        $current = TenantFeeReport::where('year', $now->year)->where('month', $now->month)->get()->keyBy('tenant_key');
        $previous = TenantFeeReport::where('year', $prev->year)->where('month', $prev->month)->get()->keyBy('tenant_key');

        $tenants = Tenant::where('is_active', true)->orderBy('name')->get();

        $rows = $tenants->map(function ($tenant) use ($current, $previous, $now) {
            $cur = $current->get($tenant->tenant_key);
            $prv = $previous->get($tenant->tenant_key);

            $curTotal = $cur ? (float) $cur->total : 0.0;
            $prvTotal = $prv ? (float) $prv->total : 0.0;
            $orders = $cur ? (int) ($cur->scratchy_only_count + $cur->other_count) : 0;
            $mixScore = $orders > 0 ? round(((int) $cur->other_count / $orders) * 100, 1) : null;
            $deltaAbs = $curTotal - $prvTotal;
            $deltaPct = $prvTotal > 0 ? (($curTotal - $prvTotal) / $prvTotal) * 100 : null;

            $daysInMonth = $now->daysInMonth;
            $daysElapsed = $now->day;
            $projected = $daysElapsed > 0 ? round(($curTotal / $daysElapsed) * $daysInMonth, 2) : $curTotal;

            return [
                'tenant_key' => $tenant->tenant_key,
                'name' => $tenant->name,
                'current_total' => $curTotal,
                'previous_total' => $prvTotal,
                'projected_total' => $projected,
                'delta_abs' => round($deltaAbs, 2),
                'delta_pct' => $deltaPct,
                'orders' => $orders,
                'mix_score' => $mixScore,
                'is_paid' => $cur ? (bool) $cur->is_paid : false,
            ];
        })->all();

        // Sort by current total desc, drop tenants with zero in BOTH months (silent)
        return $this->snapshotCache = collect($rows)
            ->filter(fn ($r) => $r['current_total'] > 0 || $r['previous_total'] > 0)
            ->sortByDesc('current_total')
            ->values()
            ->all();
    }

    /**
     * Top 5 risers and top 5 fallers by absolute fee change vs previous month.
     * Tenants without a previous-month report are excluded from movers — they
     * have no baseline to compare against and would dominate the "risers".
     */
    public function getMovers(): array
    {
        $snapshot = collect($this->getTenantSnapshot())
            ->filter(fn ($r) => $r['previous_total'] > 0);

        return [
            'risers' => $snapshot->sortByDesc('delta_abs')->take(5)->values()->all(),
            'fallers' => $snapshot->sortBy('delta_abs')->take(5)->values()->all(),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        $now = Carbon::now();
        $count = TenantFeeReport::where('year', $now->year)
            ->where('month', $now->month)
            ->distinct()
            ->count('tenant_key');
        return $count > 0 ? (string) $count : null;
    }
}
