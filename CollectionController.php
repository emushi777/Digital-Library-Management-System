<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collection;

use Illuminate\Support\Facades\Auth;
class CollectionController extends Controller
{
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
}
public function addBook(Request $request)
{
    $collection = Collection::find($request->collection_id);
    $collection->books()->attach($request->book_id);

    return redirect()->back()->with('success', 'Libri u shtua në koleksion!');
}
}