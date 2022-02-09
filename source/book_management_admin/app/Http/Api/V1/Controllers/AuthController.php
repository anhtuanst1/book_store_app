<?php
namespace App\Http\Api\V1\Controllers;

use App\AppBase\BaseController;
use App\Http\Api\V1\Services\AuthService;

class AuthController extends BaseController
{
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }
}