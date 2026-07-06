<?php

declare(strict_types=1);

use App\Models\Driver;
use App\Models\Season;
use App\Models\Standing;
use App\Support\Motorsport\BtrcStandingsHtmlParser;
use Database\Seeders\MotorsportContentSeeder;
use Illuminate\Support\Facades\Http;

/**
 * @return non-empty-string
 */
function btrcStandingsPageHtml(string $divisionOneBody, string $divisionTwoBody = '<div class="podium-container"></div>'): string
{
    return '<div class="fusion-tabs"><div class="tab-content">'
        .'<div role="tabpanel" aria-labelledby="fusion-tab-division1" id="tab-division-1">'
        .$divisionOneBody
        .'</div>'
        .'<div role="tabpanel" aria-labelledby="fusion-tab-division2" id="tab-division-2">'
        .$divisionTwoBody
        .'</div>'
        .'</div></div>';
}

/**
 * @return non-empty-string
 */
function btrcPodiumColumnHtml(string $name, string $rankOrdinal, int $points): string
{
    return '<div class="podium-column">'
        .'<div class="driver-name">'.$name.'</div>'
        .'<div class="bar"><div class="rank">'.$rankOrdinal.'</div>'
        .'<div class="points-pill">'.$points.' PTS</div></div>'
        .'</div>';
}

/**
 * @return non-empty-string
 */
function btrcStandingsTableRowHtml(string $name, int $rank, int $points, bool $usePlayerNameSpan = true): string
{
    $nameCell = $usePlayerNameSpan
        ? '<td><span class="player-name">'.$name.'</span></td>'
        : '<td>'.$name.'</td>';

    return '<tr>'.$nameCell.'<td>'.$rank.'</td><td>'.$points.'</td></tr>';
}

/**
 * @return non-empty-string
 */
function btrcStandingsTableHtml(string $rowsHtml): string
{
    return '<table><thead><tr><th>NAME</th><th>POS</th><th>POINTS</th></tr></thead><tbody>'
        .$rowsHtml
        .'</tbody></table>';
}

