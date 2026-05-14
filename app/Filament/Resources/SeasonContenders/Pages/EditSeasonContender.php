<?php

namespace App\Filament\Resources\SeasonContenders\Pages;

use App\Filament\Resources\SeasonContenders\SeasonContenderResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditSeasonContender extends EditRecord
{
    protected static string $resource = SeasonContenderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
