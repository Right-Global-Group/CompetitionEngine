<?php

namespace App\Filament\Widgets;

use App\Models\Tenant;
use App\Models\TenantFeeReport;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TenantStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $year         = now()->year;
        $month        = now()->month;
        $monthLabel   = now()->format('F Y');

        $activeTenants   = Tenant::where('is_active', true)->count();
        $allReports      = TenantFeeReport::where('year', $year)->where('month', $month);
        $totalOwed       = (clone $allReports)->sum('total');
        $totalPaid       = (clone $allReports)->where('is_paid', true)->sum('total');
        $totalOutstanding = (clone $allReports)->where('is_paid', false)->sum('total');
        $tenantsReported = (clone $allReports)->count();
        $tenantsPaid     = (clone $allReports)->where('is_paid', true)->count();
        $tenantsUnpaid   = (clone $allReports)->where('is_paid', false)->count();

        return [
            Stat::make('Active Tenants', $activeTenants)
                ->description($tenantsReported . ' of ' . $activeTenants . ' reported ' . $monthLabel)
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('primary'),

            Stat::make($monthLabel . ' — Total Owed', '£' . number_format($totalOwed, 2))
                ->description($tenantsReported . ' fee report' . ($tenantsReported !== 1 ? 's' : '') . ' received')
                ->descriptionIcon('heroicon-m-currency-pound')
                ->color('warning'),

            Stat::make('Paid', '£' . number_format($totalPaid, 2))
                ->description($tenantsPaid . ' tenant' . ($tenantsPaid !== 1 ? 's' : '') . ' paid')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),

            Stat::make('Outstanding', '£' . number_format($totalOutstanding, 2))
                ->description($tenantsUnpaid . ' tenant' . ($tenantsUnpaid !== 1 ? 's' : '') . ' unpaid')
                ->descriptionIcon('heroicon-m-exclamation-circle')
                ->color($totalOutstanding > 0 ? 'danger' : 'success'),
        ];
    }
}
