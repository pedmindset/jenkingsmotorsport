<?php

namespace App\Filament\Resources\VehicleSpecifications;

use App\Filament\Resources\VehicleSpecifications\Pages\CreateVehicleSpecification;
use App\Filament\Resources\VehicleSpecifications\Pages\EditVehicleSpecification;
use App\Filament\Resources\VehicleSpecifications\Pages\ListVehicleSpecifications;
use App\Filament\Resources\VehicleSpecifications\Schemas\VehicleSpecificationForm;
use App\Filament\Resources\VehicleSpecifications\Tables\VehicleSpecificationsTable;
use App\Models\VehicleSpecification;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

/**
 * Filament CRUD for {@see VehicleSpecification} rows.
 */
class VehicleSpecificationResource extends Resource
{
    protected static ?string $model = VehicleSpecification::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Motorsport';

    protected static ?int $navigationSort = 80;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedWrenchScrewdriver;

    public static function form(Schema $schema): Schema
    {
        return VehicleSpecificationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VehicleSpecificationsTable::configure($table);
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
            'index' => ListVehicleSpecifications::route('/'),
            'create' => CreateVehicleSpecification::route('/create'),
            'edit' => EditVehicleSpecification::route('/{record}/edit'),
        ];
    }

    /**
     * @return Builder<VehicleSpecification>
     */
    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with(['vehicle']);
    }
}
