<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tienda;

class TiendasController extends Controller
{
    public function index()
    {
        $tiendas = Tienda::all();
        return response()->json($tiendas);
    }

    public function create()
    {
        // No es necesario para la devolución de JSON
    }

    public function store(Request $request)
{
    $request->validate([
        'id_user' => 'int', // 'id_user' debe ser un ID de usuario válido
        'nombre' => 'required|string',
        'direccion' => 'required|string',
        'telefono' => 'required|string',
        'descripcion' => 'nullable|string',
        'ciudad' => 'required|string',
    ]);

    $tienda = Tienda::create($request->all());

    return response()->json($tienda, 201);
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
    public function BuscarTienda(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'ciudad' => 'required|string',
        ]);
    
        // Obtener la dirección de la solicitud
        $ciudad = $request->input('ciudad');
    
        // Buscar tiendas por dirección
        $tiendas = Tienda::where('ciudad', 'LIKE', "%{$ciudad}%")->get();
    
        // Devolver los resultados de la búsqueda
        return response()->json($tiendas);
    }
    
public function obtenerTienda(Request $request)
{
    $request->validate([
        'id' => 'required|exists:enlaces,id',
    ]);

    $id = $request->id;
    $enlace = Enlace::findOrFail($id);

    return response()->json($enlace, 200);
}
}
