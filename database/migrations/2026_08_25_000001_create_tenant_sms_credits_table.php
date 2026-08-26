<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenant_sms_credits', function (Blueprint $table) {
            $table->id();
            // One row per tenant, upserted on every report - the unique key is
            // both the write path (updateOrCreate) and the only lookup.
            $table->string('tenant_key', 100)->unique();
            $table->decimal('balance', 10, 4)->nullable();
            $table->decimal('portal_balance', 10, 4)->nullable();
            $table->decimal('cost_per_part', 8, 4)->nullable();
            $table->timestamp('anchor_at')->nullable();
            $table->timestamp('reported_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenant_sms_credits');
    }
};
