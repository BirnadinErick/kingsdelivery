<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Cuisine;
use App\Models\Employee;
use App\Models\Order;
use App\Models\Variation;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

class CuisineController extends Controller
{
    public function listAll(Request $request)
    {
        $cuisines = Cuisine::all();
        $categories = Category::all();

        return Inertia::render('Cuisines', ['cuisines' => $cuisines, 'categories' => $categories]);
    }

    public function detail(Request $request, $cuisine_id)
    {
        $cuisine = Cuisine::find($cuisine_id);
        $cuisines = Cuisine::all();
        $categories = Category::all();

        $c_categories = $cuisine->categories;
        $c_products = $cuisine->products()->with('category')->with([
            'variations' => function ($q) {
                $q->orderBy('price', 'asc');
            }
        ])->get();

        return Inertia::render('CuisineDetail', [
            'cuisine' => $cuisine,
            'cuisines' => $cuisines,
            'categories' => $categories,
            'offeredCategories' => $c_categories,
            'offeredProducts' => $c_products
        ]);
    }

    function b2b_orders()
    {
        $user = Auth::user();
        $cuisine = Employee::where('user_id', $user->getKey())->first()->cuisine;
        $orders = Order::where('is_new', '=', true)->where('cuisine_id', '=', $cuisine->cuisine_id)->where('is_ready', false)->get();

        /*        dispatch(function () use ($orders) {
                    foreach ($orders as $o) {
                        $o->is_new = false;
                        $o->save();
                    }
                })->afterResponse();*/

        $view_orders = [];
        foreach ($orders as $o) {
            $items_arr = explode(',', $o->items);
            $items = array_map(function (string $price_id): Variation {
                return Variation::with('product')->where('price_id', $price_id)->first();
            }, $items_arr);

            $created_at = Carbon::parse($o->created_at);
            $deadline = $created_at->addSeconds($o->time_to_prep)->format('H:i');

            $view_orders[] = [
                'items' => $items,
                'eta' => $o->eta,
                'tot_price' => $o->tot_price,
                'id' => $o->order_id,
                'deadline' => $deadline
            ];
        }

        return Inertia::render('CuisineOrders', ['cuisine' => $cuisine, 'orders' => $view_orders]);
    }
}
