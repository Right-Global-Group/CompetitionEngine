<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HubUpsellStat extends Model
{
    protected $fillable = [
        'tenant_key', 'avg_uplift_gbp', 'modal_acceptance_pct',
        'aov_uplift_pct', 'baseline_aov_gbp', 'upsell_aov_gbp', 'period_end',
    ];

    protected $casts = ['period_end' => 'date'];
}
