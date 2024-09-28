<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Cuisine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function listAll(Request $request)
    {
        $cuisines = Cuisine::all();
        $categories = Category::all();

        return Inertia::render('Categories', ['cuisines' => $cuisines, 'categories' => $categories]);
    }

    public function detail(Request $request, $category_id)
    {
        $category = Category::find($category_id);
        $cuisines = Cuisine::all();
        $categories = Category::all();

        $cat_cuisines = $category->cuisines;
        $cat_products = $category->products()->with('category')->with([
            'variations' => function ($q) {
                $q->orderBy('price', 'asc');
            }
        ])->with('cuisine')->get();


        return Inertia::render('CategoryDetail', ['cuisines' => $cuisines, 'categories' => $categories, 'category' => $category, 'offeringCuisines' => $cat_cuisines, 'offeredProducts' => $cat_products]);
    }
}
