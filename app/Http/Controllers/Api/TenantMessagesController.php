<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TenantMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TenantMessagesController extends Controller
{
    /**
     * Return active messages for a tenant.
     * Requires X-Hub-Api-Key header matching HUB_API_KEY env var.
     *
     * Query params:
     *   tenant    — tenant key slug (e.g. "ritas")
     *   type      — filter by type: "update", "warning", "info" (optional)
     *   start_date / end_date — date range filter on published_at (optional)
     */
    public function index(Request $request): JsonResponse
    {
        // API key validation
        $apiKey = $request->header('X-Hub-Api-Key');
        if (!$apiKey || $apiKey !== config('hub.api_key')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $tenantKey = $request->input('tenant', '');
        $type      = $request->input('type');
        $startDate = $request->input('start_date');
        $endDate   = $request->input('end_date');

        $query = TenantMessage::active();

        if ($tenantKey) {
            $query->forTenant($tenantKey);
        }

        if ($type && in_array($type, ['update', 'warning', 'info'])) {
            $query->ofType($type);
        }

        if ($startDate) {
            $query->where('published_at', '>=', $startDate);
        }
        if ($endDate) {
            $query->where('published_at', '<=', $endDate);
        }

        $messages = $query->orderByDesc('published_at')->orderByDesc('id')->get([
            'id', 'title', 'body', 'type', 'severity', 'category',
            'published_at', 'expires_at', 'is_paid',
        ]);

        return response()->json($messages);
    }
}
