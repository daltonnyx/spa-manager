<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SpaBooking extends Model
{

    protected $dateFormat = 'd-m-Y H:i';
    protected $table = 'spa_bookings';
    protected $fillable = ['customer_name', 'customer_phone', 'customer_company', 'start_on', 'end_on', 'room_id', 'note'];
    public $timestamps = false;
}
