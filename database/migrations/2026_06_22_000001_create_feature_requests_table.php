<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('feature_requests', function (Blueprint $table) {
            $table->id();
            $table->string('tenant_key', 100)->index();
            $table->string('title');
            $table->text('body');
            $table->enum('category', ['feature', 'improvement', 'bug', 'integration', 'other'])->default('feature');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            // Triage state, managed on the hub portal
            $table->enum('status', ['new', 'under_review', 'planned', 'in_progress', 'completed', 'declined'])->default('new');
            $table->text('admin_notes')->nullable();
            // Who submitted it (optional — captured from the tenant admin)
            $table->string('submitted_by_name')->nullable();
            $table->string('submitted_by_email')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('feature_requests');
    }
};
