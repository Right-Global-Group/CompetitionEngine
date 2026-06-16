<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
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
        return Inertia::render('Documentation/Password');
    }

    public function unlock(Request $request)
    {
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
        $nav  = $this->buildNav();

        return Inertia::render('Documentation/Show', [
            'html'        => $html,
            'nav'         => $nav,
            'currentSlug' => '',
            'title'       => 'Help Center',
            'isAdmin'       => auth()->check() && auth()->user()->isAdmin(),
            'isSuperSuperAdmin'  => auth()->check() && auth()->user()->isSuperSuperAdmin(),
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

        $nav   = $this->buildNav();
        $title = $this->titleFromSlug($slug);

        return Inertia::render('Documentation/Show', [
            'html'        => $html,
            'nav'         => $nav,
            'currentSlug' => "{$section}/{$slug}",
            'title'       => $title,
            'isAdmin'      => auth()->check() && auth()->user()->isAdmin(),
            'isSuperSuperAdmin' => auth()->check() && auth()->user()->isSuperSuperAdmin(),
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        if (!$this->isUnlocked()) {
            return response()->json([], 403);
        }

        $query = trim($request->input('q', ''));

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $results = [];
        $docsPath = resource_path('docs');
        $terms = preg_split('/\s+/', strtolower($query));

        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($docsPath)
        );

        foreach ($iterator as $file) {
            if ($file->getExtension() !== 'md') {
                continue;
            }

            $relativePath = str_replace($docsPath . DIRECTORY_SEPARATOR, '', $file->getPathname());
            $relativePath = str_replace('\\', '/', $relativePath);
            $slug         = str_replace('.md', '', $relativePath);

            if ($slug === 'documentation-homepage') {
                continue;
            }

            $raw   = file_get_contents($file->getPathname());
            $raw   = $this->stripFrontmatter($raw);
            $raw   = $this->stripGitbookSyntax($raw);
            $plain = $this->stripMarkdown($raw);
            $lower = strtolower($plain);

            // Score: how many search terms appear in the text
            $score = 0;
            foreach ($terms as $term) {
                $score += substr_count($lower, $term);
            }

            if ($score === 0) {
                continue;
            }

            // Title matches score higher
            $title      = $this->extractTitle($raw);
            $titleLower = strtolower($title);
            foreach ($terms as $term) {
                if (str_contains($titleLower, $term)) {
                    $score += 10;
                }
            }

            // Extract a relevant excerpt around the first match
            $excerpt = $this->extractMatchExcerpt($plain, $terms);

            [$section, $page] = $this->parseSlug($slug);

            $results[] = [
                'title'   => $title,
                'slug'    => $slug,
                'section' => $section,
                'page'    => $page,
                'excerpt' => $excerpt,
                'score'   => $score,
            ];
        }

        // Sort by score descending, cap at 8 results
        usort($results, fn($a, $b) => $b['score'] <=> $a['score']);
        $results = array_slice($results, 0, 8);

        return response()->json(array_values($results));
    }

    private function parseSlug(string $slug): array
    {
        $parts = explode('/', $slug, 2);
        return count($parts) === 2 ? $parts : [$parts[0], $parts[0]];
    }

    private function extractTitle(string $markdown): string
    {
        if (preg_match('/^#\s+(.+)$/m', $markdown, $matches)) {
            return trim($matches[1]);
        }
        return 'Untitled';
    }

    private function extractMatchExcerpt(string $plain, array $terms): string
    {
        $lower = strtolower($plain);

        foreach ($terms as $term) {
            $pos = strpos($lower, $term);
            if ($pos !== false) {
                $start   = max(0, $pos - 60);
                $excerpt = mb_substr($plain, $start, 160);
                if ($start > 0) {
                    $excerpt = '…' . $excerpt;
                }
                return rtrim($excerpt) . '…';
            }
        }

        return mb_substr($plain, 0, 160) . '…';
    }

    private function stripMarkdown(string $text): string
    {
        $text = preg_replace('/^#{1,6}\s+/m', '', $text);
        $text = preg_replace('/\*{1,3}([^*]+)\*{1,3}/', '$1', $text);
        $text = preg_replace('/`[^`]+`/', '', $text);
        $text = preg_replace('/\[([^\]]+)\]\([^\)]+\)/', '$1', $text);
        $text = preg_replace('/^\|[-| :]+\|$/m', '', $text);
        $text = preg_replace('/\|/', ' ', $text);
        $text = preg_replace('/\s+/', ' ', $text);
        return trim($text);
    }

    private function stripFrontmatter(string $markdown): string
    {
        return preg_replace('/\A---\r?\n.*?\r?\n---\r?\n/s', '', $markdown);
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
            'html_input'         => 'allow',
            'allow_unsafe_links' => false,
        ]);
        $environment->addExtension(new CommonMarkCoreExtension());
        $environment->addExtension(new TableExtension());

        $converter = new MarkdownConverter($environment);
        return $converter->convert($raw)->getContent();
    }

    private function stripGitbookSyntax(string $markdown): string
    {
        $markdown = preg_replace('/\A---\r?\n.*?\r?\n---\r?\n/s', '', $markdown);

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

        $markdown = preg_replace('/\{%\s*stepper\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*endstepper\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*step\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*endstep\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*columns?\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*endcolumns?\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*column\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%\s*endcolumn\s*%\}/', '', $markdown);
        $markdown = preg_replace('/\{%[^%]*%\}/', '', $markdown);
        $markdown = preg_replace('/data-view="[^"]*"/', '', $markdown);
        $markdown = preg_replace('/data-hidden/', '', $markdown);
        $markdown = preg_replace('/data-card-target/', '', $markdown);
        $markdown = preg_replace('/data-type="[^"]*"/', '', $markdown);
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
                    ['title' => 'Basket & Checkout',     'slug' => 'customers/basket-and-checkout'],
                    ['title' => 'Your Account',          'slug' => 'customers/your-account'],
                    ['title' => 'Wallet',                'slug' => 'customers/wallet'],
                    ['title' => 'Winning & Prizes',      'slug' => 'customers/winning-and-prizes'],
                    ['title' => 'Safe Play',             'slug' => 'customers/safe-play'],
                    ['title' => 'Free Entry',            'slug' => 'customers/free-entry'],
                    ['title' => 'ID Verification',       'slug' => 'customers/id-verification'],
                    ['title' => 'FAQs',                  'slug' => 'customers/faqs'],
                    ['title' => 'Checkout Flow',         'slug' => 'customers/checkout-flow'],
                ],
            ],
            [
                'title' => 'Admin',
                'items' => [
                    ['title' => 'Dashboard',             'slug' => 'admin/dashboard'],
                    ['title' => 'Analytics',             'slug' => 'admin/analytics'],
                    ['title' => 'Managing Competitions', 'slug' => 'admin/managing-competitions'],
                    ['title' => 'Content Management',    'slug' => 'admin/content'],
                    ['title' => 'Users',                 'slug' => 'admin/users'],
                    ['title' => 'Orders & Wallets',      'slug' => 'admin/orders-and-wallets'],
                    ['title' => 'Instant Wins',          'slug' => 'admin/instant-wins'],
                    ['title' => 'Winners & Draw',        'slug' => 'admin/winners-and-draw'],
                    ['title' => 'Prize Tracker', 'slug' => 'admin/prize-tracker'],
                    ['title' => 'Funding', 'slug' => 'admin/funding'],
                    ['title' => 'Coupons',               'slug' => 'admin/coupons'],
                    ['title' => 'Settings',              'slug' => 'admin/settings'],
                    ['title' => 'Integrations',          'slug' => 'admin/integrations'],
                ],
            ],
        ];
    }

    private function titleFromSlug(string $slug): string
    {
        return ucwords(str_replace(['-', '_'], ' ', $slug));
    }
}