<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Filament\Resources\BlogPosts\BlogPostResource;
use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Filament\Resources\Drivers\DriverResource;
use App\Filament\Resources\NewsletterSubscriptions\NewsletterSubscriptionResource;
use App\Filament\Resources\Seasons\SeasonResource;
use App\Filament\Resources\SponsorshipEnquiries\SponsorshipEnquiryResource;
use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Driver;
use App\Models\NewsletterSubscription;
use App\Models\Season;
use App\Models\SponsorshipEnquiry;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Database\Eloquent\Model;

/**
 * KPI cards for the admin dashboard with sparklines and resource deep links.
 */
class StatsOverview extends BaseWidget
{
    protected static bool $isLazy = false;

    protected static ?int $sort = 0;

    protected ?string $heading = 'At a glance';

    protected ?string $description = 'Content, inbox, and team metrics for the last 7 days';

    /**
     * @var int | array<string, ?int> | null
     */
    protected int|array|null $columns = ['@xl' => 3, '!@lg' => 3];

    /**
     * {@inheritDoc}
     */
    protected function getStats(): array
    {
        $publishedQuery = BlogPost::query()->whereNotNull('published_at')->where('published_at', '<=', now());

        return [
            Stat::make('Sponsorship enquiries', SponsorshipEnquiry::query()->count())
                ->description($this->deltaDescription(SponsorshipEnquiry::class, 7))
                ->descriptionIcon($this->deltaIcon(SponsorshipEnquiry::class, 7))
                ->chart($this->dailySeries(SponsorshipEnquiry::class, 7))
                ->color('primary')
                ->url(SponsorshipEnquiryResource::getUrl('index')),
            Stat::make('Contact messages', ContactMessage::query()->count())
                ->description($this->deltaDescription(ContactMessage::class, 7))
                ->descriptionIcon($this->deltaIcon(ContactMessage::class, 7))
                ->chart($this->dailySeries(ContactMessage::class, 7))
                ->color('info')
                ->url(ContactMessageResource::getUrl('index')),
            Stat::make('Published posts', (clone $publishedQuery)->count())
                ->description($this->deltaDescriptionForPublishedPosts(7))
                ->descriptionIcon($this->deltaIconForPublishedPosts(7))
                ->chart($this->dailyPublishedPostsSeries(7))
                ->color('success')
                ->url(BlogPostResource::getUrl('index')),
            Stat::make('Newsletter subscribers', NewsletterSubscription::query()->where('is_active', true)->count())
                ->description($this->deltaDescription(NewsletterSubscription::class, 7, 'subscribed_at'))
                ->descriptionIcon($this->deltaIcon(NewsletterSubscription::class, 7, 'subscribed_at'))
                ->chart($this->dailySeries(NewsletterSubscription::class, 7, 'subscribed_at'))
                ->color('warning')
                ->url(NewsletterSubscriptionResource::getUrl('index')),
            Stat::make('Active seasons', Season::query()->where('is_active', true)->count())
                ->description('Championship years marked active')
                ->descriptionIcon('heroicon-m-flag')
                ->color('gray')
                ->url(SeasonResource::getUrl('index')),
            Stat::make('Drivers', Driver::query()->count())
                ->description('Profiles in the team roster')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('gray')
                ->url(DriverResource::getUrl('index')),
        ];
    }

    /**
     * @return list<int>
     */
    private function dailySeries(string $modelClass, int $days, string $dateColumn = 'created_at'): array
    {
        $series = [];

        for ($i = $days - 1; $i >= 0; $i--) {
            $day = now()->subDays($i)->startOfDay();
            $series[] = $modelClass::query()->whereDate($dateColumn, $day)->count();
        }

        return $series;
    }

    /**
     * @return list<int>
     */
    private function dailyPublishedPostsSeries(int $days): array
    {
        $series = [];

        for ($i = $days - 1; $i >= 0; $i--) {
            $day = now()->subDays($i)->toDateString();
            $series[] = BlogPost::query()
                ->whereNotNull('published_at')
                ->whereDate('published_at', $day)
                ->where('published_at', '<=', now())
                ->count();
        }

        return $series;
    }

