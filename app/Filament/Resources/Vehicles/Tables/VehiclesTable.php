<?php

namespace App\Filament\Resources\Vehicles\Tables;

use App\Models\Vehicle;
use App\Support\PublicMediaUrl;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

/**
 * Table definition for {@see \App\Filament\Resources\Vehicles\VehicleResource}.
 */
class VehiclesTable
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
                TextColumn::make('racing_number')
                    ->searchable()
                    ->badge(),
                ImageColumn::make('hero_image_path')
                    ->label('Hero')
                    ->height(32)
                    ->checkFileExistence(false)
                    ->getStateUsing(fn (Vehicle $record): ?string => PublicMediaUrl::absoluteUrl($record->hero_image_path)),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('name')
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
