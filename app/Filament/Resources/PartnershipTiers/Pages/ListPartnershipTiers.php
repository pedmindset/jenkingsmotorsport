<?php

namespace App\Filament\Resources\PartnershipTiers\Pages;

use App\Filament\Resources\PartnershipTiers\PartnershipTierResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPartnershipTiers extends ListRecords
{
    protected static string $resource = PartnershipTierResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
