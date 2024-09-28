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
        Schema::create('cuisine_admin', function (Blueprint $table) {
            $table->unsignedBigInteger('cuisine_id');
            $table->unsignedBigInteger('admin_id');

            $table->primary(['cuisine_id', 'admin_id']);

            $table->foreign('cuisine_id')->references('cuisine_id')->on('cuisines')->onDelete('cascade');
            $table->foreign('admin_id')->references('admin_id')->on('admins')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cuisine_admin');
    }
};
