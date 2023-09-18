<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvitationNotificationInvited extends Model
{
    use HasFactory;

    protected $fillable = ['invitedid','meetingid'];
    public $timestamps = false;

}
