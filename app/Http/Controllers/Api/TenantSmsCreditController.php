<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\TenantSmsCredit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TenantSmsCreditController extends Controller
{
    /**
     * Receive an SMS credit snapshot from a tenant server.
     * Upserts the single row for that tenant.
     */
    public function store(Request $request): JsonResponse
    {
        $apiKey = $request->header('X-Hub-Api-Key');
        if (!$apiKey || $apiKey !== config('hub.api_key')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $data = $request->validate([
            'tenant_key'     => 'required|string|max:100',
            'balance'        => 'nullable|numeric',
            'portal_balance' => 'nullable|numeric',
            'cost_per_part'  => 'nullable|numeric|min:0',
            'anchor_at'      => 'nullable|date',
        ]);

        // Auto-register tenant if not already in the registry
        Tenant::firstOrCreate(
            ['tenant_key' => $data['tenant_key']],
            ['name' => $data['tenant_key'], 'is_active' => true]
        );

        TenantSmsCredit::updateOrCreate(
            ['tenant_key' => $data['tenant_key']],
            [
                'balance'        => $data['balance'] ?? null,
                'portal_balance' => $data['portal_balance'] ?? null,
                'cost_per_part'  => $data['cost_per_part'] ?? null,
                'anchor_at'      => $data['anchor_at'] ?? null,
                'reported_at'    => now(),
            ]
        );

        return response()->json(['success' => true]);
    }
}
