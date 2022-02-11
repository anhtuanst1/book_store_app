<?php
namespace App\Http\Api\V1\Controllers;

use App\AppBase\BaseController;
use App\Http\Api\V1\Services\AuthService;
use App\Http\Api\V1\Requests\AuthenticationRequest;
use Illuminate\Http\Request;

class AuthController extends BaseController
{
    /**
     * @OA\Info(
     *      version="1.0.0",
     *      title="Laravel OpenApi Demo Documentation",
     *      description="L5 Swagger OpenApi description"
     * )
     *
     * @OA\Server(
     *      url=L5_SWAGGER_CONST_HOST,
     *      description="Demo API Server"
     * )
     *
     * @OA\PathItem(path="/login")
     * 
     * @OA\Post(
     *     path="/login",
     *     summary="Login",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 example={"email": "admin@gmail.com", "password": "admin"}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={
     *                  "code": 200,
     *                  "status": "OK",
     *                  "message": "You have successfully logged in.",
     *                  "response": {
     *                      "access_token": "eyJ0e****",
     *                      "token_type": "bearer",
     *                      "expires_in": 1644544193,
     *                      "refresh_token": "2aac50b3019f98****",
     *                      "user_info": {
     *                          "id": 1,
     *                          "name": "admin",
     *                          "email": "admin@gmail.com",
     *                          "created_at": "2022-02-10T09:50:56.000000Z"
     *                      }
     *                  }
     *              }, summary="Login success"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="NG",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={
     *                  "code": 401,
     *                  "status": "NG",
     *                  "message": "Login failed. The email address or password is incorrect."
     *              }, summary="Login fail"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="NG",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={
     *                  "code": 400,
     *                  "status": "NG",
     *                  "message": "Login failed. The information entered in the form below is incorrect.",
     *                  "response": {
     *                      "email": "The email field is required.",
     *                      "password": "The password field is required."
     *                  }
     *              }, summary="Login fail"),
     *         )
     *     )
     * )
     *
     * @OA\Tag(
     *     name="Login",
     *     description="API Login"
     * )
    */

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

    /**
     * @return array
     */
    public function logout()
    {
        auth()->logout();

        return $this->apiResponse(null, '', 204);
    }
}