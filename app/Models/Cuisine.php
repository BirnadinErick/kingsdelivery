<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cuisine extends Model
{
    use HasFactory;

    protected $primaryKey = 'cuisine_id';

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_cuisine', 'cuisine_id', 'category_id')->withTimestamps();
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'cuisine_id');
    }

    public function variations(): HasMany
    {
        return $this->hasMany(Variation::class, 'product_id');
    }
}
