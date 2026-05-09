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
    public function index()
    {
        return Inertia::render('Dashboard', [
            'plans' => Plan::all(),

            // RREGULLIMI KRYESOR: Shtohet with('author') që të shfaqet emri i autorit
            'latestBooks' => Book::with('author')->latest()->take(5)->get(),

            'authors' => Author::take(7)->get(),

            'hasActivePlan' => Subscription::where('user_id', auth()->id())
                                ->where('is_active', 1)
                                ->exists(),
        ]);
    }
}