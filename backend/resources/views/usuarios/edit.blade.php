<html>
    <head>
    <link rel="stylesheet" href="{!! asset('css/incidentes/editar.css') !!}">
    </head>

@include('layouts.header')

<div class="container">
    <h1>Editar Usuario</h1>
    <form action="{{ route('usuarios.update', $usuario->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ $usuario->name }}" required>
        </div>
        <div class="form-group">
            <label for="email">Correo Electrónico:</label>
            <input type="email" class="form-control" id="email" name="email" value="{{ $usuario->email }}" required>
        </div>
        <div class="form-group">
            <label for="patrulla_id">Patrulla:</label>
            <select class="form-control" id="patrulla_id" name="patrulla_id" required>
                <option value="">Seleccione una patrulla</option>
                @foreach($patrullas as $patrulla)
                    <option value="{{ $patrulla->id }}" {{ $usuario->patrulla_id == $patrulla->id ? 'selected' : '' }}>
                        {{ $patrulla->matricula }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="mt-4">
            <x-input-label for="roles" :value="__('Roles')" />
            <select id="roles" name="roles" class="block mt-1 w-full" required>
                <option value="agente">Agente</option>
                <option value="oficial">Oficial</option>
            </select>
            <x-input-error :messages="$errors->get('roles')" class="mt-2" />
        </div>
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        <a href="{{ route('usuarios.index') }}" class="btn btn-secondary">Cancelar</a>
    </form>
</div>

@include('layouts.footer')

</html>