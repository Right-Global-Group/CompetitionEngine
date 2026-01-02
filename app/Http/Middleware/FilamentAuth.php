<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FilamentAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is not authenticated - redirect to login
        if (!$request->user()) {
            return redirect()->route('login');
        }

        // Check if user is not an admin - show 403 error
        if (!$request->user()->isAdmin()) {
            abort(403, 'Unauthorized access to admin panel.');
        }

        return $next($request);
    }
}