<?php

use App\Http\Api\V1\Controllers\HomePageController;
use App\Http\Api\V1\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// public routes
Route::get('/check-data', [HomePageController::class, 'checkData']);
Route::post('/get-list-books', [HomePageController::class, 'getListBooks']);
Route::post('/login', [AuthController::class, 'doLogin']);

// private routes
Route::middleware('auth.jwt')->group(function () {
    Route::get('/check-data-auth', [HomePageController::class, 'checkData']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/get-user', [AuthController::class, 'getUserInfo']);

    Route::group(['prefix' => 'book'], function () {
        // Route::post('/list', [BookManagementController::class, 'getListBooks']);
        // Route::post('/create', [BookManagementController::class, 'createBook']);
        // Route::post('/detail/{bookId}', [BookManagementController::class, 'bookDetail']);
        // Route::post('/edit/{bookId}', [BookManagementController::class, 'editBook']);
        // Route::post('/delete/{bookId}', [BookManagementController::class, 'deleteBook']);
    });
});
