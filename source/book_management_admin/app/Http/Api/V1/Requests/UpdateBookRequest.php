<?php
namespace App\Http\Api\V1\Requests;

use App\AppBase\BaseFormRequestAPI;

class UpdateBookRequest extends BaseFormRequestAPI
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'sometimes|required|max:100|unique:books,name,' . $this->bookId . ',id',
            'price' => 'sometimes|required|numeric',
            'description' => 'max:255'
        ];
    }

    public function attributes()
    {
        return [
            'name' => __('name'),
            'price' => __('price'),
            'description' => __('description'),
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            //
        ];
    }
}
