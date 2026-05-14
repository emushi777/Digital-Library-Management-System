<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collection;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
class CollectionController extends Controller
{ public function index()
    {
        $koleksionet = auth()->user()->collections;
        return Inertia::render('Collections/Index', ['koleksionet' => $koleksionet]);
    }
public function store(Request $request)
{
    $request->validate([
        'emertimi' => 'required|string|max:255',
    ]);

    Collection::create([
        'user_id' => Auth::id(), 
        'emertimi' => $request->emertimi,
        'pershkrimi' => $request->pershkrimi,
        'a_eshte_publike' => $request->has('a_eshte_publike'),
    ]);

    return redirect()->back()->with('success', 'Collection was successuflly made!');
} public function edit(Collection $collection)
{
    if ($collection->user_id !== auth()->id()) { abort(403); }
    return Inertia::render('Collections/Edit', ['collection' => $collection]);
}

public function update(Request $request, Collection $collection)
{
    if ($collection->user_id !== auth()->id()) { abort(403); }

    $collection->update($request->validate([
        'emertimi' => 'required|string|max:255',
        'pershkrimi' => 'nullable|string',
    ]));

    return redirect()->route('collections.index')->with('success', 'U përditësua!');
}

public function destroy(Collection $collection)
{
    if ($collection->user_id !== auth()->id()) { abort(403); }
    $collection->delete();
    return redirect()->back()->with('success', 'U fshi me sukses!');
}
public function addBook(Request $request)
{
    $collection = Collection::find($request->collection_id);
    $collection->books()->attach($request->book_id);

    return redirect()->back()->with('success', 'Libri u shtua në koleksion!');
}
public function removeBook(Request $request, Collection $collection)
    {
        if ($collection->user_id !== auth()->id()) { abort(403); }

        $collection->books()->detach($request->book_id);

        return redirect()->back()->with('success', 'Libri u largua nga koleksioni!');
    }
}
