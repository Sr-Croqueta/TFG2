<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enlace;

class EnlaceController extends Controller
{
    public function index()
    {
        $enlaces = Enlace::all();
        return response()->json($enlaces);
    }

    public function create()
    {
        // No es necesario para la devolución de JSON
    }

    public function store(Request $request)
{
    $request->validate([
        'nombre' => 'required|string',
        'direccion' => 'required|string',
        'notas' => 'nullable|string',
    ]);

    $enlace = Enlace::create($request->all());

    return response()->json($enlace, 201);
}

    public function show($id)
    {
        $enlace = Enlace::findOrFail($id);
        return response()->json($enlace);
    }

    public function edit($id)
    {
        // No es necesario para la devolución de JSON
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string',
            'direccion' => 'required|string',
            'notas' => 'nullable|string',
        ]);

        $enlace = Enlace::findOrFail($id);
        $enlace->update($request->all());

        return response()->json($enlace, 200);
    }

    public function destroy($id)
    {
        $enlace = Enlace::findOrFail($id);
        $enlace->delete();

        return response()->json(null, 204);
    }
    public function BuscarEnlace(Request $request)
{
    // Validar los datos del formulario
    $request->validate([
        'nombre' => 'required|string',
    ]);

    // Obtener el nombre de la solicitud
    $nombre = $request->input('nombre');

    // Buscar enlaces por nombre
    $enlaces = Enlace::where('nombre', 'LIKE', "%{$nombre}%")->get();

    // Devolver los resultados de la búsqueda
    return response()->json($enlaces);
}
public function obtenerEnlace(Request $request)
{
    $request->validate([
        'id' => 'required|exists:enlaces,id',
    ]);

    $id = $request->id;
    $enlace = Enlace::findOrFail($id);

    return response()->json($enlace, 200);
}
}
