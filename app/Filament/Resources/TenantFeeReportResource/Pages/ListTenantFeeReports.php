<?php

namespace App\Filament\Resources\TenantFeeReportResource\Pages;

use App\Filament\Resources\TenantFeeReportResource;
use App\Models\TenantFeeReport;
use Filament\Resources\Pages\ListRecords;
use Filament\Resources\Components\Tab;

class ListTenantFeeReports extends ListRecords
{
    protected static string $resource = TenantFeeReportResource::class;

    public function getTabs(): array
    {
        return [
            'all'    => Tab::make('All')->badge(TenantFeeReport::count()),
            'unpaid' => Tab::make('Unpaid')
                ->badge(TenantFeeReport::where('is_paid', false)->count())
                ->badgeColor('danger')
                ->modifyQueryUsing(fn ($q) => $q->where('is_paid', false)),
            'paid'   => Tab::make('Paid')
                ->badge(TenantFeeReport::where('is_paid', true)->count())
                ->badgeColor('success')
                ->modifyQueryUsing(fn ($q) => $q->where('is_paid', true)),
        ];
    }
}
