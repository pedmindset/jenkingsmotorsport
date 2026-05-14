<?php

declare(strict_types=1);

use App\Models\RaceResult;
use Database\Seeders\MotorsportContentSeeder;
use Illuminate\Database\QueryException;
use Inertia\Testing\AssertableInertia as Assert;

it('includes seeded round results for the opening round', function () {
    $this->seed(MotorsportContentSeeder::class);

    $this->get(route('season.show', ['season' => '2026-btrc']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('roundResults.0.event', '01')
            ->has('roundResults.0.results', 2));
});

it('enforces unique race_event_id and driver_id on race_results', function () {
    $this->seed(MotorsportContentSeeder::class);

    $existing = RaceResult::query()->firstOrFail();

    expect(fn () => RaceResult::query()->create([
        'race_event_id' => $existing->race_event_id,
        'driver_id' => $existing->driver_id,
        'division' => 'BTRC Division 1',
        'position' => 99,
        'points' => 0,
        'status' => 'finished',
    ]))->toThrow(QueryException::class);
});
