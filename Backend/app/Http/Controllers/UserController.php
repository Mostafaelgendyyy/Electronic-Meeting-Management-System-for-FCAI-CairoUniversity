<?php

namespace App\Http\Controllers;

use App\Http\Middleware\PreventRequestsDuringMaintenance;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function index(Request $request) // Authentications
    {
        $user= User::where('email', $request->email)->first();
        // print_r($data);
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => ['These credentials do not match our records.']
            ], 404);
        }

        $token = $user->createToken('my-app-token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function store(Request $request)
    {
        $user= new User([
            'name' =>$request->get('name'),
            'email' =>$request->get('email'),
            'password' =>bcrypt($request->get('password')),
            'role' =>$request->get('role'),
            'jobdescription' =>$request->get('jobdescription')
        ]);
        $user->save();
    }

    public function show($id =null)
    {
        // Find certain admin with certain id

        return $id? User::find($id) : User::all();
    }

    public function showbyEmail($email)
    {
        // Find certain user with certain email
        $User = User::where('email',$email)->get();
        return $User;
    }

    public function update(Request $request, $id)
    {
//        $this->validate($request,
//            ['name' => 'required',
//                'email' => 'required',
//                'password' => 'required',
//                'role' => 'required'
//            ]);
        $user = User::find($id);
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->password = bcrypt($request->get('password'));
        $user->jobdescription=$request->get('jobdescription');
        $user->save();
    }

    public function changePassword(Request $request,$id){
        $user = User::find($id);
        $user->password = bcrypt($request->get('password'));
        $user->save();
    }

    public function destroy($id)
    {
        $user= User::find($id);
        $user->delete();
        ////////////////////// RETURN TO ROUTING Page access DONE
    }

    public function UpdateUserROle(Request $request,$id)
    {
        $user= User::find($id);
        $user->role= $request->get('role');
        //$user->adminstration= $request->get('adminstration');
        $user->jobdescription= $request->get('jobdescription');
        $user->save();
        ////////////////////// RETURN TO ROUTING Page access DONE
    }

    public function usersbyAdminstration($admintrationId)
    {
        return  User::where('adminstrationid',$admintrationId)->get();
    }
    public function login(Request $request){
        $user= User::where('email',$request->get('email'))->first();
        if(!$user || !Hash::check($request->get('password'),$user->password))
        {
            return response([
                'error'=>['email or password is not matched']
            ],401);
        }

        $token = $user->createToken('browser')->plainTextToken;

        $res = [
            'user' => $user,
            'token' => $token
        ];

        return response($res, 201);
//        return $user;
    }

    public function logout()
    {
        try {
           auth()->user()->tokens()->delete();
            return response()->json([
                'status'=>'true',
                'message'=>'logged out Successfully',
                'data'=>[]
            ]);
        }
        catch (\Exception $e){
            return response()->json([
                'status'=>'false',
                'message'=>$e->getMessage(),
                'data'=>[]
            ],500);
        }
    }

    public function getDoctorsandInitiator($initiatorid)
    {
        $Satisfied = User::whereIn('role',[2,3])->where('id','!=',$initiatorid)->get();
        return $Satisfied;
    }
    public function getDoctorsandInitiatorbyAdminstration($initiatorid,$adminstrationid)
    {
        $Satisfied = User::select('id')->whereIn('role',[2,3])->where([
            ['id','!=',$initiatorid],
            ['adminstrationid',$adminstrationid]
        ])->get();
        $GC= new GroupController();
        $groupid= $GC->searchbyinitiator($initiatorid);
        $GUC= new GroupUserController();
        $satisfiedlist = array();
        foreach ($Satisfied as $k =>$v)
        {
            $newRequest = new Request();
            if ($groupid==0)
            {
                array_push($satisfiedlist,$v['id']);
            }
            else{
                $newRequest->merge(['groupid'=>$groupid['id'],'doctorid' => $v['id']]);
                $GU= $GUC->searchbyDoctor($newRequest);
                if ($GU == 0)
                {
                    array_push($satisfiedlist,$v['id']);
                }
            }
        }
        $satisfiedUsers=array();
        foreach($satisfiedlist as $id){
            array_push($satisfiedUsers,User::find($id));
        }
        return $satisfiedUsers;
    }
//    public function getDoctorsandInitiatorbyAdminstration($initiatorid,$adminstrationid)
//    {
//        $Satisfied = User::whereIn('role',[2,3])->where([
//            ['id','!=',$initiatorid],
//            ['adminstrationid',$adminstrationid]
//        ])->get();
//        return $Satisfied;
//    }


    public function searchbyname($name){
//        $users = User::where([
//            ['name', 'LIKE', '%'.$name.'%'],
//            ['role',[3,2]]
//        ])->get();

        $Satisfied = User::whereIn('role',[2,3])->where('name', 'LIKE', '%'.$name.'%')->get();
        return $Satisfied;

    }

    public function checkPassword(Request $request){
        $user = User::find($request->get('id'));
        if(!Hash::check($request->get('password'),$user->password))
        {
            return response([
                'error'=>['email or password is not matched']
            ],401);
        }
        return response('Right',201);
    }
}
