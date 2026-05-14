<?php

namespace App\Filament\Resources\Seasons\RelationManagers;

use App\Filament\Support\MotorsportFormOptions;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Get;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Validation\Rules\Unique;

/**
 * Relation manager for {@see \App\Models\Standing} rows on a {@see \App\Models\Season}.
 */
class StandingsRelationManager extends RelationManager
{
    protected static string $relationship = 'standings';

    protected static ?string $title = 'Standings';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Hidden::make('season_id')
                    ->default(fn (): int => (int) $this->ownerRecord->getKey()),
                Section::make('Championship row')
                    ->schema([
                        Select::make('driver_id')
                            ->relationship('driver', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->unique(
                                ignoreRecord: true,
                                modifyRuleUsing: function (Unique $rule, Get $get): Unique {
                                    return $rule->where('season_id', $get('season_id'));
                                },
                            ),
                        TextInput::make('rank')->required()->numeric()->minValue(1)->maxValue(255),
                        TextInput::make('points')->required()->numeric()->minValue(0)->default(0),
                        Select::make('division')
                            ->required()
                            ->options(MotorsportFormOptions::divisions())
                            ->default((string) config('motorsport.default_championship_division', 'BTRC Division 1')),
                        Select::make('status')
                            ->required()
                            ->options(MotorsportFormOptions::standingStatuses())
                            ->default('entered'),
                    ])
                    ->columns(2),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn ($query) => $query->orderBy('rank'))
            ->recordTitleAttribute('driver.name')
            ->columns([
                TextColumn::make('rank')->sortable(),
                TextColumn::make('driver.name')->searchable(),
                TextColumn::make('points')->sortable(),
                TextColumn::make('division')->badge()->toggleable(),
                TextColumn::make('status')->badge()->color(fn (string $state): string => match ($state) {
                    'final' => 'success',
                    'provisional' => 'warning',
                    default => 'gray',
                }),
            ])
            ->filters([
                SelectFilter::make('division')->options(MotorsportFormOptions::divisions()),
                SelectFilter::make('status')->options(MotorsportFormOptions::standingStatuses()),
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
