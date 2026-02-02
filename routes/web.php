<?php

use App\Http\Controllers\Api\SiteTextController;
use App\Http\Controllers\ProfileController;
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

// Site Text API Routes (public for reading)
Route::prefix('api')->group(function () {
    Route::get('/site-texts', [SiteTextController::class, 'index']);
    Route::get('/site-texts/section/{section}', [SiteTextController::class, 'section']);
    Route::get('/site-texts/{key}', [SiteTextController::class, 'show']);
    
    // Cache clearing requires authentication
    Route::post('/site-texts/clear-cache', [SiteTextController::class, 'clearCache'])
        ->middleware('auth');
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

require __DIR__.'/auth.php';