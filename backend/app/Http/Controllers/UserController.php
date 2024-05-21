<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Patrulla;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    public function index()
    { 
        $usuarios = User::all();
        return response()->json($usuarios);
    }


    public function store(Request $request)
    {
        // Valida los datos del formulario
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            // Añade más reglas de validación según tus requisitos
        ]);

        // Crea un nuevo usuario
        User::create($request->all());

        return redirect()->route('usuarios.index')->with('success', 'Usuario creado exitosamente.');
    }

    public function show($id)
{
    if (Gate::allows('create', User::class)) {
    $usuario = User::with('patrulla')->find($id);
    return view('usuarios.show', compact('usuario'));
} else {
    abort(403, 'No tienes permiso para acceder a esta página.');
}

}

public function edit($id)
{
    if (Gate::allows('create', User::class)) {
    $usuario = User::find($id);
    $patrullas = Patrulla::all(); // Suponiendo que tienes un modelo Patrulla
    return view('usuarios.edit', compact('usuario', 'patrullas'));
} else {
    abort(403, 'No tienes permiso para acceder a esta página.');
}
}

public function update(Request $request, $id)
{
    // Encuentra el usuario por su ID
    $usuario = User::findOrFail($id);

    // Valida los datos del formulario
    $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users,email,' . $usuario->id,
        // Agrega más reglas de validación según tus requisitos
    ]);

    // Actualiza los datos del usuario
    $usuario->update($request->all());

    // Redirecciona a la vista de índice de usuarios con un mensaje de éxito
    return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado exitosamente.');
}

public function destroy($id)
{
    $usuario = User::findOrFail($id);
    $usuario->delete();

    return response()->json(['message' => 'Usuario eliminado exitosamente'], 200);
}

}