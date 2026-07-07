<?php

namespace App\Filament\Resources\Drivers\Schemas;

use App\Filament\Support\PublicMediaFileUpload;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

/**
 * Form schema for {@see \App\Models\Driver} in Filament.
 */
class DriverForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)
                    ->schema([
                        Section::make('Identity')
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
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true),
                                Toggle::make('is_team_driver')
                                    ->label('Team driver (Jenkins)')
                                    ->default(false),
                            ])
                            ->columns(2),
                        Section::make('Truck & grid')
                            ->schema([
                                TextInput::make('truck_model')
                                    ->maxLength(255),
                                TextInput::make('racing_number')
                                    ->label('Racing number')
                                    ->maxLength(16)
                                    ->helperText('Shown on public standings (e.g. 69).'),
                                TextInput::make('sort_order')
                                    ->required()
                                    ->numeric()
                                    ->default(0)
                                    ->helperText('Admin list ordering.'),
                            ])
                            ->columns(2),
                        Section::make('Profile')
                            ->schema([
                                PublicMediaFileUpload::configure(
                                    FileUpload::make('profile_image_path')
                                        ->label('Profile photo')
                                        ->image()
                                        ->disk('public')
                                        ->directory('drivers')
                                        ->visibility('public')
                                        ->imageEditor()
                                        ->nullable()
                                ),
                            ]),
                    ])
                    ->columnSpanFull(),
                Section::make('Bio')
                    ->collapsed()
                    ->schema([
                        Textarea::make('bio')
                            ->rows(6)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
