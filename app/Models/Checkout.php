<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed $session_id
 */
class Checkout extends Model
{
    use HasFactory;

    protected $fillable = ['session_id'];
}
