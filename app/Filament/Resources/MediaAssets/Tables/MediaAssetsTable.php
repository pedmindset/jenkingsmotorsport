<?php

namespace App\Filament\Resources\MediaAssets\Tables;

use App\Models\MediaAsset;
use App\Support\PublicMediaUrl;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

/**
 * Table definition for gallery / media library ({@see MediaAssetResource}).
 */
class MediaAssetsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('path')
                    ->label('Preview')
                    ->height(72)
                    ->square()
                    ->extraImgAttributes(['class' => 'object-cover'])
                    ->checkFileExistence(false)
                    ->toggleable()
                    ->getStateUsing(function (MediaAsset $record): ?string {
                        if ($record->media_type !== 'image' || ! filled($record->path)) {
                            return null;
                        }

                        return PublicMediaUrl::absoluteUrl($record->path);
                    }),
                TextColumn::make('title')
                    ->label('Title')
                    ->searchable(['title', 'slug', 'caption'])
                    ->sortable()
                    ->wrap()
                    ->description(function (MediaAsset $record): ?string {
                        $caption = $record->caption;

                        if ($caption === null || $caption === '') {
                            return $record->slug;
                        }

                        return Str::limit($caption, 90);
                    }),
                TextColumn::make('taken_at')
                    ->label('Taken')
                    ->date()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('season.year')
                    ->label('Season'),
                TextColumn::make('tags_list')
                    ->label('Tags')
                    ->wrap()
                    ->toggleable()
                    ->getStateUsing(function (MediaAsset $record): string {
                        return $record->tags->pluck('name')->sort()->values()->implode(', ');
                    }),
                TextColumn::make('media_type')
                    ->badge()
                    ->searchable(),
                TextColumn::make('category')
                    ->badge()
                    ->searchable(),
                IconColumn::make('featured')
                    ->boolean(),
                TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('path')
                    ->limit(40)
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
                SelectFilter::make('media_type')
                    ->options(fn (): array => MediaAsset::query()
                        ->select('media_type')
                        ->distinct()
                        ->orderBy('media_type')
                        ->pluck('media_type', 'media_type')
                        ->all()),
                SelectFilter::make('category')
                    ->options(fn (): array => MediaAsset::query()
                        ->select('category')
                        ->distinct()
                        ->orderBy('category')
                        ->pluck('category', 'category')
                        ->all()),
                SelectFilter::make('season_id')
                    ->relationship(
                        name: 'season',
                        titleAttribute: 'title',
                        modifyQueryUsing: fn ($query) => $query->orderByDesc('year'),
                    )
                    ->searchable()
                    ->preload(),
                SelectFilter::make('tag')
                    ->label('Tag')
                    ->relationship('tags', 'name')
                    ->searchable()
                    ->preload(),
                TernaryFilter::make('featured')->label('Featured'),
            ])
            ->defaultSort('sort_order')
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    BulkAction::make('feature')
                        ->label('Mark featured')
                        ->icon('heroicon-m-star')
                        ->color('warning')
                        ->action(function (Collection $records): void {
                            $records->each->update(['featured' => true]);
                        }),
                    BulkAction::make('unfeature')
                        ->label('Unmark featured')
                        ->icon('heroicon-m-star')
                        ->color('gray')
                        ->action(function (Collection $records): void {
                            $records->each->update(['featured' => false]);
                        }),
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
