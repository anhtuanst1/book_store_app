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
Route::group(['prefix' => 'books'], function () {
    Route::get('/', [BookManagementController::class, 'getListBooks']);
    Route::get('/{bookId}', [BookManagementController::class, 'getBookDetail']);
    Route::put('/{bookId}/views', [BookManagementController::class, 'updateViewsBook']);
});

// private routes
Route::middleware(['auth.jwt', 'after.jwt'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/get-user-login', [AuthController::class, 'getUserInfo']);
    Route::get('/dashboard', [DashboardController::class, 'getDashboardInfo']);

    Route::group(['prefix' => 'books'], function () {
        Route::post('/', [BookManagementController::class, 'createBook']);
        Route::put('/{bookId}', [BookManagementController::class, 'updateBook']);
        Route::delete('/{bookId}', [BookManagementController::class, 'deleteBook']);
        Route::put('/{bookId}/restore', [BookManagementController::class, 'restoreBook']);
    });
});
