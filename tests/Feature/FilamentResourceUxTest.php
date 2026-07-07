<?php

use App\Filament\Resources\Drivers\DriverResource;
use App\Filament\Resources\Drivers\Pages\EditDriver;
use App\Filament\Resources\MediaAssets\MediaAssetResource;
use App\Filament\Resources\MediaAssets\Pages\CreateMediaAsset;
use App\Filament\Resources\Partners\PartnerResource;
use App\Filament\Resources\PartnershipTiers\PartnershipTierResource;
use App\Filament\Resources\RaceEvents\RaceEventResource;
use App\Filament\Resources\Seasons\Pages\EditSeason;
use App\Filament\Resources\Seasons\SeasonResource;
use App\Filament\Resources\Standings\Pages\EditStanding;
use App\Filament\Resources\Standings\Pages\ListStandings;
use App\Filament\Resources\Standings\StandingResource;
use App\Filament\Resources\Vehicles\Pages\EditVehicle;
use App\Filament\Resources\Vehicles\VehicleResource;
use App\Models\Driver;
use App\Models\MediaAsset;
use App\Models\Partner;
use App\Models\PartnershipTier;
use App\Models\RaceEvent;
use App\Models\Season;
use App\Models\Standing;
use App\Models\Tag;
use App\Models\User;
use App\Models\Vehicle;
use Livewire\Livewire;

/**
 * Smoke and regression tests for upgraded Filament resources (relation managers, tables).
 */
function filamentAdmin(): User
{
    return User::factory()->admin()->create();
}

beforeEach(function (): void {
    $this->actingAs(filamentAdmin());
});

it('loads Filament index tables with link columns', function (): void {
    $season = Season::query()->create([
        'year' => 2027,
        'slug' => '2027-season',
        'title' => '2027 Season',
        'is_active' => true,
    ]);

    RaceEvent::query()->create([
        'season_id' => $season->getKey(),
        'event_code' => 'R02',
        'title' => 'Round 2',
        'date_display' => 'February',
        'starts_at' => now(),
        'ends_at' => null,
        'venue' => 'Test Circuit',
        'country' => 'UK',
        'rounds' => '3',
        'description' => 'Test event description.',
        'highlight' => null,
        'is_international' => false,
        'feature_link' => 'https://example.com/race-event',
        'sort_order' => 1,
    ]);

    Partner::query()->create([
        'slug' => 'test-partner',
        'name' => 'Test Partner',
        'role' => 'Technical partner',
        'description' => 'Test partner description.',
        'technical_fact' => 'Test partner fact.',
        'logo_path' => 'partners/logo.png',
        'image_path' => 'partners/card.png',
        'url' => 'https://example.com/partner',
        'theme' => null,
        'is_active' => true,
        'sort_order' => 1,
    ]);

    PartnershipTier::query()->create([
        'slug' => 'test-tier',
        'name' => 'Test Tier',
        'impact' => 'Test impact',
        'benefits' => ['Trackside branding'],
        'cta_label' => 'Inquire',
        'cta_link' => 'https://example.com/partnership',
        'is_highlighted' => true,
        'sort_order' => 1,
    ]);

    $this->get(RaceEventResource::getUrl('index'))->assertOk();
    $this->get(PartnerResource::getUrl('index'))->assertOk();
    $this->get(PartnershipTierResource::getUrl('index'))->assertOk();
});

it('loads season admin pages and shows related record managers', function (): void {
    $season = Season::query()->create([
        'year' => 2026,
        'slug' => '2026-season',
        'title' => '2026 Season',
        'is_active' => true,
    ]);

    $this->get(SeasonResource::getUrl('index'))->assertOk();
    $this->get(SeasonResource::getUrl('edit', ['record' => $season]))->assertOk();

    Livewire::test(EditSeason::class, ['record' => $season->getRouteKey()])
        ->assertSuccessful()
        ->assertSee('Race events')
        ->assertSee('Standings')
        ->assertSee('Season contenders');
});

it('loads race event edit with results relation manager', function (): void {
    $season = Season::query()->create([
        'year' => 2025,
        'slug' => '2025-season',
        'title' => '2025 Season',
        'is_active' => false,
    ]);

    $event = RaceEvent::query()->create([
        'season_id' => $season->getKey(),
        'event_code' => 'R01',
        'title' => 'Round 1',
        'date_display' => 'January',
        'starts_at' => now(),
        'ends_at' => null,
        'venue' => 'Test Circuit',
        'country' => 'UK',
        'rounds' => '3',
        'description' => 'Test event description.',
        'highlight' => null,
        'is_international' => false,
        'feature_link' => null,
        'sort_order' => 1,
    ]);

    $response = $this->get(RaceEventResource::getUrl('edit', ['record' => $event]));

    $response->assertOk();
    $response->assertSee('ResultsRelationManager');
});

