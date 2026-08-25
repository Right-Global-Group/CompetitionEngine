<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantSmsCredit extends Model
{
    protected $fillable = [
        'tenant_key',
        'balance',
        'portal_balance',
        'cost_per_part',
        'anchor_at',
        'reported_at',
    ];

    protected $casts = [
        'balance'        => 'decimal:4',
        'portal_balance' => 'decimal:4',
        'cost_per_part'  => 'decimal:4',
        'anchor_at'      => 'datetime',
        'reported_at'    => 'datetime',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_key', 'tenant_key');
    }

    /**
     * Rough sends remaining at one part per message; null when either
     * figure is missing.
     */
    public function estimatedMessagesLeft(): ?int
    {
        if ($this->balance === null || !$this->cost_per_part || (float) $this->cost_per_part <= 0) {
            return null;
        }

        return max(0, (int) floor((float) $this->balance / (float) $this->cost_per_part));
    }
}
