<?php

return [
    /*
     * API key that tenant servers must send in the X-Hub-Api-Key header
     * to read messages from the hub.
     */
    'api_key' => env('HUB_API_KEY', ''),

    /*
     * Separate key for the activity ticker and upsell stats endpoints.
     * Only give this to the one tenant you want sending marketing data.
     */
    'stats_api_key' => env('HUB_STATS_API_KEY', ''),
];
