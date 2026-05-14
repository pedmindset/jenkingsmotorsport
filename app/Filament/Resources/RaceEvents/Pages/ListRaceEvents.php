<?php

namespace App\Filament\Resources\RaceEvents\Pages;

use App\Filament\Resources\RaceEvents\RaceEventResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListRaceEvents extends ListRecords
{
    protected static string $resource = RaceEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
