<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SAdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/checkout', [PaymentController::class, 'checkout']);
Route::post('/order', [PaymentController::class, 'order']);


Route::prefix('sadmin')->group(function (){
    Route::post('/products', [SAdminController::class, 'products_store'])->name('sadmin_products_store');
})->middleware(['auth', 'verified']);
