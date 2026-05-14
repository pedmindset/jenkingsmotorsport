<?php

namespace App\Filament\Resources\VehicleSpecifications\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class VehicleSpecificationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Specification')
                    ->schema([
                        Select::make('vehicle_id')
                            ->relationship('vehicle', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),
                        TextInput::make('label')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('value')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('icon_key')
                            ->maxLength(64)
                            ->helperText('Optional Lucide icon name for the public page.'),
                        TextInput::make('sort_order')
                            ->required()
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(2),
            ]);
    }
}
