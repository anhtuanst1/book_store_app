<?php
namespace App\AppBase;

use App\AppBase\Support\ResponseApi;
use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    /**
     * @param array $dataResponse
     * @param string $message
     * @param int $code
     * @param string|null $status
     * @param array $headers
     * @param int $options
     *
     * @return \Illuminate\Support\Facades\Response
     */
    protected function apiResponse(
        array $response = null,
        string $message = "",
        int $code = 200,
        string $status = null,
        array $headers = [],
        int $options = 0
    ) {
        return ResponseApi::apiResponse($response, $message, $code, $status, $headers, $options);
    }
}
