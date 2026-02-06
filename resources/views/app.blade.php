<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }

        body {
            scroll-behavior: smooth;
        }
    </style>

    @php
        $meta = $page['props']['meta'] ?? [];
        $title = $meta['title'] ?? config('app.name', 'Jenkins Motorsport');
        $description = $meta['description'] ?? 'The gold standard of British Truck Racing.';
        $image = $meta['image'] ?? '/images/Jenkins_logo_with_text_color_white.png';
        $url = $meta['url'] ?? url()->current();
        $type = $meta['type'] ?? 'website';
    @endphp

    <title inertia>{{ $title }}</title>
    <meta name="description" content="{{ $description }}" inertia>
    <link rel="canonical" href="{{ $url }}" inertia>

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="{{ $type }}" inertia>
    <meta property="og:url" content="{{ $url }}" inertia>
    <meta property="og:title" content="{{ $title }}" inertia>
    <meta property="og:description" content="{{ $description }}" inertia>
    <meta property="og:image" content="{{ asset($image) }}" inertia>

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" inertia>
    <meta name="twitter:url" content="{{ $url }}" inertia>
    <meta name="twitter:title" content="{{ $title }}" inertia>
    <meta name="twitter:description" content="{{ $description }}" inertia>
    <meta name="twitter:image" content="{{ asset($image) }}" inertia>

    <link rel="icon" href="/favicon.png" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&family=Saira:ital,wght@0,300..900;1,300..900&family=Saira+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>