<?php

declare(strict_types=1);

namespace App\Filament\Pages;

use App\Filament\Widgets\InboxActivityChart;
use App\Filament\Widgets\LatestBlogPosts;
use App\Filament\Widgets\LatestContactMessages;
use App\Filament\Widgets\LatestSponsorshipEnquiries;
use App\Filament\Widgets\QuickLinks;
use App\Filament\Widgets\StatsOverview;
use App\Filament\Widgets\TeamWelcomeBanner;
use App\Filament\Widgets\UpcomingRaceEvents;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\Widget;
use Illuminate\Contracts\Support\Htmlable;

/**
 * Filament home page with a curated widget layout and responsive grid.
 */
class Dashboard extends BaseDashboard
{
    /**
     * Responsive columns for the dashboard widget grid.
     *
     * @return array<string, int>|int
     */
    public function getColumns(): int|array
    {
        return [
            'default' => 1,
            'sm' => 2,
            'md' => 3,
            'lg' => 4,
        ];
    }

    /**
     * Widgets in display order (story: welcome → KPIs → chart → schedule → shortcuts → inbox → account).
     *
     * @return array<class-string<Widget>>
     */
    public function getWidgets(): array
    {
        return [
            TeamWelcomeBanner::class,
            StatsOverview::class,
            InboxActivityChart::class,
            UpcomingRaceEvents::class,
            LatestBlogPosts::class,
            QuickLinks::class,
            LatestContactMessages::class,
            LatestSponsorshipEnquiries::class,
            AccountWidget::class,
        ];
    }

    public function getTitle(): string|Htmlable
    {
        return static::$title ?? __('filament-panels::pages/dashboard.title');
    }
}
