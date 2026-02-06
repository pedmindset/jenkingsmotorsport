<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'emmarthurson@gmail.com'],
            [
                'name' => 'Emmanuel Oduro',
                'password' => Hash::make('decount655.c'),
                'email_verified_at' => now(),
                'two_factor_secret' => null,
                'two_factor_recovery_codes' => null,
                'remember_token' => Str::random(10),
            ]
        );

        // If the user already existed but we want to ensure password is standard for this task
        if (!$user->wasRecentlyCreated) {
            $user->update([
                'password' => Hash::make('decount655.c'),
                'name' => 'Emmanuel Oduro', // Ensure name update if needed
                'email_verified_at' => now(), // Ensure confirmed
            ]);
        }

        $this->command->info('Admin user verified and configured.');
    }
}
