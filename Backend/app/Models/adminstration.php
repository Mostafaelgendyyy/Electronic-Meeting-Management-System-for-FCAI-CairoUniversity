<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class adminstration extends Model
{
    use HasFactory;
    protected $fillable = ['id','ar_name','eng_name'];

    public $timestamps = false;
}
