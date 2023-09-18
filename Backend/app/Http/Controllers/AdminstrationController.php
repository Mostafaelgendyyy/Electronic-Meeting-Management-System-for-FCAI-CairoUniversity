<?php

namespace App\Http\Controllers;

use App\Models\adminstration;
use Illuminate\Http\Request;

class AdminstrationController extends Controller
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
        $adminstration = new adminstration([
            'ar_name'=>$request->get('ar_name'),
            'eng_name'=>$request->get('eng_name')
        ]);
        $adminstration->save();
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
        $adminstration= adminstration::find($id);
        return $adminstration;
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
        $adminstration= adminstration::find($id);
        $adminstration->ar_name= $request->get('ar_name');
        $adminstration->eng_name= $request->get('eng_name');
        $adminstration->save();
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
        $adminstration= adminstration::find($id);
        $adminstration->delete();
    }

    public function getall(){
        return adminstration::all();
    }
}
