<?php
namespace App\Http\Api\V1\Repositories;

use App\Models\Books;

class DashboardRepository
{
    /**
     * @return App\Models\Books
     */
    public function getListBooksByView()
    {
        return Books::select([
            'id',
            'name',
            'price',
            'description',
            'image',
            'content',
            'views',
            'created_at'
        ])->orderBy('views', 'desc')->limit(config('common.dashboard_get_limit'))->get();
    }
}