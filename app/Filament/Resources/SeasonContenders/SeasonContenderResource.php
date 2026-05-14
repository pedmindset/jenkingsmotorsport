<?php

namespace App\Filament\Resources\SeasonContenders;

use App\Filament\Resources\SeasonContenders\Pages\CreateSeasonContender;
use App\Filament\Resources\SeasonContenders\Pages\EditSeasonContender;
use App\Filament\Resources\SeasonContenders\Pages\ListSeasonContenders;
use App\Filament\Resources\SeasonContenders\Schemas\SeasonContenderForm;
use App\Filament\Resources\SeasonContenders\Tables\SeasonContendersTable;
use App\Models\SeasonContender;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

/**
 * Filament CRUD for {@see SeasonContender} spotlight rows.
 */
class SeasonContenderResource extends Resource
{
    protected static ?string $model = SeasonContender::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Motorsport';

    protected static ?int $navigationSort = 50;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedFire;

    public static function form(Schema $schema): Schema
    {
        return SeasonContenderForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SeasonContendersTable::configure($table);
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
            'index' => ListSeasonContenders::route('/'),
            'create' => CreateSeasonContender::route('/create'),
            'edit' => EditSeasonContender::route('/{record}/edit'),
        ];
    }

    /**
     * @return Builder<SeasonContender>
     */
    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with(['season', 'driver']);
    }
}
