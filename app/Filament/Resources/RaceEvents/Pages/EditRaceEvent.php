<?php

namespace App\Filament\Resources\RaceEvents\Pages;

use App\Filament\Resources\RaceEvents\RaceEventResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditRaceEvent extends EditRecord
{
    protected static string $resource = RaceEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
