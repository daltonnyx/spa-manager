<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSparoomTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('spa_rooms', function(Blueprint $table) {
            $table->increments('id');
            $table->string("title");
            $table->integer('shop_id')->unsigned();
            $table->foreign('shop_id')->references('id')->on('spa_shops');
            $table->string('description');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('spa_rooms');
    }
}
