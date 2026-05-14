<?php

namespace App\Filament\Resources\ContentBlocks\Pages;

use App\Filament\Resources\ContentBlocks\ContentBlockResource;
use App\Support\Cms\ContentBlockFormAdapter;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditContentBlock extends EditRecord
{
    protected static string $resource = ContentBlockResource::class;

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeFill(array $data): array
    {
        return ContentBlockFormAdapter::hydrateForForm($data);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        return ContentBlockFormAdapter::finalizeForSave($data);
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
