<?php

declare(strict_types=1);

use App\Filament\Resources\MediaAssets\Pages\EditMediaAsset;
use App\Filament\Resources\Users\Pages\CreateUser;
use App\Filament\Resources\Users\Pages\ListUsers;
use App\Filament\Resources\Users\UserResource;
use App\Models\MediaAsset;
use App\Models\User;
use Livewire\Livewire;

function userResourceAdmin(): User
{
    return User::factory()->admin()->create();
}

beforeEach(function (): void {
    $this->actingAs(userResourceAdmin());
});

it('lists admin users in Filament', function (): void {
    User::factory()->admin()->create(['name' => 'Panel Admin', 'email' => 'panel-admin@example.com']);

    $this->get(UserResource::getUrl('index'))
        ->assertOk()
        ->assertSee('Panel Admin');
});

it('creates an admin user with panel access', function (): void {
    Livewire::test(CreateUser::class)
        ->fillForm([
            'name' => 'New Admin',
            'email' => 'new-admin@example.com',
            'password' => 'secret-password',
            'password_confirmation' => 'secret-password',
            'is_admin' => true,
        ])
        ->call('create')
        ->assertHasNoFormErrors();

    $user = User::query()->where('email', 'new-admin@example.com')->first();

    expect($user)->not->toBeNull()
        ->and($user->is_admin)->toBeTrue()
        ->and($user->canAccessFilamentPanel())->toBeTrue();
});

it('shows the current gallery image on the edit screen', function (): void {
    $asset = MediaAsset::query()->create([
        'slug' => 'gallery-test-preview',
        'title' => 'Preview test',
        'alt' => 'Preview test',
        'path' => '/images/dave_signing_autograph.jpg',
        'media_type' => 'image',
        'category' => 'legacy',
        'featured' => false,
        'sort_order' => 1,
    ]);

    Livewire::test(EditMediaAsset::class, ['record' => $asset->getKey()])
        ->assertSee('Replace image', false);
});

it('forbids non-admin users from the user resource', function (): void {
    $this->actingAs(User::factory()->create(['email' => 'guest@example.com']));

    $this->get(ListUsers::getUrl())->assertForbidden();
});
