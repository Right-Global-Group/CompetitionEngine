<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hub_upsell_stats', function (Blueprint $table) {
            $table->id();
            $table->string('tenant_key', 100)->index();
            $table->decimal('avg_uplift_gbp', 8, 2);         // avg uplift across all orders (£23)
            $table->decimal('modal_acceptance_pct', 5, 2);    // % who accept when shown the modal (87)
            $table->decimal('aov_uplift_pct', 5, 2);          // % AOV increase across all orders (38)
            $table->decimal('baseline_aov_gbp', 8, 2);        // avg order without upsell (£42)
            $table->decimal('upsell_aov_gbp', 8, 2);          // avg order when upsell accepted (£65)
            $table->date('period_end');                        // last day of the 7-day window
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hub_upsell_stats');
    }
};
