<?php

namespace App\Filament\Resources\VehicleSpecifications\Pages;

use App\Filament\Resources\VehicleSpecifications\VehicleSpecificationResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditVehicleSpecification extends EditRecord
{
    protected static string $resource = VehicleSpecificationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
