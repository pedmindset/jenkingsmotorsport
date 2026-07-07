<?php

declare(strict_types=1);

use App\Filament\Exports\NewsletterSubscriptionExporter;
use App\Filament\Resources\NewsletterSubscriptions\NewsletterSubscriptionResource;
use App\Filament\Resources\NewsletterSubscriptions\Pages\ListNewsletterSubscriptions;
use App\Models\NewsletterSubscription;
use App\Models\User;
use Filament\Actions\Exports\Models\Export;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;

beforeEach(function (): void {
    $this->actingAs(User::factory()->admin()->create());
});

it('shows the download excel action on the newsletter list page', function (): void {
    $this->get(NewsletterSubscriptionResource::getUrl('index'))
        ->assertOk()
        ->assertSee('Download Excel');
});

it('defines export columns for the newsletter list', function (): void {
    $columns = NewsletterSubscriptionExporter::getColumns();

    expect(collect($columns)->map->getName()->all())
        ->toBe(['email', 'is_active', 'subscribed_at', 'created_at']);
});

it('exports newsletter subscriptions to an excel file', function (): void {
    Storage::fake('local');

    NewsletterSubscription::query()->create([
        'email' => 'fan@example.com',
        'is_active' => true,
        'subscribed_at' => now(),
    ]);

    Livewire::test(ListNewsletterSubscriptions::class)
        ->callAction('export', data: [
            'columnMap' => [
                'email' => ['isEnabled' => true, 'label' => 'Email address'],
                'is_active' => ['isEnabled' => true, 'label' => 'Active'],
                'subscribed_at' => ['isEnabled' => true, 'label' => 'Subscribed at'],
                'created_at' => ['isEnabled' => true, 'label' => 'Created at'],
            ],
        ])
        ->assertNotified();

    $export = Export::query()->first();

    expect($export)->not->toBeNull()
        ->and($export->successful_rows)->toBe(1)
        ->and($export->completed_at)->not->toBeNull();

    Storage::disk($export->file_disk)->assertExists(
        "filament_exports/{$export->id}/{$export->file_name}.xlsx",
    );
});
