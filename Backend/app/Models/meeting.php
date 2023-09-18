<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class meeting extends Model
{
    use HasFactory;
    protected $fillable = ['meetingid','initiatorid','placeid','date','islast','meetingtypeid','startedtime','endedtime'];
    public $timestamps = false;

    protected $primaryKey = 'meetingid';



}
