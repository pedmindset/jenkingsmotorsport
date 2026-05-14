<?php

namespace App\Filament\Resources\VehicleSpecifications\Pages;

use App\Filament\Resources\VehicleSpecifications\VehicleSpecificationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListVehicleSpecifications extends ListRecords
{
    protected static string $resource = VehicleSpecificationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
