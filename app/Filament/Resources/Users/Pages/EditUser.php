<?php

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use App\Models\User;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

/**
 * Edit page for {@see UserResource}.
 */
class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    /**
     * @return array<int, \Filament\Actions\Action>
     */
    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->visible(fn (): bool => ! $this->getRecord()->is($this->getCurrentUser())),
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeFill(array $data): array
    {
        unset($data['password']);

        return $data;
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        if ($this->getRecord()->is($this->getCurrentUser())) {
            $data['is_admin'] = true;
        }

        if (! filled($data['password'] ?? null)) {
            unset($data['password']);
        }

        return $data;
    }

    /**
     * Resolve the authenticated panel user.
     */
    protected function getCurrentUser(): User
    {
        /** @var User $user */
        $user = auth()->user();

        return $user;
    }
}
