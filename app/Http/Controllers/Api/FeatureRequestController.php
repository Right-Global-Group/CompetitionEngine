<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeatureRequest;
use App\Models\Tenant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FeatureRequestController extends Controller
{
    /**
     * Receive a feature / improvement request from a tenant server.
     * Authenticated by the shared X-Hub-Api-Key header (same as the
     * messages + fee-report endpoints).
     */
    public function store(Request $request): JsonResponse
    {
        $apiKey = $request->header('X-Hub-Api-Key');
        if (!$apiKey || $apiKey !== config('hub.api_key')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $data = $request->validate([
            'tenant_key'         => 'required|string|max:100',
            'title'              => 'required|string|max:255',
            'body'               => 'required|string|max:5000',
            'category'           => 'required|string|in:feature,improvement,bug,integration,other',
            'priority'           => 'nullable|string|in:low,medium,high',
            'submitted_by_name'  => 'nullable|string|max:255',
            'submitted_by_email' => 'nullable|email|max:255',
        ]);

        // Auto-register the tenant if it's not already in the registry
        Tenant::firstOrCreate(
            ['tenant_key' => $data['tenant_key']],
            ['name' => $data['tenant_key'], 'is_active' => true]
        );

        FeatureRequest::create([
            'tenant_key'         => $data['tenant_key'],
            'title'              => $data['title'],
            'body'               => $data['body'],
            'category'           => $data['category'],
            'priority'           => $data['priority'] ?? 'medium',
            'status'             => 'new',
            'submitted_by_name'  => $data['submitted_by_name'] ?? null,
            'submitted_by_email' => $data['submitted_by_email'] ?? null,
            'user_agent'         => $request->userAgent(),
            'ip_address'         => $request->ip(),
        ]);

        return response()->json(['success' => true]);
    }
}
