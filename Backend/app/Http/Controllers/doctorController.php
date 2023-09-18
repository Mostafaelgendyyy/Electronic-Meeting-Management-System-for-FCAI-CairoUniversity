<?php

namespace App\Http\Controllers;

use Alkoumi\LaravelArabicNumbers\Numbers;
use App\Models\doctor;
use App\Models\InvitationNotifications;
use App\Models\meeting;
use App\Models\User;
use Illuminate\Http\Request;

class doctorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()

    {
//        $this->middleware('auth');
//        $this->middleware('role:ROLE_DOCTOR');
    }
    public function index()
    {
        //
        return view('doctor');
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
//            [
//                'name' =>'required',
//                'email' =>'required',
//                'password' =>'required',
//                'adminstration' =>'required',
//            ]);
        $Doctor = new User([
            'adminstrationid' =>$request->get('adminstrationid'),
            'email' =>$request->get('email'),
            'password' =>bcrypt($request->get('password')),
            'role' =>'2',
            'name' =>$request->get('name'),
            'jobdescription'=>$request->get('jobdescription')
            ]);

        $Doctor->save();
        ///////Return ROUTING SUCCESSSS
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Doctor= User::find($id);
        dd($Doctor);

    }
    public function showbyEmail($EMail)
    {
        $Doctor= User::where('email',$EMail);
        dd($Doctor);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
//            ['adminid'=>'required',
//                'name' =>'required',
//                'email' =>'required',
//                'password' =>'required',
//                'department' =>'required',
//                'isinitiator'=>'required'
//            ]);
        $Doctor = User::find($id);
        if ($Doctor->role=="2")
        {
            $Doctor->name =$request->get('name');
            $Doctor->email =$request->get('email');
            $Doctor->password =$request->get('password');
            $Doctor->adminstration =$request->get('adminstration');
            $Doctor->save();
        }
        // ROUTINGGGGGGGGGG
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Doctor = User:: find($id);
        if ($Doctor->role=="2")
        {
            $Doctor->delete();
        }
        else {
            return 'cannot delete this User';
        }

    }
//
//    public function voteforsubject(Request $request){
//        $csc= new containerSubjectController();
//        $csc->voteAccept($request);
//    }


    public function getPreviousMeeting($id){
        $INC= new InvitationNotificationsController();
        $meetingid= $INC->findlastfordoctor($id);
        $MC= new meetingController();
        $controller= $MC->showInitiator($meetingid);
        return $controller;
//        $bool=$MC->isDone($meetingid);
////        if(==true){
////            return $MC->show($meetingid);
////        }
//        return $bool;
    }


    public function getNotification($id){
        $meetings= InvitationNotifications::select('meetingid')->where('doctorid',$id)->get();
        $meetingsData= meeting::find($meetings);

        foreach($meetingsData as $key=>$value)
        {
            $value['date']= Numbers::ShowInArabicDigits($value['date']);
            $value['startedtime']=Numbers::ShowInArabicDigits($value['startedtime']);
            $value['endedtime']=Numbers::ShowInArabicDigits($value['endedtime']);
            $meetingInitiator = User::find($value['initiatorid']);

            $Returned[] = [
                'meeting' => $value,
                'initiator' => $meetingInitiator
            ];

        }
        return $Returned;
    }
    public function subjectsOfMeetingForDoctors(Request $request){
        $INC= new InvitationNotificationsController();
        $returned = $INC->search($request);
        if (sizeof($returned)==1)
        {
            $MSC= new MeetingSubjectsController();
            foreach ($returned as $key=>$value)
            return $MSC->getSubjectsofMeeting($value['meetingid']);
        }
    }
}
