<?php

namespace App\Http\Controllers;

use App\Models\containerSubjects;
use App\Models\subject;
use Illuminate\Http\Request;
class containerSubjectController extends Controller
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
//        $this->validate($request,
//            ['containerid' =>'required',
//                'subjectid' =>'required',
//                'decision' =>'required'
//            ]);
        $Container= new containerSubjects([
            'containerid' => $request->get('containerid'),
            'subjectid' => $request->get('subjectid'),
            'votes-accepted'=>'0',
            'votes-rejected'=>'0'
        ]);
        $Container->save();

        // ROutingh
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
        $Container= containerSubjects::find($id);
        dd($Container);
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
//        $this->validate($request,
//            ['containerid' =>'required',
//                'subjectid' =>'required',
//                'decision' =>'required'
//            ]);
        $Container= containerSubjects::find($id);
        $Container->controllerid = $request->get('containerid');
        $Container->meetingid = $request->get('subjectid');
        $Container->name = $request->get('decision');
        $Container->save();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Container= containerSubjects::find($id);
        $Container->delete();
        //
    }

    public function getSubjectsofContainer($containerID){
        $subjectsIDS = containerSubjects::select('subjectid')->where('containerid',$containerID)->get();

        $subjectsData= subject::find($subjectsIDS);
        return $subjectsData;
    }

    public function voteAccept(Request $request){
        $subject=containerSubjects::where([
            ['containerid'=>$request->get('containerid')],
            ['subjectid'=>$request->get('subjectid')]
        ])->get();

        $acceptedvotes= intval($subject->select('votes-accepted'));
        ++$acceptedvotes;

        containerSubjects::where([
            ['containerid'=>$request->get('containerid')],
            ['subjectid'=>$request->get('subjectid')]
        ])->update(['votes-accepted'=>$acceptedvotes]);
    }
    public function voteReject(Request $request){
        $subject=containerSubjects::where([
            ['containerid'=>$request->get('containerid')],
            ['subjectid'=>$request->get('subjectid')]
        ])->get();

        $Rejectedvotes= intval($subject->select('votes-rejected'));
        ++$Rejectedvotes;

        containerSubjects::where([
            ['containerid'=>$request->get('containerid')],
            ['subjectid'=>$request->get('subjectid')]
        ])->update(['votes-accepted'=>$Rejectedvotes]);
    }

}
