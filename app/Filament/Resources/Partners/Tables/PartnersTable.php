<?php

namespace App\Filament\Resources\Partners\Tables;

use App\Models\Partner;
use App\Support\PublicMediaUrl;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Collection;

/**
 * Table definition for {@see \App\Filament\Resources\Partners\PartnerResource}.
 */
class PartnersTable
{
    /**
     * Configure the partners listing table.
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
                ImageColumn::make('logo_path')
                    ->label('Logo')
                    ->height(36)
                    ->checkFileExistence(false)
                    ->getStateUsing(fn (Partner $record): ?string => PublicMediaUrl::absoluteUrl($record->logo_path)),
                ImageColumn::make('image_path')
                    ->label('Card')
                    ->height(28)
                    ->checkFileExistence(false)
                    ->getStateUsing(fn (Partner $record): ?string => PublicMediaUrl::absoluteUrl($record->image_path)),
                TextColumn::make('role')
                    ->searchable()
                    ->limit(40),
                IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
                TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('url')
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
                TernaryFilter::make('is_active')->label('Active'),
            ])
            ->defaultSort('sort_order')
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    BulkAction::make('activate')
                        ->label('Activate')
                        ->icon('heroicon-m-check-circle')
                        ->color('success')
                        ->action(function (Collection $records): void {
                            $records->each->update(['is_active' => true]);
                        }),
                    BulkAction::make('deactivate')
                        ->label('Deactivate')
                        ->icon('heroicon-m-x-circle')
                        ->color('gray')
                        ->action(function (Collection $records): void {
                            $records->each->update(['is_active' => false]);
                        }),
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
