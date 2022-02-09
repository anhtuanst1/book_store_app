<?php
namespace App\AppBase\Support;

use Illuminate\Support\Facades\Response;

/**
 * @method static Response apiResponse($response, $message, $code, $status, $headers, $options)
 */
class ResponseApi extends BaseSupport
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
        if ($status == 204) {
            return Response::noContent(204, $headers);
        }

        if ($code != 200 && $status == null) {
            $status = "NG";
        } else if ($code == 200 && $status == null) {
            $status = "OK";
        }

        $dataResponse = [
            'code' => $code,
            'status' => $status,
            'message' => $message,
            'response' => $response,
        ];

        if ($response === null) {
            unset($dataResponse['response']);
        }

        return Response::json($dataResponse, $code, $headers, $options);
    }
}
