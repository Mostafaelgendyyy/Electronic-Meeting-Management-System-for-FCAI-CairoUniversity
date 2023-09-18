<?php

namespace App\Http\Controllers;

use App\Models\InvitationNotificationInvited;
use App\Models\InvitationNotifications;
use App\Models\Invited;
use App\Models\meeting;
use App\Models\MeetingSubjects;
use App\Models\subject;
use App\Models\subjecttype;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Alkoumi\LaravelArabicNumbers\Numbers;
use Nette\MemberAccessException;

class meetingController extends Controller
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
    public function getlast($initiatorid)
    {
        return meeting::where('initiatorid',$initiatorid)->get()->last();
    }
    public function store(Request $request)
    {
        //
//        $this->validate([
//            'initiatorid'=> 'required',
//            'location'=> 'required',
//            'date'=> 'required',
//            'topic'=> 'required'
//        ]);



        $Meeting = new meeting([
            'initiatorid' => $request->get('initiatorid'),
            'placeid'=> $request->get('placeid'),
            'date'=> $request->get('date'),
            'meetingtypeid'=> $request->get('meetingtypeid'),
            'islast'=>'1',
            'startedtime'=>$request->get('startedtime')

        ]);
        $Meeting->save();

    }
//$time = $meeting['startedtime'];
//$formattedTime = date('h:i A', strtotime($time));
//$meeting['startedtime']=$formattedTime;
//
//$time = $meeting['endedtime'];
//$formattedTime = date('h:i A', strtotime($time));
//$meeting['endedtime']=$formattedTime;
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $meeting = meeting::find($id);
        $meeting['date']=Numbers::ShowInArabicDigits($meeting['date']);
        $meeting['startedtime']=Numbers::ShowInArabicDigits($meeting['startedtime']);
        $meeting['endedtime']=Numbers::ShowInArabicDigits($meeting['endedtime']);


        return $meeting;
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
//            'initiatorid'=> 'required',
//            'location'=> 'required',
//            'date'=> 'required',
//            'topic'=> 'required'
//        ]);
        $Meeting = meeting::find($id);

        $Meeting->initiatorid = $request->get('initiatorid');
        $Meeting->placeid = $request->get('placeid');
        $Meeting->date = $request->get('date');
        $Meeting->meetingtypeid = $request->get('meetingtypeid');
        $Meeting->save();
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
        $Meeting=meeting::find($id);
        $Meeting->delete();
    }

    public function updatePrev($id){
        meeting::where([['initiatorid',$id],['islast',-1]])->update(['islast'=>'0']);
    }
    public function updatelastofInitiator($id){

        meeting::where([['initiatorid',$id],['islast',1]])->update(['islast'=>'-1']);
    }
    public function getlastofInitiator($id){

        $filter = meeting::where([['initiatorid',$id],['islast',1]])->get();
        return $filter;
    }

    public function getPrevious($id){
        return meeting::where([
            ['initiatorid',$id],
            ['islast',-1]
        ])->get();
    }

    public function isLast($id){
        $me= meeting::find($id);
        if ($me->islast==1){
            return true;
        }
        return false;
    }

    public function isPrevious($id){
        $me= meeting::find($id);
        if ($me->islast==-1){
            return true;
        }
        return false;
    }

    public function isDone($id){
        $me= meeting::find($id);
        $NowDT = Carbon::now()->toDateString();
        if ($me->date > $NowDT){
            return true;
        }
        return false;
    }
    public function showInitiator($Id){
        return meeting::where(['meetingid',$Id])->select('initiatorid');
    }

    public function RetreivedataforLast($initiatorid){
        $NowDT = Carbon::now()->toDateString();

        $last = meeting::where([
            ['initiatorid',$initiatorid],
            ['islast',1],
        ])->get();
        foreach($last as $key=>$value)
        {
            if($NowDT < $value['date'])
            {
                return $value;
            }
//            $subjects = MeetingSubjects::where('meetingid',$value['meetingid'])->get();
//            return $subjects;
        }
    }

    public function addEnded($id)
    {

        $NowDT = Carbon::now()->toTimeString();
        $meeting = meeting::find($id);
        $meeting->endedtime= $NowDT;
        $meeting->save();
    }



    public function FinalizeMeeting($meetingid)
    {
        $this->addEnded($meetingid);
        $initiatorid = meeting::select('initiatorid')->find($meetingid);
        $this->updatePrev($initiatorid['initiatorid']);
        $this->updatelastofInitiator($initiatorid['initiatorid']);
    }



    /************* PRevious ********/
    public function DataPreviousforPDF ($initiatorid){

        $last = meeting::where([
            ['initiatorid',$initiatorid],
            ['endedtime','!=','00:00:00']
        ])->get()->last();

        $subjects = MeetingSubjects::where('meetingid',$last->meetingid)->get();
        $subjectData=array();
        foreach($subjects as $k =>$v)
        {
            $subjectdata= subject::find($v['subjectid']);
            $arr = [
                'subjectdata' => $subjectdata,
                'subjecttype' => subjecttype::select('name')->find($subjectdata['subjecttypeid'])
            ];
            array_push($subjectData,$arr);
        }

        $attendee= InvitationNotifications::where([
            ['meetingid',$last->meetingid],
            ['fromoutside',0],
            ['status',1],
            ['accepted',1]
        ])->get();
        $attendeeData=array();
        foreach($attendee as $k =>$v)
        {
            array_push($attendeeData, User::find($v['doctorid']));
        }
        $absence= InvitationNotifications::where([
            ['meetingid',$last->meetingid],
            ['status',0]
        ])->orwhere([
            ['meetingid',$last->meetingid],
            ['accepted',0]
        ])->get();


        $absenceData=array();
        foreach($absence as $k =>$v)
        {
            array_push($absenceData, User::find($v['doctorid']));
        }

        $InvitedUsers = InvitationNotifications::where([
            ['meetingid',$last->meetingid],
            ['fromoutside',1]
        ])->get();
        $Invited= InvitationNotificationInvited::where([
            ['meetingid',$last->meetingid],
        ])->get();
        $invitedData=array();
        foreach($InvitedUsers as $k =>$v)
        {
            array_push($invitedData, User::find($v['doctorid']));
        }

        foreach($Invited as $k =>$v)
        {
            array_push($invitedData, Invited::find($v['invitedid']));
        }
        $informations = meeting::join('users','users.id', '=', 'meetings.initiatorid')
            ->join('adminstrations','users.adminstrationid','=','adminstrations.id')
            ->join('places','meetings.placeid','=','places.id')
            ->join('meetingtypes','meetings.meetingtypeid','=','meetingtypes.id')
            ->select('meetings.meetingid', 'places.placename', 'meetings.islast', 'meetings.date','meetingtypes.name as meetingtype','meetings.startedtime', 'meetings.endedtime','users.name', 'users.jobdescription','adminstrations.ar_name as arabicname','adminstrations.eng_name as englishname')
//            ->where('meetings.meetingid',$last->meetingid)
            ->where('meetings.initiatorid',$initiatorid)
            ->where("meetings.endedtime","!=","00:00:00")->get()->last();

        $meetingSubjects = MeetingSubjects::join('meetings','meetings.meetingid', '=', 'meeting_subjects.meetingid')
            ->join('subjects','subjects.subjectid','=','meeting_subjects.subjectid')
            ->join('subjecttypes','subjects.subjecttypeid','=','subjecttypes.id')
            ->select('subjecttypes.name', 'subjects.description','meeting_subjects.decision')
//            ->where('meetings.meetingid',$last->meetingid)
            ->where('meetings.initiatorid',$initiatorid)
            ->where("meetings.endedtime","!=","00:00:00")
            ->orderBy('subjecttypes.id','ASC')
            ->get();
        return [
            'information'=> $informations,
            'meetingsubject'=> $meetingSubjects,
            'attendee'=>$attendee,
            'attendeeData'=>$attendeeData,
            'absence'=>$absence,
            'absenceData'=>$absenceData,
            'invited'=>[$InvitedUsers,$Invited],
            'invitedData'=>$invitedData
        ];
    }

    public function DataPreviousforPDFCONTROLLER ($controllerid){

        $adminstration = User::select('adminstrationid')->find($controllerid);
        $initiatorData = User::where([
            ['adminstrationid',$adminstration['adminstrationid']],
            ['role',3],
            ['jobdescription','رئيس قسم']
        ])->get();
        $initiatorid =0;
        foreach($initiatorData as $key => $value)
        {
            $initiatorid=$value['id'];
        }
        $last = meeting::where([
            ['initiatorid',$initiatorid],
            ['endedtime','!=','00:00:00']
        ])->get()->last();


        $subjects = MeetingSubjects::where('meetingid',$last->meetingid)->get();
        $subjectData=array();
        foreach($subjects as $k =>$v)
        {
            $subjectdata= subject::find($v['subjectid']);
            $arr = [
                'subjectdata' => $subjectdata,
                'subjecttype' => subjecttype::select('name')->find($subjectdata['subjecttypeid'])
            ];
            array_push($subjectData,$arr);
        }

        $attendee= InvitationNotifications::where([
            ['meetingid',$last->meetingid],
            ['fromoutside',0],
            ['status',1],
            ['accepted',1]
        ])->get();
        $attendeeData=array();
        foreach($attendee as $k =>$v)
        {
            array_push($attendeeData, User::find($v['doctorid']));
        }
        $absence= InvitationNotifications::where([
            ['meetingid',$last->meetingid],
            ['status',0]
        ])->orwhere([
            ['meetingid',$last->meetingid],
            ['accepted',0]
        ])->get();


        $absenceData=array();
        foreach($absence as $k =>$v)
        {
            array_push($absenceData, User::find($v['doctorid']));
        }

        $InvitedUsers = InvitationNotifications::where([
            ['meetingid',$last->meetingid],
            ['fromoutside',1]
        ])->get();
        $Invited= InvitationNotificationInvited::where([
            ['meetingid',$last->meetingid],
        ])->get();
        $invitedData=array();
        foreach($InvitedUsers as $k =>$v)
        {
            array_push($invitedData, User::find($v['doctorid']));
        }

        foreach($Invited as $k =>$v)
        {
            array_push($invitedData, Invited::find($v['invitedid']));
        }
        $informations = meeting::join('users','users.id', '=', 'meetings.initiatorid')
            ->join('adminstrations','users.adminstrationid','=','adminstrations.id')
            ->join('places','meetings.placeid','=','places.id')
            ->join('meetingtypes','meetings.meetingtypeid','=','meetingtypes.id')
            ->select('meetings.meetingid', 'places.placename', 'meetings.islast', 'meetings.date','meetingtypes.name as meetingtype','meetings.startedtime', 'meetings.endedtime','users.name', 'users.jobdescription','adminstrations.ar_name as arabicname','adminstrations.eng_name as englishname')
            ->where('meetings.initiatorid',$initiatorid)
            ->where("meetings.endedtime","!=","00:00:00")->get()->last();

        $meetingSubjects = MeetingSubjects::join('meetings','meetings.meetingid', '=', 'meeting_subjects.meetingid')
            ->join('subjects','subjects.subjectid','=','meeting_subjects.subjectid')
            ->join('subjecttypes','subjects.subjecttypeid','=','subjecttypes.id')
            ->select('subjecttypes.name', 'subjects.description','meeting_subjects.decision')
            ->where('meetings.initiatorid',$initiatorid)
            ->where("meetings.endedtime","!=","00:00:00")
            ->orderBy('subjecttypes.id','ASC')
            ->get();
        return [
            'information'=> $informations,
            'meetingsubject'=> $meetingSubjects,
            'attendee'=>$attendee,
            'attendeeData'=>$attendeeData,
            'absence'=>$absence,
            'absenceData'=>$absenceData,
            'invited'=>[$InvitedUsers,$Invited],
            'invitedData'=>$invitedData
        ];
    }
