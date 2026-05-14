<?php

namespace App\Filament\Resources\SeasonContenders\Tables;

use App\Filament\Support\MotorsportFormOptions;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

/**
 * Table definition for {@see \App\Filament\Resources\SeasonContenders\SeasonContenderResource}.
 */
class SeasonContendersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('season.title')
                    ->label('Season')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('driver.name')
                    ->label('Driver')
                    ->searchable()
                    ->placeholder('—'),
                TextColumn::make('name')
                    ->searchable()
                    ->placeholder('—'),
                TextColumn::make('subtitle')
                    ->searchable()
                    ->limit(40)
                    ->wrap(),
                TextColumn::make('threat_level')
                    ->badge()
                    ->searchable(),
                TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('season_id')
                    ->label('Season')
                    ->relationship('season', 'title')
                    ->searchable()
                    ->preload(),
                SelectFilter::make('threat_level')->options(MotorsportFormOptions::threatLevels()),
            ])
            ->defaultSort('sort_order')
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
