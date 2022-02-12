<?php
namespace App\Http\Api\V1\Controllers;

use App\AppBase\BaseController;
use App\Http\Api\V1\Services\DashboardService;

class DashboardController extends BaseController
{
    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    /**
     * @return \Illuminate\Support\Facades\Response
     */
    public function getDashboardInfo()
    {
        $result = $this->dashboardService->getListBooksByView();

        return $this->apiResponse(
            $result['response'],
            $result['message'],
            $result['code'],
            $result['status'],
        );
    }
}
