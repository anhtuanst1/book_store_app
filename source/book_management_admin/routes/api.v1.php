<?php

use App\Http\Api\V1\Controllers\AuthController;
use App\Http\Api\V1\Controllers\DashboardController;
use App\Http\Api\V1\Controllers\BookManagementController;

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
Route::post('/login', [AuthController::class, 'doLogin']);
Route::post('/refresh-token', [AuthController::class, 'refreshToken']);
Route::group(['prefix' => 'book'], function () {
    Route::get('/list', [BookManagementController::class, 'getListBooks']);
    Route::get('/detail/{bookId}', [BookManagementController::class, 'getBookDetail']);
    Route::post('/views/{bookId}', [BookManagementController::class, 'updateViewsBook']);
});

// private routes
Route::middleware('auth.jwt')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/get-user', [AuthController::class, 'getUserInfo']);
    Route::post('/dashboard', [DashboardController::class, 'getDashboardInfo']);

    Route::group(['prefix' => 'book'], function () {
        Route::get('/list-by-admin', [BookManagementController::class, 'getListBooksByAdmin']);
        Route::post('/create', [BookManagementController::class, 'createBook']);
        Route::post('/update/{bookId}', [BookManagementController::class, 'updateBook']);
        Route::post('/delete/{bookId}', [BookManagementController::class, 'deleteBook']);
        Route::post('/restore/{bookId}', [BookManagementController::class, 'restoreBook']);
    });
});
