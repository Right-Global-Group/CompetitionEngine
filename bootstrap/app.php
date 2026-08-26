<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'filament.auth' => \App\Http\Middleware\FilamentAuth::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'api/fees/report',
            'api/sms-credit/report',
            'api/messages',
            'api/activity',
            'api/upsell-stats',
            'api/feature-requests',
            'api/contact',
        ]);

        //
    })
    ->withProviders([
        \App\Providers\Filament\AdminPanelProvider::class,
    ])
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();