<?php

namespace App\Http\Controllers;

use App\Models\ContactSubmission;
use App\Mail\ContactFormSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactSubmissionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Add user agent and IP
        $validated['user_agent'] = $request->userAgent();
        $validated['ip_address'] = $request->ip();

        // Store in database
        $submission = ContactSubmission::create($validated);

        // Send email notification
        try {
            Mail::to('maxdbehrens@gmail.com')
                ->cc('max.behrens@rightglobalgroup.com')
                ->send(new ContactFormSubmitted($submission));
        } catch (\Exception $e) {
            Log::error('Failed to send contact form email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Thank you for contacting us! We\'ll be in touch shortly.',
        ]);
    }
}