it('loads driver edit with standings, race results, and contender managers', function (): void {
    $driver = Driver::query()->create([
        'slug' => 'test-driver',
        'name' => 'Test Driver',
        'sort_order' => 1,
    ]);

    $this->get(DriverResource::getUrl('edit', ['record' => $driver]))->assertOk();

    Livewire::test(EditDriver::class, ['record' => $driver->getRouteKey()])
        ->assertSuccessful()
        ->assertSee('Championship standings')
        ->assertSee('Race results')
        ->assertSee('Season contenders');
});

it('loads vehicle edit with specifications manager', function (): void {
    $vehicle = Vehicle::query()->create([
        'slug' => 'test-truck',
        'name' => 'Test Truck',
        'racing_number' => '7',
    ]);

    $this->get(VehicleResource::getUrl('edit', ['record' => $vehicle]))->assertOk();

    Livewire::test(EditVehicle::class, ['record' => $vehicle->getRouteKey()])
        ->assertSuccessful()
        ->assertSee('Specifications');
});

it('renders standings list with filters and seeded row content', function (): void {
    $season = Season::query()->create([
        'year' => 2024,
        'slug' => '2024-season',
        'title' => '2024 Season',
        'is_active' => true,
    ]);

    $driver = Driver::query()->create([
        'slug' => 'standing-driver',
        'name' => 'Standing Driver',
        'sort_order' => 2,
    ]);

    Standing::query()->create([
        'season_id' => $season->getKey(),
        'driver_id' => $driver->getKey(),
        'rank' => 1,
        'points' => 100,
        'division' => 'BTRC Division 1',
        'status' => 'final',
    ]);

    $this->get(StandingResource::getUrl('index'))->assertOk();

    Livewire::test(ListStandings::class)
        ->assertSuccessful()
        ->assertSee('Standing Driver')
        ->filterTable('division', 'BTRC Division 1')
        ->assertSee('Standing Driver');
});

it('can save an edited standing row', function (): void {
    $season = Season::query()->create([
        'year' => 2025,
        'slug' => '2025-season',
        'title' => '2025 Season',
        'is_active' => true,
    ]);

    $driver = Driver::query()->create([
        'slug' => 'editable-standing-driver',
        'name' => 'Editable Standing Driver',
        'sort_order' => 3,
    ]);

    $standing = Standing::query()->create([
        'season_id' => $season->getKey(),
        'driver_id' => $driver->getKey(),
        'rank' => 2,
        'points' => 50,
        'division' => 'BTRC Division 1',
        'status' => 'final',
    ]);

    Livewire::test(EditStanding::class, ['record' => $standing->getKey()])
        ->fillForm([
            'points' => 55,
        ])
        ->call('save')
        ->assertHasNoFormErrors();

    expect($standing->fresh()->points)->toBe(55);
});

it('rejects creating a video gallery item without an embed URL', function (): void {
    Livewire::test(CreateMediaAsset::class)
        ->set('data', [
            'media_type' => 'video',
            'title' => 'No URL reel',
            'slug' => 'no-url-reel-'.uniqid(),
            'alt' => null,
            'path' => null,
            'url' => null,
            'category' => 'gallery',
            'featured' => false,
            'sort_order' => 0,
            'caption' => null,
            'taken_at' => null,
            'season_id' => null,
            'tags' => [],
        ])
        ->call('create')
        ->assertHasErrors(['data.url']);
});

it('rejects non-embed YouTube URLs for featured reel videos', function (): void {
    Livewire::test(CreateMediaAsset::class)
        ->set('data', [
            'media_type' => 'video',
            'title' => 'Bad reel',
            'slug' => 'bad-reel-'.uniqid(),
            'alt' => 'Alt',
            'path' => null,
            'url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'category' => 'gallery',
            'featured' => false,
            'sort_order' => 1,
            'caption' => null,
            'taken_at' => null,
            'season_id' => null,
            'tags' => [],
        ])
        ->call('create')
        ->assertHasErrors(['data.url']);
});

it('loads gallery media filament admin index and edit screens', function (): void {
    $season = Season::query()->create([
        'year' => 2028,
        'slug' => '2028-btrc',
        'title' => '2028 British Truck Racing Championship',
        'is_active' => false,
    ]);

    $tag = Tag::query()->create([
        'name' => 'Fixture Tag',
        'slug' => 'fixture-tag',
    ]);

    $asset = MediaAsset::query()->create([
        'slug' => 'fixture-gallery',
        'title' => 'Fixture shot',
        'alt' => 'Fixture alt',
        'path' => 'media/gallery/fixture.webp',
        'media_type' => 'image',
        'category' => 'track',
        'featured' => false,
        'sort_order' => 10,
        'season_id' => $season->getKey(),
    ]);

    $asset->tags()->sync([$tag->getKey()]);

    $this->get(MediaAssetResource::getUrl('index'))->assertOk();
    $this->get(MediaAssetResource::getUrl('edit', ['record' => $asset]))->assertOk();
});
