<?php

namespace App\Filament\Resources\SeasonContenders\Schemas;

use App\Filament\Support\MotorsportFormOptions;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SeasonContenderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Contender')
                    ->description('Link a driver to a season story card, or set a display name if no driver record.')
                    ->schema([
                        Select::make('season_id')
                            ->relationship('season', 'title')
                            ->searchable()
                            ->preload()
                            ->required(),
                        Select::make('driver_id')
                            ->relationship('driver', 'name')
                            ->searchable()
                            ->preload()
                            ->helperText('Optional if you fill Display name below.'),
                        TextInput::make('name')
                            ->maxLength(255)
                            ->helperText('Fallback label when no driver is selected.'),
                        TextInput::make('subtitle')
                            ->required()
                            ->maxLength(255),
                        Select::make('threat_level')
                            ->required()
                            ->options(MotorsportFormOptions::threatLevels())
                            ->default('high'),
                        TextInput::make('sort_order')
                            ->required()
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(2),
            ]);
    }
}
