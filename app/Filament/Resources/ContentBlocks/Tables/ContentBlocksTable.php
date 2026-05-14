<?php

namespace App\Filament\Resources\ContentBlocks\Tables;

use App\Models\ContentBlock;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

/**
 * Table definition for {@see \App\Filament\Resources\ContentBlocks\ContentBlockResource}.
 */
class ContentBlocksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('page_slug')
                    ->searchable()
                    ->badge(),
                TextColumn::make('block_key')
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
                SelectFilter::make('page_slug')
                    ->label('Page')
                    ->options(fn (): array => ContentBlock::query()
                        ->select('page_slug')
                        ->distinct()
                        ->orderBy('page_slug')
                        ->pluck('page_slug', 'page_slug')
                        ->all()),
                SelectFilter::make('block_key')
                    ->label('Block key')
                    ->options(fn (): array => ContentBlock::query()
                        ->select('block_key')
                        ->distinct()
                        ->orderBy('block_key')
                        ->pluck('block_key', 'block_key')
                        ->all()),
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
