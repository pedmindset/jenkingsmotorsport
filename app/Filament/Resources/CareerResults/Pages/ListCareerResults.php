<?php

namespace App\Filament\Resources\CareerResults\Pages;

use App\Filament\Resources\CareerResults\CareerResultResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCareerResults extends ListRecords
{
    protected static string $resource = CareerResultResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
