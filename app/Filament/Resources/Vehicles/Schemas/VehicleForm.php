<?php

namespace App\Filament\Resources\Vehicles\Schemas;

use App\Filament\Support\PublicMediaFileUpload;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

/**
 * Form schema for {@see \App\Models\Vehicle} in Filament.
 */
class VehicleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)
                    ->schema([
                        Section::make('Vehicle')
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (string $operation, $state, Set $set): void {
                                        if ($operation === 'create' && is_string($state) && $state !== '') {
                                            $set('slug', Str::slug($state));
                                        }
                                    }),
                                TextInput::make('slug')
                                    ->required()
                                    ->unique(ignoreRecord: true)
                                    ->maxLength(255),
                                TextInput::make('racing_number')
                                    ->maxLength(16)
                                    ->label('Racing number'),
                                PublicMediaFileUpload::configure(
                                    FileUpload::make('hero_image_path')
                                        ->label('Hero image')
                                        ->image()
                                        ->disk('public')
                                        ->directory('vehicles/hero')
                                        ->visibility('public')
                                        ->imageEditor()
                                        ->nullable()
                                ),
                            ])
                            ->columns(2),
                        Section::make('Story')
                            ->schema([
                                Textarea::make('description')
                                    ->rows(8)
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
