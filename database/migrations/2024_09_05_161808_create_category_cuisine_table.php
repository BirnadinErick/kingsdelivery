<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_cuisine', function (Blueprint $table) {
            $table->unsignedBigInteger('cuisine_id');
            $table->unsignedBigInteger('category_id');

            $table->primary(['cuisine_id', 'category_id']);

            $table->foreign('cuisine_id')->references('cuisine_id')->on('cuisines')->onDelete('cascade');
            $table->foreign('category_id')->references('category_id')->on('categories')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_cuisine');
    }
};
