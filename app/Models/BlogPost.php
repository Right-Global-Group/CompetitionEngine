<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }

    public function isPublished(): bool
    {
        return $this->published_at !== null;
    }

    protected static function booted(): void
    {
        static::creating(function (BlogPost $post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });

        static::saved(function (BlogPost $post) {
            Cache::forget('blog:list');
            Cache::forget("blog:post:{$post->slug}");
            // Also clear old slug if it changed
            if ($post->wasChanged('slug')) {
                Cache::forget('blog:post:' . $post->getOriginal('slug'));
            }
        });

        static::deleted(function (BlogPost $post) {
            Cache::forget('blog:list');
            Cache::forget("blog:post:{$post->slug}");
        });
    }
}
