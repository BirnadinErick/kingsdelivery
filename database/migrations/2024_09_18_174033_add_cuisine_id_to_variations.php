<?php /** @noinspection SqlWithoutWhere */

/** @noinspection SqlNoDataSourceInspection */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
/*        Schema::table('variations', function (Blueprint $table) {
            $table->unsignedBigInteger('cuisine_id')->nullable()->after('product_catalog_id');
            $table->foreign('cuisine_id')->references('id')->on('cuisines')->onDelete('cascade');
        });

        DB::statement('
            UPDATE variations v
            JOIN products p ON v.product_id = p.product_id
            SET v.cuisine_id = p.cuisine_id
        ');*/
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('variations', function (Blueprint $table) {
            $table->dropForeign(['cuisine_id']);
            $table->dropColumn('cuisine_id');
        });
    }
};
