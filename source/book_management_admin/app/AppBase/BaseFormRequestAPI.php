<?php

namespace App\AppBase;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class BaseFormRequestAPI extends FormRequest
{
    /**
     * responseMessage
     *
     * @var string
     */
    protected $responseMessage = "Format error";

    /**
     * responseJson
     *
     * @var bool
     */
    protected $responseJson = true;

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = [];
        
        if ($this->responseJson == false) {
            throw (new ValidationException($validator))
                ->errorBag($this->errorBag)
                ->redirectTo($this->getRedirectUrl());
        }
        
        foreach ($validator->errors()->messages() as $keyMessage => $message) {
            $errors[$keyMessage] = $message[0];
        }

        $response = new JsonResponse([
            'code' => 400,
            'status' => 'NG',
            'message' => $this->responseMessage,
            'response' => $errors,
        ], 400);

        throw new ValidationException($validator, $response);
    }
}
