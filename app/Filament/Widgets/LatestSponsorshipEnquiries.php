<?php

namespace App\Filament\Widgets;

use App\Models\SponsorshipEnquiry;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables\Columns\TextColumn;

class LatestSponsorshipEnquiries extends BaseWidget
{
    protected static ?int $sort = 2;
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                SponsorshipEnquiry::query()->latest()->limit(5)
            )
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('email')
                    ->icon('heroicon-m-envelope'),
                TextColumn::make('company')
                    ->placeholder('-'),
                TextColumn::make('interest_tier')
                    ->badge()
                    ->color('primary'),
                TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime()
                    ->sortable(),
            ]);
    }
}
