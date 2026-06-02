<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; 
use App\Models\BookRequest;

class BookRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulli_librit' => 'required|string|max:255',
            'autori' => 'required|string|max:255', 
        ]);

        \App\Models\BookRequest::create([
            'titulli_librit' => $validated['titulli_librit'],
            'emri_autorit' => $validated['autori'], 
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('books.index')->with('success', 'Request sent successfully!');
    }

    public function index()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('BookRequests/Index', [
            'requests' => \App\Models\BookRequest::latest()->get()
        ]);
    }
    public function create()
    {
        return Inertia::render('BookRequests/Create'); 
    }
    public function update(BookRequest $bookRequest)
    {
        $bookRequest->update(['statusi' => 'complete']);
        return redirect()->back(); 
    }

    public function destroy(BookRequest $bookRequest)
    {
        $bookRequest->delete();
        return redirect()->back(); 
    }
}
