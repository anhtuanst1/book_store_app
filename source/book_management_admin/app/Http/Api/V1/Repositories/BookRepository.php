<?php
namespace App\Http\Api\V1\Repositories;

use App\AppBase\BaseRepository;
use App\Models\Books;

class BookRepository extends BaseRepository
{
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