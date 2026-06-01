<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('book_requests', function (Blueprint $table) {
            $table->text('arsyetimi')->nullable(); // Shton kolonën
        });
    }

    public function down()
    {
        Schema::table('book_requests', function (Blueprint $table) {
            $table->dropColumn('arsyetimi');
        });
    }
};
