<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Models\ContactMessage;
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

/**
 * Recent contact form submissions with quick navigation to the inbox.
 */
class LatestContactMessages extends BaseWidget
{
    protected static bool $isLazy = false;

    protected static ?int $sort = 6;

    /**
     * @var int|string|array<string, int|string|null>
     */
    protected int|string|array $columnSpan = [
        'default' => 'full',
        'lg' => 2,
    ];

    /**
     * {@inheritDoc}
     */
    protected function getTablePollingInterval(): ?string
    {
        return '60s';
    }

    public function table(Table $table): Table
    {
        return $table
            ->heading('Latest contact messages')
            ->description('Newest general enquiries — click a row to open the thread')
            ->query(
                ContactMessage::query()->latest()
            )
            ->defaultPaginationPageOption(5)
            ->paginated([5, 10])
            ->recordUrl(
                fn (ContactMessage $record): string => ContactMessageResource::getUrl('view', ['record' => $record])
            )
            ->headerActions([
                Action::make('viewAll')
                    ->label('View all')
                    ->url(ContactMessageResource::getUrl('index'))
                    ->link(),
            ])
            ->emptyStateHeading('No messages yet')
            ->emptyStateDescription('Submissions will appear here when visitors use the contact form.')
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('email')
                    ->icon('heroicon-m-at-symbol')
                    ->copyable(),
                TextColumn::make('subject')
                    ->limit(40),
                TextColumn::make('created_at')
                    ->label('Sent')
                    ->since()
                    ->sortable(),
            ]);
    }
}
