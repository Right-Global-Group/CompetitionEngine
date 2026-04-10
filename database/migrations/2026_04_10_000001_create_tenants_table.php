<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('name');                          // Display name e.g. "Rita's Riches"
            $table->string('tenant_key')->unique();          // Slug used in .env e.g. "ritas"
            $table->string('domain')->nullable();            // e.g. "ritasriches.co.uk"
            $table->string('contact_name')->nullable();
            $table->string('contact_email')->nullable();
            $table->boolean('is_active')->default(true);
            // Licensing
            $table->boolean('licensing_paid')->default(false);
            $table->date('licensing_due_date')->nullable();
            $table->timestamp('licensing_paid_at')->nullable();
            $table->decimal('licensing_amount', 10, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
