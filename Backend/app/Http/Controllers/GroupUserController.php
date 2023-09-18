<?php

namespace App\Http\Controllers;

use App\Models\group;
use App\Models\groupuser;
use App\Models\User;
use Illuminate\Http\Request;

class GroupUserController extends Controller
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
        $groupuser = new groupuser([
            'groupid'=> $request->get('groupid'),
            'doctorid'=> $request->get('doctorid'),
        ]);
        $groupuser->save();
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
        $groupuser= groupuser::find($id);
        return $groupuser;
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
        $groupuser= groupuser::find($id);
        $groupuser->doctorid=$request->get('doctorid');
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
        $groupuser= groupuser::find($id);
        $groupuser->delete();
    }

    public function destroyBYRequest(Request $request){

        $row = groupuser::where([
            ['groupid', '=',$request->get('groupid')],
            ['doctorid', '=',$request->get('doctorid')]
        ])->get();
        foreach ($row as $key=> $value){
            $value->delete();
        }
    }

    public function RetreiveGroupUsers($initiatorid)
    {
        $GID= group::where('initiatorid',$initiatorid)->get();
        $GUsers=array();
        foreach ($GID as $key => $value)
        {
            $GUsersIDS= groupuser::select('doctorid')->where('groupid',$value['id'])->get();

            foreach($GUsersIDS as $k => $v)
            {
                array_push($GUsers,User::find($v['doctorid']));
            }
        }
        return $GUsers;
    }

    public function searchbyDoctor(Request $request){

        $row = groupuser::where([
            ['groupid', '=',$request->get('groupid')],
            ['doctorid', '=',$request->get('doctorid')]
        ])->get();
        return count($row);
    }


}
