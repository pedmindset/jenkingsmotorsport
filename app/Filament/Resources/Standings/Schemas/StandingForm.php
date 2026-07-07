<?php

namespace App\Filament\Resources\Standings\Schemas;

use App\Filament\Support\MotorsportFormOptions;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Validation\Rules\Unique;

class StandingForm
{
    public static function configure(Schema $schema): Schema
    {
        $defaultDivision = (string) config('motorsport.default_championship_division', 'BTRC Division 1');

        return $schema
            ->components([
                Section::make('Championship row')
                    ->description('Published totals for a season and driver. One row per driver per season.')
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
                            ->required()
                            ->unique(
                                ignoreRecord: true,
                                modifyRuleUsing: function (Unique $rule, Get $get): Unique {
                                    return $rule->where('season_id', $get('season_id'));
                                },
                            ),
                        TextInput::make('rank')
                            ->required()
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(255),
                        TextInput::make('points')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->default(0),
                        Select::make('division')
                            ->required()
                            ->options(MotorsportFormOptions::divisions())
                            ->default($defaultDivision),
                        Select::make('status')
                            ->required()
                            ->options(MotorsportFormOptions::standingStatuses())
                            ->default('entered'),
                    ])
                    ->columns(2),
            ]);
    }
}
