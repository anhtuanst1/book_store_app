<?php
namespace App\Http\Api\V1\Controllers;

use App\AppBase\BaseController;
use App\Http\Api\V1\Services\HomePageService;

class HomePageController extends BaseController
{
    public function __construct(HomePageService $homePageService)
    {
        $this->homePageService = $homePageService;
    }
}