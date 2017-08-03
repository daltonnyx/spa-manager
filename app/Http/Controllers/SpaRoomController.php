<?php

namespace App\Http\Controllers;

use App\SpaRoom;
use Illuminate\Http\Request;

class SpaRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($shop_id)
    {
        return SpaRoom::where('shop_id', $shop_id)->get();
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
        $room = SpaRoom::create($request->all());
        return response()->json($room, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SpaRoom  $spaRoom
     * @return \Illuminate\Http\Response
     */
    public function show(SpaRoom $spaRoom)
    {
        return $spaRoom;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\SpaRoom  $spaRoom
     * @return \Illuminate\Http\Response
     */
    public function edit(SpaRoom $spaRoom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SpaRoom  $spaRoom
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SpaRoom $spaRoom)
    {
        $spaRoom->update($request->all());
        return response()->json($spaRoom, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SpaRoom  $spaRoom
     * @return \Illuminate\Http\Response
     */
    public function destroy(SpaRoom $spaRoom)
    {
        $spaRoom->delete();
        return response()->json(null, 204);
    }
}
