<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'emertimi',
        'pershkrimi',
        'cmimi_mujor',
        'librat_max_mujor',
        'statusi',
    ];
}
