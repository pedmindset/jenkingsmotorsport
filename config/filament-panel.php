<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | Filament dashboard allowlist (emails)
    |--------------------------------------------------------------------------
    |
    | Comma-separated emails that may sign into the Filament panel. Matches are
    | case-insensitive. Keep this aligned with FILAMENT_PANEL_USER_EMAILS in .env.
    |
    */

    'allowed_emails' => array_values(array_filter(array_map(
        static fn (string $email): string => strtolower(trim($email)),
        explode(',', (string) env('FILAMENT_PANEL_USER_EMAILS', 'emmarthurson@gmail.com')),
    ))),
];
