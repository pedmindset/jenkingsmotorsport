<?php

namespace App\Filament\Widgets;

use App\Models\BlogPost;
use App\Models\SponsorshipEnquiry;
use App\Models\ContactMessage;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Sponsorship Enquiries', SponsorshipEnquiry::count())
                ->description('New sponsorship requests')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('primary'),
            Stat::make('Contact Messages', ContactMessage::count())
                ->description('Total general enquiries')
                ->descriptionIcon('heroicon-m-chat-bubble-left-right')
                ->color('info'),
            Stat::make('Published Posts', BlogPost::whereNotNull('published_at')->where('published_at', '<=', now())->count())
                ->description('Active blog content')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('success'),
        ];
    }
}
