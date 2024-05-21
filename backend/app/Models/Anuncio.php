<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anuncio extends Model
{
    use HasFactory;

    protected $table = 'Anuncios';

    protected $fillable = [
        'titulo',
        'cuerpo',
        'caduca',
        'datos_adjuntos',
        'creado_por'
    ];

    // Si deseas cambiar el formato de los campos de fecha, puedes hacerlo aquí
    protected $dateFormat = 'd-m-Y H:i:s';
}