<?php

declare(strict_types=1);

use App\Models\Driver;
use App\Models\Season;
use App\Models\Standing;
use Database\Seeders\MotorsportContentSeeder;

it('exports standings for a season to json', function () {
    $this->seed(MotorsportContentSeeder::class);

    $path = storage_path('framework/testing/standings-export-2026.json');

    $this->artisan('motorsport:export-standings-snapshot', [
        '--season' => '2026',
        '--output' => $path,
    ])->assertSuccessful();

    expect(is_file($path))->toBeTrue();

    $payload = json_decode(file_get_contents($path), true);

    expect($payload['version'])->toBe(1)
        ->and($payload['season_year'])->toBe(2026)
        ->and($payload['standings'])->not->toBeEmpty()
        ->and($payload['standings'][0])->toHaveKeys([
            'driver_slug',
            'driver_name',
            'rank',
            'points',
            'division',
            'status',
        ]);
});

it('imports standings from a json snapshot', function () {
    $this->seed(MotorsportContentSeeder::class);

    $season = Season::query()->where('year', 2026)->firstOrFail();
    $driver = Driver::query()->where('slug', 'david-jenkins')->firstOrFail();

    $path = storage_path('framework/testing/standings-import-2026.json');

    $this->artisan('motorsport:export-standings-snapshot', [
        '--season' => '2026',
        '--output' => $path,
    ])->assertSuccessful();

    $original = Standing::query()
        ->where('season_id', $season->id)
        ->where('driver_id', $driver->id)
        ->firstOrFail();

    Standing::query()
        ->where('season_id', $season->id)
        ->where('driver_id', $driver->id)
        ->update([
            'rank' => 99,
            'points' => 0,
        ]);

    $this->artisan('motorsport:import-standings-snapshot', [
        'file' => $path,
    ])->assertSuccessful();

    $row = Standing::query()
        ->where('season_id', $season->id)
        ->where('driver_id', $driver->id)
        ->firstOrFail();

    expect($row->rank)->toBe($original->rank)
        ->and($row->points)->toBe($original->points);
});

it('does not write standings during snapshot dry run', function () {
    $this->seed(MotorsportContentSeeder::class);

    $season = Season::query()->where('year', 2026)->firstOrFail();
    $driver = Driver::query()->where('slug', 'david-jenkins')->firstOrFail();

    $path = storage_path('framework/testing/standings-dry-run-2026.json');

    $this->artisan('motorsport:export-standings-snapshot', [
        '--season' => '2026',
        '--output' => $path,
    ])->assertSuccessful();

    Standing::query()
        ->where('season_id', $season->id)
        ->where('driver_id', $driver->id)
        ->update([
            'rank' => 99,
            'points' => 0,
        ]);

    $this->artisan('motorsport:import-standings-snapshot', [
        'file' => $path,
        '--dry-run' => true,
    ])->assertSuccessful();

    $row = Standing::query()
        ->where('season_id', $season->id)
        ->where('driver_id', $driver->id)
        ->firstOrFail();

    expect($row->rank)->toBe(99)
        ->and($row->points)->toBe(0);
});

it('reports missing driver slugs during snapshot import', function () {
    $this->seed(MotorsportContentSeeder::class);

    $path = storage_path('framework/testing/standings-missing-driver.json');

    file_put_contents($path, json_encode([
        'version' => 1,
        'exported_at' => now()->toIso8601String(),
        'season_year' => 2026,
        'standings' => [
            [
                'driver_slug' => 'missing-driver-slug',
                'driver_name' => 'Missing Driver',
                'rank' => 1,
                'points' => 10,
                'division' => 'BTRC Division 1',
                'status' => 'provisional',
            ],
        ],
    ], JSON_THROW_ON_ERROR));

    $this->artisan('motorsport:import-standings-snapshot', [
        'file' => $path,
    ])
        ->assertSuccessful()
        ->expectsOutputToContain('missing-driver-slug');
});
