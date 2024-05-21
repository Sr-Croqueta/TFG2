<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DisponibilidadController;
use App\Http\Controllers\CentroController;
use App\Http\Controllers\AnuncioController;
use App\Http\Controllers\EnlaceController;
use App\Http\Controllers\ContactoController;
use App\http\Controllers\PasswordController;
use App\http\Controllers\RolesController;
use App\http\Controllers\TiendasController;
use App\http\Controllers\DisenosController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/



// Almacenar un nuevo usuario en la base de datos
Route::post('/users', [UserController::class, 'store'])->name('usuarios.store');

// Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
// Mostrar los detalles de un usuario específico
Route::get('/usuarios', [UserController::class, 'index'])->name('usuarios.index');
//borrar usuario
Route::get('/borrarusuario/{id}', [UserController::class, 'destroy'])->name('usuarios.destroy');
Route::get('/obtenerusuario/{id}', [UserController::class, 'index'])->name('usuarios.index');
Route::post('/guardarUsuario', [UserController::class, 'store'])->name('usuarios.store');
Route::put('/editarusuario', [UserController::class, 'update'])->name('usuarios.update');

//antes api.php
Route::post('registro',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::get('user-profile',[AuthController::class,'userProfile']);
    Route::get('logout',[AuthController::class,'logout']);
    });
Route::get('permisos/{id}', [RolesController::class, 'obtenerPorId']);
Route::get('roles', [RolesController::class, 'obtenertodos']);
// Mostrar el formulario para editar un usuario existente
Route::get('/users/edit/{user}', [UserController::class, 'edit'])->name('usuarios.edit');

// Actualizar los detalles de un usuario en la base de datos
Route::put('/users/{user}', [UserController::class, 'update'])->name('usuarios.update');

// Eliminar un usuario de la base de datos
Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('usuarios.destroy');

Route::get('/centro', [CentroController::class, 'index'])->name('centro.index');
Route::post('/sacardisponibles', [DisponibilidadController::class, 'obtenerAulaId']);
Route::post('/reservaula', [DisponibilidadController::class, 'reserva']);

//Password
Route::post('/changep', [PasswordController::class, 'changePassword'])->name('cambiarcontra');
//Tienda
Route::post('/buscartienda', [TiendasController::class, 'BuscarTienda'])->name('tiendas.buscar');
Route::get('/tiendas', [TiendasController::class, 'index'])->name('tiendas.index');
Route::post('/creartienda', [TiendasController::class, 'store'])->name('tiendas.store');
//Diseños
Route::post('/creardiseño', [DisenosController::class, 'store'])->name('diseños.store');
Route::get('/disenoma/{id}', [DisenosController::class, 'disponibles'])->name('diseños.disponibles');

//enlaces
Route::get('/enlaces', [EnlaceController::class, 'index'])->name('enlaces.index');
Route::get('/enlaces/create', [EnlaceController::class, 'create'])->name('enlaces.create');
Route::post('/crearenlace', [EnlaceController::class, 'store'])->name('enlaces.store');
Route::get('/enlaces/{enlace}', [EnlaceController::class, 'show'])->name('enlaces.show');
Route::get('/enlaces/{enlace}/edit', [EnlaceController::class, 'edit'])->name('enlaces.edit');
Route::put('/editarenlace/{id}', [EnlaceController::class, 'update'])->name('enlaces.update');
Route::post('/obtenerenlace', [EnlaceController::class, 'ObtenerEnlace'])->name('enlaces.ObtenerEnlace');
Route::delete('/borrarenlace/{id}', [EnlaceController::class, 'destroy'])->name('enlaces.destroy');
Route::post('/buscarenlace', [EnlaceController::class, 'BuscarEnlace'])->name('enlaces.buscar');
//finenlaces
//contactos
Route::get('/contactos', [ContactoController::class, 'index']); // Obtener todos los contactos
Route::post('/contactos', [ContactoController::class, 'store']); // Crear un nuevo contacto
Route::get('/contactos/{id}', [ContactoController::class, 'show']); // Obtener un contacto por su ID
Route::put('/contactos/{id}', [ContactoController::class, 'update']); // Actualizar un contacto por su ID
Route::delete('/borrarconin/{id}', [ContactoController::class, 'destroy'])->name('contacto.destroy');
Route::post('/buscarcon', [ContactoController::class, 'BuscarCon'])->name('contacto.buscar');

// Rutas para filtrar contactos por tipo
Route::get('/contactosinternos', [ContactoController::class, 'internos']); // Obtener todos los contactos internos
Route::get('/contactosexternos', [ContactoController::class, 'externos']); // Obtener todos los contactos externos
//fin de contactos
//anuncios
Route::get('/anuncios', [AnuncioController::class, 'index'])->name('anuncios.index');
Route::get('/anuncios/create', [AnuncioController::class, 'create'])->name('anuncios.create');
Route::post('/anuncios', [AnuncioController::class, 'store'])->name('anuncios.store');
Route::get('/anuncios/{id}', [AnuncioController::class, 'show'])->name('anuncios.show');
Route::get('/anuncios/{id}/edit', [AnuncioController::class, 'edit'])->name('anuncios.edit');
Route::put('/anuncios/{id}', [AnuncioController::class, 'update'])->name('anuncios.update');
Route::delete('/borraranuncio/{id}', [AnuncioController::class, 'destroy'])->name('anuncios.destroy');
//finanuncios

Route::get('/csrf-token', function() {
    return response()->json([csrf_token()]);
});
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


require __DIR__.'/auth.php';
