<?php

namespace App\Filament\Resources\SponsorshipEnquiries\Tables;

use App\Models\SponsorshipEnquiry;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

/**
 * Table definition for {@see \App\Filament\Resources\SponsorshipEnquiries\SponsorshipEnquiryResource}.
 */
class SponsorshipEnquiriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->label('Email address')
                    ->searchable(),
                TextColumn::make('company')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('interest_tier')
                    ->badge()
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('interest_tier')
                    ->label('Interest tier')
                    ->options(fn (): array => SponsorshipEnquiry::query()
                        ->select('interest_tier')
                        ->whereNotNull('interest_tier')
                        ->distinct()
                        ->orderBy('interest_tier')
                        ->pluck('interest_tier', 'interest_tier')
                        ->all()),
            ])
            ->defaultSort('created_at', 'desc')
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ]);
    }
}
