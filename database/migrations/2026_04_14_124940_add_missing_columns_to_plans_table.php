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
        Schema::table('plans', function (Blueprint $table) {
            $table->text('pershkrimi')->nullable()->after('emertimi');
            $table->decimal('cmimi_mujor', 8, 2)->after('pershkrimi');
            $table->integer('librat_max_mujor')->after('cmimi_mujor');
            $table->boolean('statusi')->default(true)->after('librat_max_mujor');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::table('plans', function (Blueprint $table) {
        $table->dropColumn(['pershkrimi', 'cmimi_mujor', 'librat_max_mujor', 'statusi']);
    });
}
};
