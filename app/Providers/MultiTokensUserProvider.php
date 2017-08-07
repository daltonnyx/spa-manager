<?php namespace App\Providers;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class MultiTokensUserProvider extends EloquentUserProvider
{
    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array  $credentials
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByCredentials(array $credentials)
    {
        if (empty($credentials)) {
            return;
        }

        // First we will add each credential element to the query as a where clause.
        // Then we can execute the query and, if we found a user, return it in a
        // Eloquent User "model" that will be utilized by the Guard instances.
        $userModel = $this->createModel();
        $query = $userModel->newQuery();
        
        foreach ($credentials as $key => $value) {
            if (! Str::contains($key, 'password')) {
                if( Str::contains($key, 'api_token') )
                    $query->join('user_tokens', $userModel->getTable().'.id', '=', 'user_tokens.user_id')
                    ->where([
                        ['user_tokens.'.$key, $value],
                        ['date_valid', '>=', DB::raw('NOW()')]
                    ]);
                    
                else
                    $query->where($key, $value);
            }
        }

        return $query->first();
    }
}
