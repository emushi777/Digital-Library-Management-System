<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;
use App\Models\Subscription;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'plans'         => \App\Models\Plan::all(),
            'latestBooks'   => \App\Models\Book::latest()->take(5)->get(),
            'authors'       => \App\Models\Author::take(7)->get(),
            'hasActivePlan' => \App\Models\Subscription::where('user_id', auth()->id())
                                   ->where('is_active', 1)
                                   ->exists(),
        ]);
    }
}