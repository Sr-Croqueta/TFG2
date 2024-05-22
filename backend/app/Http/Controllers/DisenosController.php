<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diseño;
use App\Models\Pedido;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DisenosController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'id_user' => 'required|string',
            'nombre' => 'required|string',
            'ruta_archivo' => 'required|file',
            'creado_por' => 'string'
        ]);
    
        DB::beginTransaction();
    
        try {
            $diseño = new Diseño();
            $diseño->id_user = $request->id_user;
            $diseño->nombre = $request->nombre;
            $diseño->creado_por = $request->creado_por;
    
            // Verificar si la carpeta 'uploads' existe en 'public', si no, crearla
            if (!file_exists(public_path('uploads'))) {
                mkdir(public_path('uploads'), 0777, true);
            }
    
            // Guardar el archivo en la carpeta 'uploads' dentro de 'public'
            $file = $request->file('ruta_archivo');
            $fileName = $file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
            $diseño->ruta_archivo = 'uploads/' . $fileName;
    
            $diseño->save();
            
            DB::commit();
            
            return response()->json($diseño, 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Error al crear el anuncio: ' . $e->getMessage()], 500);
        }
    }

    public function guardar(Request $request, $id_ma)
    {
        $request->validate([
            'id_user' => 'required|string',
            'nombre' => 'required|string',
            'ruta_archivo' => 'required|file',
            'creado_por' => 'string'
        ]);

        DB::beginTransaction();

        try {
            $diseño = new Diseño();
            $diseño->id_user = $request->id_user;
            $diseño->nombre = $request->nombre;
            $diseño->creado_por = $request->creado_por;

            // Verificar si la carpeta 'uploads' existe en 'public', si no, crearla
            if (!file_exists(public_path('uploads'))) {
                mkdir(public_path('uploads'), 0777, true);
            }

            // Guardar el archivo en la carpeta 'uploads' dentro de 'public'
            $file = $request->file('ruta_archivo');
            $fileName = $file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
            $diseño->ruta_archivo = 'uploads/' . $fileName;

            $diseño->save();

            // Crear el registro en la tabla Pedido
            $pedido = new Pedido();
            $pedido->id_userma = $id_ma;
            $pedido->id_usercli = $request->id_user;
            $pedido->id_diseño = $diseño->id; // Asumiendo que el ID es autoincremental y se obtiene así
            $pedido->save();

            DB::commit();

            return response()->json($diseño, 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Error al crear el anuncio: ' . $e->getMessage()], 500);
        }
    }


    public function disponibles( $id)
    {
        $diseños = Diseño::where('id_user', $id)->get();
        return response()->json($diseños, 200);
    }
    
    public function obtenerDisenos($id_manicurista)
    {
        // Obtener todos los pedidos donde id_userma (id del manicurista) sea igual al id_manicurista
        $pedidos = Pedido::where('id_userma', $id_manicurista)->with(['diseno', 'cliente'])->get();

        return response()->json($pedidos);
    }
    
}
