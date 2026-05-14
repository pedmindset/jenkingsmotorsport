<?php

namespace App\Filament\Resources\CareerResults\Tables;

use App\Filament\Support\MotorsportFormOptions;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

/**
 * Table definition for {@see \App\Filament\Resources\CareerResults\CareerResultResource}.
 */
class CareerResultsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('year')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('result')
                    ->searchable()
                    ->wrap(),
                TextColumn::make('division')
                    ->badge()
                    ->searchable(),
                IconColumn::make('is_highlight')
                    ->boolean()
                    ->label('Highlight'),
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
                SelectFilter::make('division')->options(MotorsportFormOptions::divisions()),
                TernaryFilter::make('is_highlight')->label('Highlights'),
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
