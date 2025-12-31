<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteText;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class SiteTextController extends Controller
{
    /**
     * Get all site texts grouped by section
     */
    public function index(): JsonResponse
    {
        $texts = Cache::remember('site_texts_all', 3600, function () {
            return SiteText::orderBy('section')
                ->orderBy('order')
                ->get()
                ->groupBy('section')
                ->map(function ($sectionTexts) {
                    return $sectionTexts->pluck('content', 'key')->toArray();
                });
        });

        return response()->json($texts);
    }

    /**
     * Get texts for a specific section
     */
    public function section(string $section): JsonResponse
    {
        $texts = Cache::remember("site_texts_{$section}", 3600, function () use ($section) {
            return SiteText::where('section', $section)
                ->orderBy('order')
                ->get()
                ->pluck('content', 'key');
        });

        return response()->json($texts);
    }

    /**
     * Get a single text by key
     */
    public function show(string $key): JsonResponse
    {
        $text = Cache::remember("site_text_{$key}", 3600, function () use ($key) {
            return SiteText::where('key', $key)->first();
        });

        if (!$text) {
            return response()->json(['error' => 'Text not found'], 404);
        }

        return response()->json([
            'key' => $text->key,
            'content' => $text->content,
        ]);
    }

    /**
     * Clear the cache (called automatically when texts are updated)
     */
    public function clearCache(): JsonResponse
    {
        Cache::forget('site_texts_all');
        
        $sections = SiteText::distinct()->pluck('section');
        foreach ($sections as $section) {
            Cache::forget("site_texts_{$section}");
        }
        
        $keys = SiteText::pluck('key');
        foreach ($keys as $key) {
            Cache::forget("site_text_{$key}");
        }

        return response()->json(['message' => 'Cache cleared successfully']);
    }
}