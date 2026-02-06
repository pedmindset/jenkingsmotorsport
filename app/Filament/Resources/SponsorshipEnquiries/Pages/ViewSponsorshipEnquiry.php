<?php

namespace App\Filament\Resources\SponsorshipEnquiries\Pages;

use App\Filament\Resources\SponsorshipEnquiries\SponsorshipEnquiryResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewSponsorshipEnquiry extends ViewRecord
{
    protected static string $resource = SponsorshipEnquiryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
