<?php

namespace App\Http\Controllers;

use App\Models\InvitationNotificationInvited;
use Illuminate\Http\Request;

class InvitationNotificationInvitedController extends Controller
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

        $notification= new InvitationNotificationInvited([
            'invitedid' => $request->get('invitedid'),
            'meetingid'=> $request->get('meetingid')
        ]);
        $notification->save();
        $mailer= new MeetingMailController();
        # Send Request via GMAIL
        $mailer->sendInvitedMeetingMail($request);
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
        $notification= InvitationNotificationInvited::find($id);
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

        $notification= InvitationNotificationInvited::find($id);
        $notification->doctorid = $request->get('invitedid');
        $notification->meetingid = $request->get('meetingid');
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
        $notification= InvitationNotificationInvited::find($id);
        $notification->delete();
    }




}
