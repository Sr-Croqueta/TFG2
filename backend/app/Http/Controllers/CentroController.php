<?php

namespace App\Http\Controllers;
use App\Models\centro;
use Illuminate\Http\Request;

class CentroController extends Controller
{
    public function index()
    {
        $centros = centro::all();
        return response()->json($centros);
    }
    public function store(Request $request)
{
    $request->validate([
        'nombre' => 'required|string|max:255',
        
    ]);

    //$userId = Auth::id();

    Incidente::create([
        'nombre' => $request->nombre,
        
    ]);

    return response()->json("añadido correctamente");
}
    public function update(Request $request, centro $centro)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            
        ]);

        $centro->update($request->all());

        return response()->json("actualizado correctamente");
    }
    public function destroy(centro $centro)
    {
        $centro->delete();

        return response()->json("borrado correctamente");
    }
}
