<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'arsyetimi' => 'nullable|string|max:255',
        ]);

        \App\Models\Recommendation::create($validated);

        return redirect()->back()->with('success', 'Recommendation sent successfully!');
    }
}
