<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aula;
use App\Models\Centro;
use App\Models\Disponibilidad;
use Illuminate\Support\Facades\Validator;

class DisponibilidadController extends Controller
{
    public function obtenerAulaId(Request $request)
{
    // Obtener datos JSON de la solicitud
    $data = $request->json()->all();

    // Validar los datos recibidos en la solicitud
    $validator = Validator::make($data, [
        'hora' => 'required',
        'dia' => 'required',
        'centro' => 'required',
    ]);

    // Verificar si la validación falla
    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 400);
    }

    // Obtener los datos de la solicitud
    $hora = $data['hora'];
    $dia = $data['dia'];
    $centro = $data['centro'];

    try {
        // Buscar los registros de disponibilidad para la hora, día y centro especificados
        $disponibilidades = Disponibilidad::where('hora', $hora)
            ->where('dia', $dia)
            ->get();

        // Array para almacenar los IDs de aula
        $aulaIds = [];
        

        // Recorrer los registros de disponibilidad y guardar los IDs de aula
        foreach ($disponibilidades as $disponibilidad) {
            $aulaIds[] = $disponibilidad->id_aula;
        }
        
        // Obtener las aulas que no coincidan con los IDs obtenidos y el centro especificado
        $aulasExcepto = Aula::whereNotIn('id', $aulaIds)
            ->where('id_centro', $centro)
            ->get();

        // Devolver la respuesta con las aulas encontradas
        return response()->json([ $aulasExcepto]);
    } catch (\Exception $e) {
        // Manejo de errores
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    public function index()
    {
        // Aquí puedes colocar la lógica para mostrar una lista de recursos
        // Por ejemplo, obtener y devolver todos los registros de disponibilidad
        $disponibilidades = Disponibilidad::all();

        // Puedes devolver los datos en formato JSON si así lo necesitas
        return response()->json($disponibilidades);
    }
    public function reserva(Request $request)
    {
        // Obtener datos JSON de la solicitud
        $data = $request->json()->all();
        
        // Validar los datos recibidos en la solicitud
        $validator = Validator::make($data, [
            'id_aula' => 'required',
            'dia' => 'required',
            'hora' => 'required',
        ]);

        // Verificar si la validación falla
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Obtener los datos de la solicitud
        $id_aula = $data['id_aula'];
        $dia = $data['dia'];
        $hora = $data['hora'];

        $existingReserva = Disponibilidad::where('id_aula', $id_aula)
        ->where('dia', $dia)
        ->where('hora', $hora)
        ->first();

    if ($existingReserva) {
        return response()->json(['error' => 'Ya existe una reserva para este aula en este día y hora'], 400);
    }
        
        try {
            // Crear una nueva reserva en la base de datos
            $reserva = new Disponibilidad();
            
            $reserva->id_aula = $id_aula;
            $reserva->hora = $hora;
            $reserva->dia = $dia;
            
            $reserva->save();

            // Devolver una respuesta de éxito
            return response()->json(['message' => 'Reserva creada con éxito'], 201);
        } catch (\Exception $e) {
            // Manejo de errores
            return response()->json([$e]);
        }
    }
    public function disponible($id_aula, $dia, $hora){


    }

}