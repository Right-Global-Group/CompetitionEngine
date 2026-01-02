<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteText;
use Illuminate\Support\Facades\Cache;

class SiteTextController extends Controller
{
    public function index()
    {
        $texts = Cache::remember('site_texts_all', 300, function () {
            return SiteText::all();
        });

        // Transform the data for frontend
        $transformed = [];
        
        foreach ($texts as $text) {
            // For headings with parts, create separate entries for before/keyword/after
            if ($text->type === 'heading' && !empty($text->heading_keyword)) {
                
                // Add before text if it exists
                if (!empty($text->heading_before)) {
                    $transformed[] = [
                        'key' => $text->key . '_before',
                        'content' => $text->heading_before,
                        'section' => $text->section,
                        'type' => 'heading_part',
                        'order' => $text->order,
                    ];
                }
                
                // Add keyword (always)
                $transformed[] = [
                    'key' => $text->key . '_keyword',
                    'content' => $text->heading_keyword,
                    'section' => $text->section,
                    'type' => 'heading_keyword',
                    'order' => $text->order,
                ];
                
                // Add after text if it exists
                if (!empty($text->heading_after)) {
                    $transformed[] = [
                        'key' => $text->key . '_after',
                        'content' => $text->heading_after,
                        'section' => $text->section,
                        'type' => 'heading_part',
                        'order' => $text->order,
                    ];
                }
            } else {
                // Regular content
                $transformed[] = [
                    'key' => $text->key,
                    'content' => $text->content ?? '',
                    'section' => $text->section,
                    'type' => $text->type,
                    'order' => $text->order,
                ];
            }
        }

        return response()->json($transformed, 200, [
            'Cache-Control' => 'public, max-age=300, must-revalidate',
            'Pragma' => 'public',
            'Expires' => gmdate('D, d M Y H:i:s', time() + 300) . ' GMT',
        ]);
    }
}