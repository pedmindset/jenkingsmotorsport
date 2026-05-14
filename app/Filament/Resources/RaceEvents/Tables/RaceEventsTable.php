<?php

namespace App\Filament\Resources\RaceEvents\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

/**
 * Table definition for {@see \App\Filament\Resources\RaceEvents\RaceEventResource}.
 */
class RaceEventsTable
{
    /**
     * Configure the race events listing table.
     */
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('season.title')
                    ->label('Season')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('event_code')
                    ->searchable()
                    ->badge(),
                TextColumn::make('title')
                    ->searchable()
                    ->wrap(),
                TextColumn::make('date_display')
                    ->searchable(),
                TextColumn::make('starts_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('venue')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('country')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                IconColumn::make('is_international')
                    ->boolean()
                    ->label('Int.'),
                TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('feature_link')
                    ->url(fn (?string $state): ?string => $state)
                    ->toggleable(isToggledHiddenByDefault: true),
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
                TernaryFilter::make('is_international')->label('International'),
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
