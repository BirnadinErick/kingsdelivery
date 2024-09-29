<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VariationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = file_get_contents(__DIR__ . '/product_variations.json');
        $data = json_decode($json, true);

        foreach ($data['variations'] as $variation) {
            $productId = $variation['product_id'];
            $basePrice = $variation['price'];

            if ($variation['variations'] === "") {
                $variationDetails = [
                    'values' => [
                        ['label' => 'Regular', 'optionPrice' => 0]
                    ]
                ];
            } else {
                $variationDetails = json_decode($variation['variations'], true);
            }

            foreach ($variationDetails['values'] as $value) {
                $label = $value['label'];
                $optionPrice = $value['optionPrice'];

                DB::table('variations')->insert([
                    'product_id' => $productId,
                    'label' => $label,
                    'price' => floatval($basePrice) + floatval($optionPrice),
                    'time_to_prep' => 8 * 60, // in seconds
                    'price_id' => Str::uuid()->toString(),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'cuisine_id' => 1,
                    'product_catalog_id' => ''
                ]);
            }
        }
    }
}
