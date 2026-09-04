<?php

namespace App\Filament\Resources\DemoLeadResource\Pages;

use App\Filament\Resources\DemoLeadResource;
use Filament\Resources\Pages\ListRecords;

class ListDemoLeads extends ListRecords
{
    protected static string $resource = DemoLeadResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // No create action - leads come from the homepage form
        ];
    }
}
