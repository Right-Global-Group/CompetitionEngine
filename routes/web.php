<?php

use App\Http\Controllers\Api\SiteTextController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
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

// Dashboard route (requires authentication)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

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

require __DIR__.'/auth.php';