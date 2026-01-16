<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Prevent Caching -->
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="0">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <link rel="icon" type="image/svg+xml" href="/images/favicon.ico">

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead

        @if(session('force_reload'))
            <script>
                // Force clear all cached styles and reload
                if (window.caches) {
                    caches.keys().then(names => {
                        names.forEach(name => caches.delete(name));
                    });
                }
                // Clear any lingering Filament styles
                const filamentStyles = document.querySelectorAll('style[data-vite-dev-id*="filament"]');
                filamentStyles.forEach(style => style.remove());
            </script>
            {{ session()->forget('force_reload') }}
        @endif

        <!-- Microsoft Clarity -->
        <script type="text/javascript">
            (function(c,l,a,r,i,t,y){         
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);     
            })(window, document, "clarity", "script", "v2fnjukiga"); 
        </script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>