<?php

declare(strict_types=1);

use App\Models\SiteSetting;
use Database\Seeders\MotorsportContentSeeder;

it('seeds grouped nav_links including championship and gallery destinations', function () {
    $this->seed(MotorsportContentSeeder::class);

    /** @var array<int, array<string, mixed>> $nav */
    $nav = SiteSetting::query()->where('key', 'nav_links')->firstOrFail()->value;

    $hrefs = [];

    foreach ($nav as $entry) {
        if (isset($entry['items']) && is_array($entry['items'])) {
            foreach ($entry['items'] as $item) {
                if (isset($item['href'])) {
                    $hrefs[] = $item['href'];
                }
            }
        } elseif (isset($entry['href'])) {
            $hrefs[] = $entry['href'];
        }
    }

    expect($hrefs)->toContain('/championship')->toContain('/gallery');
});
