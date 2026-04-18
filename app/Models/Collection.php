<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'emertimi', 'pershkrimi', 'a_eshte_publike'];

    public function books() {
    return $this->belongsToMany(Book::class, 'collection_books');
}
}
