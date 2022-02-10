<?php
namespace App\Http\Api\V1\Controllers;

use App\AppBase\BaseController;
use App\Http\Api\V1\Services\BookManagementService;

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
}