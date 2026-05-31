<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collection;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CollectionController extends Controller
{
    public function index()
    {
        $koleksionet = auth()->user()->collections;
        return Inertia::render('Collections/Index', ['koleksionet' => $koleksionet]);
    }

    public function create()
    {
        return Inertia::render('Collections/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'enertimi' => 'required|string|max:255',
        ]);

        Collection::create([
            'user_id' => Auth::id(),
            'emertimi' => $request->enertimi,
            'pershkrimi' => $request->pershkrimi ?? 'Koleksion i krijuar nga ju.',
            'a_eshte_publike' => $request->has('a_eshte_publike') ? $request->a_eshte_publike : false,
        ]);

        return redirect()->route('collections.index')->with('success', 'Collection was successfully made!');
    }

    // Ky është funksioni që po mungonte dhe shkaktonte errorin!
    public function show(Collection $collection)
    {
        if ($collection->user_id !== auth()->id()) {
            abort(403);
        }

        // Ngarkojmë librat e këtij koleksioni (relacioni many-to-many)
        $collection->load('books');
        
        // Marrim të gjithë librat që ekzistojnë në sistem për t'i zgjedhur te dropdown
        $allBooks = \App\Models\Book::all();

        return Inertia::render('Collections/Show', [
            'collection' => $collection,
            'books' => $collection->books,
            'all_books' => $allBooks
        ]);
    }

    public function edit(Collection $collection)
    {
        if ($collection->user_id !== auth()->id()) {
            abort(403);
        }
        return Inertia::render('Collections/Edit', ['collection' => $collection]);
    }

    public function update(Request $request, Collection $collection)
    {
        if ($collection->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'emertimi' => 'required|string|max:255',
            'pershkrimi' => 'nullable|string',
        ]);

        $collection->update([
            'emertimi' => $validated['emertimi'],
            'pershkrimi' => $validated['pershkrimi'] ?? $collection->pershkrimi,
        ]);

        return redirect()->route('collections.index')->with('success', 'U përditësua!');
    }

    public function destroy(Collection $collection)
    {
        if ($collection->user_id !== auth()->id()) {
            abort(403);
        }
        
        $collection->delete();
        return redirect()->route('collections.index')->with('success', 'U fshi me sukses!');
    }

    public function addBook(Request $request)
    {
        $collection = Collection::findOrFail($request->collection_id);
        
        // attach shton ID-në e librit në tabelën ndërmjetëse pivot
        $collection->books()->attach($request->book_id);

        return redirect()->back()->with('success', 'Libri u shtua në koleksion!');
    }
    public function removeBook(Request $request)
    {
        $collection = Collection::findOrFail($request->collection_id);
        
        // Shkëput lidhjen e librit specifik me këtë koleksion në tabelën pivot
        $collection->books()->detach($request->book_id);

        return redirect()->back()->with('success', 'Libri u hoq nga koleksioni!');
    }
}
