<?php

namespace App\Http\Controllers;

use App\SpaBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SpaBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($spa_id, $date)
    {
        return DB::table('spa_bookings')
            ->join('spa_rooms', 'spa_bookings.room_id', '=', 'spa_rooms.id')
            ->select('spa_bookings.*')
            ->where([
                ['spa_rooms.shop_id', '=', $spa_id],
                [DB::raw("DATE_FORMAT(start_on, '%Y-%c-%e')"), '=', $date]
            ])
            ->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Validate Request

        $booking = SpaBooking::create($request->all());
        return response()->json($booking, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SpaBooking  $spaBooking
     * @return \Illuminate\Http\Response
     */
    public function show(SpaBooking $spaBooking)
    {
        return $spaBooking;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\SpaBooking  $spaBooking
     * @return \Illuminate\Http\Response
     */
    public function edit(SpaBooking $spaBooking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SpaBooking  $spaBooking
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $spaBooking)
    {
        $booking = SpaBooking::find($spaBooking);
        $booking->update($request->all());
        return response()->json($booking, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SpaBooking  $spaBooking
     * @return \Illuminate\Http\Response
     */
    public function destroy($spaBooking)
    {
        
        $booking = SpaBooking::find($spaBooking);
        $booking->delete();
        return response()->json($spaBooking, 204);
    }
}
