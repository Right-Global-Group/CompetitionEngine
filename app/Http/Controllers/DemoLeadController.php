<?php

namespace App\Http\Controllers;

use App\Mail\DemoLeadReceived;
use App\Models\DemoLead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

/**
 * Homepage "Book my 30-min demo" form.
 */
class DemoLeadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'business' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'current_platform' => 'required|string|max:100',
            'monthly_orders' => 'required|string|max:100',
            'package' => 'nullable|string|max:255',
            'utm_source' => 'nullable|string|max:255',
            'utm_medium' => 'nullable|string|max:255',
            'utm_campaign' => 'nullable|string|max:255',
            'utm_content' => 'nullable|string|max:255',
            'utm_term' => 'nullable|string|max:255',
            'gclid' => 'nullable|string|max:255',
            'fbclid' => 'nullable|string|max:255',
            'landing_variant' => 'nullable|string|max:10',
            'page' => 'nullable|string|max:2000',
        ]);

        $validated['user_agent'] = substr((string) $request->userAgent(), 0, 255);
        $validated['ip_address'] = $request->ip();

        $lead = DemoLead::create($validated);

        try {
            Mail::to('contact@compengine.io')->send(new DemoLeadReceived($lead));
        } catch (\Throwable $e) {
            Log::error('Failed to send demo lead email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Thanks — pick a time and we will see you on the demo.',
        ]);
    }
}
