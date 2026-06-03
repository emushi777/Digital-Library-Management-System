<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReadingHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'data_fillimit',
        'data_fundit',
        'faqja_aktuale',
        'perqindja_leximit',
        'statusi',
    ];

    protected $casts = [
        'data_fillimit' => 'datetime',
        'data_fundit' => 'datetime',
        'perqindja_leximit' => 'decimal:2',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
