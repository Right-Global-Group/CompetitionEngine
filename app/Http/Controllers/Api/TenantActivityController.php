<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HubActivityEvent;
use App\Models\Tenant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TenantActivityController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $apiKey = $request->header('X-Hub-Stats-Key');
        if (!$apiKey || $apiKey !== config('hub.stats_api_key')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $data = $request->validate([
            'tenant_key' => 'required|string|max:100',
            'icon'       => 'required|string|max:10',
            'verb'       => 'required|string|max:100',
            'val'        => 'nullable|string|max:50',
            'suffix'     => 'nullable|string|max:50',
        ]);

        $tenant = Tenant::where('tenant_key', $data['tenant_key'])->first();
        $brand  = $tenant?->name ?? $data['tenant_key'];

        HubActivityEvent::create([
            'tenant_key' => $data['tenant_key'],
            'brand'      => strtoupper($brand),
            'icon'       => $data['icon'],
            'verb'       => $data['verb'],
            'val'        => $data['val'] ?? '',
            'suffix'     => $data['suffix'] ?? '',
        ]);

        // Keep only the latest 100 events total
        $oldest = HubActivityEvent::orderByDesc('id')->skip(100)->first();
        if ($oldest) {
            HubActivityEvent::where('id', '<=', $oldest->id)->delete();
        }

        return response()->json(['success' => true]);
    }

    public function recent(): JsonResponse
    {
        $events = HubActivityEvent::orderByDesc('id')
            ->limit(15)
            ->get(['icon', 'verb', 'val', 'suffix', 'brand'])
            ->toArray();

        return response()->json(['events' => $events]);
    }
}
