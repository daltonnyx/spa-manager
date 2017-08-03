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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SpaShop  $spaShop
     * @return \Illuminate\Http\Response
     */
    public function show(SpaShop $spaShop)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SpaShop  $spaShop
     * @return \Illuminate\Http\Response
     */
    public function destroy(SpaShop $spaShop)
    {
        //
    }
}
