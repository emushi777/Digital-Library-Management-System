<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reading_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->timestamp('data_fillimit')->nullable();
            $table->timestamp('data_fundit')->nullable();
            $table->unsignedInteger('faqja_aktuale')->default(1);
            $table->decimal('perqindja_leximit', 5, 2)->default(0);
            $table->string('statusi')->default('reading');
            $table->timestamps();

            $table->unique(['user_id', 'book_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reading_histories');
    }
};
