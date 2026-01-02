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
    request()->session()->forget('filament');
    
    return redirect('/')->withHeaders([
        'Cache-Control' => 'no-cache, no-store, max-age=0, must-revalidate',
        'Pragma' => 'no-cache',
        'Expires' => '0',
        'Clear-Site-Data' => '"cache", "cookies", "storage"'
    ]);
})->name('filament.logout')->middleware('web');

require __DIR__.'/auth.php';