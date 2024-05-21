<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class PasswordController extends Controller
{
    public function changePassword(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'username' => 'required',
            'current_password' => 'required',
            'new_password' => 'required',
        ]);

        $username = $request->input('username');
        $currentPassword = $request->input('current_password');
        $newPassword = $request->input('new_password');

        // Ejecutar el comando PowerShell para cambiar la contraseña del usuario
        $command = "Set-ADAccountPassword -Identity '$username' -OldPassword (ConvertTo-SecureString '$currentPassword' -AsPlainText -Force) -NewPassword (ConvertTo-SecureString '$newPassword' -AsPlainText -Force)";
        $process = new Process(["powershell.exe", "-Command", $command]);
        
        // Ejecutar el proceso y capturar la salida
        try {
            $process->mustRun();
            return response()->json(['success' => true, 'message' => 'Contraseña cambiada exitosamente']);
        } catch (ProcessFailedException $exception) {
            return response()->json(['success' => false, 'error' => 'Error al cambiar la contraseña']);
        }
    }
}
