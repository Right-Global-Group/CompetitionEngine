<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemoLead extends Model
{
    protected $fillable = [
        'name',
        'business',
        'email',
        'phone',
        'current_platform',
        'monthly_orders',
        'package',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term',
        'gclid',
        'fbclid',
        'landing_variant',
        'page',
        'user_agent',
        'ip_address',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
