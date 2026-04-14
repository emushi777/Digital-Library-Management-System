<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use App\Models\Plan;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        Subscription::create([
            'user_id' => auth()->id(), 
            'plan_id' => $request->plan_id,
            'starts_at' => now(),           // Ndryshuar nga data_fillimit
            'ends_at'   => now()->addMonth(), // Ndryshuar nga data_skadimit
            'is_active' => true,            // Ndryshuar nga statusi
        ]);

        return redirect()->back()->with('success', 'Subscription completed successfully!');
    }
}