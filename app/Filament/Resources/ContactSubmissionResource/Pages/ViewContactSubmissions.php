<?php

namespace App\Filament\Resources\ContactSubmissionResource\Pages;

use App\Filament\Resources\ContactSubmissionResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewContactSubmissions extends ViewRecord
{
    protected static string $resource = ContactSubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\Action::make('reply')
                ->label('Reply via Email')
                ->icon('heroicon-o-envelope')
                ->color('success')
                ->url(fn (): string => "mailto:{$this->record->email}?subject=Re: Your Contact Form Submission")
                ->openUrlInNewTab(),
        ];
    }
}