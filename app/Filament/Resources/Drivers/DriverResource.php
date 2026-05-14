<?php

namespace App\Filament\Resources\Drivers;

use App\Filament\Resources\Drivers\Pages\CreateDriver;
use App\Filament\Resources\Drivers\Pages\EditDriver;
use App\Filament\Resources\Drivers\Pages\ListDrivers;
use App\Filament\Resources\Drivers\RelationManagers\RaceResultsRelationManager;
use App\Filament\Resources\Drivers\RelationManagers\SeasonContendersRelationManager;
use App\Filament\Resources\Drivers\RelationManagers\StandingsRelationManager;
use App\Filament\Resources\Drivers\Schemas\DriverForm;
use App\Filament\Resources\Drivers\Tables\DriversTable;
use App\Models\Driver;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

/**
 * Filament CRUD for {@see Driver} profiles.
 */
class DriverResource extends Resource
{
    protected static ?string $model = Driver::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Motorsport';

    protected static ?int $navigationSort = 30;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserGroup;

    public static function form(Schema $schema): Schema
    {
        return DriverForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DriversTable::configure($table);
    }

    /**
     * @return array<int, class-string>
     */
    public static function getRelations(): array
    {
        return [
            StandingsRelationManager::class,
            RaceResultsRelationManager::class,
            SeasonContendersRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDrivers::route('/'),
            'create' => CreateDriver::route('/create'),
            'edit' => EditDriver::route('/{record}/edit'),
        ];
    }
}
