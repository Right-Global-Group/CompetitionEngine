<?php

namespace App\Filament\Resources\TenantSmsCreditResource\Pages;

use App\Filament\Resources\TenantSmsCreditResource;
use Filament\Resources\Pages\ListRecords;

class ListTenantSmsCredits extends ListRecords
{
    protected static string $resource = TenantSmsCreditResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
