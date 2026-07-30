<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return $this->applyDocsPasswordMode($data);
    }

    private function applyDocsPasswordMode(array $data): array
    {
        $useCustom = (bool) ($data['use_custom_docs_password'] ?? false);
        unset($data['use_custom_docs_password']);

        if (!$useCustom) {
            $data['docs_password'] = null;
        } elseif (blank($data['docs_password'] ?? null)) {
            unset($data['docs_password']);
        }

        return $data;
    }
}
