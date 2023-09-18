<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Cassandra\Exception\ValidationException;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    #protected $redirectTo = RouteServiceProvider::HOME;

//    public function authenticated()
//    {
//        if (Auth::user()->role=='1'){
//            return redirect('admin/Interface')->with('status','Welcome to Admin Dashboard');
//        }
//        else if (Auth::user()->role=='0') {
//            return redirect('subjectController/Interface')->with('status','Welcome to Controller Dashboard');
//        }
//        else if (Auth::user()->role=='2'){
//            return redirect('doctor/Interface')->with('status','Welcome to Doctor Dashboard');
//        }
//        else if (Auth::user()->role=='3'){
//            return redirect('initiator/Interface')->with('status','Welcome to initiator Dashboard');
//        }
//        else {
//            return redirect('/');
//        }
//    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
