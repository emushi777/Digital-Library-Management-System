<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index()
    {
        $koleksionet = Collection::where('user_id', auth()->id())->get();
        return Inertia::render('Collections/Index', [
            'koleksionet' => $koleksionet
        ]);
    }

    public function create()
    {
        return Inertia::render('Collections/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'emertimi' => 'required|string|max:255',
            'pershkrimi' => 'nullable|string',
        ]);

        Collection::create([
            'emertimi' => $request->emertimi,
            'pershkrimi' => $request->pershkrimi,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('collections.index')->with('success', 'Collection created successfully!');
    }

    public function show($id)
    {
        $collection = Collection::findOrFail($id);
        $books = $collection->books()->get();
        $all_books = Book::all();

        return Inertia::render('Collections/Show', [
            'collection' => $collection,
            'books' => $books,
            'all_books' => $all_books
        ]);
    }

    public function edit($id)
    {
        $collection = Collection::findOrFail($id);
        return Inertia::render('Collections/Edit', [
            'collection' => $collection
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'emertimi' => 'required|string|max:255',
            'pershkrimi' => 'nullable|string',
        ]);

        $collection = Collection::findOrFail($id);
        $collection->update([
            'emertimi' => $request->emertimi,
            'pershkrimi' => $request->pershkrimi,
        ]);

        return redirect()->route('collections.index')->with('success', 'Collection updated successfully!');
    }

    public function destroy($id)
    {
        $collection = Collection::findOrFail($id);
        $collection->delete();

        return redirect()->route('collections.index')->with('success', 'Collection deleted successfully!');
    }

    public function addBook(Request $request)
    {
        $collection = Collection::findOrFail($request->collection_id);
        $collection->books()->syncWithoutDetaching([$request->book_id]);

        return redirect()->back()->with('success', 'Book added to collection successfully!');
    }

    public function removeBook(Request $request)
    {
        $collection = Collection::findOrFail($request->collection_id);
        $collection->books()->detach($request->book_id);

        return redirect()->back()->with('success', 'Book removed from collection successfully!');
    }
}
