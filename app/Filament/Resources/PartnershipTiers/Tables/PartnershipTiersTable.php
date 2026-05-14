<?php

namespace App\Filament\Resources\PartnershipTiers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

/**
 * Table definition for {@see \App\Filament\Resources\PartnershipTiers\PartnershipTierResource}.
 */
class PartnershipTiersTable
{
    /**
     * Configure the partnership tiers listing table.
     */
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->description(fn ($record): ?string => $record->slug)
                    ->wrap(),
                TextColumn::make('impact')
                    ->searchable()
                    ->limit(48)
                    ->toggleable(),
                TextColumn::make('cta_label')
                    ->label('CTA')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('cta_link')
                    ->url(fn (?string $state): ?string => $state)
                    ->toggleable(isToggledHiddenByDefault: true),
                IconColumn::make('is_highlighted')
                    ->boolean()
                    ->label('Spotlight'),
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
                TernaryFilter::make('is_highlighted')->label('Highlighted tier'),
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
