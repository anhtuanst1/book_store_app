<?php
namespace App\Http\Api\V1\Services;

use App\Http\Api\V1\Repositories\AuthRepository;

class AuthService
{
    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }
}