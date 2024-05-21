<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Roles;

class RolesController extends Controller
{
    public function obtenerPorId($id)
    {
        // Buscar el rol por su ID en la base de datos
        $rol = Roles::find($id);

        // Verificar si se encontró el rol
        if (!$rol) {
            // Si no se encontró, retornar un mensaje de error
            return response()->json(['error' => 'Rol no encontrado'], 404);
        }

        // Retornar el rol encontrado
        return response()->json($rol, 200);
    }
    public function obtenerTodos()
    {
        // Obtener todos los roles y seleccionar solo el ID y el nombre
        $roles = Roles::select('id', 'nombre')->get();

        // Retornar los roles encontrados
        return response()->json($roles, 200);
    }

}
