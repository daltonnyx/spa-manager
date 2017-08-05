<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'Auth\LoginController@login');
Route::post('/logout', 'Auth\LoginController@logout');
Route::group(['middleware' => 'auth:api'],function() {
    Route::get('/shops', 'SpaShopController@index');
    Route::get('/shops/{shop}', 'SpaShopController@show');
    Route::post('/shops', 'SpaShopController@store');
    Route::put('/shops/{shop}', 'SpaShopController@update');
    Route::delete('/shops/{shop}', 'SpaShopController@destroy');

    
});

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('/rooms/{shop_id}', 'SpaRoomController@index');
    Route::get('/rooms/{room}', 'SpaRoomController@show');
    Route::post('/rooms', 'SpaRoomController@store');
    Route::put('/rooms/{room}', 'SpaRoomController@update');
    Route::delete('/rooms/{room}', 'SpaRoomController@destroy');
});

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('/bookings/{room_id}/{date}', 'SpaBookingController@index');
    Route::get('/bookings/{booking}', 'SpaBookingController@show');
    Route::post('/bookings', 'SpaBookingController@store');
    Route::put('/bookings/{booking}', 'SpaBookingController@update');
    Route::delete('/bookings/{booking}', 'SpaBookingController@destroy');
});
