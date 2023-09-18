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


// ROutes with Namespaces
// دي معناها اني هشتغل علي ملف كنترولر واحد بس و بحدده و بحدد اسمه

Route:: namespace('Front')->group(function (){
    #Route::get("user","UserController@ShowMyName");

    Route::get('user',[UserController::class, 'ShowMyName']); //  ----> Laravel 8 Syntax


    Route::get('/testMostafa/{id?}', function () { // id is not required and Must be sent to Funtion ROute of test 2
        return "this is test 6666 page" ;
    });

});
