<?php

namespace App\Filament\Resources\TenantMessageResource\Pages;

use App\Filament\Resources\TenantMessageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTenantMessage extends EditRecord
{
    protected static string $resource = TenantMessageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
