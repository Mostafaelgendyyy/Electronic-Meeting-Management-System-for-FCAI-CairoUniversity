<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Front\UserController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route:: prefix('usser') ->group(function (){
    Route::get('show',[UserController::class,'ShowMyName']);
    Route::delete('Delete',[UserController::class,'ShowMyName']);
});

// MiddleWare is making URL Hidden sometimes as you are not login ...

