<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable = [
        'name',
        'tenant_key',
        'domain',
        'contact_name',
        'contact_email',
        'is_active',
        'licensing_paid',
        'licensing_due_date',
        'licensing_paid_at',
        'licensing_amount',
        'notes',
    ];

    protected $casts = [
        'is_active'          => 'boolean',
        'licensing_paid'     => 'boolean',
        'licensing_due_date' => 'date',
        'licensing_paid_at'  => 'datetime',
        'licensing_amount'   => 'decimal:2',
    ];

    public function markPaid(): void
    {
        $this->update([
            'licensing_paid'    => true,
            'licensing_paid_at' => now(),
        ]);
    }
}
