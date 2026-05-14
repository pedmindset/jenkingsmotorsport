<?php

namespace App\Filament\Resources\CareerResults;

use App\Filament\Resources\CareerResults\Pages\CreateCareerResult;
use App\Filament\Resources\CareerResults\Pages\EditCareerResult;
use App\Filament\Resources\CareerResults\Pages\ListCareerResults;
use App\Filament\Resources\CareerResults\Schemas\CareerResultForm;
use App\Filament\Resources\CareerResults\Tables\CareerResultsTable;
use App\Models\CareerResult;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

/**
 * Filament CRUD for {@see CareerResult} timeline entries.
 */
class CareerResultResource extends Resource
{
    protected static ?string $model = CareerResult::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Motorsport';

    protected static ?int $navigationSort = 60;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedTrophy;

    public static function form(Schema $schema): Schema
    {
        return CareerResultForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CareerResultsTable::configure($table);
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
            'index' => ListCareerResults::route('/'),
            'create' => CreateCareerResult::route('/create'),
            'edit' => EditCareerResult::route('/{record}/edit'),
        ];
    }
}
