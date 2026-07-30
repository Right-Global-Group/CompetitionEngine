<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $useCustom = (bool) ($data['use_custom_docs_password'] ?? false);
        unset($data['use_custom_docs_password']);

        if (!$useCustom) {
            $data['docs_password'] = null;
        } elseif (blank($data['docs_password'] ?? null)) {
            // Keep the existing custom password — don't overwrite with blank.
            unset($data['docs_password']);
        }

        return $data;
    }
}
