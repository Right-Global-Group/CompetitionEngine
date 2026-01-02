<?php

return [
    'path' => env('FILAMENT_PATH', 'admin'),
    'core_path' => env('FILAMENT_CORE_PATH', 'filament'),
    'domain' => env('FILAMENT_DOMAIN'),
    'home_url' => '/',
    'brand' => 'Competition Engine Admin',
    'auth' => [
        'guard' => env('FILAMENT_AUTH_GUARD', 'web'),
        'pages' => [
            'login' => null,
        ],
    ],
    'pages' => [
        'namespace' => 'App\\Filament\\Pages',
        'path' => app_path('Filament/Pages'),
        'register' => [
            //
        ],
    ],
    'resources' => [
        'namespace' => 'App\\Filament\\Resources',
        'path' => app_path('Filament/Resources'),
        'register' => [
            //
        ],
    ],
    'widgets' => [
        'namespace' => 'App\\Filament\\Widgets',
        'path' => app_path('Filament/Widgets'),
        'register' => [
            //
        ],
    ],
    'livewire' => [
        'namespace' => 'App\\Filament',
        'path' => app_path('Filament'),
    ],
    'dark_mode' => true,
    'database_notifications' => [
        'enabled' => false,
    ],
    'broadcasting' => [
        'echo' => false,
    ],
    'default_filesystem_disk' => env('FILAMENT_FILESYSTEM_DISK', 'public'),
    'google_fonts' => 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'middleware' => [
        'auth' => [
            \App\Http\Middleware\FilamentAuth::class,
        ],
        'base' => [
            \Illuminate\Cookie\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ],
];