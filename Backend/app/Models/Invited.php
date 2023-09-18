<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invited extends Model
{
    use HasFactory;

    protected $fillable = ['adminid','name','email','jobdescription'];

    public $timestamps = false;
}
