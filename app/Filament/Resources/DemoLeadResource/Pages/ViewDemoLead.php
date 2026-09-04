<?php

namespace App\Filament\Resources\DemoLeadResource\Pages;

use App\Filament\Resources\DemoLeadResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewDemoLead extends ViewRecord
{
    protected static string $resource = DemoLeadResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\Action::make('reply')
                ->label('Reply via Email')
                ->icon('heroicon-o-envelope')
                ->color('success')
                ->url(fn (): string => "mailto:{$this->record->email}?subject=Re: Your CompEngine demo request")
                ->openUrlInNewTab(),
        ];
    }
}
