<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeatureRequest extends Model
{
    protected $fillable = [
        'tenant_key',
        'title',
        'body',
        'category',
        'priority',
        'status',
        'admin_notes',
        'submitted_by_name',
        'submitted_by_email',
        'user_agent',
        'ip_address',
    ];

    public const STATUSES = [
        'new'         => 'New',
        'under_review'=> 'Under Review',
        'planned'     => 'Planned',
        'in_progress' => 'In Progress',
        'completed'   => 'Completed',
        'declined'    => 'Declined',
    ];

    public const CATEGORIES = [
        'feature'     => 'New Feature',
        'improvement' => 'Improvement',
        'bug'         => 'Bug',
        'integration' => 'Integration',
        'other'       => 'Other',
    ];

    public const PRIORITIES = [
        'low'    => 'Low',
        'medium' => 'Medium',
        'high'   => 'High',
    ];
}
