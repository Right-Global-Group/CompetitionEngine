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
            if ($text->type === 'heading' && $text->heading_keyword) {
                if ($text->heading_before) {
                    $transformed[] = [
                        'key' => $text->key . '.before',
                        'content' => $text->heading_before,
                        'section' => $text->section,
                        'type' => $text->type,
                        'order' => $text->order,
                    ];
                }
                
                $transformed[] = [
                    'key' => $text->key . '.keyword',
                    'content' => $text->heading_keyword,
                    'section' => $text->section,
                    'type' => $text->type,
                    'order' => $text->order,
                ];
                
                if ($text->heading_after) {
                    $transformed[] = [
                        'key' => $text->key . '.after',
                        'content' => $text->heading_after,
                        'section' => $text->section,
                        'type' => $text->type,
                        'order' => $text->order,
                    ];
                }
            } else {
                // Regular content
                $transformed[] = [
                    'key' => $text->key,
                    'content' => $text->content,
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