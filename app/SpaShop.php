<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SpaShop extends Model
{
    protected $table = 'spa_shops';
    protected $fillable = ['name', 'address'];
    public $timestamps = false;
}
