<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class centro extends Model
{
    use HasFactory;

    protected $table = 'centro';

    protected $fillable = [
        'nombre',
    ];
}
