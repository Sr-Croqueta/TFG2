<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    use HasFactory;

    protected $table = 'contactos';

    protected $fillable = [
        'CentroMedico',
        'Nombre',
        'Apellidos',
        'NTelefono',
        'CorreoElectronico',
        'PuestoTrabajo',
        'Tipo',
        'ExtensionInterna',
        'Ciudad',
        'Provincia',
        'CodigoPostal',
        'Pais',
    ];

    // Definir un método de acceso para obtener contactos internos
    public static function internos()
    {
        return self::where('Tipo', 'Interno')->get();
    }

    // Definir un método de acceso para obtener contactos externos
    public static function externos()
    {
        return self::where('Tipo', 'Externo')->get();
    }
}