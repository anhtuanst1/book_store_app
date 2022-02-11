<?php
namespace App\Http\Api\V1\Controllers;

use App\AppBase\BaseController;
use App\Http\Api\V1\Services\AuthService;
use App\Http\Api\V1\Requests\AuthenticationRequest;
use Illuminate\Http\Request;

class AuthController extends BaseController
{
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @param AuthenticationRequest $request
     *
     * @return Illuminate\Support\Facades\Response
     */
    public function doLogin(AuthenticationRequest $request)
    {
        $credentials = $request->only('email', 'password', 'remember');
        $token = $this->authService->handleLogin($credentials);

        if(!empty($token['code'])) {
            return $this->apiResponse(
                null,
                $token['message'],
                $token['code']
            );
        }

        if ($token) {
            return $this->apiResponse($token, __("message_info.login.INFO_00001"));
        }

        return $this->apiResponse(
            null,
            __("message_error.login.ERROR_00003"),
            401
        );
    }

    /**
     * @param Request $request
     *
     * @return Illuminate\Support\Facades\Response
     */
    public function refreshToken(Request $request)
    {
        $credentials = [
            'refresh_token' => $request->refresh_token ?? ''
        ];
        $token = $this->authService->refreshToken($credentials);

        if ($token) {
            return $this->apiResponse($token, __("message_info.login.INFO_00001"));
        }

        return $this->apiResponse(
            null,
            __("message_error.login.ERROR_00003"),
            401
        );
    }

    /**
     * @return Illuminate\Support\Facades\Response
     */
    public function getUserInfo()
    {
        $userInfo = $this->authService->getUserInfo();
        $statusCode = !empty($userInfo) ? 200 : 400;
        $message = !empty($userInfo) ? __("message_info.login.INFO_00001") : __("message_error.login.ERROR_00004");

        return $this->apiResponse(
            $userInfo,
            $message,
            $statusCode
        );
    }
}