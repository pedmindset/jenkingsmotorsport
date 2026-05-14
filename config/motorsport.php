<?php

return [
    /*
    |--------------------------------------------------------------------------
    | External shop URL (mirrors Vite env for server-side nav seeding)
    |--------------------------------------------------------------------------
    */
    'shop_url' => env('VITE_SHOP_URL', ''),

    /*
    |--------------------------------------------------------------------------
    | Public season/championship tables (Division 1 by default)
    |--------------------------------------------------------------------------
    */
    'default_championship_division' => 'BTRC Division 1',
];
