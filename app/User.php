<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function generateToken() {
        $user_token = new UserToken;
        $user_token->user_id = $this->id;
        $user_token->date_valid = date('Y-m-d H:i', strtotime('+1 day'));
        $user_token->api_token = str_random(60);
        $user_token->save();
        return $user_token->api_token;
    }
}
