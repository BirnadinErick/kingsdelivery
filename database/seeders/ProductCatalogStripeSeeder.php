<?php

namespace Database\Seeders;

use App\Models\Variation;
use Illuminate\Database\Seeder;
use Stripe\StripeClient;

class ProductCatalogStripeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stripe_secret = env('STRIPE_SECRET_KEY', '');
        $stripe = new StripeClient($stripe_secret);

        // clean up catelog
        $all_products = $stripe->products->all();
        foreach ($all_products['data'] as $p) {
            $stripe->products->delete($p['id']);
        }

        $variations = Variation::all();

        foreach ($variations as $v) {
            $product = $v->product;

            $product_id = $stripe->products->create([
                'name'=>$product->name . ' ('. $v->label.')',
                'description'=>$product->description
            ])['id'];

            $v->product_catalog_id = $product_id;
            $v->save();

            $price_id = $stripe->prices->create([
                'currency' => 'gbp',
                'unit_amount' => $v->price * 100,
                'product'=>$product_id
            ])['id'];
            $v->price_id = $price_id;
            $v->save();
        }
    }
}
