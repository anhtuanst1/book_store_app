<?php
namespace App\AppBase;

use App\Models\Books;

class BaseRepository
{
    /**
     * @param boolean $isTrash
     *
     * @return Books
     */
    public function getListBooks($isTrash = false)
    {
        $listBooks = Books::select([
            'id',
            'name',
            'price',
            'description',
            'image',
            'content',
            'views',
            'created_at',
            'deleted_at',
            'deleted_by'
        ]);
        if($isTrash) {
            $listBooks = $listBooks->withTrashed();
        }
        $listBooks = $listBooks->orderBy('created_at', 'desc')
                        ->paginate(config('common.pagination_get_limit'));

        return $listBooks;
    }

    /**
     * @param string $bookId
     * @param boolean $isTrash
     * 
     * @return Books
     */
    public function getBookDetail($bookId, $isTrash = false)
    {
        $bookInfo = Books::select([
            'id',
            'name',
            'price',
            'description',
            'image',
            'content',
            'views',
            'created_at'
        ])->where('id', $bookId);
        if($isTrash) {
            $bookInfo = $bookInfo->withTrashed();
        }
        $bookInfo = $bookInfo->first();

        return $bookInfo;
    }
}
