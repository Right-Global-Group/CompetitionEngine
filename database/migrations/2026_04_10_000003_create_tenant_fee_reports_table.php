<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenant_fee_reports', function (Blueprint $table) {
            $table->id();
            $table->string('tenant_key');           // e.g. "ritas"
            $table->unsignedSmallInteger('year');
            $table->unsignedTinyInteger('month');
            $table->unsignedInteger('scratchy_only_count')->default(0);
            $table->unsignedInteger('other_count')->default(0);
            $table->decimal('subtotal', 10, 2)->default(0);
            $table->decimal('vat', 10, 2)->default(0);
            $table->decimal('total', 10, 2)->default(0);
            $table->boolean('is_paid')->default(false);
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('reported_at')->nullable(); // last time tenant pushed data
            $table->timestamps();

            $table->unique(['tenant_key', 'year', 'month']);
            $table->index(['year', 'month']);
            $table->index('is_paid');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenant_fee_reports');
    }
};
