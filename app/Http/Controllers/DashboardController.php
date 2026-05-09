<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the user's dashboard with available subscription plans.
     */
    public function index()
{
    return Inertia::render('Dashboard', [
        'plans' => \App\Models\Plan::all(),
        'latestBooks' => \App\Models\Book::latest()->take(5)->get(),
        'authors' => \App\Models\Author::take(7)->get(),
    ]);
    }
}