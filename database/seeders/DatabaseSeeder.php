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

        // Seed site texts (always needed)
        $this->call([
            SiteTextSeeder::class,
        ]);
    }
}