it('parses standings html and upserts on dry-run off', function () {
    $this->seed(MotorsportContentSeeder::class);

    Http::fake([
        '*' => Http::response(
            btrcStandingsTableHtml(
                btrcStandingsTableRowHtml('David Jenkins', 3, 76, usePlayerNameSpan: false),
            ),
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
            btrcStandingsTableHtml(
                btrcStandingsTableRowHtml('David Jenkins', 3, 76, usePlayerNameSpan: false),
            ),
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

it('imports podium-only html for the top three drivers', function () {
    $this->seed(MotorsportContentSeeder::class);

    $podiumHtml = '<div class="podium-container">'
        .btrcPodiumColumnHtml('STUART OLIVER', '1ST', 88)
        .btrcPodiumColumnHtml('MICHAEL OLIVER', '2ND', 87)
        .btrcPodiumColumnHtml('DAVID JENKINS', '3RD', 86)
        .'</div>';

    Http::fake([
        '*' => Http::response(btrcStandingsPageHtml($podiumHtml), 200),
    ]);

    $this->artisan('motorsport:import-btrc-standings', [
        '--season' => '2026',
        '--url' => 'https://example.test/standings',
    ])->assertSuccessful();

    $season = Season::query()->where('year', 2026)->firstOrFail();

    $stuart = Standing::query()
        ->where('season_id', $season->id)
        ->whereHas('driver', fn ($q) => $q->where('slug', 'stuart-oliver'))
        ->first();

    $david = Standing::query()
        ->where('season_id', $season->id)
        ->whereHas('driver', fn ($q) => $q->where('slug', 'david-jenkins'))
        ->first();

    expect($stuart)->not->toBeNull()
        ->and($stuart->rank)->toBe(1)
        ->and($stuart->points)->toBe(88)
        ->and($david)->not->toBeNull()
        ->and($david->rank)->toBe(3)
        ->and($david->points)->toBe(86);
});

it('merges podium and table rows into a full standings list', function () {
    $this->seed(MotorsportContentSeeder::class);

    $body = '<div class="podium-container">'
        .btrcPodiumColumnHtml('STUART OLIVER', '1ST', 88)
        .btrcPodiumColumnHtml('MICHAEL OLIVER', '2ND', 87)
        .btrcPodiumColumnHtml('DAVID JENKINS', '3RD', 86)
        .'</div>'
        .btrcStandingsTableHtml(
            btrcStandingsTableRowHtml('RYAN SMITH', 4, 74),
        );

    Http::fake([
        '*' => Http::response(btrcStandingsPageHtml($body), 200),
    ]);

    $this->artisan('motorsport:import-btrc-standings', [
        '--season' => '2026',
        '--url' => 'https://example.test/standings',
    ])->assertSuccessful();

    $season = Season::query()->where('year', 2026)->firstOrFail();

    $ryan = Standing::query()
        ->where('season_id', $season->id)
        ->whereHas('driver', fn ($q) => $q->where('slug', 'ryan-smith'))
        ->first();

    expect($ryan)->not->toBeNull()
        ->and($ryan->rank)->toBe(4)
        ->and($ryan->points)->toBe(74);
});

it('scopes parsing to the requested division tab', function () {
    $this->seed(MotorsportContentSeeder::class);

    $divisionOne = '<div class="podium-container">'
        .btrcPodiumColumnHtml('DAVID JENKINS', '1ST', 999)
        .'</div>';

    $divisionTwo = '<div class="podium-container">'
        .btrcPodiumColumnHtml('MARTIN GIBSON', '1ST', 50)
        .'</div>';

    Http::fake([
        '*' => Http::response(btrcStandingsPageHtml($divisionOne, $divisionTwo), 200),
    ]);

    $this->artisan('motorsport:import-btrc-standings', [
        '--season' => '2026',
        '--division' => '2',
        '--url' => 'https://example.test/standings',
    ])->assertSuccessful();

    $season = Season::query()->where('year', 2026)->firstOrFail();

    $martin = Standing::query()
        ->where('season_id', $season->id)
        ->whereHas('driver', fn ($q) => $q->where('slug', 'martin-gibson'))
        ->first();

    expect($martin)->not->toBeNull()
        ->and($martin->rank)->toBe(1)
        ->and($martin->points)->toBe(50)
        ->and($martin->division)->toBe('BTRC Division 2');

    $david = Standing::query()
        ->where('season_id', $season->id)
        ->whereHas('driver', fn ($q) => $q->where('slug', 'david-jenkins'))
        ->first();

    expect($david?->points)->not->toBe(999);
});

it('parses combined podium and table html via the html parser', function () {
    $html = btrcStandingsPageHtml(
        '<div class="podium-container">'
            .btrcPodiumColumnHtml('DAVID JENKINS', '3RD', 76)
            .'</div>'
            .btrcStandingsTableHtml(
                btrcStandingsTableRowHtml('RYAN SMITH', 4, 75),
            ),
    );

    $parsed = (new BtrcStandingsHtmlParser)->parse($html, 1);

    expect($parsed)->toHaveCount(2)
        ->and($parsed[0])->toMatchArray(['name' => 'DAVID JENKINS', 'rank' => 3, 'points' => 76])
        ->and($parsed[1])->toMatchArray(['name' => 'RYAN SMITH', 'rank' => 4, 'points' => 75]);
});

it('imports standings from a local html snapshot without http', function () {
    $this->seed(MotorsportContentSeeder::class);

    $html = btrcStandingsPageHtml(
        btrcStandingsTableHtml(
            btrcStandingsTableRowHtml('David Jenkins', 3, 76, usePlayerNameSpan: false),
        ),
    );

    $path = storage_path('framework/testing/btrc-standings.html');
    file_put_contents($path, $html);

    Http::fake();

    $this->artisan('motorsport:import-btrc-standings', [
        '--season' => '2026',
        '--html' => $path,
        '--dry-run' => true,
    ])->assertSuccessful();

    Http::assertNothingSent();
});

it('reports actionable guidance when the remote host returns unauthorized', function () {
    $this->seed(MotorsportContentSeeder::class);

    Http::fake([
        '*' => Http::response('Unauthorized', 401),
    ]);

    $this->artisan('motorsport:import-btrc-standings', [
        '--season' => '2026',
        '--url' => 'https://example.test/standings',
    ])
        ->assertFailed()
        ->expectsOutputToContain('--html=/path/to/standings.html');
});

it('imports standings from the wordpress rest api by default', function () {
    $this->seed(MotorsportContentSeeder::class);

    $renderedHtml = btrcStandingsPageHtml(
        btrcStandingsTableHtml(
            btrcStandingsTableRowHtml('David Jenkins', 3, 76, usePlayerNameSpan: false),
        ),
    );

    Http::fake([
        'https://btrc.co/wp-json/wp/v2/pages?slug=standings' => Http::response([
            [
                'id' => 3021,
                'content' => [
                    'rendered' => $renderedHtml,
                ],
            ],
        ], 200),
        'https://btrc.co/standings/*' => Http::response('Unauthorized', 401),
    ]);

    $this->artisan('motorsport:import-btrc-standings', [
        '--season' => '2026',
        '--dry-run' => true,
    ])
        ->assertSuccessful()
        ->expectsOutputToContain('wp-json/wp/v2/pages?slug=standings');
});

it('falls back to the html page when the wordpress api fails', function () {
    $this->seed(MotorsportContentSeeder::class);

    $renderedHtml = btrcStandingsPageHtml(
        btrcStandingsTableHtml(
            btrcStandingsTableRowHtml('David Jenkins', 3, 76, usePlayerNameSpan: false),
        ),
    );

    Http::fake([
        'https://btrc.co/wp-json/wp/v2/pages?slug=standings' => Http::response('Unauthorized', 401),
        'https://btrc.co/standings/*' => Http::response($renderedHtml, 200),
    ]);

    $this->artisan('motorsport:import-btrc-standings', [
        '--season' => '2026',
        '--dry-run' => true,
    ])->assertSuccessful();
});
