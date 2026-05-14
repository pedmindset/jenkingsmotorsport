<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Filament\Resources\RaceEvents\RaceEventResource;
use App\Models\RaceEvent;
use Filament\Actions\Action;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

/**
 * Next rounds on the calendar across all seasons.
 */
class UpcomingRaceEvents extends BaseWidget
{
    protected static bool $isLazy = false;

    protected static ?int $sort = 3;

    /**
     * @var int|string|array<string, int|string|null>
     */
    protected int|string|array $columnSpan = [
        'default' => 'full',
        'lg' => 2,
    ];

    public function table(Table $table): Table
    {
        return $table
            ->heading('Upcoming race events')
            ->description('Next fixtures by start time — open a row to edit')
            ->query(
                RaceEvent::query()
                    ->with('season')
                    ->where('starts_at', '>=', now())
                    ->orderBy('starts_at')
            )
            ->defaultPaginationPageOption(5)
            ->paginated([5, 10])
            ->recordUrl(
                fn (RaceEvent $record): string => RaceEventResource::getUrl('edit', ['record' => $record])
            )
            ->headerActions([
                Action::make('viewAll')
                    ->label('View all')
                    ->url(RaceEventResource::getUrl('index'))
                    ->link(),
            ])
            ->emptyStateHeading('No upcoming events')
            ->emptyStateDescription('When future rounds are scheduled they will appear here.')
            ->columns([
                TextColumn::make('season.year')
                    ->label('Season')
                    ->sortable(),
                TextColumn::make('title')
                    ->wrap()
                    ->searchable(),
                TextColumn::make('starts_at')
                    ->label('Starts')
                    ->dateTime('M j, H:i')
                    ->sortable(),
                TextColumn::make('venue')
                    ->toggleable(),
                IconColumn::make('is_international')
                    ->label('Int.')
                    ->boolean(),
            ]);
    }
}
