<html>
<head>
<link rel="stylesheet" href="{!! asset('css/header.css') !!}">
@vite([ 'resources/js/app.js'])
</head>
<div class="navbar">
    <h1><a href="{{ url('/') }}">Incidencias</a></h1>
        @if (Route::has('login'))
            <div>
                @auth
                    <a href="{{ url('/patrulla/showAll') }}">Patrullas</a>
                    <a href="{{ url('/incidentes') }}">Incidentes</a>
                    @if(Auth::user()->roles == 'Oficial')
                                <a href="{{ url('/policias') }}">Ver policías</a>
                    @endif
                    <div class="dropdown">
                        <span class="username">{{ Auth::user()->name }}</span>
                        <div class="dropdown-content">
                            <p class="edit-perfil"><a href="{{ route('profile.edit') }}">Profile</a></p>
                            <p><form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button class="logout" type="submit">Log Out</button>
                            </form>
                        </p>
                            
                        </div>
                    </div>
                @else
                    <a href="{{ route('login') }}">Log in</a>
                @endauth
            </div>
        @endif
</div>
</html>