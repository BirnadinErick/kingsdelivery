<?php

namespace App\Http\Controllers;

use App\Models\Cuisine;
use App\Models\Customer;
use App\Models\Product;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SAdminController extends Controller
{
    public function overview()
    {
        $user = Auth::user();
        $analytics = [];

        $analytics['products'] = Product::count();
        $analytics['customers'] = Customer::count();
        $analytics['cuisines'] = Cuisine::count();

        return Inertia::render('SAdminOverview', ['analytics' => $analytics]);
    }

    public function products()
    {
        $products = Product::all();
        return Inertia::render('SAdminProducts', ['products' => $products]);
    }

    public function products_store(Request $request)
    {
        $request->validate([
            'product_id' => 'sometimes|exists:products,product_id',
            'name' => 'required|string|min:2|max:255',
            'image' => 'file|image|max:2048', // 2MB Max
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0.01',
        ]);

        try {
            $productData = [
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                // Set default values for other required fields if not provided
                'time_to_prep' => $request->time_to_prep ?? 0,
                'veg' => $request->veg ?? false,
            ];

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('products'), $filename);
                $productData['image'] = '/products/' . $filename;
            }

            $product = Product::updateOrCreate(
                ['product_id' => $request->product_id],
                $productData
            );

            Log::info('Product created', [
                'product_id' => $product->product_id,
                'name' => $product->name,
                'image' => $product->image,
            ]);

            return response()->json([
                'message' => 'Product created successfully',
                'product' => $product,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Product creation failed', [
                'error' => $e->getMessage(),
                'name' => $request->name
            ]);

            return response()->json(['error' => 'Product creation failed'], 500);
        }
    }
}
