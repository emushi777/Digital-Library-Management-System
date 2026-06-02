<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Book;
use App\Models\Author;
use App\Models\Review; 
use Inertia\Inertia;
use App\Models\Category;

class DashboardController extends Controller
{
    public function index(Request $request)
{
    $user = auth()->user();
    $search = $request->query('search');

    $preferredCategoryIds = \App\Models\Review::where('user_id', $user->id ?? 0)
        ->join('books', 'reviews.book_id', '=', 'books.id')
        ->pluck('books.kategoria_id') 
        ->unique();

    if ($preferredCategoryIds->isEmpty()) {
        $recommendations = \App\Models\Book::withAvg('reviews', 'vleresimi')
            ->with('author')
            ->inRandomOrder()
            ->take(3)
            ->get();
    } else {
        $recommendations = \App\Models\Book::whereIn('kategoria_id', $preferredCategoryIds) 
            ->with('author')
            ->inRandomOrder()
            ->take(3)
            ->get();
    }

    return Inertia::render('Dashboard', [
        'plans' => \App\Models\Plan::all(),
        'categories' => \App\Models\Category::all(), 
        'latestBooks' => \App\Models\Book::with('author')
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
        'authors' => \App\Models\Author::take(7)->get(),
        'hasActivePlan' => \App\Models\Subscription::where('user_id', $user->id ?? 0)
            ->where('is_active', 1)
            ->exists(),
        'filters' => $request->only(['search']),
        'recommendations' => $recommendations, 
    ]);
}
}