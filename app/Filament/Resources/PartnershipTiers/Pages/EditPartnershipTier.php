<?php

namespace App\Filament\Resources\PartnershipTiers\Pages;

use App\Filament\Resources\PartnershipTiers\PartnershipTierResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPartnershipTier extends EditRecord
{
    protected static string $resource = PartnershipTierResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
