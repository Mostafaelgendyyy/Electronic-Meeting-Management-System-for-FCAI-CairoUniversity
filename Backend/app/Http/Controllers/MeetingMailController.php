<?php

namespace App\Http\Controllers;

use App\Mail\MeetingMail;
use App\Models\Invited;
use App\Models\meeting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MeetingMailController extends Controller
{
    //
    public function sendMeetingMail(Request $request)
    {
        $doctor=User::find($request->get("doctorid"));
        $meeting= meeting::find($request->get("meetingid"));
        $Initiator = User::find($meeting->initiatorid);
        $details=[
            'title'=>'Hello, '.$doctor->name,
            'body'=>'There is a meeting of '.$meeting->topic.' in Date ('.$meeting->date. ') held by '. $Initiator->name
        ];
        Mail::to($doctor->email)->send(new MeetingMail($details));
        return "Your Mail is sent";
    }

    public function sendInvitedMeetingMail(Request $request)
    {
        $invited=Invited::find($request->get("invitedid"));
        $meeting= meeting::find($request->get("meetingid"));
        $Initiator = User::find($meeting->initiatorid);
        $details=[
            'title'=>'Hello, '.$invited->name,
            'body'=>'There is a meeting of '.$meeting->topic.' in Date ('.$meeting->date. ') held by '. $Initiator->name
        ];
        Mail::to($invited->email)->send(new MeetingMail($details));
        return "Your Mail is sent";
    }
}
