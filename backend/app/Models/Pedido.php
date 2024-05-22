<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;
    protected $table = 'pedidos';

    protected $fillable = [
        'id_userma',
        'id_usercli',
        'id_diseño',
        
    ];
    public function diseno()
    {
        return $this->belongsTo(Diseño::class, 'id_diseño');
    }

    public function cliente()
    {
        return $this->belongsTo(User::class, 'id_usercli');
    }
}
