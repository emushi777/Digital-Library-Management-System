<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = ['emri', 'mbiemri', 'biografia', 'vendi', 'foto_profili'];

    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
