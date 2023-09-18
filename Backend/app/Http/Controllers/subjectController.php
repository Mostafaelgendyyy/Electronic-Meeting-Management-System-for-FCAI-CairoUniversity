<?php

namespace App\Http\Controllers;

use Alkoumi\LaravelArabicNumbers\Numbers;
use App\Models\meeting;
use App\Models\MeetingSubjects;
use App\Models\meetingtype;
use App\Models\subject;
use App\Models\subjecttype;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class subjectController extends Controller
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
    //
//        $this->validate([
//            'creatorid'=> 'required',
//            'controllerid'=> 'required',
//            'description'=> 'required',
//            'finaldesicion'=> 'required',
//            'iscompleted'=> 'required',
//            'from'=> 'required'
//        ]);


    public function store(Request $request)
    {
        $creatorrole = User::select('role')->find($request->get('userid'));
        if ($creatorrole['role']==3)
        {
            $lastmeeting = meeting::where('initiatorid',$request->get('userid'))->get()->last();
            $NowDT = Carbon::now()->toDateString();
            if ($NowDT < $lastmeeting['date']){
                $MS= new MeetingSubjectsController();
                $subject= new subject([
                    'userid' => $request->get('userid'),
                    'description' => $request->get('description'),
                    'subjecttypeid'=> $request->get('subjecttypeid'),
                    'iscompleted' => 1
                ]);
                $subject->save();
                $subid= subject::select('subjectid')->where('userid',$request->get('userid'))->get()->last();
                $requestforSubject= new Request();
                $requestforSubject->merge(['meetingid'=>strval($lastmeeting['meetingid']),'subjectid'=>strval($subid['subjectid'])]);
                $MS->store($requestforSubject);
                return subject::where('userid',$request->get('userid'))->get()->last();
            }
            else{
                $subject= new subject([
                    'userid' => $request->get('userid'),
                    'description' => $request->get('description'),
                    'subjecttypeid'=> $request->get('subjecttypeid'),
                    'iscompleted' => 0
                ]);
                $subject->save();
                return subject::where('userid',$request->get('userid'))->get()->last();
            }
        }
        else{
            $subject= new subject([
                'userid' => $request->get('userid'),
                'description' => $request->get('description'),
                'subjecttypeid'=> $request->get('subjecttypeid'),
                'iscompleted' => 0
            ]);
            $subject->save();
            return subject::where('userid',$request->get('userid'))->get()->last();
        }
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
        $subject=subject::find($id);
        return $subject;
    }

    public function showByDesc($Desc)
    {
        //
        $subject = subject::where('description', 'LIKE', '%'.$Desc.'%')
            ->get();
        return $subject;
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
        $subject= subject::find($id);
        $subject->controllerid= $request->get('controllerid');
        $subject->description= $request->get('description');
        $subject->finaldesicion= $request->get('finaldesicion');
        $subject->iscompleted= $request->get('iscompleted');
        $subject->save();
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
        $subject=subject::find($id);
        $subject->delete();
    }

    public function getSubjects($controllerid){
        $controllerAdminstration = User::select('adminstrationid')->find($controllerid);

        $subjects= subject::select('subjectid','userid')
            ->where('iscompleted',0)->get();
        $IDS = array();
        //return $subjects;

        foreach ($subjects as $key=>$value){
            $subjectinMeeting= MeetingSubjects::where('subjectid',$value['subjectid'])->get();
            $users= User::select('adminstrationid')->find($value['userid']);

            //return $controllerAdminstration ;
            if ($users['adminstrationid'] == $controllerAdminstration['adminstrationid'] && count($subjectinMeeting)==0)
            {
                array_push($IDS,$value['subjectid']);
            }

        }
        return subject::find($IDS);
    }

    //public function getArchived()


    public function redirectSubject(Request $request,$id){
        $subject=subject::find($id);
        $deptfrom = $subject->to;
        $subject->from=$deptfrom;
        $subject->to= $request->get('to');
        $subject->save();
    }




    public function showArchive($initiatorid){

        $intiatorAdminstration = User::select('adminstrationid')->find($initiatorid);

        $subjects= subject::where('iscompleted',1)->get();
        $IDS = array();
        foreach ($subjects as $key=>$value){
            $users= User::select('adminstrationid')->find($value['userid']);

            //return $controllerAdminstration ;

            if ($users['adminstrationid'] == $intiatorAdminstration['adminstrationid'])
            {
                array_push($IDS,$value['subjectid']);
            }

        }
        $maglskolyaID=0;
        $maglskolya = meetingtype::where('name','LIKE', '%مجلس الكلية%')->get();
        foreach($maglskolya as $key => $value){
            $maglskolyaID = $value['id'];
        }

        $meetingIDs= meeting::select('meetingid')->where('meetingtypeid',$maglskolyaID)->get();
        // عرض مواضيع القسم و مواضيع مجلس الكلية فقط


        foreach($meetingIDs as $key=>$value){
            $subjects= MeetingSubjects::where('meetingid',$value['meetingid'])->get();
            foreach($subjects as $k =>$v)
            {
                array_push($IDS,$v['subjectid']);

            }

        }

        //return MeetingSubjects::whereIn('subjectid',$IDS)->get();
        $returnedList=array();

        foreach($IDS as $id)
        {
            $subjectData= subject::find($id);
            $subjecttypeid=subject::select('subjecttypeid')->find($id);
            $subjecttypename= subjecttype::select('name')->find($subjecttypeid);
            $meetingid = MeetingSubjects::where('subjectid',$id)->get();
            foreach($meetingid as $k => $v){
                $decision= $v['decision'];
                $meetingdata = meeting::find($v['meetingid']);
                $meetingdata['date']=Numbers::ShowInArabicDigits($meetingdata['date']);
                $meetingdata['startedtime']=Numbers::ShowInArabicDigits($meetingdata['startedtime']);
                $meetingdata['endedtime']=Numbers::ShowInArabicDigits($meetingdata['endedtime']);
                $meetingtypeid=meeting::select('meetingtypeid')->find($v['meetingid']);
                $meetingtypename= meetingtype::select('name')->find($meetingtypeid);
                $list = [
                    'subjectData'=>$subjectData,
                    'subjecttype'=>$subjecttypename,
                    'decision'=>$decision,
                    'meetingdata'=>$meetingdata,
                    'meetingtypename'=>$meetingtypename
                ];
                array_push($returnedList,$list);

            }
        }
        return $returnedList;


    }

/*
public function showArchive($initiatorid){

        $intiatorAdminstration = User::select('adminstrationid')->find($initiatorid);

        $subjects= subject::select('subjectid','userid')
            ->where('iscompleted',1)->get();
        $IDS = array();
        foreach ($subjects as $key=>$value){
            $users= User::select('adminstrationid')->find($value['userid']);

            //return $controllerAdminstration ;

            if ($users['adminstrationid'] == $intiatorAdminstration['adminstrationid'])
            {
                array_push($IDS,$value['subjectid']);
            }

        }

        $meetingIDs= meeting::select('meetingid')->where('meetingtype','مجلس كلية')->get();


        foreach($meetingIDs as $key=>$value){
            $subjects= MeetingSubjects::where('meetingid',$value['meetingid'])->get();
            foreach($subjects as $k =>$v)
            {
                array_push($IDS,$v['subjectid']);

            }

        }

        return MeetingSubjects::whereIn('subjectid',$IDS)->get();

    }
 */
}
