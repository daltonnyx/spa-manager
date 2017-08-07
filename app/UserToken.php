<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserToken extends Model
{
    protected $table = 'user_tokens';
    protected $fillable = ['user_id', 'api_token', 'date_valid'];

    public $timestamps = false;
}
