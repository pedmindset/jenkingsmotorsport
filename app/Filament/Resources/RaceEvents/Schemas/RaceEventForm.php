<?php

namespace App\Filament\Resources\RaceEvents\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Get;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Validation\Rules\Unique;

class RaceEventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)
                    ->schema([
                        Group::make()
                            ->schema([
                                Section::make('Season & identity')
                                    ->schema([
                                        Select::make('season_id')
                                            ->relationship('season', 'title')
                                            ->searchable()
                                            ->preload()
                                            ->required(),
                                        TextInput::make('event_code')
                                            ->required()
                                            ->maxLength(8)
                                            ->helperText('Unique within the season (max 8 characters).')
                                            ->unique(
                                                ignoreRecord: true,
                                                modifyRuleUsing: function (Unique $rule, Get $get): Unique {
                                                    return $rule->where('season_id', $get('season_id'));
                                                },
                                            ),
                                        TextInput::make('title')
                                            ->required()
                                            ->maxLength(255),
                                        TextInput::make('sort_order')
                                            ->required()
                                            ->numeric()
                                            ->default(0)
                                            ->helperText('Lower numbers appear first on the calendar.'),
                                    ])
                                    ->columns(2),
                                Section::make('Schedule')
                                    ->schema([
                                        TextInput::make('date_display')
                                            ->required()
                                            ->maxLength(255)
                                            ->helperText('Human-readable dates shown on the site (e.g. April 4–5).'),
                                        DateTimePicker::make('starts_at')
                                            ->required()
                                            ->native(false),
                                        DateTimePicker::make('ends_at')
                                            ->native(false)
                                            ->afterOrEqual('starts_at'),
                                    ])
                                    ->columns(2),
                            ])
                            ->columnSpan(1),
                        Group::make()
                            ->schema([
                                Section::make('Venue')
                                    ->schema([
                                        TextInput::make('venue')
                                            ->required()
                                            ->maxLength(255),
                                        TextInput::make('country')
                                            ->required()
                                            ->maxLength(255),
                                        TextInput::make('rounds')
                                            ->required()
                                            ->maxLength(255)
                                            ->helperText('e.g. “1 – 5”'),
                                        Toggle::make('is_international')
                                            ->label('International round')
                                            ->default(false),
                                        TextInput::make('feature_link')
                                            ->label('Feature page link')
                                            ->url()
                                            ->maxLength(255)
                                            ->helperText('Optional Inertia path (e.g. /le-mans).'),
                                    ])
                                    ->columns(2),
                                Section::make('Content')
                                    ->schema([
                                        Textarea::make('description')
                                            ->required()
                                            ->rows(5)
                                            ->columnSpanFull(),
                                        TextInput::make('highlight')
                                            ->maxLength(255)
                                            ->helperText('Optional short label (badge on calendar).'),
                                    ]),
                            ])
                            ->columnSpan(1),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
