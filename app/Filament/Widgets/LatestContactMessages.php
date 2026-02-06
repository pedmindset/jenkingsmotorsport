<?php

namespace App\Filament\Widgets;

use App\Models\ContactMessage;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables\Columns\TextColumn;

class LatestContactMessages extends BaseWidget
{
    protected static ?int $sort = 3;
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                ContactMessage::query()->latest()->limit(5)
            )
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('email')
                    ->icon('heroicon-m-at-symbol')
                    ->copyable(),
                TextColumn::make('subject')
                    ->limit(30),
                TextColumn::make('created_at')
                    ->label('Sent at')
                    ->dateTime()
                    ->sortable(),
            ]);
    }
}
