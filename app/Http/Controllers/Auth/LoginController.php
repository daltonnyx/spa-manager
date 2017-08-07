<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request) {
        $this->validateLogin($request);
        if( $this->attemptLogin($request) ) {
            $user = $this->guard()->user();
            $token = $user->generateToken();
            $userArray = $user->toArray();
            $userArray['api_token'] = $token;
            return response()->json([
                'data' => $userArray
            ]);
        }
        return $this->sendFailedLoginResponse($request);
    }

    public function logout(Request $request) {
        $user = Auth::guard('api')->user();
        if($user) {
            $user->api_token = null;
            $user->save();
        }
    }

    public function sendFailedLoginResponse($request) {
        $errors = ['error' => trans('auth.failed')];
        return response()->json($errors, 422);
    }
}
