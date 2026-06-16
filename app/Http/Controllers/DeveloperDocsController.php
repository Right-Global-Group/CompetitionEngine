<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class DeveloperDocsController extends Controller
{
    private function isSuperSuperAdmin(): bool
    {
        return auth()->check() && auth()->user()->isSuperSuperAdmin();
    }

    private function isUnlocked(): bool
    {
        return Session::get('developer_docs_unlocked') === true;
    }

    public function password()
    {
        if (! $this->isSuperSuperAdmin()) {
            abort(404);
        }

        return Inertia::render('DeveloperDocs/Password');
    }

    public function unlock(Request $request)
    {
        if (! $this->isSuperSuperAdmin()) {
            abort(404);
        }

        $request->validate(['password' => 'required|string']);

        if ($request->password !== config('app.developer_docs_password')) {
            return back()->withErrors(['password' => 'Incorrect password.']);
        }

        Session::put('developer_docs_unlocked', true);

        return redirect()->route('developer-docs.index');
    }

    public function index()
    {
        if (! $this->isSuperSuperAdmin() || ! $this->isUnlocked()) {
            abort(404);
        }

        return Inertia::render('DeveloperDocs/Show');
    }
}
