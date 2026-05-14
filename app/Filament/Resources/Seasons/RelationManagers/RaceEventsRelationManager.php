<?php

namespace App\Filament\Resources\Seasons\RelationManagers;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Get;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Validation\Rules\Unique;

/**
 * Relation manager for {@see \App\Models\RaceEvent} rows on a {@see \App\Models\Season}.
 */
class RaceEventsRelationManager extends RelationManager
{
    protected static string $relationship = 'raceEvents';

    protected static ?string $title = 'Race events';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Hidden::make('season_id')
                    ->default(fn (): int => (int) $this->ownerRecord->getKey()),
                Grid::make(2)
                    ->schema([
                        Group::make()
                            ->schema([
                                Section::make('Identity')
                                    ->schema([
                                        TextInput::make('event_code')
                                            ->required()
                                            ->maxLength(8)
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
                                            ->numeric()
                                            ->default(0)
                                            ->required(),
                                    ])
                                    ->columns(2),
                                Section::make('Schedule')
                                    ->schema([
                                        TextInput::make('date_display')
                                            ->required(),
                                        DateTimePicker::make('starts_at')
                                            ->required()
                                            ->native(false),
                                        DateTimePicker::make('ends_at')
                                            ->native(false)
                                            ->afterOrEqual('starts_at'),
                                    ])
                                    ->columns(2),
                            ]),
                        Group::make()
                            ->schema([
                                Section::make('Venue')
                                    ->schema([
                                        TextInput::make('venue')->required(),
                                        TextInput::make('country')->required(),
                                        TextInput::make('rounds')->required(),
                                        Toggle::make('is_international')->default(false),
                                        TextInput::make('feature_link')->url()->maxLength(255),
                                    ])
                                    ->columns(2),
                                Section::make('Content')
                                    ->schema([
                                        Textarea::make('description')->required()->rows(4)->columnSpanFull(),
                                        TextInput::make('highlight')->maxLength(255),
                                    ]),
                            ]),
                    ]),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->modifyQueryUsing(fn ($query) => $query->orderBy('sort_order'))
            ->columns([
                TextColumn::make('event_code')->badge()->sortable(),
                TextColumn::make('title')->searchable()->wrap(),
                TextColumn::make('date_display'),
                TextColumn::make('starts_at')->dateTime()->sortable(),
                TextColumn::make('venue')->toggleable(),
                IconColumn::make('is_international')->boolean()->label('Int.'),
            ])
            ->filters([
                TernaryFilter::make('is_international')->label('International'),
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
