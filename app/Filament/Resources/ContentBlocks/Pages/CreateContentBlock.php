<?php

namespace App\Filament\Resources\ContentBlocks\Pages;

use App\Filament\Resources\ContentBlocks\ContentBlockResource;
use App\Support\Cms\ContentBlockFormAdapter;
use Filament\Resources\Pages\CreateRecord;

/**
 * Livewire create page for {@see \App\Models\ContentBlock} that normalises JSON vs structured payloads before persistence.
 */
class CreateContentBlock extends CreateRecord
{
    protected static string $resource = ContentBlockResource::class;

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return ContentBlockFormAdapter::finalizeForSave($data);
    }
}
