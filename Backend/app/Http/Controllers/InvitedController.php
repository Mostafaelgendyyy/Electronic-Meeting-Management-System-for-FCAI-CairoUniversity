<?php

namespace App\Http\Controllers;

use App\Models\Invited;
use Illuminate\Http\Request;

class InvitedController extends Controller
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
        $invited= new Invited([
            'name' =>$request->get('name'),
            'email' =>$request->get('email'),
            'jobdescription' =>$request->get('jobdescription')
        ]);
        $invited->save();
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
        $invited= Invited::find($id);
        return $invited;
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

        $invited= Invited::find($id);
        $invited->name= $request->get('name');
        $invited->email= $request->get('email');
        $invited->jobdescription= $request->get('jobdescription');
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
        $invited= Invited::find($id);
        $invited->delete();
    }

    public function viewall()
    {
        return Invited::all();
    }
}
