<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\Table\TableExtension;
use League\CommonMark\MarkdownConverter;

class DocumentationController extends Controller
{
    private function isUnlocked(): bool
    {
        return Session::get('documentation_unlocked') === true;
    }

    private function abort404(): never
    {
        abort(404);
    }

    public function password(Request $request)
    {
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            abort(404);
        }
    
        return Inertia::render('Documentation/Password');
    }

    public function unlock(Request $request)
    {
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            abort(404);
        }
    
        $request->validate(['password' => 'required|string']);
    
        if ($request->password !== config('app.documentation_password')) {
            return back()->withErrors(['password' => 'Incorrect password.']);
        }
    
        Session::put('documentation_unlocked', true);
    
        return redirect()->intended(route('docs.index'));
    }

    public function index()
    {
        if (!$this->isUnlocked()) {
            $this->abort404();
        }

        $html = $this->renderMarkdown('documentation-homepage.md');
        $nav = $this->buildNav();

        return Inertia::render('Documentation/Show', [
            'html' => $html,
            'nav' => $nav,
            'currentSlug' => '',
            'title' => 'Help Center',
        ]);
    }

    public function show(string $section, string $slug)
    {
        if (!$this->isUnlocked()) {
            $this->abort404();
        }

        $path = "{$section}/{$slug}.md";
        $html = $this->renderMarkdown($path);

        if ($html === null) {
            abort(404);
        }

        $nav = $this->buildNav();
        $title = $this->titleFromSlug($slug);

        return Inertia::render('Documentation/Show', [
            'html' => $html,
            'nav' => $nav,
            'currentSlug' => "{$section}/{$slug}",
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
        $raw = $this->stripGitbookSyntax($raw);
    
        $environment = new Environment([
            'html_input' => 'allow',
            'allow_unsafe_links' => false,
        ]);
        $environment->addExtension(new CommonMarkCoreExtension());
        $environment->addExtension(new TableExtension());
    
        $converter = new MarkdownConverter($environment);
        return $converter->convert($raw)->getContent();
    }

    private function stripGitbookSyntax(string $markdown): string
    {
        // Remove YAML frontmatter
        $markdown = preg_replace('/\A---\r?\n.*?\r?\n---\r?\n/s', '', $markdown);

        // Convert {% hint style="info" %} ... {% endhint %} to blockquote
        $markdown = preg_replace(
            '/\{%\s*hint\s+style="info"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/m',
            '> **ℹ️ Note**$1',
            $markdown
        );
        $markdown = preg_replace(
            '/\{%\s*hint\s+style="warning"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/m',
            '> **⚠️ Warning**$1',
            $markdown
        );
        $markdown = preg_replace(
            '/\{%\s*hint\s+style="danger"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/m',
            '> **🚫 Important**$1',
            $markdown
        );

        // Convert stepper blocks — just strip the wrapper tags, keep step headings
        $markdown = preg_replace('/\{%\s*stepper\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*endstepper\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*step\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*endstep\s*%\}/', '', $markdown);

        // Strip columns/column tags
        $markdown = preg_replace('/\{%\s*columns?\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*endcolumns?\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*column\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*endcolumn\s*%\}/', '', $markdown);

        // Strip any remaining {% %} tags
        $markdown = preg_replace('/\{%[^%]*%\}/', '', $markdown);

        // Strip GitBook HTML table card syntax (data-view="cards" tables)
        // Just let them render as regular markdown tables
        $markdown = preg_replace('/data-view="[^"]*"/', '', $markdown);
        $markdown = preg_replace('/data-hidden/', '', $markdown);
        $markdown = preg_replace('/data-card-target/', '', $markdown);
        $markdown = preg_replace('/data-type="[^"]*"/', '', $markdown);

        // Remove &#x20; non-breaking spaces used as spacers
        $markdown = str_replace('&#x20;', '', $markdown);

        return trim($markdown);
    }

    private function buildNav(): array
    {
        return [
            [
                'title' => 'Customers',
                'items' => [
                    ['title' => 'Entering Competitions', 'slug' => 'customers/entering-competitions'],
                    ['title' => 'Basket & Checkout', 'slug' => 'customers/basket-and-checkout'],
                    ['title' => 'Your Account', 'slug' => 'customers/your-account'],
                    ['title' => 'Wallet', 'slug' => 'customers/wallet'],
                    ['title' => 'Winning & Prizes', 'slug' => 'customers/winning-and-prizes'],
                    ['title' => 'Safe Play', 'slug' => 'customers/safe-play'],
                    ['title' => 'Free Entry', 'slug' => 'customers/free-entry'],
                    ['title' => 'ID Verification', 'slug' => 'customers/id-verification'],
                    ['title' => 'FAQs', 'slug' => 'customers/faqs'],
                    ['title' => 'Checkout Flow', 'slug' => 'customers/checkout-flow'],
                ],
            ],
            [
                'title' => 'Admin',
                'items' => [
                    ['title' => 'Dashboard', 'slug' => 'admin/dashboard'],
                    ['title' => 'Analytics', 'slug' => 'admin/analytics'],
                    ['title' => 'Managing Competitions', 'slug' => 'admin/managing-competitions'],
                    ['title' => 'Content Management', 'slug' => 'admin/content'],
                    ['title' => 'Users', 'slug' => 'admin/users'],
                    ['title' => 'Orders & Wallets', 'slug' => 'admin/orders-and-wallets'],
                    ['title' => 'Instant Wins', 'slug' => 'admin/instant-wins'],
                    ['title' => 'Winners & Draw', 'slug' => 'admin/winners-and-draw'],
                    ['title' => 'Prize Tracker', 'slug' => 'admin/prize-tracker'],
                    ['title' => 'Funding', 'slug' => 'admin/funding'],
                    ['title' => 'Coupons', 'slug' => 'admin/coupons'],
                    ['title' => 'Settings', 'slug' => 'admin/settings'],
                    ['title' => 'Integrations', 'slug' => 'admin/integrations'],
                ],
            ],
        ];
    }

    private function titleFromSlug(string $slug): string
    {
        return ucwords(str_replace(['-', '_'], ' ', $slug));
    }
}