<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Book;
use App\Models\FinishedBook;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index()
    {
        Collection::firstOrCreate(
            [
                'user_id' => auth()->id(),
                'emertimi' => 'Finished',
            ],
            [
                'pershkrimi' => 'Books you have marked as finished.',
                'a_eshte_publike' => false,
            ]
        );

        $koleksionet = Collection::where('user_id', auth()->id())
            ->orderByRaw('CASE WHEN emertimi = ? THEN 0 ELSE 1 END', ['Finished'])
            ->latest()
            ->get();

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
        $books = $collection->books()
            ->with('author')
            ->when($collection->emertimi === 'Finished', function ($query) {
                $query->orderByDesc('collection_books.data_shtimit');
            })
            ->get();
        $all_books = Book::with('author')->get();

        return Inertia::render('Collections/Show', [
            'collection' => $collection,
            'books' => $books,
            'all_books' => $all_books
        ]);
    }

    public function edit($id)
    {
        $collection = Collection::findOrFail($id);

        if ($collection->emertimi === 'Finished') {
            return redirect()->route('collections.show', $collection->id)->withErrors([
                'collection' => 'The Finished collection cannot be edited.',
            ]);
        }

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

        if ($collection->emertimi === 'Finished') {
            return redirect()->route('collections.show', $collection->id)->withErrors([
                'collection' => 'The Finished collection cannot be edited.',
            ]);
        }

        $collection->update([
            'emertimi' => $request->emertimi,
            'pershkrimi' => $request->pershkrimi,
        ]);

        return redirect()->route('collections.index')->with('success', 'Collection updated successfully!');
    }

    public function destroy($id)
    {
        $collection = Collection::findOrFail($id);

        if ($collection->emertimi === 'Finished') {
            return redirect()->route('collections.index')->withErrors([
                'collection' => 'The Finished collection cannot be deleted.',
            ]);
        }

        $collection->delete();

        return redirect()->route('collections.index')->with('success', 'Collection deleted successfully!');
    }

    public function addBook(Request $request)
    {
        $collection = Collection::findOrFail($request->collection_id);
        $collection->books()->syncWithoutDetaching([$request->book_id]);

        if ($collection->emertimi === 'Finished') {
            $collection->books()->updateExistingPivot($request->book_id, [
                'data_shtimit' => now(),
            ]);

            FinishedBook::updateOrCreate(
                ['user_id' => auth()->id(), 'book_id' => $request->book_id],
                ['finished_at' => now()]
            );
        }

        return redirect()->back()->with('success', 'Book added to collection successfully!');
    }

    public function removeBook(Request $request)
    {
        $collection = Collection::findOrFail($request->collection_id);

        if ($collection->emertimi === 'Finished') {
            return redirect()->back()->withErrors([
                'collection' => 'Books cannot be removed from the Finished collection.',
            ]);
        }

        $collection->books()->detach($request->book_id);

        return redirect()->back()->with('success', 'Book removed from collection successfully!');
    }
}
