<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        \App\Models\Feedback::create([
            'user_id' => auth()->id(), 
            'message' => $validated['message'],
        ]);

        return back()->with('message', 'Thank you for your feedback!');
    }
    public function index()
    {
        if (auth()->user()->email !== 'admin@gmail.com') {
            abort(403, 'Ju nuk keni të drejta administrimi!');
        }

        $feedbacks = \App\Models\Feedback::with('user')->latest()->get();

        return inertia('Admin/FeedbackIndex', [
            'feedbacks' => $feedbacks
        ]);
    }
}