<?php
namespace App\Http\Api\V1\Services;

use App\Http\Api\V1\Repositories\DashboardRepository;
use App\Traits\ResponseApiTrait;

class DashboardService
{
    use ResponseApiTrait;

    public function __construct(DashboardRepository $dashboardRepository)
    {
        $this->dashboardRepository = $dashboardRepository;
    }

    /**
     * @return array
     */
    public function getListBooksByView()
    {
        $listBooksByView = $this->dashboardRepository->getListBooksByView();

        return $this->handleApiResult(
            200,
            __('message_info.dashboard.INFO_00001'),
            null,
            [
                'list_books_by_view' => $listBooksByView
            ]
        );
    }
}