<?php

namespace App\Filament\Pages;

use App\Models\Tenant;
use App\Models\TenantFeeReport;
use Carbon\Carbon;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class PlatformAnalytics extends Page
{
    protected static ?string $navigationIcon  = 'heroicon-o-chart-bar';
    protected static ?string $navigationLabel = 'Platform Analytics';
    protected static ?string $navigationGroup = 'Tenant Portal';
    protected static ?int    $navigationSort  = 3;
    protected static string  $view            = 'filament.pages.platform-analytics';

    public int $rangeMonths = 12;
    public int $year;
    public int $month;

    // Per-render memo caches — Filament/Livewire re-renders call these
    // helpers multiple times from the blade (e.g. getMovers wraps
    // getTenantSnapshot). Caching here keeps a single render to one set of
    // DB queries instead of N.
    private ?array $kpisCache = null;
    private ?array $snapshotCache = null;
    private ?array $trendCache = null;
    private ?int $trendCacheRange = null;

    public function mount(): void
    {
        $this->year = now()->year;
        $this->month = now()->month;
    }

    public function setRange(int $months): void
    {
        $this->rangeMonths = in_array($months, [3, 6, 12, 24]) ? $months : 12;
        $this->trendCache = null;
        $this->trendCacheRange = null;
    }

    public function prevMonth(): void
    {
        $d = Carbon::create($this->year, $this->month, 1)->subMonth();
        $this->year = $d->year;
        $this->month = $d->month;
        $this->kpisCache = null;
        $this->snapshotCache = null;
    }

    public function nextMonth(): void
    {
        if ($this->isCurrentMonth()) {
            return;
        }
        $d = Carbon::create($this->year, $this->month, 1)->addMonth();
        $this->year = $d->year;
        $this->month = $d->month;
        $this->kpisCache = null;
        $this->snapshotCache = null;
    }

    public function isCurrentMonth(): bool
    {
        $now = Carbon::now();
        return $this->year === $now->year && $this->month === $now->month;
    }

    public function getMonthLabel(): string
    {
        return Carbon::create($this->year, $this->month, 1)->format('F Y');
    }

    public function markPaid(int $id): void
    {
        TenantFeeReport::findOrFail($id)->markPaid();
        $this->snapshotCache = null;
        Notification::make()->title('Marked as paid')->success()->send();
    }

    public function markUnpaid(int $id): void
    {
        TenantFeeReport::findOrFail($id)->update(['is_paid' => false, 'paid_at' => null]);
        $this->snapshotCache = null;
        Notification::make()->title('Marked as unpaid')->warning()->send();
    }

    public function getKpis(): array
    {
        if ($this->kpisCache !== null) {
            return $this->kpisCache;
        }

        $selected = Carbon::create($this->year, $this->month, 1);
        $thisMonth = TenantFeeReport::where('year', $this->year)->where('month', $this->month);
        $lastMonthCarbon = $selected->copy()->subMonth();
        $lastMonth = TenantFeeReport::where('year', $lastMonthCarbon->year)->where('month', $lastMonthCarbon->month);

        $mtdSubtotal = (float) (clone $thisMonth)->sum('subtotal');
        $mtdVat = (float) (clone $thisMonth)->sum('vat');
        $mtdTotal = (float) (clone $thisMonth)->sum('total');
        $lastTotal = (float) (clone $lastMonth)->sum('total');

        $isCurrent = $this->isCurrentMonth();
        $daysInMonth = $selected->daysInMonth;
        $daysElapsed = $isCurrent ? Carbon::now()->day : $daysInMonth;
        // For past months days_elapsed = days_in_month so projected_total == mtd_total.
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

        // Sort all tenants by total in the visible range, descending. The
        // heatmap renders biggest at the top so the eye lands on them first.
        usort($tenantSeries, fn ($a, $b) => array_sum($b['data']) <=> array_sum($a['data']));

        $this->trendCacheRange = $this->rangeMonths;
        return $this->trendCache = [
            'labels' => $labels,
            'tenants_sorted' => $tenantSeries,
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

        $selected = Carbon::create($this->year, $this->month, 1);
        $prev = $selected->copy()->subMonth();
        $isCurrent = $this->isCurrentMonth();

        $current = TenantFeeReport::where('year', $this->year)->where('month', $this->month)->get()->keyBy('tenant_key');
        $previous = TenantFeeReport::where('year', $prev->year)->where('month', $prev->month)->get()->keyBy('tenant_key');

        $tenants = Tenant::where('is_active', true)->orderBy('name')->get();

        $rows = $tenants->map(function ($tenant) use ($current, $previous, $selected, $isCurrent) {
            $cur = $current->get($tenant->tenant_key);
            $prv = $previous->get($tenant->tenant_key);

            $curTotal = $cur ? (float) $cur->total : 0.0;
            $prvTotal = $prv ? (float) $prv->total : 0.0;
            $orders = $cur ? (int) ($cur->scratchy_only_count + $cur->other_count) : 0;
            $mixScore = $orders > 0 ? round(((int) $cur->other_count / $orders) * 100, 1) : null;
            $deltaAbs = $curTotal - $prvTotal;
            $deltaPct = $prvTotal > 0 ? (($curTotal - $prvTotal) / $prvTotal) * 100 : null;

            $daysInMonth = $selected->daysInMonth;
            $daysElapsed = $isCurrent ? Carbon::now()->day : $daysInMonth;
            $projected = $daysElapsed > 0 ? round(($curTotal / $daysElapsed) * $daysInMonth, 2) : $curTotal;

            $curSubtotal = $cur ? (float) $cur->subtotal : 0.0;
            $prvSubtotal = $prv ? (float) $prv->subtotal : 0.0;
            $projectedSubtotal = $daysElapsed > 0 ? round(($curSubtotal / $daysElapsed) * $daysInMonth, 2) : $curSubtotal;

            return [
                'tenant_key' => $tenant->tenant_key,
                'name' => $tenant->name,
                'report_id' => $cur?->id,
                // Gross (includes VAT) — still exposed for invoicing
                'current_total' => $curTotal,
                'previous_total' => $prvTotal,
                'projected_total' => $projected,
                // Net (subtotal, what we actually earn) — used as the headline
                'current_subtotal' => $curSubtotal,
                'previous_subtotal' => $prvSubtotal,
                'projected_subtotal' => $projectedSubtotal,
                'vat' => $cur ? (float) $cur->vat : 0.0,
                'delta_abs' => round($deltaAbs, 2),
                'delta_pct' => $deltaPct,
                'orders' => $orders,
                'mix_score' => $mixScore,
                'is_paid' => $cur ? (bool) $cur->is_paid : false,
                'paid_at' => $cur && $cur->paid_at ? $cur->paid_at->format('d/m/Y') : null,
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
     * Top 5 risers and top 5 fallers by pace-adjusted fee change vs previous
     * month. We compare PROJECTED month-end (for current month) or actual
     * total (for closed months) against the prior month — otherwise on day 1
     * of a new month every tenant looks like a -99% faller against the full
     * previous month, which is meaningless.
     */
    public function getMovers(): array
    {
        $snapshot = collect($this->getTenantSnapshot())
            ->filter(fn ($r) => $r['previous_total'] > 0)
            ->map(function ($r) {
                $paceDelta = $r['projected_total'] - $r['previous_total'];
                $pacePct = $r['previous_total'] > 0
                    ? (($r['projected_total'] - $r['previous_total']) / $r['previous_total']) * 100
                    : null;
                return array_merge($r, [
                    'pace_delta_abs' => round($paceDelta, 2),
                    'pace_delta_pct' => $pacePct,
                ]);
            });

        return [
            'risers' => $snapshot->sortByDesc('pace_delta_abs')->take(5)->values()->all(),
            'fallers' => $snapshot->sortBy('pace_delta_abs')->take(5)->values()->all(),
            'pace_adjusted' => $this->isCurrentMonth(),
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
