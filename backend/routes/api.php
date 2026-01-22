<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserResultController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/users', [UserResultController::class, 'index']);
Route::post('/users', [UserResultController::class, 'store']);
Route::put('/users/{id}', [UserResultController::class, 'update']);
Route::delete('/users/{id}', [UserResultController::class, 'destroy']);

