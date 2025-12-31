<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteText extends Model
{
    use HasFactory;

    protected $fillable = [
        'section',
        'key',
        'content',
        'type',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    public static function getSections(): array
    {
        return [
            'hero' => 'Hero Section',
            'stats' => 'Stats Section',
            'launch' => 'Launch Steps',
            'configurator' => 'Game Configurator',
            'ecosystem' => 'Ecosystem Features',
            'nextgen' => 'Next Gen Platform',
            'ai' => 'AI Features',
            'modern' => 'Modern Platform',
            'comparison' => 'Comparison Table',
            'pricing' => 'Pricing Cards',
            'faq' => 'FAQ Section',
            'booking' => 'Booking Section',
            'footer' => 'Footer',
        ];
    }

    public static function getTypes(): array
    {
        return [
            'heading' => 'Heading',
            'subheading' => 'Subheading',
            'paragraph' => 'Paragraph',
            'button' => 'Button Text',
            'list_item' => 'List Item',
            'label' => 'Label',
        ];
    }
}