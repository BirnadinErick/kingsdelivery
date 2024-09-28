<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Order a wide range of delicious fast foods and alcoholic beverages online. Get burgers, pizzas, wings, beer, wine, and more delivered fast to your door.">
        <meta name="keywords" content="order fast food online, food delivery, fast food near me, alcohol delivery, pizza, burgers, wings, beer, wine, spirits, food and alcohol delivery">
        <meta name="robots" content="index, follow">
        <meta name="author" content="Birnadin Erick, Antony Walton">

        <title inertia>{{ config('app.name', 'King\'s Delivery') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
