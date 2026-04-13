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
    Schema::create('books', function (Blueprint $table) {
        $table->id();
        $table->string('titulli');
        
        $table->foreignId('autori_id')->constrained('authors')->onDelete('cascade');
        $table->foreignId('kategoria_id')->constrained('categories')->onDelete('cascade');
        
        $table->string('isbn')->unique();
        $table->integer('viti_botimit');
        $table->string('gjuha');
        $table->integer('numri_faqeve');
        $table->string('formati'); 
        $table->decimal('madhesia_mb', 8, 2);
        $table->string('shtegu_skedarit'); 
        $table->string('foto_kopertines')->nullable();
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
