<?php

namespace App\Filament\Resources\Partners\Schemas;

use App\Filament\Support\PublicMediaFileUpload;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

/**
 * Form schema for {@see \App\Models\Partner} in Filament.
 */
class PartnerForm
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
                                TextInput::make('role')
                                    ->required()
                                    ->maxLength(255),
                                Toggle::make('is_active')
                                    ->label('Visible / active')
                                    ->default(true),
                                TextInput::make('sort_order')
                                    ->numeric()
                                    ->default(0)
                                    ->required(),
                            ])
                            ->columns(2),
                        Section::make('Links & assets')
                            ->description('Images are stored on the public disk and exposed under /storage/… Existing /images/… paths in the database still work on the site until you re-upload.')
                            ->schema([
                                PublicMediaFileUpload::configure(
                                    FileUpload::make('logo_path')
                                        ->label('Logo')
                                        ->image()
                                        ->disk('public')
                                        ->directory('partners/logos')
                                        ->visibility('public')
                                        ->imageEditor()
                                        ->required()
                                ),
                                PublicMediaFileUpload::configure(
                                    FileUpload::make('image_path')
                                        ->label('Card / hero background')
                                        ->image()
                                        ->disk('public')
                                        ->directory('partners/cards')
                                        ->visibility('public')
                                        ->imageEditor()
                                        ->required()
                                ),
                                TextInput::make('url')
                                    ->label('Partner website')
                                    ->url()
                                    ->required()
                                    ->maxLength(255),
                            ])
                            ->columns(1),
                    ])
                    ->columnSpanFull(),
                Section::make('Copy')
                    ->schema([
                        Textarea::make('description')
                            ->required()
                            ->rows(5)
                            ->columnSpanFull(),
                        Textarea::make('technical_fact')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),
                Section::make('Theme (optional)')
                    ->collapsed()
                    ->schema([
                        KeyValue::make('theme')
                            ->keyLabel('Token')
                            ->valueLabel('Value')
                            ->helperText('Optional key/value pairs for partnership card styling.')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