//    public function DataPreviousforPDF ($initiatorid){
//        $last = meeting::select('meetingid')->where([
//            ['initiatorid',$initiatorid],
//            ['islast',-1]
//        ])->get();
//
//        foreach($last as $key=>$value)
//        {
//            $initiatorData = User::find($initiatorid);
//            $MeetingData = meeting::find($value['meetingid']);
//            $subjects = MeetingSubjects::where('meetingid',$value['meetingid'])->get();
//            $subjectData=array();
//            foreach($subjects as $k =>$v)
//            {
//                $subjectdata= subject::find($v['subjectid']);
//                $arr = [
//                    'subjectdata' => $subjectdata,
//                    'subjecttype' => subjecttype::select('name')->find($subjectdata['subjecttypeid'])
//                ];
//                array_push($subjectData,$arr);
//            }
//            $attendee= InvitationNotifications::where([
//                ['meetingid',$value['meetingid']],
//                ['fromoutside',0],
//                ['status',1]
//            ])->get();
//            $attendeeData=array();
//            foreach($attendee as $k =>$v)
//            {
//                array_push($attendeeData, User::find($v['doctorid']));
//            }
//            $absence= InvitationNotifications::where([
//                ['meetingid',$value['meetingid']],
//                ['status',0]
//            ])->orwhere([
//                ['meetingid',$value['meetingid']],
//                ['accepted',0]
//            ])->get();
//
//
//            $absenceData=array();
//            foreach($absence as $k =>$v)
//            {
//                array_push($absenceData, User::find($v['doctorid']));
//            }
//
//            $InvitedUsers = InvitationNotifications::where([
//                ['meetingid',$value['meetingid']],
//                ['fromoutside',1]
//            ])->get();
//            $Invited= InvitationNotificationInvited::where([
//                ['meetingid',$value['meetingid']],
//            ])->get();
//            $invitedData=array();
//            foreach($InvitedUsers as $k =>$v)
//            {
//                array_push($invitedData, User::find($v['doctorid']));
//            }
//
//            foreach($Invited as $k =>$v)
//            {
//                array_push($invitedData, Invited::find($v['invitedid']));
//            }
//            return [
//                'meetingdata'=>$MeetingData,
//                'initatordata'=>$initiatorData,
//                'subjects'=>$subjects,
//                'subjectsData'=>$subjectData,
//                'attendee'=>$attendee,
//                'attendeeData'=>$attendeeData,
//                'absence'=>$absence,
//                'absenceData'=>$absenceData,
//                'invited'=>[$InvitedUsers,$Invited],
//                'invitedData'=>$invitedData
//            ];
//        }
//    }


    public function getUpcomingMeetingsforcontroller($controllerid){
        $NowDT = Carbon::now()->toDateString();
        $controllerdept = User::select('adminstrationid')->find($controllerid);
        $UpcomingMeetings = meeting::select('meetingid','initiatorid')->where([
            ['date', '>', $NowDT]
            //[User::select('adminstrationid')->find($controllerid),$initiatordept['adminstrationid']]
        ])->get();
        $UpcomingMeetingsSatisfied= array();
        foreach($UpcomingMeetings as $key=>$value)
        {
            $initiatordept=User::select('adminstrationid')->find($value['initiatorid']);
            if($controllerdept['adminstrationid'] == $initiatordept['adminstrationid'])
            {

                array_push($UpcomingMeetingsSatisfied,$value['meetingid']);

            }
        }
        $Arr_meetings = array();
        $meetings = meeting::whereIn('meetingid',$UpcomingMeetingsSatisfied)->get();
        foreach($meetings as $k =>$v)
        {
            $v['date']= Numbers::ShowInArabicDigits($v['date']);
            $v['startedtime']=Numbers::ShowInArabicDigits($v['startedtime']);
            $v['endedtime']=Numbers::ShowInArabicDigits($v['endedtime']);
            array_push($Arr_meetings,$v);
        }
        return $Arr_meetings;
    }

    public function getUpcomingMeetingsforDoctor($doctorid){
        $NowDT = Carbon::now()->toDateString();
        $Invitation = InvitationNotifications::where('doctorid',$doctorid)->get();
        $UpcomingID=0;
        $mindate='50000-08-06';
        if(count($Invitation)>0)
        {
            foreach ($Invitation as $k => $v)
            {
                $meetings=meeting::find($v['meetingid']);

                if($NowDT < $meetings['date']){


                    if($meetings['date']<$mindate )
                    {

                        $mindate=$meetings['date'];
                        $UpcomingID=$meetings['meetingid'];
                    }
                }
            }
            $meeting = $this->show($UpcomingID);
            return $meeting;
        }
    }

