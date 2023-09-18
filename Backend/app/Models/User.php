<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
 {
    use HasFactory, Notifiable, HasApiTokens;
//, UuidTrait
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','role','adminstrationid','jobdescription'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token','password'
    ];


    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

//    public function roles()
//
//    {
//        return $this
//            ->belongsToMany('App\Role')
//            ->withTimestamps();
//    }
//
//    public function authorizeRoles($roles)
//
//    {
//        if ($this->hasAnyRole($roles)) {
//            return true;
//        }
//        abort(401, 'This action is unauthorized.');
//    }
//    public function hasAnyRole($roles)
//    {
//        if (is_array($roles)) {
//            foreach ($roles as $role) {
//                if ($this->hasRole($role)) {
//                    return true;
//                }
//            }
//        } else {
//            if ($this->hasRole($roles)) {
//                return true;
//            }
//        }
//        return false;
//    }
//    public function hasRole($role)
//    {
//        if ($this->roles()->where('name', $role)->first()) {
//            return true;
//        }
//        return false;
//    }
}
