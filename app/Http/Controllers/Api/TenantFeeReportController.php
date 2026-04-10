<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\TenantFeeReport;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TenantFeeReportController extends Controller
{
    /**
     * Receive a daily fee report from a tenant server.
     * Upserts the record for that tenant/year/month.
     */
    public function store(Request $request): JsonResponse
    {
        $apiKey = $request->header('X-Hub-Api-Key');
        if (!$apiKey || $apiKey !== config('hub.api_key')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $data = $request->validate([
            'tenant_key'          => 'required|string|max:100',
            'year'                => 'required|integer|min:2020|max:2100',
            'month'               => 'required|integer|min:1|max:12',
            'scratchy_only_count' => 'required|integer|min:0',
            'other_count'         => 'required|integer|min:0',
            'subtotal'            => 'required|numeric|min:0',
            'vat'                 => 'required|numeric|min:0',
            'total'               => 'required|numeric|min:0',
        ]);

        // Auto-register tenant if not already in the registry
        Tenant::firstOrCreate(
            ['tenant_key' => $data['tenant_key']],
            ['name' => $data['tenant_key'], 'is_active' => true]
        );

        TenantFeeReport::updateOrCreate(
            [
                'tenant_key' => $data['tenant_key'],
                'year'       => $data['year'],
                'month'      => $data['month'],
            ],
            [
                'scratchy_only_count' => $data['scratchy_only_count'],
                'other_count'         => $data['other_count'],
                'subtotal'            => $data['subtotal'],
                'vat'                 => $data['vat'],
                'total'               => $data['total'],
                'reported_at'         => now(),
            ]
        );

        return response()->json(['success' => true]);
    }
}
