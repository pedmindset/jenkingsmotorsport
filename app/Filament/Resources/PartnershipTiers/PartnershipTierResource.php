<?php

namespace App\Filament\Resources\PartnershipTiers;

use App\Filament\Resources\PartnershipTiers\Pages\CreatePartnershipTier;
use App\Filament\Resources\PartnershipTiers\Pages\EditPartnershipTier;
use App\Filament\Resources\PartnershipTiers\Pages\ListPartnershipTiers;
use App\Filament\Resources\PartnershipTiers\Schemas\PartnershipTierForm;
use App\Filament\Resources\PartnershipTiers\Tables\PartnershipTiersTable;
use App\Models\PartnershipTier;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

/**
 * Filament CRUD for {@see PartnershipTier} offers.
 */
class PartnershipTierResource extends Resource
{
    protected static ?string $model = PartnershipTier::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Commercial';

    protected static ?int $navigationSort = 20;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedGift;

    public static function form(Schema $schema): Schema
    {
        return PartnershipTierForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PartnershipTiersTable::configure($table);
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
            'index' => ListPartnershipTiers::route('/'),
            'create' => CreatePartnershipTier::route('/create'),
            'edit' => EditPartnershipTier::route('/{record}/edit'),
        ];
    }
}
