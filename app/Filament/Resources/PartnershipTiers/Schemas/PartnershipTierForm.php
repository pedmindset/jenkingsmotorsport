<?php

namespace App\Filament\Resources\PartnershipTiers\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PartnershipTierForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)
                    ->schema([
                        Section::make('Tier')
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
                                TextInput::make('impact')
                                    ->required()
                                    ->maxLength(255),
                                Toggle::make('is_highlighted')
                                    ->label('Highlighted tier')
                                    ->default(false),
                                TextInput::make('sort_order')
                                    ->required()
                                    ->numeric()
                                    ->default(0),
                            ])
                            ->columns(2),
                        Section::make('Calls to action')
                            ->schema([
                                TextInput::make('cta_label')
                                    ->required()
                                    ->default('Inquire')
                                    ->maxLength(255),
                                TextInput::make('cta_link')
                                    ->required()
                                    ->maxLength(255)
                                    ->helperText('Relative path or full URL (e.g. /contact?tier=primary).'),
                            ])
                            ->columns(1),
                    ])
                    ->columnSpanFull(),
                Section::make('Benefits')
                    ->schema([
                        Repeater::make('benefits')
                            ->schema([
                                TextInput::make('line')
                                    ->required()
                                    ->maxLength(500)
                                    ->columnSpanFull(),
                            ])
                            ->columns(1)
                            ->defaultItems(1)
                            ->reorderable()
                            ->collapsible()
                            ->afterStateHydrated(function (Repeater $component, mixed $state): void {
                                if (! is_array($state)) {
                                    return;
                                }
                                if ($state === [] || array_is_list($state)) {
                                    $lines = array_values(array_filter(
                                        $state,
                                        fn (mixed $item): bool => is_string($item) && $item !== '',
                                    ));
                                    $component->state(array_map(
                                        fn (string $s): array => ['line' => $s],
                                        $lines,
                                    ));
                                }
                            })
                            ->dehydrateStateUsing(function (mixed $state): array {
                                if (! is_array($state)) {
                                    return [];
                                }

                                $lines = [];
                                foreach ($state as $row) {
                                    if (is_array($row) && isset($row['line']) && is_string($row['line']) && $row['line'] !== '') {
                                        $lines[] = $row['line'];
                                    }
                                }

                                return $lines;
                            })
                            ->itemLabel(fn (?array $state): ?string => isset($state['line']) ? (string) mb_substr((string) $state['line'], 0, 60) : null)
                            ->helperText('Stored as a list of strings for the public partnerships page.')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
