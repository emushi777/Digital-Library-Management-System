<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    
    protected $fillable = ['emertimi', 'pershkrimi', 'ikona', 'kategoria_prind_id'];

    public function books()
    {
        return $this->hasMany(Book::class);
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'kategoria_prind_id');
    }
}
