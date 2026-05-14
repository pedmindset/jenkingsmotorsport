<?php

declare(strict_types=1);

use App\Filament\Resources\ContentBlocks\ContentBlockResource;
use App\Filament\Resources\ContentBlocks\Pages\CreateContentBlock;
use App\Models\ContentBlock;
use App\Models\User;
use Database\Seeders\MotorsportContentSeeder;
use Livewire\Livewire;

function contentBlockFilamentUser(): User
{
    return User::factory()->create([
        'email' => 'emmarthurson@gmail.com',
    ]);
}

beforeEach(fn () => $this->actingAs(contentBlockFilamentUser()));

it('shows the structured legacy timeline editor instead of raw JSON', function (): void {
    $this->seed(MotorsportContentSeeder::class);

    $timeline = ContentBlock::query()
        ->where('page_slug', 'legacy')
        ->where('block_key', 'timeline')
        ->firstOrFail();

    $response = $this->get(ContentBlockResource::getUrl('edit', ['record' => $timeline]));

    $response->assertOk();
    $response->assertSee('Legacy storyline timeline', false);
    $response->assertDontSee('Payload JSON', false);
});

it('falls back to JSON for unknown page and block combinations', function (): void {
    $block = ContentBlock::query()->create([
        'page_slug' => 'custom',
        'block_key' => 'hero_intro',
        'sort_order' => 1,
        'payload' => [
            'heading' => 'Test',
        ],
    ]);

    $response = $this->get(ContentBlockResource::getUrl('edit', ['record' => $block]));

    $response->assertOk();
    $response->assertSee('Payload JSON', false);
});

it('prevents creating a duplicate page_slug and block_key combination', function (): void {
    $this->seed(MotorsportContentSeeder::class);

    $before = ContentBlock::query()->count();

    Livewire::test(CreateContentBlock::class)
        ->set('data', [
            'page_slug' => 'legacy',
            'block_key' => 'timeline',
            'sort_order' => 50,
            'payload' => ['sections' => []],
        ])
        ->call('create')
        ->assertHasErrors(['data.block_key']);

    expect(ContentBlock::query()->count())->toBe($before);
});

it('rejects invalid json for unstructured blocks', function (): void {
    Livewire::test(CreateContentBlock::class)
        ->set('data', [
            'page_slug' => 'novel',
            'block_key' => 'custom_block',
            'sort_order' => 0,
            'json_payload_fallback' => '{"a":',
        ])
        ->call('create')
        ->assertHasErrors(['data.json_payload_fallback']);
});
