<?php

namespace App\Observers;

use App\Models\SiteText;
use Illuminate\Support\Facades\Cache;

class SiteTextObserver
{
    /**
     * Handle the SiteText "created" event.
     */
    public function created(SiteText $siteText): void
    {
        $this->clearCache($siteText);
    }

    /**
     * Handle the SiteText "updated" event.
     */
    public function updated(SiteText $siteText): void
    {
        $this->clearCache($siteText);
    }

    /**
     * Handle the SiteText "deleted" event.
     */
    public function deleted(SiteText $siteText): void
    {
        $this->clearCache($siteText);
    }

    /**
     * Clear all relevant caches
     */
    protected function clearCache(SiteText $siteText): void
    {
        Cache::forget('site_texts_all');
        Cache::forget("site_texts_{$siteText->section}");
        Cache::forget("site_text_{$siteText->key}");
    }
}