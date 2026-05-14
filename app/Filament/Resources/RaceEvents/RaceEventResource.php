<?php

namespace App\Filament\Resources\RaceEvents;

use App\Filament\Resources\RaceEvents\Pages\CreateRaceEvent;
use App\Filament\Resources\RaceEvents\Pages\EditRaceEvent;
use App\Filament\Resources\RaceEvents\Pages\ListRaceEvents;
use App\Filament\Resources\RaceEvents\RelationManagers\ResultsRelationManager;
use App\Filament\Resources\RaceEvents\Schemas\RaceEventForm;
use App\Filament\Resources\RaceEvents\Tables\RaceEventsTable;
use App\Models\RaceEvent;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

/**
 * Filament CRUD for {@see RaceEvent} schedule rows.
 *
 * @property-read class-string<RaceEvent> $model
 */
class RaceEventResource extends Resource
{
    protected static ?string $model = RaceEvent::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Motorsport';

    protected static ?int $navigationSort = 20;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMapPin;

    public static function form(Schema $schema): Schema
    {
        return RaceEventForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RaceEventsTable::configure($table);
    }

    /**
     * @return array<int, class-string>
     */
    public static function getRelations(): array
    {
        return [
            ResultsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListRaceEvents::route('/'),
            'create' => CreateRaceEvent::route('/create'),
            'edit' => EditRaceEvent::route('/{record}/edit'),
        ];
    }

    /**
     * @return Builder<RaceEvent>
     */
    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with(['season']);
    }
}
