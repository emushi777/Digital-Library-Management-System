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
        $plans = Plan::where('statusi', true)->get();

        return Inertia::render('Dashboard', [
            'plans' => $plans
        ]);
    }
}