<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Filament\Resources\BlogPosts\BlogPostResource;
use App\Filament\Resources\MediaAssets\MediaAssetResource;
use App\Filament\Resources\RaceEvents\RaceEventResource;
use App\Filament\Resources\Seasons\SeasonResource;
use Filament\Widgets\Widget;

/**
 * Shortcut grid for the most-edited motorsport and content areas.
 */
class QuickLinks extends Widget
{
    protected static bool $isLazy = false;

    protected string $view = 'filament.widgets.quick-links';

    protected static ?int $sort = 5;

    protected int|string|array $columnSpan = 'full';

    /**
     * @return list<array{label: string, url: string, icon: string}>
     */
    public function getLinks(): array
    {
        return [
            [
                'label' => 'Seasons',
                'url' => SeasonResource::getUrl('index'),
                'icon' => 'heroicon-m-flag',
            ],
            [
                'label' => 'Race events',
                'url' => RaceEventResource::getUrl('index'),
                'icon' => 'heroicon-m-map-pin',
            ],
            [
                'label' => 'Blog posts',
                'url' => BlogPostResource::getUrl('index'),
                'icon' => 'heroicon-m-document-text',
            ],
            [
                'label' => 'Media library',
                'url' => MediaAssetResource::getUrl('index'),
                'icon' => 'heroicon-m-photo',
            ],
        ];
    }
}
