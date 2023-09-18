<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
class adminController extends Controller
{
    public function __construct()

    {
//        $this->middleware('auth');
//        $this->middleware('role:ROLE_ADMIN');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        $this->validate($request,
//        ['name' =>'required',
//            'email' =>'required',
//            'password' =>'required',
//            'username' =>'required'
//        ]);
        $admin= new User([
            'name' =>$request->get('name'),
            'email' =>$request->get('email'),
            'password' =>bcrypt($request->get('password')),
            'adminstrationid' =>$request->get('adminstrationid'),
            'role'=>'1',
            'jobdescription'=>$request->get('jobdescription')
        ]);



        $admin->save(); # saving Data to Database
        ////////////////////// RETURN TO ROUTING Page access DONE
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return User[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Http\Response
     */
    public function show($adminid =null)
    {
        // Find certain admin with certain id

        return $adminid? User::find($adminid) : User::where('role','1');
//        dd($Admin);
    }

    public function showbyEmail($email)
    {
        // Find certain admin with certain email
        $Admin = User::where('email',$email)->get();
        return $Admin;
//
    }
    public function showbyUsername($username)
    {
        // Find certain admin with certain username
        $Admin = User::where('username',$username)->get();
        return $Admin;
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        ///// ROUTINGGGGGGG
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
//        $this->validate($request,
//            ['name' =>'required',
//                'email' =>'required',
//                'password' =>'required',
//                'username' =>'required'
//            ]);
        $Admin= User::find($id);
        $Admin->name=$request->get('name');
        $Admin->email=$request->get('email');
        $Admin->password=$request->get('password');
        $Admin->username=$request->get('username');
        $Admin->save();
        ////////////////////// RETURN TO ROUTING Page access DONE
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Admin= User::find($id);
        if($Admin->role=='1'){
            $Admin->delete();
        }
        else {
            return 'Cannot delete this User';
            ////////////////////// RETURN TO ROUTING Page access DONE

        }

    }
    ///////////////////////////////////     CLASS DIAGRAM ADMIN FUNCTIONALITYYY

    public function addSubjectController(Request $request){ # ROLE=>0
        $USC = new SubjectControllerController();
        $USC->store($request);
    }

    public function deleteSubjectController($id){ # ROLE=>0
        $USC = new SubjectControllerController();
        return $USC->destroy($id);
    }
    public function addAdmin(Request $request){ # ROLE=>1
        $USC = new adminController();
        $USC->store($request);
    }

    public function deleteAdmin($id){ # ROLE=>1
        $USC = new adminController();
        return $USC->destroy($id);
    }

    public function addDoctor(Request $request){# ROLE=>2
        $USC = new doctorController();
        $USC->store($request);
    }

    public function deleteDoctor($id){# ROLE=>2
        $USC = new doctorController();
        return $USC->destroy($id);
    }

    public function addInitiator(Request $request){ # ROLE=>3
        $USC = new MeetingInitiatorController();
        $USC->store($request);
    }

    public function deleteInitiator($id){ # ROLE=>3
        $USC = new MeetingInitiatorController();
        return $USC->destroy($id);
    }

    public function getControllers(){
        $users = User::where(['role'=>'0'])->get();
        return $users;
    }

    public function getAdmins(){
        $users = User::where(['role'=>'1'])->get();
        return $users;
    }

    public function getDoctors(){
        $users = User::where(['role'=>'2'])->get();
        return $users;
    }

    public function getInitiators(){
        $users = User::where(['role'=>'3'])->get();
        return $users;
    }


    public function addAdminstration(Request $request){
        $AC= new AdminstrationController();
        $AC->store($request);
    }

    public function deleteAdminstration($id){
        $AC= new AdminstrationController();
        $AC->destroy($id);
    }



    public function addPlace(Request $request){
        $PC = new PlaceController();
        $PC->store($request);
    }

    public function deletePlace($id){
        $PC = new PlaceController();
        $PC->destroy($id);
    }

}
