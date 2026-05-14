<?php

declare(strict_types=1);

use App\Models\Driver;
use App\Models\Season;
use App\Models\Standing;
use Database\Seeders\MotorsportContentSeeder;
use Illuminate\Support\Facades\Http;

it('parses standings html and upserts on dry-run off', function () {
    $this->seed(MotorsportContentSeeder::class);

    Http::fake([
        '*' => Http::response(
            '<table><thead><tr><th>NAME</th><th>POS</th><th>POINTS</th></tr></thead><tbody>'
                .'<tr><td>David Jenkins</td><td>3RD</td><td>76 PTS</td></tr>'
                .'</tbody></table>',
            200,
        ),
    ]);

    $this->artisan('motorsport:import-btrc-standings', [
        '--season' => '2026',
        '--url' => 'https://example.test/standings',
    ])
        ->assertSuccessful();

    $season = Season::query()->where('year', 2026)->firstOrFail();
    $driver = Driver::query()->where('slug', 'david-jenkins')->firstOrFail();

    $row = Standing::query()
        ->where('season_id', $season->id)
        ->where('driver_id', $driver->id)
        ->first();

    expect($row)->not->toBeNull()
        ->and($row->rank)->toBe(3)
        ->and($row->points)->toBe(76)
        ->and($row->status)->toBe('provisional');
});

it('does not write standings when dry run is enabled', function () {
    $this->seed(MotorsportContentSeeder::class);

    Http::fake([
        '*' => Http::response(
            '<table><thead><tr><th>NAME</th><th>POS</th><th>POINTS</th></tr></thead><tbody>'
                .'<tr><td>David Jenkins</td><td>3RD</td><td>76 PTS</td></tr>'
                .'</tbody></table>',
            200,
        ),
    ]);

    $before = Standing::query()->count();

    $this->artisan('motorsport:import-btrc-standings', [
        '--season' => '2026',
        '--url' => 'https://example.test/standings',
        '--dry-run' => true,
    ])
        ->assertSuccessful();

    expect(Standing::query()->count())->toBe($before);
});
