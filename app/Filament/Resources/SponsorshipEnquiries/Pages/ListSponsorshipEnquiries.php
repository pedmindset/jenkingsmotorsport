<?php

namespace App\Filament\Resources\SponsorshipEnquiries\Pages;

use App\Filament\Resources\SponsorshipEnquiries\SponsorshipEnquiryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSponsorshipEnquiries extends ListRecords
{
    protected static string $resource = SponsorshipEnquiryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
