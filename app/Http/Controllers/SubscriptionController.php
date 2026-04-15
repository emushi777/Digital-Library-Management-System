<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use App\Models\Plan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'plans' => Plan::all()
        ]);
    }

    public function checkout($plan_id)
    {
        $plan = Plan::findOrFail($plan_id);
        return Inertia::render('Checkout/Index', [
            'plan' => $plan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        $plan = Plan::findOrFail($request->plan_id);

        // Kjo parandalon krijimin e shumë rreshtave për të njëjtin user
        Subscription::updateOrCreate(
            ['user_id' => Auth::id()], 
            [
                'plan_id'   => $plan->id,
                'starts_at' => now(),
                'ends_at'   => now()->addMonth(),
                'is_active' => true,
            ]
        );

        // Pasi nuk është gati books.index, të kthen te Dashboard
        // Sapo Era ta kryejë, kodi automatikisht do ta dërgojë te librat
        if (Route::has('books.index')) {
            return redirect()->route('books.index');
        }

        return redirect()->route('dashboard')->with('success', 'Plan activated successfully!');
    }
}