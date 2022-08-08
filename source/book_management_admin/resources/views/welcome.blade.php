<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
    </head>
    <body class="antialiased">
        <div id="app">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <hr>
            <router-view></router-view>
        </div>

        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
