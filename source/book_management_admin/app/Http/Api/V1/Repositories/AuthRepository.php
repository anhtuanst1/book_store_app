<?php
namespace App\Http\Api\V1\Repositories;

use App\Models\User;

class AuthRepository
{
    /**
     * @param string $email
     *
     * @return User
     */
    public function findByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }

    /**
     * @param string $userId
     *
     * @return User
     */
    public function findByUserId(string $userId)
    {
        return User::where('id', $userId)->first();
    }
}