<?php
namespace App\Http\Api\V1\Services;

use App\Http\Api\V1\Repositories\BookManagementRepository;
use App\Traits\ResponseApiTrait;

class BookManagementService
{
    use ResponseApiTrait;

    public function __construct(BookManagementRepository $bookManagementRepository)
    {
        $this->bookManagementRepository = $bookManagementRepository;
    }

    /**
     * @return array
     */
    public function getListBooks()
    {
        $listBooks = $this->bookManagementRepository->getListBooks();

        return $this->handleApiResult(
            200,
            __('message_info.book.INFO_00001'),
            null,
            [
                'list_books' => $listBooks
            ]
        );
    }

    /**
     * @param string $bookId
     * 
     * @return array
     */
    public function getBookDetail($bookId)
    {
        $bookInfo = $this->bookManagementRepository->getBookDetail($bookId);

        if(empty($bookInfo)) {
            return $this->handleApiResult(
                404,
                __('message_error.book.ERROR_00001')
            );
        }

        $bookInfo = $bookInfo->toArray();
        $bookInfo['created_at'] = convertTimeZone($bookInfo['created_at']);

        return $this->handleApiResult(
            200,
            __('message_info.book.INFO_00002'),
            null,
            [
                'book_info' => $bookInfo
            ]
        );
    }
}