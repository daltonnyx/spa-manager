<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SpaRoom extends Model
{
    protected $table = 'spa_rooms';
    protected $fillable = ['title', 'description', 'shop_id'];

    public $timestamps = false;
}
