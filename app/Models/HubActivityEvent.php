<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HubActivityEvent extends Model
{
    protected $fillable = ['tenant_key', 'brand', 'icon', 'verb', 'val', 'suffix'];
}
