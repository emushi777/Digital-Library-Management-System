<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Book;
use App\Models\Author;
use Inertia\Inertia;
use App\Models\Category;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        return Inertia::render('Dashboard', [
            'plans' => Plan::all(),
            'categories' => Category::all(), 

            'latestBooks' => Book::with('author')
                ->withAvg('reviews', 'vleresimi')
                ->withCount('reviews')
                ->when($search, function ($query, $search) {
                    $query->where('titulli', 'like', "%{$search}%")
                          ->orWhereHas('author', function ($q) use ($search) {
                              $q->where('emri', 'like', "%{$search}%")
                                ->orWhere('mbiemri', 'like', "%{$search}%");
                          });
                })
                ->latest()
                ->take($search ? 20 : 5) 
                ->get(),

            'authors' => Author::take(7)->get(),

            'hasActivePlan' => Subscription::where('user_id', auth()->id())
                                ->where('is_active', 1)
                                ->exists(),
            
            'filters' => $request->only(['search']), // Kjo i kthehet React-it
        ]);
    }
}
