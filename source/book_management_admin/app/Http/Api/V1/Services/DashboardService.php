<?php
namespace App\Http\Api\V1\Services;

use App\Http\Api\V1\Repositories\DashboardRepository;

class DashboardService
{
    public function __construct(DashboardRepository $dashboardRepository)
    {
        $this->dashboardRepository = $dashboardRepository;
    }
}