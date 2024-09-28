<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //add customer relation to checkouts
/*        Schema::table('checkouts', function (Blueprint $table) {
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')->references('customer_id')->on('customers')->onDelete('cascade');
        });*/

        //for now, let this be
        /*        Schema::table('orders', function (Blueprint $table) {
                    //
                });*/
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
/*        Schema::table('checkouts', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
        });*/
    }
};
