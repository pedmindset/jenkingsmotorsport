<?php

namespace App\Filament\Resources\SponsorshipEnquiries;

use App\Filament\Resources\SponsorshipEnquiries\Pages\CreateSponsorshipEnquiry;
use App\Filament\Resources\SponsorshipEnquiries\Pages\EditSponsorshipEnquiry;
use App\Filament\Resources\SponsorshipEnquiries\Pages\ListSponsorshipEnquiries;
use App\Filament\Resources\SponsorshipEnquiries\Pages\ViewSponsorshipEnquiry;
use App\Filament\Resources\SponsorshipEnquiries\Schemas\SponsorshipEnquiryForm;
use App\Filament\Resources\SponsorshipEnquiries\Schemas\SponsorshipEnquiryInfolist;
use App\Filament\Resources\SponsorshipEnquiries\Tables\SponsorshipEnquiriesTable;
use App\Models\SponsorshipEnquiry;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SponsorshipEnquiryResource extends Resource
{
    protected static ?string $model = SponsorshipEnquiry::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBriefcase;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return SponsorshipEnquiryForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SponsorshipEnquiryInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SponsorshipEnquiriesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSponsorshipEnquiries::route('/'),
            'create' => CreateSponsorshipEnquiry::route('/create'),
            'view' => ViewSponsorshipEnquiry::route('/{record}'),
            'edit' => EditSponsorshipEnquiry::route('/{record}/edit'),
        ];
    }
}
