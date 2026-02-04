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
        // Only create if doesn't exist
        if (!User::where('email', 'info@rightglobalgroup.com')->exists()) {
            User::factory()->create();
        }

        // Create test user (email: test@test.com, password: test)
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