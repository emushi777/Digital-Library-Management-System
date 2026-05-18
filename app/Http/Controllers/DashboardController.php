<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Book;
use App\Models\Author;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        return Inertia::render('Dashboard', [
            'plans' => Plan::all(),

            // Filtrohet libri bazuar ne titull ose emrin e autorit nese ka search query
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
                ->take($search ? 20 : 5) // Shfaqim me shume nese po kerkon
                ->get(),

            'authors' => Author::take(7)->get(),

            'hasActivePlan' => Subscription::where('user_id', auth()->id())
                                ->where('is_active', 1)
                                ->exists(),
            
            'filters' => $request->only(['search']), // Kjo i kthehet React-it
        ]);
    }
}
