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

    'use_wordpress_api' => filter_var(env('BTRC_IMPORT_USE_WORDPRESS_API', true), FILTER_VALIDATE_BOOL),

    'standings_api_url' => env(
        'BTRC_STANDINGS_API_URL',
        'https://btrc.co/wp-json/wp/v2/pages?slug=standings',
    ),

    'timeout' => (int) env('BTRC_IMPORT_TIMEOUT', 30),

    'request_delay_seconds' => (int) env('BTRC_IMPORT_DELAY_SECONDS', 1),

    'user_agent' => env(
        'BTRC_IMPORT_USER_AGENT',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    ),

    /**
     * Extra HTTP headers merged onto the defaults in {@see \App\Support\Motorsport\BtrcStandingsFetcher}.
     *
     * @var array<string, string>
     */
    'http_headers' => array_filter([
        'Referer' => env('BTRC_IMPORT_REFERER', 'https://btrc.co/'),
    ]),

    /**
     * Map ALL CAPS squished names as they may appear in public HTML to local driver slugs.
     *
     * @var array<string, string>
     */
    'driver_slug_aliases' => [
        'DAVID JENKINS' => 'david-jenkins',
    ],
];
