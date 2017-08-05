<?php

namespace App\Http\Controllers;

use App\SpaShop;
use Illuminate\Http\Request;

class SpaShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SpaShop::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return SpaShop::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $shop = SpaShop::create($request->all());
        return response()->json($shop, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SpaShop  $spaShop
     * @return \Illuminate\Http\Response
     */
    public function show(SpaShop $spaShop)
    {
        return $spaShop;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\SpaShop  $spaShop
     * @return \Illuminate\Http\Response
     */
    public function edit(SpaShop $spaShop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SpaShop  $spaShop
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SpaShop $spaShop)
    {
        $spaShop->update($request->all());
        return response()->json($spaShop, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SpaShop  $spaShop
     * @return \Illuminate\Http\Response
     */
    public function destroy(SpaShop $spaShop)
    {
        $spaShop->delete();
        return response()->json(null, 204);
    }
}
