<?php
namespace App\Http\Api\V1\Repositories;

use App\Models\Books;

class BookManagementRepository
{
    /**
     * @return App\Models\Books
     */
    public function getListBooks()
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
        ])->orderBy('views', 'desc')
        ->paginate(config('common.pagination_get_limit'));
    }

    /**
     * @param string $bookId
     * 
     * @return App\Models\Books
     */
    public function getBookDetail($bookId)
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
        ])->where('id', $bookId)->first();
    }
}