    /**
     * Count records from the start of the earliest day in a rolling window of `$days` calendar days (including today).
     *
     * @param  class-string<Model>  $modelClass
     */
    private function countSinceDaysAgo(string $modelClass, int $days, string $dateColumn = 'created_at'): int
    {
        $from = now()->subDays($days - 1)->startOfDay();

        return $modelClass::query()->where($dateColumn, '>=', $from)->count();
    }

    /**
     * @param  class-string<Model>  $modelClass
     */
    private function countInPriorPeriod(string $modelClass, int $days, string $dateColumn = 'created_at'): int
    {
        $end = now()->subDays($days)->startOfDay();
        $from = now()->subDays(($days * 2) - 1)->startOfDay();

        return $modelClass::query()
            ->where($dateColumn, '>=', $from)
            ->where($dateColumn, '<', $end)
            ->count();
    }

    /**
     * Human-readable comparison of the last N days vs the previous N-day window.
     *
     * @param  class-string<Model>  $modelClass
     */
    private function deltaDescription(string $modelClass, int $days, string $dateColumn = 'created_at'): string
    {
        $recent = $this->countSinceDaysAgo($modelClass, $days, $dateColumn);
        $previous = $this->countInPriorPeriod($modelClass, $days, $dateColumn);

        if ($previous === 0) {
            return $recent > 0
                ? "{$recent} in the last {$days} days"
                : "None in the last {$days} days";
        }

        $pct = round((($recent - $previous) / $previous) * 100);

        return $pct >= 0
            ? "{$recent} in the last {$days} days · +{$pct}% vs prior period"
            : "{$recent} in the last {$days} days · {$pct}% vs prior period";
    }

    private function deltaDescriptionForPublishedPosts(int $days): string
    {
        $recent = $this->publishedPostsCountSinceDaysAgo($days);
        $previous = $this->publishedPostsCountInPriorPeriod($days);

        if ($previous === 0) {
            return $recent > 0
                ? "{$recent} published in the last {$days} days"
                : "No publishes in the last {$days} days";
        }

        $pct = round((($recent - $previous) / $previous) * 100);

        return $pct >= 0
            ? "{$recent} publishes ({$days}d) · +{$pct}% vs prior"
            : "{$recent} publishes ({$days}d) · {$pct}% vs prior";
    }

    private function publishedPostsCountSinceDaysAgo(int $days): int
    {
        $from = now()->subDays($days - 1)->startOfDay();

        return BlogPost::query()
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->where('published_at', '>=', $from)
            ->count();
    }

    private function publishedPostsCountInPriorPeriod(int $days): int
    {
        $end = now()->subDays($days)->startOfDay();
        $from = now()->subDays(($days * 2) - 1)->startOfDay();

        return BlogPost::query()
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->where('published_at', '>=', $from)
            ->where('published_at', '<', $end)
            ->count();
    }

    /**
     * @param  class-string<Model>  $modelClass
     */
    private function deltaIcon(string $modelClass, int $days, string $dateColumn = 'created_at'): string
    {
        $recent = $this->countSinceDaysAgo($modelClass, $days, $dateColumn);
        $previous = $this->countInPriorPeriod($modelClass, $days, $dateColumn);

        if ($recent >= $previous) {
            return 'heroicon-m-arrow-trending-up';
        }

        return 'heroicon-m-arrow-trending-down';
    }

    private function deltaIconForPublishedPosts(int $days): string
    {
        $recent = $this->publishedPostsCountSinceDaysAgo($days);
        $previous = $this->publishedPostsCountInPriorPeriod($days);

        if ($recent >= $previous) {
            return 'heroicon-m-arrow-trending-up';
        }

        return 'heroicon-m-arrow-trending-down';
    }
}
