<?php

declare(strict_types=1);

use App\Filament\Resources\MediaAssets\Pages\EditMediaAsset;
use App\Filament\Resources\Partners\Pages\EditPartner;
use App\Filament\Support\PublicMediaFileUpload;
use App\Models\MediaAsset;
use App\Models\Partner;
use App\Models\User;
use Filament\Forms\Components\FileUpload;
use Livewire\Livewire;

it('resolves legacy image paths for Filament upload previews', function (): void {
    $preview = PublicMediaFileUpload::resolveUploadedFile(
        FileUpload::make('logo_path')->disk('public'),
        '/images/LKQ_white.webp',
        null,
    );

    expect($preview)->not->toBeNull()
        ->and($preview['url'])->toContain('/images/LKQ_white.webp');
});

it('keeps legacy gallery paths hydrated on the edit form', function (): void {
    $admin = User::factory()->admin()->create();
    $this->actingAs($admin);

    $asset = MediaAsset::query()->create([
        'slug' => 'gallery-preview-hydration',
        'title' => 'Preview hydration',
        'alt' => 'Preview hydration',
        'path' => '/images/dave_signing_autograph.jpg',
        'media_type' => 'image',
        'category' => 'legacy',
        'featured' => false,
        'sort_order' => 1,
    ]);

    Livewire::test(EditMediaAsset::class, ['record' => $asset->getKey()])
        ->assertFormSet([
            'path' => '/images/dave_signing_autograph.jpg',
        ]);
});

it('keeps legacy partner logo paths hydrated on the edit form', function (): void {
    $admin = User::factory()->admin()->create();
    $this->actingAs($admin);

    $partner = Partner::query()->create([
        'slug' => 'preview-partner',
        'name' => 'Preview Partner',
        'role' => 'Partner',
        'description' => 'Description',
        'technical_fact' => 'Fact',
        'logo_path' => '/images/LKQ_white.webp',
        'image_path' => '/images/team_working_on_truck.jpg',
        'url' => 'https://example.com',
        'theme' => null,
        'is_active' => true,
        'sort_order' => 1,
    ]);

    Livewire::test(EditPartner::class, ['record' => $partner->getKey()])
        ->assertFormSet([
            'logo_path' => '/images/LKQ_white.webp',
            'image_path' => '/images/team_working_on_truck.jpg',
        ]);
});
