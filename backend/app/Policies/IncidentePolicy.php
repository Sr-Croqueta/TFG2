<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Incidente;

class IncidentePolicy
{
    public function editarIncidente(User $user, Incidente $incidente)
    {
        // Verificar si el usuario es el creador del incidente o tiene el rol "Oficial"
        return $user->id === $incidente->user_id || $user->roles === 'Oficial';
    }
}