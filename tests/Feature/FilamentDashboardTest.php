<?php

declare(strict_types=1);

use App\Filament\Pages\Dashboard;
use App\Models\User;

function filamentDashboardAdmin(): User
{
    return User::factory()->admin()->create();
}

it('loads the custom Filament dashboard', function (): void {
    $this->actingAs(filamentDashboardAdmin());

    $this->get(Dashboard::getUrl())
        ->assertOk()
        ->assertSee('Command center', false)
        ->assertSee('At a glance', false)
        ->assertSee('Inbox activity', false);
});

it('forbids the dashboard for non-panel users', function (): void {
    $this->actingAs(User::factory()->create([
        'email' => 'not-allowed@example.com',
    ]));

    $this->get(Dashboard::getUrl())->assertForbidden();
});
