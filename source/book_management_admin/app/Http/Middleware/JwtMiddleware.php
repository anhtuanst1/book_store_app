<?php
namespace App\Http\Middleware;

use App\AppBase\Support\ResponseApi;
use Closure;
use Exception;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // dump('JwtMiddleware');
        try {
            JWTAuth::parseToken()->authenticate();

            return $next($request);
        } catch (TokenInvalidException $e) {
            $messageError = __("message_error.jwt.ERROR_00001");
        } catch (TokenExpiredException $e) {
            $messageError = __("message_error.jwt.ERROR_00002");
        } catch (Exception $e) {
            $messageError = __("message_error.jwt.ERROR_00003");
        }

        return ResponseApi::apiResponse(null,$messageError,403);
    }
}
