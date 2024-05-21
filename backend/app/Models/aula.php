<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class aula extends Model
{
    use HasFactory;

    protected $table = 'aula';

    protected $fillable = [
        'nombre',
        'id_centro',
    ];
}
