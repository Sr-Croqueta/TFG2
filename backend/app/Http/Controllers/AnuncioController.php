<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Anuncio;

class AnuncioController extends Controller
{
    // Método para mostrar todos los anuncios
    public function index()
    {
        $anuncios = Anuncio::all();
        return response()->json($anuncios);
    }

    // Método para mostrar un anuncio específico
    public function show($id)
    {
        $anuncio = Anuncio::find($id);
        if (!$anuncio) {
            return response()->json(['error' => 'Anuncio no encontrado'], 404);
        }
        return response()->json($anuncio);
    }

    // Método para crear un nuevo anuncio
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'cuerpo' => 'required|string',
            'caduca' => 'nullable|date',
            'datos_adjuntos' => 'nullable|string',
            'creado_por' => 'required|string'
        ]);

        $anuncio = Anuncio::create($request->all());
        return response()->json($anuncio, 201);
    }

    // Método para actualizar un anuncio existente
    public function update(Request $request, $id)
    {
        $anuncio = Anuncio::find($id);
        if (!$anuncio) {
            return response()->json(['error' => 'Anuncio no encontrado'], 404);
        }

        $request->validate([
            'titulo' => 'required|string',
            'cuerpo' => 'required|string',
            'caduca' => 'nullable|date',
            'datos_adjuntos' => 'nullable|string',
            'creado_por' => 'required|string'
        ]);

        $anuncio->update($request->all());
        return response()->json($anuncio, 200);
    }

    // Método para eliminar un anuncio
    public function destroy($id)
    {
        $anuncio = Anuncio::find($id);
        if (!$anuncio) {
            return response()->json(['error' => 'Anuncio no encontrado'], 404);
        }
        $anuncio->delete();
        return response()->json(['message' => 'Anuncio eliminado correctamente'], 200);
    }
}
