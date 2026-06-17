<?php

namespace App\Http\Middleware;

use App\Models\SiteText;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'is_admin' => $request->user()->isAdmin(),
                ] : null,
            ],
            'siteTexts' => Cache::remember('site_texts_all', 60, function () {
                $transformed = [];
                foreach (SiteText::orderBy('section')->orderBy('order')->get() as $text) {
                    $section = $text->section;
                    if (!isset($transformed[$section])) {
                        $transformed[$section] = [];
                    }
                    if ($text->type === 'heading' && !empty($text->heading_keyword)) {
                        if (!empty($text->heading_before)) {
                            $transformed[$section][$text->key . '_before'] = $text->heading_before;
                        }
                        $transformed[$section][$text->key . '_keyword'] = $text->heading_keyword;
                        if (!empty($text->heading_after)) {
                            $transformed[$section][$text->key . '_after'] = $text->heading_after;
                        }
                    } else {
                        $transformed[$section][$text->key] = $text->content ?? '';
                    }
                }
                return $transformed;
            }),
        ];
    }
}