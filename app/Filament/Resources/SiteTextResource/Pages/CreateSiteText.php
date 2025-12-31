<?php

namespace App\Filament\Resources\SiteTextResource\Pages;

use App\Filament\Resources\SiteTextResource;
use Filament\Resources\Pages\CreateRecord;

class CreateSiteText extends CreateRecord
{
    protected static string $resource = SiteTextResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Site text created successfully!';
    }
}