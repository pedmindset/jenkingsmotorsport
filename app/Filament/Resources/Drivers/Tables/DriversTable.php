<?php

namespace App\Filament\Resources\Drivers\Tables;

use App\Models\Driver;
use App\Support\PublicMediaUrl;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

/**
 * Table definition for {@see \App\Filament\Resources\Drivers\DriverResource}.
 */
class DriversTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->description(fn ($record): ?string => $record->slug ?? null)
                    ->wrap(),
                ImageColumn::make('profile_image_path')
                    ->label('Photo')
                    ->height(40)
                    ->circular()
                    ->checkFileExistence(false)
                    ->getStateUsing(fn (Driver $record): ?string => PublicMediaUrl::absoluteUrl($record->profile_image_path)),
                TextColumn::make('truck_model')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('racing_number')
                    ->searchable()
                    ->badge(),
                IconColumn::make('is_team_driver')
                    ->boolean()
                    ->label('Team'),
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
                TernaryFilter::make('is_team_driver')->label('Team drivers'),
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
