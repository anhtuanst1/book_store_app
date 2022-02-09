<?php
namespace App\Http\Api\V1\Services;

use App\Http\Api\V1\Repositories\HomePageRepository;

class HomePageService
{
    public function __construct(HomePageRepository $homePageRepository)
    {
        $this->homePageRepository = $homePageRepository;
    }
}