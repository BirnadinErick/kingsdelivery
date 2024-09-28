<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Cuisine;
use App\Models\Product;

class HomeController extends Controller
{
    public function home()
    {
        $products = Product::with('cuisine')->get();
        $cuisines = Cuisine::all();
        $categories = Category::all();

        return view('home', [
            'cuisines'=> $cuisines,
            'categories'=>$categories,
            'products'=> $products
        ]);
    }
}
