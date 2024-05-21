<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contacto;

class ContactoController extends Controller
{
    // Función para obtener todos los contactos en formato JSON
    public function index()
    {
        $contactos = Contacto::all();
        return response()->json($contactos);
    }

    // Función para crear un nuevo contacto
    public function store(Request $request)
    {
        $request->validate([
            'CentroMedico' => 'required|string|max:255',
            'Nombre' => 'required|string|max:255',
            'Apellidos' => 'required|string|max:255',
            'NTelefono' => 'required|string|max:15',
            'CorreoElectronico' => 'required|string|email|max:255',
            'PuestoTrabajo' => 'nullable|string|max:255',
            'Tipo' => 'required|in:Interno,Externo',
            'ExtensionInterna' => 'nullable|string|max:10',
            'Ciudad' => 'nullable|string|max:100',
            'Provincia' => 'nullable|string|max:100',
            'CodigoPostal' => 'nullable|string|max:10',
            'Pais' => 'nullable|string|max:100',
        ]);

        $contacto = Contacto::create($request->all());

        return response()->json($contacto, 201);
    }

    // Función para mostrar un contacto específico en formato JSON
    public function show($id)
    {
        $contacto = Contacto::findOrFail($id);
        return response()->json($contacto);
    }

    // Función para actualizar un contacto
    public function update(Request $request, $id)
    {
        $request->validate([
            'CentroMedico' => 'required|string|max:255',
            'Nombre' => 'required|string|max:255',
            'Apellidos' => 'required|string|max:255',
            'NTelefono' => 'required|string|max:15',
            'CorreoElectronico' => 'required|string|email|max:255',
            'PuestoTrabajo' => 'nullable|string|max:255',
            'Tipo' => 'required|in:Interno,Externo',
            'ExtensionInterna' => 'nullable|string|max:10',
            'Ciudad' => 'nullable|string|max:100',
            'Provincia' => 'nullable|string|max:100',
            'CodigoPostal' => 'nullable|string|max:10',
            'Pais' => 'nullable|string|max:100',
        ]);

        $contacto = Contacto::findOrFail($id);
        $contacto->update($request->all());

        return response()->json($contacto, 200);
    }

    // Función para eliminar un contacto
    public function destroy($id)
{
    try {
        $contacto = Contacto::findOrFail($id);
        $contacto->delete();
        return response()->json(null, 204);
    } catch (\Exception $e) {
        return response()->json(['error' => 'No se encontró el contacto'], 404);
    }
}

    // Función para mostrar todos los contactos internos en formato JSON
    public function internos()
    {
        $contactosInternos = Contacto::where('Tipo', 'Interno')->get();

        return response()->json($contactosInternos);
    }

    // Función para mostrar todos los contactos externos en formato JSON
    public function externos()
    {
        
        $contactosExternos = Contacto::where('Tipo', 'Externo')->get();
        return response()->json($contactosExternos);
    }
    public function BuscarCon(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'Nombre' => 'required|string',
        ]);
    
        // Obtener el nombre de la solicitud
        $nombre = $request->input('Nombre');
    
        // Buscar enlaces por nombre
        $contacto = Contacto::where('Nombre', 'LIKE', "%{$nombre}%")->get();
    
        // Devolver los resultados de la búsqueda
        return response()->json($contacto);
    }
}
