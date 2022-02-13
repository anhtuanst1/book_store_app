<?php
namespace App\Http\Api\V1\Repositories;

use App\Models\Books;

class BookManagementRepository
{
    /**
     * @return Books
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
        ])->orderBy('created_at', 'desc')
        ->paginate(config('common.pagination_get_limit'));
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

    /**
     * @param array $dataInput
     *
     * @return Books
     */
    public function createBook(array $dataInput)
    {
        return Books::create($dataInput);
    }

    /**
     * @param mixed $bookId
     *
     * @return Books
     */
    public function deleteBook($bookId)
    {
        Books::withTrashed()->where('id', $bookId)->update([
            'deleted_by' => auth()->user()->name ?? ''
        ]);

        return Books::where('id', $bookId)->delete();
    }

    /**
     * @param mixed $bookId
     *
     * @return Books
     */
    public function restoreBook($bookId)
    {
        Books::withTrashed()->where('id', $bookId)->update([
            'deleted_by' => null
        ]);

        return Books::where('id', $bookId)->restore();
    }
}