//    public function getUpcomingMeetings($id){
//        $NowDT = Carbon::now()->toDateString();
//        $initiatordept = User::select('adminstrationid')->find($id);
//        return meeting::where([
//            ['date', '>', $NowDT],
//            [User::select('adminstrationid')->find($id),$initiatordept['adminstrationid']]
//        ])->get();
//    }

    public function getUpcomingMeetingsforInitiator($initiatorid){
        $NowDT = Carbon::now()->toDateString();
        $meetingofInitiator = meeting::where([
            ['date', '>', $NowDT],
            ['initiatorid',$initiatorid],
            ['endedtime','00:00:00']
        ])->get();
//        $meetinginvitedfromInit= MeetingSubjects::select('meetingid')->where('doctorid',$initiatorid)->get();
        $UpcomingID=0;
        $mindate='50000-08-06';

        foreach ($meetingofInitiator as $k => $v)
        {

            if($v['date']<$mindate)
            {

                $mindate=$v['date'];
                $UpcomingID=$v['meetingid'];
            }
        }

        $meetinginvited= $this->getUpcomingMeetingsforDoctor($initiatorid);

        $meetingdata = meeting::find($UpcomingID);
        if(empty($meetinginvited))
        {
            $meeting= $meetingdata;
        }
        else{
            $meetinginviteddata=meeting::find($meetinginvited['meetingid']);

            if ($meetingdata['date']<$meetinginviteddata['date'])
            {
                $meeting = $this->show($UpcomingID);
            }
            elseif ($meetingdata['date']>$meetinginviteddata['date'])
            {
                $meeting = $this->show($meetinginvited['meetingid']);
            }

        }
        $meeting['date']=Numbers::ShowInArabicDigits($meeting['date']);
        $meeting['startedtime']=Numbers::ShowInArabicDigits($meeting['startedtime']);
        $meeting['endedtime']=Numbers::ShowInArabicDigits($meeting['endedtime']);
        return $meeting;
    }
}
