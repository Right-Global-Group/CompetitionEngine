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
        // Reduced cache time to 1 minute (60 seconds) for faster updates
        $texts = Cache::remember('site_texts_all', 60, function () {
            $allTexts = SiteText::orderBy('section')->orderBy('order')->get();
            
            $transformed = [];
            
            foreach ($allTexts as $text) {
                // For headings with parts, create separate key/value pairs
                if ($text->type === 'heading' && !empty($text->heading_keyword)) {
                    $section = $text->section;
                    
                    if (!isset($transformed[$section])) {
                        $transformed[$section] = [];
                    }
                    
                    // Add before text if exists
                    if (!empty($text->heading_before)) {
                        $transformed[$section][$text->key . '_before'] = $text->heading_before;
                    }
                    
                    // Add keyword (always)
                    $transformed[$section][$text->key . '_keyword'] = $text->heading_keyword;
                    
                    // Add after text if exists
                    if (!empty($text->heading_after)) {
                        $transformed[$section][$text->key . '_after'] = $text->heading_after;
                    }
                } else {
                    // Regular content
                    $section = $text->section;
                    
                    if (!isset($transformed[$section])) {
                        $transformed[$section] = [];
                    }
                    
                    $transformed[$section][$text->key] = $text->content ?? '';
                }
            }
            
            return $transformed;
        });

        return response()->json($texts)
            ->header('Cache-Control', 'no-cache, no-store, must-revalidate, private, max-age=0')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0')
            ->header('X-Accel-Expires', '0');
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