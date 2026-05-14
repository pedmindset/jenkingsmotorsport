<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Models\ContactMessage;
use App\Models\SponsorshipEnquiry;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

/**
 * Line chart comparing contact messages and sponsorship enquiries over time.
 */
class InboxActivityChart extends ChartWidget
{
    protected static bool $isLazy = false;

    protected static ?int $sort = 1;

    /**
     * @var int|string|array<string, int|string|null>
     */
    protected int|string|array $columnSpan = 'full';

    protected ?string $heading = 'Inbox activity';

    protected ?string $description = 'Contact messages compared with sponsorship enquiries';

    protected ?string $maxHeight = '320px';

    /**
     * Disable auto-poll; data loads on filter change and page render.
     */
    protected ?string $pollingInterval = null;

    public function mount(): void
    {
        if ($this->filter === null || $this->filter === '') {
            $this->filter = '7';
        }

        parent::mount();
    }

    public function updatedFilter(): void
    {
        $this->cachedData = null;
    }

    /**
     * {@inheritDoc}
     *
     * @return array<string, mixed>
     */
    protected function getData(): array
    {
        $filter = $this->filter ?? '7';

        return match ($filter) {
            '30' => $this->buildDailySeries(30),
            'ytd' => $this->buildMonthlyYearToDateSeries(),
            default => $this->buildDailySeries(7),
        };
    }

    /**
     * {@inheritDoc}
     */
    protected function getType(): string
    {
        return 'line';
    }

    /**
     * {@inheritDoc}
     *
     * @return array<scalar, scalar>|null
     */
    protected function getFilters(): ?array
    {
        return [
            '7' => 'Last 7 days',
            '30' => 'Last 30 days',
            'ytd' => 'Year to date',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => true,
                ],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'ticks' => [
                        'precision' => 0,
                    ],
                ],
            ],
        ];
    }

    /**
     * @return array{labels: list<string>, datasets: list<array<string, mixed>>}
     */
    private function buildDailySeries(int $days): array
    {
        $labels = [];
        $contacts = [];
        $sponsorship = [];

        for ($i = $days - 1; $i >= 0; $i--) {
            $day = Carbon::now()->subDays($i)->startOfDay();
            $labels[] = $day->format('M j');
            $contacts[] = ContactMessage::query()->whereDate('created_at', $day)->count();
            $sponsorship[] = SponsorshipEnquiry::query()->whereDate('created_at', $day)->count();
        }

        return $this->chartPayload($labels, $contacts, $sponsorship);
    }

    /**
     * @return array{labels: list<string>, datasets: list<array<string, mixed>>}
     */
    private function buildMonthlyYearToDateSeries(): array
    {
        $start = Carbon::now()->startOfYear();
        $end = Carbon::now()->startOfMonth();
        $labels = [];
        $contacts = [];
        $sponsorship = [];

        for ($cursor = $start->copy(); $cursor <= $end; $cursor->addMonth()) {
            $labels[] = $cursor->format('M');
            $monthStart = $cursor->copy()->startOfMonth();
            $monthEnd = $cursor->copy()->endOfMonth();

            $contacts[] = ContactMessage::query()
                ->whereBetween('created_at', [$monthStart, $monthEnd])
                ->count();
            $sponsorship[] = SponsorshipEnquiry::query()
                ->whereBetween('created_at', [$monthStart, $monthEnd])
                ->count();
        }

        return $this->chartPayload($labels, $contacts, $sponsorship);
    }

    /**
     * @param  list<string>  $labels
     * @param  list<int>  $contacts
     * @param  list<int>  $sponsorship
     * @return array{labels: list<string>, datasets: list<array<string, mixed>>}
     */
    private function chartPayload(array $labels, array $contacts, array $sponsorship): array
    {
        return [
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Contact messages',
                    'data' => $contacts,
                    'borderColor' => '#2563eb',
                    'backgroundColor' => 'rgba(37, 99, 235, 0.25)',
                    'fill' => true,
                    'tension' => 0.35,
                ],
                [
                    'label' => 'Sponsorship enquiries',
                    'data' => $sponsorship,
                    'borderColor' => '#7c3aed',
                    'backgroundColor' => 'rgba(124, 58, 237, 0.2)',
                    'fill' => true,
                    'tension' => 0.35,
                ],
            ],
        ];
    }
}
