<?php

namespace App\Filament\Resources\CareerResults\Pages;

use App\Filament\Resources\CareerResults\CareerResultResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCareerResult extends EditRecord
{
    protected static string $resource = CareerResultResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
