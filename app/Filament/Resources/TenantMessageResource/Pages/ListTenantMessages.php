<?php

namespace App\Filament\Resources\TenantMessageResource\Pages;

use App\Filament\Resources\TenantMessageResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Resources\Components\Tab;
use App\Models\TenantMessage;

class ListTenantMessages extends ListRecords
{
    protected static string $resource = TenantMessageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()->label('New Message')->icon('heroicon-o-plus'),
        ];
    }

    public function getTabs(): array
    {
        return [
            'all'     => Tab::make('All')->badge(TenantMessage::count()),
            'update'  => Tab::make('Updates')->badge(TenantMessage::where('type', 'update')->count())
                            ->modifyQueryUsing(fn ($q) => $q->where('type', 'update')),
            'warning' => Tab::make('Warnings')->badge(TenantMessage::where('type', 'warning')->count())
                            ->modifyQueryUsing(fn ($q) => $q->where('type', 'warning')),
            'info'    => Tab::make('Info')->badge(TenantMessage::where('type', 'info')->count())
                            ->modifyQueryUsing(fn ($q) => $q->where('type', 'info')),
        ];
    }
}
