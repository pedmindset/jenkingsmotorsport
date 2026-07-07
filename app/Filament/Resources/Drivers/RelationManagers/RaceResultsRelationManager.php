<?php

namespace App\Filament\Resources\Drivers\RelationManagers;

use App\Filament\Support\MotorsportFormOptions;
use App\Models\RaceEvent;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Validation\Rules\Unique;

/**
 * Per-event {@see \App\Models\RaceResult} rows for a {@see \App\Models\Driver}.
 */
class RaceResultsRelationManager extends RelationManager
{
    protected static string $relationship = 'raceResults';

    protected static ?string $title = 'Race results';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Hidden::make('driver_id')
                    ->default(fn (): int => (int) $this->ownerRecord->getKey()),
                Section::make('Result')
                    ->schema([
                        Select::make('race_event_id')
                            ->relationship(
                                name: 'raceEvent',
                                titleAttribute: 'title',
                                modifyQueryUsing: fn ($query) => $query->with('season')->orderByDesc('starts_at'),
                            )
                            ->searchable()
                            ->preload()
                            ->required()
                            ->getOptionLabelFromRecordUsing(function (RaceEvent $record): string {
                                $season = $record->season !== null
                                    ? (string) $record->season->year.' · '.$record->season->title
                                    : 'Season';

                                return $season.' — '.$record->title;
                            })
                            ->unique(
                                ignoreRecord: true,
                                modifyRuleUsing: function (Unique $rule, Get $get): Unique {
                                    return $rule->where('driver_id', $get('driver_id'));
                                },
                            ),
                        Select::make('division')
                            ->required()
                            ->options(MotorsportFormOptions::divisions())
                            ->default((string) config('motorsport.default_championship_division', 'BTRC Division 1')),
                        TextInput::make('position')
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(999)
                            ->nullable(),
                        TextInput::make('points')
                            ->numeric()
                            ->default(0)
                            ->required(),
                        Select::make('status')
                            ->options(MotorsportFormOptions::raceResultStatuses())
                            ->nullable(),
                        Textarea::make('notes')
                            ->nullable()
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn ($query) => $query
                ->with(['raceEvent.season'])
                ->orderByRaw('position IS NULL')
                ->orderBy('position'))
            ->recordTitleAttribute('raceEvent.title')
            ->columns([
                TextColumn::make('raceEvent.season.title')
                    ->label('Season')
                    ->toggleable(),
                TextColumn::make('raceEvent.title')
                    ->label('Event')
                    ->searchable()
                    ->wrap(),
                TextColumn::make('division')->badge()->toggleable(),
                TextColumn::make('position')->sortable()->placeholder('—'),
                TextColumn::make('points')->sortable(),
                TextColumn::make('status')->badge()->placeholder('—')->color(fn (?string $state): string => match ($state) {
                    'finished' => 'success',
                    'dnf', 'dns' => 'danger',
                    default => 'gray',
                }),
            ])
            ->filters([
                SelectFilter::make('division')->options(MotorsportFormOptions::divisions()),
                SelectFilter::make('status')->options(MotorsportFormOptions::raceResultStatuses()),
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
