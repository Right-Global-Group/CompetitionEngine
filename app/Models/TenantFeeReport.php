<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantFeeReport extends Model
{
    protected $fillable = [
        'tenant_key',
        'year',
        'month',
        'scratchy_only_count',
        'other_count',
        'subtotal',
        'vat',
        'total',
        'is_paid',
        'paid_at',
        'reported_at',
    ];

    protected $casts = [
        'is_paid'     => 'boolean',
        'paid_at'     => 'datetime',
        'reported_at' => 'datetime',
        'subtotal'    => 'decimal:2',
        'vat'         => 'decimal:2',
        'total'       => 'decimal:2',
    ];

    public function markPaid(): void
    {
        $this->update(['is_paid' => true, 'paid_at' => now()]);
    }

    public function getMonthLabelAttribute(): string
    {
        return \Carbon\Carbon::create($this->year, $this->month, 1)->format('M Y');
    }
}
