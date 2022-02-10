<?php
namespace App\Traits;

trait ResponseApiTrait
{
    /**
     * @param int $code
     * @param string $message
     * @param string|null $status
     * @param array $dataResponse
     *
     * @return array
     */
    protected function handleApiResult(
        int $code = 200,
        string $message = "",
        string $status = null,
        array $dataResponse = null
    ) {
        if ($code != 200 && $status == null) {
            $status = "NG";
        } else if ($code == 200 && $status == null) {
            $status = "OK";
        }

        return  [
            'code' => $code,
            'status' => $status,
            'message' => $message,
            'response' => $dataResponse,
        ];
    }
}
