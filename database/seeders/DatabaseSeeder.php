<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create the main RGG user (production & all environments)
        User::factory()->create();

        // Create test user with password 'test'
        User::firstOrCreate(
            ['email' => 'test@test.com'],
            [
                'name' => 'Test User',
                'email' => 'test@test.com',
                'password' => bcrypt('test'),
                'email_verified_at' => now(),
            ]
        );

        // Seed site texts (always needed)
        $this->call([
            SiteTextSeeder::class,
        ]);
    }
}