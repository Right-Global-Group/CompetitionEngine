<?php

namespace App\Http\Controllers;

use App\Services\ChangelogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ChangelogController extends Controller
{
    public function __construct(private readonly ChangelogService $changelog) {}

    private function isUnlocked(): bool
    {
        return Session::get('changelog_unlocked') === true;
    }

    public function password()
    {
        return Inertia::render('Changelog/Password');
    }

    public function unlock(Request $request)
    {
        $request->validate(['password' => 'required|string']);

        if ($request->password !== config('app.changelog_password')) {
            return back()->withErrors(['password' => 'Incorrect password.']);
        }

        Session::put('changelog_unlocked', true);

        return redirect()->route('changelog');
    }

    public function data(Request $request): JsonResponse
    {
        if (! $this->isUnlocked()) {
            abort(404);
        }

        $year     = $request->integer('year');
        $month    = $request->integer('month');
        $category = $request->string('category')->toString();
        $isAdmin  = auth()->check() && auth()->user()->isAdmin();
    
        $commits  = collect($this->changelog->commits());
        $authored = collect($this->changelog->authored());
    
        // Non-admins only see 'feature' and 'improvement' categories
        // Admins can also filter by 'hub' (authored notices only)
        if ($category === 'hub') {
            // Hub Messages — authored only, admins only
            if (! $isAdmin) abort(403);
            $entries = $authored;
        } else {
            $commits = $commits->reject(fn ($e) => ($e['category'] ?? '') === 'bugfix');

            if ($category && $category !== 'all') {
                $commits = $commits->where('category', $category);
            }

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
            'months'     => $this->changelog->availableMonths('all'),
            'categories' => $this->changelog->categories(),
            'total'      => $entries->count(),
        ])->header('Cache-Control', 'public, max-age=3600');
    }

    public function flush(Request $request): JsonResponse
    {
        $secret = config('services.github.webhook_secret');

        if ($secret && $request->header('X-Webhook-Secret') !== $secret) {
            abort(403);
        }

        $this->changelog->flush();

        return response()->json(['flushed' => true]);
    }
}