<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\Table\TableExtension;
use League\CommonMark\MarkdownConverter;

class DevDocsController extends Controller
{
    private function guardSuperSuperAdmin(): void
    {
        if (!auth()->check() || !auth()->user()->isSuperSuperAdmin()) {
            abort(404);
        }
    }

    private function isUnlocked(): bool
    {
        return Session::get('dev_docs_unlocked') === true;
    }

    private function nav(): array
    {
        return [
            ['title' => 'How to Deploy',       'slug' => 'how-to-deploy'],
            ['title' => 'App Exclusive Setup',  'slug' => 'app-exclusive-setup'],
            ['title' => 'Provisioning Deploy Keys', 'slug' => 'provision-deploy-key'],
        ];
    }

    public function password(Request $request)
    {
        $this->guardSuperSuperAdmin();

        return Inertia::render('DevDocs/Password');
    }

    public function unlock(Request $request)
    {
        $this->guardSuperSuperAdmin();

        $request->validate(['password' => 'required|string']);

        if ($request->password !== config('app.dev_docs_password')) {
            return back()->withErrors(['password' => 'Incorrect password.']);
        }

        Session::put('dev_docs_unlocked', true);

        return redirect()->route('dev-docs.show', ['slug' => 'how-to-deploy']);
    }

    public function show(string $slug)
    {
        $this->guardSuperSuperAdmin();

        if (!$this->isUnlocked()) {
            return redirect()->route('dev-docs.password');
        }

        $html = $this->renderMarkdown("dev/{$slug}.md");

        if ($html === null) {
            abort(404);
        }

        $title = ucwords(str_replace(['-', '_'], ' ', $slug));

        return Inertia::render('DevDocs/Show', [
            'html'  => $html,
            'nav'   => $this->nav(),
            'currentSlug' => $slug,
            'title' => $title,
        ]);
    }

    private function renderMarkdown(string $relativePath): ?string
    {
        $fullPath = resource_path("docs/{$relativePath}");

        if (!file_exists($fullPath)) {
            return null;
        }

        $raw = file_get_contents($fullPath);

        $environment = new Environment([
            'html_input'         => 'allow',
            'allow_unsafe_links' => false,
        ]);
        $environment->addExtension(new CommonMarkCoreExtension());
        $environment->addExtension(new TableExtension());

        $converter = new MarkdownConverter($environment);
        return $converter->convert($raw)->getContent();
    }
}
