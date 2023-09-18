<?php

namespace App\Http\Controllers;

use App\Models\attachment;
use http\Client\Response;
use Illuminate\Http\Request;

class AttachmentController extends Controller
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
        $files = $request->file('files');
        foreach($files as $file)
        {
            $data = new attachment();
            $filename = time().".".$file->getClientOriginalName();
            $file->move('assets',$filename);
            $data->file=$filename;
            $data->subjectid=$request->subjectid;
            $data->save();
        }
        return response(['تم اضافة المرفقات، من فضلك اغلق هذه الصفحة'],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //
        return attachment::all();
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
    }

    public function download($file)
    {
        return response()->download(public_path('assets/'.$file));
    }

    public function view($id)
    {
        $data = attachment::find($id);
        return view('viewdoc',compact('data'));
    }
    public function getAttachmentsofSubject($subjectid)
    {
        $data = attachment::where('subjectid',$subjectid)->get();
        return $data;
    }
}
