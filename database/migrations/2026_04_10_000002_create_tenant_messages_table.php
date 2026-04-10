<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenant_messages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('body');
            $table->enum('type', ['update', 'warning', 'info'])->default('update');
            $table->enum('severity', ['low', 'medium', 'critical'])->default('low');
            $table->enum('category', ['feature', 'improvement', 'bug', 'design', 'licensing', 'general'])->default('general');
            // Targeting: all tenants, or specific ones
            $table->enum('target', ['all', 'specific'])->default('all');
            $table->json('tenant_keys')->nullable(); // e.g. ["ritas","mpcomps"] when target=specific
            // Scheduling
            $table->date('published_at');
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_published')->default(true);
            // Licensing payment tracking
            $table->boolean('is_paid')->default(false);
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['type', 'is_published', 'published_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenant_messages');
    }
};
