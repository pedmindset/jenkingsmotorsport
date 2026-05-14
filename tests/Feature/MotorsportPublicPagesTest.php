<?php

declare(strict_types=1);

use Database\Seeders\MotorsportContentSeeder;
use Inertia\Testing\AssertableInertia as Assert;

it('renders motorsport public pages with expected inertia components', function () {
    $this->seed(MotorsportContentSeeder::class);

    $this->get('/')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('Welcome')
        ->has('nextRace')
        ->has('heroVideoUrl')
        ->has('headlineStats')
        ->has('site.nav_links'));

    $this->get(route('season.show', ['season' => '2026-btrc']))->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('Season2026')
        ->has('races')
        ->has('season')
        ->has('standingTable')
        ->has('roundResults'));

    $this->get('/championship')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('Championship')
        ->has('standingSeasons')
        ->has('careerResults')
        ->has('contenders2026'));

    $this->get('/partners')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('Partnerships')
        ->has('technicalPartners')
        ->has('tiers'));

    $this->get('/gallery')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('Gallery')
        ->has('galleryImages')
        ->has('featuredVideoUrl'));

    $this->get('/the-machine')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('TheMachine')
        ->has('vehicle')
        ->has('techSpecs'));

    $this->get('/legacy')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('Legacy')
        ->has('content'));

    $this->get('/le-mans')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('LeMans')
        ->has('content'));
});

it('gallery payload includes curator metadata for each image', function () {
    $this->seed(MotorsportContentSeeder::class);

    $this->get('/gallery')->assertInertia(fn (Assert $page) => $page
        ->component('Gallery')
        ->has('galleryImages', 16)
        ->where('galleryImages.0.slug', 'gallery-brands-victory')
        ->where('galleryImages.0.title', 'David Jenkins taking the chequered flag')
        ->where('galleryImages.0.category', 'track')
        ->has('galleryImages.0.tags', 4)
        ->where('galleryImages.0.tags.0.slug', 'btrc')
        ->where('galleryImages.0.season.slug', '2026-btrc')
        ->where('galleryImages.0.season.year', 2026)
        ->where('galleryImages.0.season.title', '2026 British Truck Racing Championship'));
});

it('redirects /season to the active season slug', function () {
    $this->seed(MotorsportContentSeeder::class);

    $this->get('/season')->assertRedirect(route('season.show', ['season' => '2026-btrc']));
});

it('exposes scheduled races in the season payload', function () {
    $this->seed(MotorsportContentSeeder::class);

    $this->get(route('season.show', ['season' => '2026-btrc']))->assertInertia(fn (Assert $page) => $page
        ->has('races', 7)
        ->where('races.0.event', '01')
        ->where('races.0.title', 'The Opener'));
});

it('orders race events on the season model', function () {
    $this->seed(MotorsportContentSeeder::class);

    $season = \App\Models\Season::query()->where('slug', '2026-btrc')->firstOrFail();

    expect($season->raceEvents)->toHaveCount(7);
    expect($season->raceEvents->first()->event_code)->toBe('01');
});

it('exposes driver profile image urls and points in seeded standings payloads', function () {
    $this->seed(MotorsportContentSeeder::class);

    $this->get(route('season.show', ['season' => '2026-btrc']))->assertInertia(fn (Assert $page) => $page
        ->component('Season2026')
        ->where('standingTable.standingStatus', 'provisional')
        ->where('standingTable.standings.0.rank', 1)
        ->where('standingTable.standings.0.name', 'Stuart Oliver')
        ->where('standingTable.standings.0.points', 78)
        ->where('standingTable.standings.0.profileImage', '/storage/drivers/STUART%20OLIVER.jpg')
        ->where('standingTable.standings.2.name', 'David Jenkins')
        ->where('standingTable.standings.2.points', 76)
        ->where('standingTable.standings.10.name', 'Nathan Smith')
        ->where('standingTable.standings.10.points', 38)
        ->where('standingTable.standings.11.name', 'Simon Reid')
        ->where('standingTable.standings.11.points', 16));

    $this->get('/championship')->assertInertia(fn (Assert $page) => $page
        ->component('Championship')
        ->where('standingSeasons.0.year', '2026')
        ->where('standingSeasons.0.isActive', true)
        ->where('standingSeasons.0.standings.0.name', 'Stuart Oliver')
        ->where('standingSeasons.0.standings.0.points', 78)
        ->where('standingSeasons.0.standings.1.name', 'Michael Oliver')
        ->where('standingSeasons.0.standings.1.points', 78)
        ->where('standingSeasons.0.standings.2.name', 'David Jenkins')
        ->where('standingSeasons.0.standings.2.points', 76)
        ->where('standingSeasons.1.year', '2025')
        ->where('standingSeasons.1.isActive', false)
        ->where('standingSeasons.1.standingStatus', 'final')
        ->where('standingSeasons.1.standings.0.points', 463)
        ->where('standingSeasons.1.standings.2.name', 'David Jenkins')
        ->where('standingSeasons.1.standings.2.profileImage', '/storage/drivers/DAVID%20JENKINS.png'));
});
