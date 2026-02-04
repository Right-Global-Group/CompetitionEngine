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
        'heading_before',
        'heading_keyword',
        'heading_after',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    /**
     * Get full heading text assembled from parts
     */
    public function getFullHeadingAttribute()
    {
        if ($this->type === 'heading' && ($this->heading_before || $this->heading_keyword || $this->heading_after)) {
            return trim(($this->heading_before ?? '') . ' ' . ($this->heading_keyword ?? '') . ' ' . ($this->heading_after ?? ''));
        }
        return $this->content;
    }

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
            'about' => 'About Page',
            'contact' => 'Contact Page',
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
            'number' => 'Number',
        ];
    }
}