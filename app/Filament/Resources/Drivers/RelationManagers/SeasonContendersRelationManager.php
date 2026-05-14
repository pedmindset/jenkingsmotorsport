<?php

namespace App\Filament\Resources\Drivers\RelationManagers;

use App\Filament\Support\MotorsportFormOptions;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

/**
 * {@see \App\Models\SeasonContender} appearances for a {@see \App\Models\Driver}.
 */
class SeasonContendersRelationManager extends RelationManager
{
    protected static string $relationship = 'seasonContenders';

    protected static ?string $title = 'Season contenders';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Hidden::make('driver_id')
                    ->default(fn (): int => (int) $this->ownerRecord->getKey()),
                Section::make('Contender')
                    ->schema([
                        Select::make('season_id')
                            ->relationship('season', 'title', modifyQueryUsing: fn ($query) => $query->orderByDesc('year'))
                            ->searchable()
                            ->preload()
                            ->required(),
                        TextInput::make('name')->maxLength(255),
                        TextInput::make('subtitle')->required()->maxLength(255),
                        Select::make('threat_level')
                            ->required()
                            ->options(MotorsportFormOptions::threatLevels())
                            ->default('high'),
                        TextInput::make('sort_order')->numeric()->default(0)->required(),
                    ])
                    ->columns(2),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn ($query) => $query->orderBy('sort_order')->with(['season']))
            ->recordTitleAttribute('subtitle')
            ->columns([
                TextColumn::make('sort_order')->sortable(),
                TextColumn::make('season.title')->searchable()->label('Season'),
                TextColumn::make('name')->placeholder('—'),
                TextColumn::make('subtitle')->limit(40)->wrap(),
                TextColumn::make('threat_level')->badge(),
            ])
            ->filters([
                SelectFilter::make('threat_level')->options(MotorsportFormOptions::threatLevels()),
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
