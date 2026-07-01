<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hub_activity_events', function (Blueprint $table) {
            $table->id();
            $table->string('tenant_key', 100)->index();
            $table->string('brand', 100);
            $table->string('icon', 10)->default('🎟️');
            $table->string('verb', 100);
            $table->string('val', 50)->default('');
            $table->string('suffix', 50)->default('');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hub_activity_events');
    }
};
