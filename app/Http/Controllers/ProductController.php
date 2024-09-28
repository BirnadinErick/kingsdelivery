<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Cuisine;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function listAll(Request $request)
    {
        $cuisines = Cuisine::all();
        $categories = Category::all();
        $products = Product::with('category')->get();

        return Inertia::render('Products', ['cuisines' => $cuisines, 'categories' => $categories, 'products'=>$products]);
    }

    public function detail(Request $request, $product_id)
    {
       $product = Product::find($product_id);

       return view('product', ['product'=>$product]);
    }
}
