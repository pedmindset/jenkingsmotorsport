<?php

namespace App\Filament\Resources\Seasons\Schemas;

use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class SeasonForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)
                    ->schema([
                        Group::make()
                            ->schema([
                                Section::make('Identity')
                                    ->description('Public season record: URL slug, year, and active flag for /season redirect.')
                                    ->schema([
                                        TextInput::make('title')
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
                                            ->unique(ignoreRecord: true)
                                            ->helperText('Used in public URL: /season/{slug}'),
                                        TextInput::make('year')
                                            ->required()
                                            ->numeric()
                                            ->minValue(1980)
                                            ->maxValue(2100)
                                            ->helperText('Championship year.'),
                                        Toggle::make('is_active')
                                            ->label('Active season')
                                            ->helperText('The active season is used when visitors open /season without a slug.')
                                            ->default(false),
                                    ])
                                    ->columns(2),
                                Section::make('Summary')
                                    ->schema([
                                        Textarea::make('summary')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                    ]),
                            ])
                            ->columnSpan(1),
                        Group::make()
                            ->schema([
                                Section::make('Previous season banner')
                                    ->description('Shown on the public season page (eyebrow, title, body).')
                                    ->schema([
                                        TextInput::make('previous_season_banner.eyebrow')
                                            ->maxLength(255),
                                        TextInput::make('previous_season_banner.title')
                                            ->maxLength(255),
                                        Textarea::make('previous_season_banner.body')
                                            ->rows(4)
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(1),
                                Section::make('SEO / extras')
                                    ->collapsed()
                                    ->schema([
                                        KeyValue::make('meta')
                                            ->keyLabel('Key')
                                            ->valueLabel('Value')
                                            ->addActionLabel('Add meta entry')
                                            ->helperText('Optional key/value data for page meta overrides.')
                                            ->columnSpanFull(),
                                    ]),
                            ])
                            ->columnSpan(1),
                    ])
                    ->columnSpanFull(),
                Section::make('Season objectives')
                    ->description('Repeating blocks with icon key (Lucide name), title, and description.')
                    ->schema([
                        Repeater::make('objectives')
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('icon')
                                    ->required()
                                    ->maxLength(64)
                                    ->helperText('e.g. Trophy, Zap, Users'),
                                Textarea::make('description')
                                    ->required()
                                    ->rows(3)
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->collapsible()
                            ->itemLabel(fn (?array $state): ?string => $state['title'] ?? null)
                            ->addActionLabel('Add objective')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
