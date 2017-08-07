<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSpabookTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('spa_bookings', function(Blueprint $table) {
            $table->increments('id');
            $table->string("customer_name");
            $table->string("customer_phone");
            $table->timestamp('start_on')->nullable();
            $table->timestamp('end_on')->nullable();
            $table->integer('room_id')->unsigned();
            $table->foreign('room_id')->references('id')->on('spa_rooms')->onDelete('cascade');
            $table->index('start_on','booking_start_idx');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop("spa_bookings");
    }
}
