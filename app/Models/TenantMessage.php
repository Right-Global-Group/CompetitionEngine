<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class TenantMessage extends Model
{
    protected $fillable = [
        'title',
        'body',
        'type',
        'severity',
        'category',
        'target',
        'tenant_keys',
        'published_at',
        'expires_at',
        'is_published',
        'is_paid',
        'paid_at',
        'show_in_changelog',
    ];

    protected $casts = [
        'tenant_keys'  => 'array',
        'published_at' => 'date',
        'expires_at'   => 'datetime',
        'is_published' => 'boolean',
        'is_paid'      => 'boolean',
        'paid_at'      => 'datetime',
        'show_in_changelog' => 'boolean',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query
            ->where('is_published', true)
            ->where('published_at', '<=', now())
            ->where(function ($q) {
                $q->whereNull('expires_at')->orWhere('expires_at', '>', now());
            });
    }

    public function scopeForTenant(Builder $query, string $tenantKey): Builder
    {
        return $query->where(function ($q) use ($tenantKey) {
            $q->where('target', 'all')
              ->orWhere(function ($q2) use ($tenantKey) {
                  $q2->where('target', 'specific')
                     ->whereJsonContains('tenant_keys', $tenantKey);
              });
        });
    }

    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }
}
