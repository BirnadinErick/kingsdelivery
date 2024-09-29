<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'category_id' => 1,
                'name' => 'pizza',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 2,
                'name' => 'burger',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 3,
                'name' => 'wraps',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 4,
                'name' => 'sfc chicken',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 5,
                'name' => 'kebab',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 6,
                'name' => 'Peri-peri chicken',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 7,
                'name' => 'starters',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 8,
                'name' => 'meal deals',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 9,
                'name' => 'panninies',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 10,
                'name' => 'desserts',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 11,
                'name' => 'drinks',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 12,
                'name' => 'sauces',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 13,
                'name' => 'special offer',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'category_id' => 14,
                'name' => 'kids meal',
                'image' => 'https://picsum.photos/1600/800.webp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
