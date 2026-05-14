<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Filament\Resources\SponsorshipEnquiries\SponsorshipEnquiryResource;
use App\Models\SponsorshipEnquiry;
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

/**
 * Recent sponsorship leads from the public enquiry form.
 */
class LatestSponsorshipEnquiries extends BaseWidget
{
    protected static bool $isLazy = false;

    protected static ?int $sort = 7;

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
            ->heading('Latest sponsorship enquiries')
            ->description('Commercial inbox — open a row for full details')
            ->query(
                SponsorshipEnquiry::query()->latest()
            )
            ->defaultPaginationPageOption(5)
            ->paginated([5, 10])
            ->recordUrl(
                fn (SponsorshipEnquiry $record): string => SponsorshipEnquiryResource::getUrl('view', ['record' => $record])
            )
            ->headerActions([
                Action::make('viewAll')
                    ->label('View all')
                    ->url(SponsorshipEnquiryResource::getUrl('index'))
                    ->link(),
            ])
            ->emptyStateHeading('No sponsorship enquiries')
            ->emptyStateDescription('Submissions will show up here when partners reach out.')
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('email')
                    ->icon('heroicon-m-envelope')
                    ->copyable(),
                TextColumn::make('company')
                    ->placeholder('—'),
                TextColumn::make('interest_tier')
                    ->badge()
                    ->color('primary'),
                TextColumn::make('created_at')
                    ->label('Received')
                    ->since()
                    ->sortable(),
            ]);
    }
}
