<?php

namespace App\Http\Controllers;

use App\Models\InvitationNotifications;
use App\Models\User;
use Illuminate\Http\Request;

class InvitationNotificationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
//        $this->validate([
//            'doctorid'=> 'required',
//            'meetingid'=> 'required',
//            'status'=> 'required',
//            'reason'=> 'required'
//        ]);
        $notification= new InvitationNotifications([
            'doctorid' => $request->get('doctorid'),
            'meetingid'=> $request->get('meetingid'),
            'fromoutside'=> $request->get('fromoutside')
        ]);
        $notification->save();
        $mailer= new MeetingMailController();
        # Send Request via GMAIL
        $mailer->sendMeetingMail($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $notification= InvitationNotifications::find($id);
        return $notification;

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
        //
//        $this->validate([
//            'doctorid'=> 'required',
//            'meetingid'=> 'required',
//            'status'=> 'required',
//        ]);
        $notification= InvitationNotifications::find($id);
        $notification->doctorid = $request->get('doctorid');
        $notification->meetingid = $request->get('meetingid');
        $notification->status = $request->get('status');
        return $notification;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $notification= InvitationNotifications::find($id);
        $notification->delete();
    }

    public function putAttendance(Request $request){
        $data = $request->all();
        foreach($data as $key => $value)
        {
            InvitationNotifications::where(
                [
                    ['doctorid',$value['doctorid']],
                    ['meetingid',$value['meetingid']]
                ])->update(['status'=>1]);
        }
    }

    public function putAbsent(Request $request){
        $data = $request->all();
        foreach($data as $key => $value) {
            InvitationNotifications::where(
                [
                    ['doctorid', $value['doctorid']],
                    ['meetingid', $value['meetingid']]
                ])->update(['status'=> 0]);
        }
    }

    public function findlastfordoctor($id){
        return InvitationNotifications::where('doctorid',$id)->select('meetingid')->get()->last();
    }

    public function acceptRequest(Request $request)
    {
        InvitationNotifications::where(
            [
                ['doctorid',$request->get('doctorid')],
                ['meetingid',$request->get('meetingid')]
            ])->update(['accepted'=>1]);
    }

    public function rejectRequest(Request $request)
    {
        InvitationNotifications::where(
            [
                ['doctorid',$request->get('doctorid')],
                ['meetingid',$request->get('meetingid')]
            ])->update(['accepted'=>0]);
    }

    public function search(Request $request){
        return InvitationNotifications::where([
            ['doctorid',$request->get('doctorid')],
            ['meetingid',$request->get('meetingid')]
        ])->get();
    }

    public function getDoctorsInvited($meetingid)
    {
        $DoctorIDS = InvitationNotifications::where(
                'meetingid',$meetingid
            )->select('doctorid')->get();

        $doctorsData = array();

        foreach($DoctorIDS as $k => $v)
        {

            array_push($doctorsData,User::find($v['doctorid']));
        }


        return $doctorsData;
    }
}
