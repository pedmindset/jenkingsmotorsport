<?php

namespace App\Filament\Resources\SeasonContenders\Pages;

use App\Filament\Resources\SeasonContenders\SeasonContenderResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSeasonContenders extends ListRecords
{
    protected static string $resource = SeasonContenderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
