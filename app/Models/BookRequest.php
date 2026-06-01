<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookRequest extends Model
    {
        use HasFactory;
        protected $fillable = [
        'titulli_librit', 
        'emri_autorit', 
        'arsyetimi', 
        'user_id',
        'statusi', 
    ];
}
