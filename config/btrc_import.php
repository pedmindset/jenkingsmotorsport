<?php

/**
 * Configuration for the optional `motorsport:import-btrc-standings` Artisan command.
 *
 * Many motorsport sites restrict automated data collection in their Terms of Use. Even when
 * robots.txt permits crawling, prefer official timing/results PDFs where available, keep
 * concurrency at one request, identify yourself via user-agent, and treat imports as draft
 * until verified by a human against the championship bulletin.
 */
return [
    'standings_url' => env('BTRC_STANDINGS_URL', 'https://btrc.co/standings/'),

    'timeout' => (int) env('BTRC_IMPORT_TIMEOUT', 30),

    'request_delay_seconds' => (int) env('BTRC_IMPORT_DELAY_SECONDS', 1),

    'user_agent' => env(
        'BTRC_IMPORT_USER_AGENT',
        'JenkinsMotorsportBot/1.0 (+'.env('APP_URL', 'https://example.test').'/contact)'
    ),

    /**
     * Map ALL CAPS squished names as they may appear in public HTML to local driver slugs.
     *
     * @var array<string, string>
     */
    'driver_slug_aliases' => [
        'DAVID JENKINS' => 'david-jenkins',
    ],
];
