<?php

namespace App\Filament\Pages;

use App\Models\Tenant;
use App\Models\TenantFeeReport;
use Carbon\Carbon;
use Filament\Pages\Page;
use Filament\Notifications\Notification;

class MonthlyBilling extends Page
{
    protected static ?string $navigationIcon  = 'heroicon-o-calendar-days';
    protected static ?string $navigationLabel = 'Monthly Billing';
    protected static ?string $navigationGroup = 'Tenant Portal';
    protected static ?int    $navigationSort  = 4;
    protected static string  $view            = 'filament.pages.monthly-billing';

    public int $year;
    public int $month;

    public function mount(): void
    {
        $this->year  = now()->year;
        $this->month = now()->month;
    }

    public function prevMonth(): void
    {
        $date        = Carbon::create($this->year, $this->month, 1)->subMonth();
        $this->year  = $date->year;
        $this->month = $date->month;
    }

    public function nextMonth(): void
    {
        $date        = Carbon::create($this->year, $this->month, 1)->addMonth();
        $this->year  = $date->year;
        $this->month = $date->month;
    }

    public function markPaid(int $id): void
    {
        TenantFeeReport::findOrFail($id)->markPaid();

        Notification::make()
            ->title('Marked as paid')
            ->success()
            ->send();
    }

    public function markUnpaid(int $id): void
    {
        TenantFeeReport::findOrFail($id)->update(['is_paid' => false, 'paid_at' => null]);

        Notification::make()
            ->title('Marked as unpaid')
            ->warning()
            ->send();
    }

    // ── View helpers ──────────────────────────────────────────────

    public function getMonthLabel(): string
    {
        return Carbon::create($this->year, $this->month, 1)->format('F Y');
    }

    public function getMonthRange(): string
    {
        $start = Carbon::create($this->year, $this->month, 1);
        $end   = $start->copy()->endOfMonth();

        return $start->format('1 M Y') . ' – ' . $end->format('j M Y');
    }

    public function getRows(): array
    {
        $tenants = Tenant::where('is_active', true)->orderBy('name')->get();

        $reports = TenantFeeReport::where('year', $this->year)
            ->where('month', $this->month)
            ->get()
            ->keyBy('tenant_key');

        $rows = $tenants->map(fn ($tenant) => [
            'tenant' => $tenant,
            'report' => $reports->get($tenant->tenant_key),
        ]);

        // Sort: tenants with reports by total DESC, then no-report tenants at bottom
        return $rows->sortByDesc(fn ($row) => $row['report']?->total ?? -1)->values()->all();
    }

    public function getChartData(): array
    {
        $rows = $this->getRows();

        $labels = [];
        $totals = [];
        $colors = [];

        foreach ($rows as $row) {
            if (!$row['report']) continue;
            $labels[] = $row['tenant']->name;
            $totals[] = (float) $row['report']->total;
            $colors[] = $row['report']->is_paid ? 'rgba(34,197,94,0.8)' : 'rgba(239,68,68,0.8)';
        }

        return compact('labels', 'totals', 'colors');
    }

    public function getTotals(): array
    {
        $base = TenantFeeReport::where('year', $this->year)->where('month', $this->month);

        return [
            'subtotal'    => (clone $base)->sum('subtotal'),
            'vat'         => (clone $base)->sum('vat'),
            'total'       => (clone $base)->sum('total'),
            'paid'        => (clone $base)->where('is_paid', true)->sum('total'),
            'outstanding' => (clone $base)->where('is_paid', false)->sum('total'),
            'count'       => (clone $base)->count(),
            'paid_count'  => (clone $base)->where('is_paid', true)->count(),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        $unpaid = TenantFeeReport::where('year', now()->year)
            ->where('month', now()->month)
            ->where('is_paid', false)
            ->count();

        return $unpaid > 0 ? (string) $unpaid : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'danger';
    }
}
