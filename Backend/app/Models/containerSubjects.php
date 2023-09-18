<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class containerSubjects extends Model
{
    use HasFactory;
    protected $fillable = ['containerid','subjectid','decision','votes-accepted','votes-rejected'];
    public $timestamps = false;


}
