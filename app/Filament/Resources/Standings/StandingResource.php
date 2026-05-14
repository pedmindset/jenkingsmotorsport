<?php

namespace App\Filament\Resources\Standings;

use App\Filament\Resources\Standings\Pages\CreateStanding;
use App\Filament\Resources\Standings\Pages\EditStanding;
use App\Filament\Resources\Standings\Pages\ListStandings;
use App\Filament\Resources\Standings\Schemas\StandingForm;
use App\Filament\Resources\Standings\Tables\StandingsTable;
use App\Models\Standing;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

/**
 * Filament CRUD for {@see Standing} championship rows.
 */
class StandingResource extends Resource
{
    protected static ?string $model = Standing::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Motorsport';

    protected static ?int $navigationSort = 40;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChartBar;

    public static function form(Schema $schema): Schema
    {
        return StandingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StandingsTable::configure($table);
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
            'index' => ListStandings::route('/'),
            'create' => CreateStanding::route('/create'),
            'edit' => EditStanding::route('/{record}/edit'),
        ];
    }

    /**
     * @return Builder<Standing>
     */
    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with(['season', 'driver']);
    }
}
