<?php

namespace App\Http\Controllers;

use App\SpaBooking;
use Illuminate\Http\Request;

class SpaBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($request)
    {
        return SpaBooking::where([
            ['room_id', '=',$request->room_id],
        ])->get();
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
    public function update(Request $request, SpaBooking $spaBooking)
    {
        $spaBooking->update($request->all());
        return response()->json($spaBooking, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SpaBooking  $spaBooking
     * @return \Illuminate\Http\Response
     */
    public function destroy(SpaBooking $spaBooking)
    {
        $spaBooking->delete();
        return response()->json(null, 204);
    }
}
