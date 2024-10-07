<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'product_id';
    protected $fillable = ['name', 'description', 'image', 'price'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function cuisine(): BelongsTo
    {
        return $this->belongsTo(Cuisine::class, 'cuisine_id');
    }

    public function variations(): HasMany
    {
        return $this->hasMany(Variation::class, 'product_id');
    }
}
