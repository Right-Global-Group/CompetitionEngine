<?php

return [
    /*
     * API key that tenant servers must send in the X-Hub-Api-Key header
     * to read messages from the hub.
     */
    'api_key' => env('HUB_API_KEY', ''),
];
