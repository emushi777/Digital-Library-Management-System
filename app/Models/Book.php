<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    

    protected $fillable = [
        'titulli',
        'pershkrimi',
        'isbn', 
        'autori_id', 
        'kategoria_id', 
        'viti_botimit', 
        'gjuha', 
        'numri_faqeve', 
        'formati', 
        'madhesia_mb', 
        'foto_kopertines',
        'shtegu_skedarit',
        'pershkrimi',
    ];
    public function author()
    {
        return $this->belongsTo(Author::class, 'autori_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'kategoria_id');
    }

    public function collections()
    {
        return $this->belongsToMany(Collection::class, 'collection_books');
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }
}
