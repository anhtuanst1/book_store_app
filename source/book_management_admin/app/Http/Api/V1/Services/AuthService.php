<?php
namespace App\Http\Api\V1\Services;

use App\Http\Api\V1\Repositories\AuthRepository;
use App\AppBase\Support\BlowfishCrypt;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AuthService
{
    protected $keyBlowFish = 'BIC@@123';

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    /**
     * @param array $credentials
     *
     * @return array
     */
    public function handleLogin(array $credentials)
    {
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);
        $userInfo = $this->authRepository->findByEmail($credentials['email']);
        $checkPassword = Hash::check($credentials['password'], $userInfo->password ?? '') ? true : false;
        if ($userInfo && $checkPassword) {
            if (!$token = auth()->login($userInfo)) {
                return false;
            }

            $refreshToken = !empty($remember) ? $this->generateRefreshToken($userInfo) : '';

            return $this->transformDataAccessToken($token, $refreshToken);
        }

        return false;
    }

    /**
     * @param collect $userInfo
     *
     * @return string
     */
    private function generateRefreshToken($userInfo)
    {
        $dataRefresh = [
            'email' => $userInfo->email,
            'expires_in' => Carbon::now()->addMinutes(getJwtTokenLifeTime())->timestamp,
            'user_agent' => request()->header('user-agent-fe', request()->userAgent()),
            'ip' => request()->header('http-client-ip-fe', request()->ip()),
        ];

        return BlowfishCrypt::encrypt(base64_encode(json_encode($dataRefresh)), $this->keyBlowFish);
    }

    /**
     * @param string $token
     * @param string $refreshToken = ''
     *
     * @return array
     */
    protected function transformDataAccessToken(string $token, string $refreshToken = '')
    {
        $result = [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Carbon::now()->addMinutes(getJwtTokenLifeTime())->timestamp,
            'refresh_token' => $refreshToken,
            'user_info' => $this->transferDataUserInfo(),
        ];

        if (empty($refreshToken)) {
            unset($result['refresh_token']);
        }

        return $result;
    }

    /**
     * @return array
     */
    protected function transferDataUserInfo()
    {
        $userLoginInfo = auth()->user();

        return [
            'id' => $userLoginInfo->id,
            'name' => $userLoginInfo->name,
            'email' => $userLoginInfo->email,
            'created_at' => $userLoginInfo->created_at
        ];
    }

    /**
     * @param array $request
     *
     * @return array
     * @throws bool
     */
    public function refreshToken($request)
    {
        $verify = $this->verifyRefreshToken($request['refresh_token']);

        if ($verify) {
            $token = $this->createAccessTokenByModel($verify);
            $refreshToken = $this->generateRefreshToken($verify);

            return $this->transformDataAccessToken($token, $refreshToken);
        }

        return false;
    }

    /**
     * @param string $refreshToken
     *
     * @return \App\Models\User
     * @throws bool
     */
    private function verifyRefreshToken($refreshToken)
    {
        $tokenInfo = BlowfishCrypt::decrypt($refreshToken, $this->keyBlowFish);

        if (!empty($tokenInfo)) {
            $tokenInfo = json_decode(base64_decode($tokenInfo));
            $userAgentCurrent = request()->header('user-agent-fe', request()->userAgent());
            $ipCurrent = request()->header('http-client-ip-fe', request()->ip());
            $expiration = $tokenInfo->expires_in ?? Carbon::now()->sub('1 years')->timestamp;
            $expiration = Carbon::createFromTimestamp($expiration);
            $userInfo = $this->authRepository->findByEmail($tokenInfo->email);

            if (Carbon::now()->gte($expiration) ||
                empty($userInfo) ||
                $userAgentCurrent != ($tokenInfo->user_agent ?? null) ||
                $ipCurrent != ($tokenInfo->ip ?? null)
            ) {
                return false;
            }

            return $userInfo;
        }

        return false;
    }

    /**
     * @param \Illuminate\Database\Eloquent\Model $user
     *
     * @return string
     */
    private function createAccessTokenByModel($user)
    {
        return auth()->login($user);
    }

    /**
     * @return array
     */
    public function getUserInfo()
    {
        $userInfo = auth()->user();
        $userInfo = !empty($userInfo) ? $userInfo->toArray() : null;

        return $userInfo;
    }
}