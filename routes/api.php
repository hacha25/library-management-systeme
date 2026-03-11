<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// === LOAN ROUTES ===
use App\Http\Controllers\LoanController;



// ===  USERS ROUTES === //
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('books', BookController::class);

    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('/loans',[LoanController::class, 'index']);
    Route::post('/loans', [LoanController::class, 'store']);
    Route::get('/loans/{id}',[LoanController::class, 'show']);
    Route::put('/loans/{id}', [LoanController::class, 'returnBook']);
    Route::get('/loans/overdue', [LoanController::class, 'overdue']);

    Route::get('/dashboard/stats', [DashboardController::class, 'stats'])->middleware('admin');

});
