<?php

use App\Http\Api\V1\Controllers\AuthController;
use App\Http\Api\V1\Controllers\DashboardController;
use App\Http\Api\V1\Controllers\BookController;

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
    Route::get('/', [BookController::class, 'getListBooks']);
    Route::get('/{bookId}', [BookController::class, 'getBookDetail']);
    Route::put('/{bookId}/views', [BookController::class, 'updateViewsBook']);
});

// private routes
Route::middleware(['auth.jwt', 'after.jwt'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/get-user-login', [AuthController::class, 'getUserInfo']);
    Route::get('/dashboard', [DashboardController::class, 'getDashboardInfo']);

    Route::group(['prefix' => 'books'], function () {
        Route::post('/', [BookController::class, 'createBook']);
        Route::put('/{bookId}', [BookController::class, 'updateBook']);
        Route::delete('/{bookId}', [BookController::class, 'deleteBook']);
        Route::put('/{bookId}/restore', [BookController::class, 'restoreBook']);
    });
});
