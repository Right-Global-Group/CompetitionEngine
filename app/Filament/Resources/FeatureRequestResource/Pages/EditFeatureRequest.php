<?php

namespace App\Filament\Resources\FeatureRequestResource\Pages;

use App\Filament\Resources\FeatureRequestResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFeatureRequest extends EditRecord
{
    protected static string $resource = FeatureRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
