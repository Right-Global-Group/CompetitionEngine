<?php

use App\Http\Controllers\Api\FeatureRequestController;
use App\Http\Controllers\Api\SiteTextController;
use App\Http\Controllers\Api\TenantFeeReportController;
use App\Http\Controllers\Api\TenantMessagesController;
use App\Http\Controllers\ChangelogController;
use App\Http\Controllers\ContactSubmissionController;
use App\Http\Controllers\DevDocsController;
use App\Http\Controllers\DocumentationController;
use App\Http\Controllers\ProfileController;
use App\Models\BlogPost;
use App\Services\ChangelogService;
use Illuminate\Support\Facades\Cache;
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

Route::get('/changelog', [ChangelogController::class, 'index'])->name('changelog');

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

    // Feature / improvement requests — tenant admins POST suggestions here
    Route::post('/feature-requests', [FeatureRequestController::class, 'store']);
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

// Developer Docs — super-super-admin only, password-protected
Route::get('/dev-docs/unlock', [DevDocsController::class, 'password'])->name('dev-docs.password');
Route::post('/dev-docs/unlock', [DevDocsController::class, 'unlock'])->name('dev-docs.unlock');
Route::get('/dev-docs/{slug}', [DevDocsController::class, 'show'])->name('dev-docs.show');

// Docs — password wall (these routes are always visible so the form works)
Route::get('/docs/unlock', [DocumentationController::class, 'password'])->name('docs.password');
Route::post('/docs/unlock', [DocumentationController::class, 'unlock'])->name('docs.unlock');

// Docs content — returns 404 if not unlocked (handled inside controller)
Route::get('/docs', [DocumentationController::class, 'index'])->name('docs.index');
Route::get('/docs/search', [DocumentationController::class, 'search'])->name('docs.search');
Route::get('/docs/{section}/{slug}', [DocumentationController::class, 'show'])->name('docs.show');

// Changelog unlock POST — Folio handles the GET, this handles the form submission
Route::post('/changelog/unlock', function (Illuminate\Http\Request $request) {
    $request->validate(['password' => 'required|string']);

    if ($request->password !== config('app.changelog_password')) {
        return back()->withErrors(['password' => 'Incorrect password.']);
    }

    Illuminate\Support\Facades\Session::put('changelog_unlocked', true);

    return redirect()->route('changelog');
})->name('changelog.unlock');

// Changelog data API — returns JSON, not a page, so stays here
Route::get('/changelog/data', function (Illuminate\Http\Request $request) {
    if (Illuminate\Support\Facades\Session::get('changelog_unlocked') !== true) abort(404);

    $year     = $request->integer('year');
    $month    = $request->integer('month');
    $category = $request->string('category')->toString();
    $isAdmin  = auth()->check() && auth()->user()->isAdmin();
    $service  = app(ChangelogService::class);

    $commits  = collect($service->commits());
    $authored = collect($service->authored());

    if ($category === 'hub') {
        if (! $isAdmin) abort(403);
        $entries = $authored;
    } else {
        $commits = $commits->reject(fn ($e) => ($e['category'] ?? '') === 'bugfix');
        if ($category && $category !== 'all') $commits = $commits->where('category', $category);
        if (! $isAdmin) {
            $commits = $commits->whereIn('category', ['feature', 'improvement', 'design'])
                               ->reject(fn ($e) => in_array('admin', $e['tenants'] ?? []));
        }
        $entries = $commits->concat($authored)->sortByDesc('timestamp');
    }

    if ($year)  $entries = $entries->where('year',  $year);
    if ($month) $entries = $entries->where('month', $month);

    return response()->json([
        'entries'    => $entries->values(),
        'months'     => $service->availableMonths('all'),
        'categories' => $service->categories(),
        'total'      => $entries->count(),
    ])->header('Cache-Control', 'public, max-age=3600');
})->name('changelog.data');

// Changelog cache flush — webhook endpoint
Route::post('/changelog/flush', function (Illuminate\Http\Request $request) {
    $secret = config('services.github.webhook_secret');
    if ($secret && $request->header('X-Webhook-Secret') !== $secret) abort(403);
    app(ChangelogService::class)->flush();
    return response()->json(['flushed' => true]);
})->name('changelog.flush');

// Blog
Route::get('/blog', function () {
    $posts = Cache::remember('blog:list', 3600, fn () =>
        BlogPost::published()
            ->orderByDesc('published_at')
            ->select('id', 'title', 'slug', 'excerpt', 'published_at')
            ->get()
    );
    return Inertia::render('Blog', ['posts' => $posts]);
})->name('blog');

Route::get('/blog/{slug}', function (string $slug) {
    $post = Cache::remember("blog:post:{$slug}", 3600, fn () =>
        BlogPost::published()->where('slug', $slug)->firstOrFail()
    );
    return Inertia::render('BlogShow', ['post' => $post]);
})->name('blog.show');

require __DIR__.'/auth.php';