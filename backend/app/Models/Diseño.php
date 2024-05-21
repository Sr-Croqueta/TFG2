<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diseño extends Model
{
    use HasFactory;

    protected $table = 'diseños';

    protected $fillable = [
        'id_user',
        'nombre',
        'ruta_archivo',
        'creado_por'
        
    ];
}
