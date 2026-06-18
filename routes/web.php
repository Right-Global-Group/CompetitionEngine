<?php

use App\Http\Controllers\Api\SiteTextController;
use App\Http\Controllers\Api\TenantFeeReportController;
use App\Http\Controllers\Api\TenantMessagesController;
use App\Http\Controllers\ContactSubmissionController;
use App\Http\Controllers\DocumentationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChangelogController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/features', function () {
    return Inertia::render('Features');
})->name('features');

Route::get('/comparison', function () {
    return Inertia::render('Comparison');
})->name('comparison');

Route::get('/pricing', function () {
    return Inertia::render('Pricing');
})->name('pricing');

Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// API Routes
Route::prefix('api')->group(function () {
    // Site Text API Routes (public for reading)
    Route::get('/site-texts', [SiteTextController::class, 'index']);
    Route::get('/site-texts/section/{section}', [SiteTextController::class, 'section']);
    Route::get('/site-texts/{key}', [SiteTextController::class, 'show']);
    
    // Cache clearing requires authentication
    Route::post('/site-texts/clear-cache', [SiteTextController::class, 'clearCache'])
        ->middleware('auth');
    
    // Contact Form Submission (public)
    Route::post('/contact', [ContactSubmissionController::class, 'store']);

    // Hub API — tenant servers fetch messages/warnings using X-Hub-Api-Key header
    Route::get('/messages', [TenantMessagesController::class, 'index']);

    // Tenant fee reporting — tenants POST daily fee totals here
    Route::post('/fees/report', [TenantFeeReportController::class, 'store']);
});

// Custom Filament logout route
Route::post('/filament-logout', function () {
    Auth::guard('web')->logout();
    
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    
    // Clear the intended URL so login doesn't redirect back to /admin
    request()->session()->forget('url.intended');
    
    return redirect('/')->with('status', 'Logged out successfully');
})->name('filament.logout')->middleware('web');

// Docs — password wall (these routes are always visible so the form works)
Route::get('/docs/unlock', [DocumentationController::class, 'password'])->name('docs.password');
Route::post('/docs/unlock', [DocumentationController::class, 'unlock'])->name('docs.unlock');

// Docs content — returns 404 if not unlocked (handled inside controller)
Route::get('/docs', [DocumentationController::class, 'index'])->name('docs.index');
Route::get('/docs/search', [DocumentationController::class, 'search'])->name('docs.search');
Route::get('/docs/{section}/{slug}', [DocumentationController::class, 'show'])->name('docs.show');

// Changelog — password wall
Route::get('/changelog/unlock',  [ChangelogController::class, 'password'])->name('changelog.password');
Route::post('/changelog/unlock', [ChangelogController::class, 'unlock'])->name('changelog.unlock');

// Changelog content — returns 404 if not unlocked (handled inside controller)
Route::get('/changelog/data',   [ChangelogController::class, 'data'])->name('changelog.data');
Route::post('/changelog/flush', [ChangelogController::class, 'flush'])->name('changelog.flush');

require __DIR__.'/auth.php';