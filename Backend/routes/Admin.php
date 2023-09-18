<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\adminController;

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

Route::get('/Admin', function () {
    return view('welcome');
});

Route::get('/test1', function () {
    return "view('welcome')";
});

// Route Parameters (Sending Parameters while Routing)

Route::get('/test2/{id}', function ($id) { // id is required and Must be sent to Funtion ROute of test 2
    return $id ;
});

Route::get('/test3/{id?}', function () { // id is not required and Must be sent to Funtion ROute of test 2
    return "this is test 3 page" ;
});

// Routing Name (Name the Routing Methods to be used in another Place


Route::get('/test4/{id?}', function () { // id is not required and Must be sent to Funtion ROute of test 2
    return "this is test 4 page" ;
}) -> name("Routing#1 landing");

Route::get('/test5/{id?}', function () { // id is not required and Must be sent to Funtion ROute of test 2
    return "this is test 5 page" ;
}) -> name("Routing#2 of test#4");

Route::get('get',function (){
    $adminC = new adminController();
    $adminC->ShowMyName();
});
// ROutes with Namespaces




Route::get('/getAdmin/{id}',[adminController::class,'show']);

