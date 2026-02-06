<?php

namespace App\Filament\Resources\SponsorshipEnquiries\Pages;

use App\Filament\Resources\SponsorshipEnquiries\SponsorshipEnquiryResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditSponsorshipEnquiry extends EditRecord
{
    protected static string $resource = SponsorshipEnquiryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
