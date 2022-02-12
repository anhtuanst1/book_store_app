<?php
namespace App\Http\Api\V1\Controllers;

use App\AppBase\BaseController;
use App\Http\Api\V1\Services\BookManagementService;
use App\Http\Api\V1\Requests\CreateBookRequest;
use App\Http\Api\V1\Requests\UpdateBookRequest;

class BookManagementController extends BaseController
{
    public function __construct(BookManagementService $bookManagementService)
    {
        $this->bookManagementService = $bookManagementService;
    }

    
    /**
     * @return \Illuminate\Support\Facades\Response
     */
    public function getListBooks()
    {
        $result = $this->bookManagementService->getListBooks();

        return $this->apiResponse(
            $result['response'],
            $result['message'],
            $result['code'],
            $result['status'],
        );
    }

    /**
     * @param string $bookId
     * 
     * @return \Illuminate\Support\Facades\Response
     */
    public function getBookDetail($bookId)
    {
        $result = $this->bookManagementService->getBookDetail($bookId);

        return $this->apiResponse(
            $result['response'],
            $result['message'],
            $result['code'],
            $result['status'],
        );
    }

    /**
     * @param CreateBookRequest $request
     *
     * @return \Illuminate\Support\Facades\Response
     */
    public function createBook(CreateBookRequest $request)
    {
        $dataInput = $request->only(config("common.book.create_fields"));
        $result = $this->bookManagementService->createBook($dataInput);

        if (isset($result['response'])) {
            return $this->apiResponse(
                $result['response'],
                $result['message'],
                $result['code'],
                $result['status'],
            );
        }

        return $this->apiResponse(
            null,
            $result['message'],
            $result['code'],
            $result['status'],
        );
    }

    /**
     * @param UpdateBookRequest $request
     * @param int $bookId
     *
     * @return \Illuminate\Support\Facades\Response
     */
    public function updateBook(UpdateBookRequest $request, $bookId)
    {
        $dataUpdate = $request->only(config("common.book.update_fields"));
        $result = $this->bookManagementService->updateBook($dataUpdate, $bookId);

        if (isset($result['response'])) {
            return $this->apiResponse(
                $result['response'],
                $result['message'],
                $result['code'],
                $result['status'],
            );
        }

        return $this->apiResponse(
            null,
            $result['message'],
            $result['code'],
            $result['status'],
        );
    }

    /**
     * @param int $bookId
     *
     * @return \Illuminate\Support\Facades\Response
     */
    public function deleteBook($bookId)
    {
        $result = $this->bookManagementService->deleteBook($bookId);

        return $this->apiResponse(
            null,
            $result['message'],
            $result['code'],
            $result['status'],
        );
    }

    /**
     * @param int $bookId
     *
     * @return \Illuminate\Support\Facades\Response
     */
    public function restoreBook($bookId)
    {
        $result = $this->bookManagementService->restoreBook($bookId);

        return $this->apiResponse(
            null,
            $result['message'],
            $result['code'],
            $result['status'],
        );
    }
}