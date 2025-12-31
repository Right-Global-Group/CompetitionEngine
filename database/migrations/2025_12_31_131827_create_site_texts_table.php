<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_texts', function (Blueprint $table) {
            $table->id();
            $table->string('section'); // e.g., 'hero', 'stats', 'launch', etc.
            $table->string('key')->unique(); // unique identifier like 'hero.title'
            $table->text('content');
            $table->string('type')->default('text'); // text, heading, paragraph, button
            $table->integer('order')->default(0);
            $table->timestamps();
            
            $table->index(['section', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_texts');
    }
};