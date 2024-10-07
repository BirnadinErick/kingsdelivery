<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CuisineController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SAdminController;
use App\Models\Category;
use App\Models\Cuisine;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $cuisines = Cuisine::all();
    $categories = Category::all();
    $specialOffers = Product::with([
        'variations' => function ($q) {
            $q->orderBy('price', 'asc');
        }
    ])->with('category')->where('category_id', 13)->get();
    $products = Product::with('category')->with([
        'variations' => function ($q) {
            $q->orderBy('price', 'asc');
        }
    ])->take(9)->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'cuisines' =>$cuisines,
        'categories'=>$categories,
        'specialOffers'=>$specialOffers,
        'products'=> $products,
    ]);
});

Route::get('/categories', [CategoryController::class, 'listAll']);
Route::get('/categories/{category_id}', [CategoryController::class, 'detail']);

Route::get('/cuisines', [CuisineController::class, 'listAll']);
Route::get('/cuisines/{cuisine_id}', [CuisineController::class, 'detail']);

Route::get('/products', [ProductController::class, 'listAll']);

Route::prefix('b2b')->group(function (){
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/orders', [CuisineController::class, 'b2b_orders'])->middleware(['auth', 'verified'])->name('cuisine_orders');
    Route::get('/deliver', [DriverController::class, 'deliver'])->middleware(['auth', 'verified'])->name('driver_deliver');
    Route::get('/deliver-request/{delivery_id}', [DriverController::class, 'delivery_request'])->middleware(['auth', 'verified'])->name('driver_request');

    Route::prefix('sadmin')->group(function (){
        Route::get('/overview', [SAdminController::class, 'overview'])->name('sadmin_overview');
        Route::get('/products', [SAdminController::class, 'products'])->name('sadmin_products');
    })->middleware(['auth', 'verified']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/post-checkout', [PaymentController::class, 'postcheckout']);
