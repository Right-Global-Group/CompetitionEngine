<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HubUpsellStat;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TenantUpsellStatsController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $apiKey = $request->header('X-Hub-Stats-Key');
        if (!$apiKey || $apiKey !== config('hub.stats_api_key')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $data = $request->validate([
            'tenant_key'           => 'required|string|max:100',
            'avg_uplift_gbp'       => 'required|numeric|min:0',
            'modal_acceptance_pct' => 'required|numeric|min:0|max:100',
            'aov_uplift_pct'       => 'required|numeric|min:0',
            'baseline_aov_gbp'     => 'required|numeric|min:0',
            'upsell_aov_gbp'       => 'required|numeric|min:0',
            'period_end'           => 'required|date',
        ]);

        HubUpsellStat::create($data);

        // Keep only the latest 10 snapshots per tenant
        $oldest = HubUpsellStat::where('tenant_key', $data['tenant_key'])
            ->orderByDesc('id')->skip(10)->first();
        if ($oldest) {
            HubUpsellStat::where('tenant_key', $data['tenant_key'])
                ->where('id', '<=', $oldest->id)->delete();
        }

        return response()->json(['success' => true]);
    }

    public function latest(): JsonResponse
    {
        $stat = HubUpsellStat::orderByDesc('id')->first();
        return response()->json(['stat' => $stat]);
    }
}
