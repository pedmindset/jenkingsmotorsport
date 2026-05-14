<?php

namespace App\Filament\Resources\CareerResults\Schemas;

use App\Filament\Support\MotorsportFormOptions;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CareerResultForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Career highlight')
                    ->schema([
                        TextInput::make('year')
                            ->required()
                            ->maxLength(8)
                            ->helperText('Label year as stored (e.g. 2025, 2011).'),
                        TextInput::make('result')
                            ->required()
                            ->maxLength(255),
                        Select::make('division')
                            ->required()
                            ->options(MotorsportFormOptions::divisions())
                            ->default((string) config('motorsport.default_championship_division', 'BTRC Division 1')),
                        Toggle::make('is_highlight')
                            ->label('Highlight on site')
                            ->default(false),
                        TextInput::make('sort_order')
                            ->required()
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower numbers appear later in a descending list; adjust to taste.'),
                    ])
                    ->columns(2),
            ]);
    }
}
