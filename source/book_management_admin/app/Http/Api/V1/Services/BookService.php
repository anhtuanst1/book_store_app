<?php
namespace App\Http\Api\V1\Services;

use App\Http\Api\V1\Repositories\BookRepository;
use App\Traits\ResponseApiTrait;

class BookService
{
    use ResponseApiTrait;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * @return array
     */
    public function getListBooks()
    {
        $listBooks = $this->bookRepository->getListBooks($this->checkUserLogin());

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
        $bookInfo = $this->bookRepository->getBookDetail($bookId, $this->checkUserLogin());

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

    /**
     * @param array $dataInput
     *
     * @return array
     */
    public function createBook(array $dataInput)
    {
        try {
            $dataInput['updated_at'] = null;
            $result = $this->bookRepository->createBook($dataInput);
            $result = $result->toArray();
            // $result['id'] = DB::getPdo()->lastInsertId();

            return $this->handleApiResult(
                200,
                __('message_info.book.INFO_00003'),
                null,
                $result
            );
        } catch (Exception $e) {
            saveLogCatch($e);

            return $this->handleApiResult(
                400,
                __('message_error.book.ERROR_00002')
            );
        }
    }

    /**
     * @param array $dataUpdate
     * @param integer $bookId
     *
     * @return array
     */
    public function updateBook(array $dataUpdate, $bookId)
    {
        $bookInfo = $this->bookRepository->getBookDetail($bookId, $this->checkUserLogin());

        try {
            if(empty($bookInfo)) {
                return $this->handleApiResult(
                    404,
                    __('message_error.book.ERROR_00001')
                );
            }

            $dataUpdate['updated_at'] = now();
            $result = tap($bookInfo)->update($dataUpdate)->toArray();

            return $this->handleApiResult(
                200,
                __('message_info.book.INFO_00004'),
                null,
                $result
            );
        } catch (Exception $e) {
            saveLogCatch($e);

            return $this->handleApiResult(
                400,
                __('message_error.book.ERROR_00003')
            );
        }
    }

    /**
     * @param integer $bookId
     *
     * @return array
     */
    public function updateViewsBook($bookId)
    {
        $bookInfo = $this->bookRepository->getBookDetail($bookId, $this->checkUserLogin());

        try {
            if(empty($bookInfo)) {
                return $this->handleApiResult(
                    404,
                    __('message_error.book.ERROR_00001')
                );
            }

            $dataUpdate['views'] = $bookInfo->views + 1;
            $result = tap($bookInfo)->update($dataUpdate)->toArray();

            return $this->handleApiResult(
                200,
                __('message_info.book.INFO_00004'),
                null,
                $result
            );
        } catch (Exception $e) {
            saveLogCatch($e);

            return $this->handleApiResult(
                400,
                __('message_error.book.ERROR_00003')
            );
        }
    }

    /**
     * @param int $bookId
     *
     * @return array
     */
    public function deleteBook($bookId)
    {
        $bookInfo = $this->bookRepository->getBookDetail($bookId, $this->checkUserLogin());

        try {
            if(empty($bookInfo)) {
                return $this->handleApiResult(
                    404,
                    __('message_error.book.ERROR_00001')
                );
            }
            $this->bookRepository->deleteBook($bookId);

            return $this->handleApiResult(
                200,
                __('message_info.book.INFO_00005')
            );
        } catch (Exception $e) {
            saveLogCatch($e);

            return $this->handleApiResult(
                400,
                __('message_error.book.ERROR_00004')
            );
        }
    }

    /**
     * @param int $bookId
     *
     * @return array
     */
    public function restoreBook($bookId)
    {
        $bookInfo = $this->bookRepository->getBookDetail($bookId, $this->checkUserLogin());

        try {
            if(empty($bookInfo)) {
                return $this->handleApiResult(
                    404,
                    __('message_error.book.ERROR_00001')
                );
            }
            $this->bookRepository->restoreBook($bookId);

            return $this->handleApiResult(
                200,
                __('message_info.book.INFO_00006')
            );
        } catch (Exception $e) {
            saveLogCatch($e);

            return $this->handleApiResult(
                400,
                __('message_error.book.ERROR_00005')
            );
        }
    }

    private function checkUserLogin()
    {
        $userLoginInfo = auth()->user();

        return (!empty($userLoginInfo) && $userLoginInfo->is_admin)  ? true : false;
    }
}