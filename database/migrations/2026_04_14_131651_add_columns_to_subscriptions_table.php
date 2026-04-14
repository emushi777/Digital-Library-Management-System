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
    Schema::table('subscriptions', function (Blueprint $table) {
        // Lidhja me perdoruesin dhe planin
        $table->foreignId('user_id')->constrained()->onDelete('cascade')->after('id');
        $table->foreignId('plan_id')->constrained()->onDelete('cascade')->after('user_id');
        
        // Datat e abonimit
        $table->timestamp('starts_at')->nullable()->after('plan_id');
        $table->timestamp('ends_at')->nullable()->after('starts_at');
        
        // Statusi (aktiv ose jo)
        $table->boolean('is_active')->default(true)->after('ends_at');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            //
        });
    }
};
