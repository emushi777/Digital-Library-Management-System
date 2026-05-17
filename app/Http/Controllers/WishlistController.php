<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlists = Wishlist::with(['book.author'])
            ->where('user_id', auth()->id())
            ->latest('data_shtimit')
            ->get();

        return Inertia::render('Wishlists/Index', [
            'wishlists' => $wishlists,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Wishlists/Create', [
            'books' => Book::with('author')->orderBy('titulli')->get(),
            'selectedBookId' => $request->integer('book_id') ?: null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => [
                'required',
                'exists:books,id',
                Rule::unique('wishlists')->where(fn ($query) => $query->where('user_id', auth()->id())),
            ],
        ], [
            'book_id.unique' => 'This book is already in your wishlist.',
        ]);

        Wishlist::create([
            'user_id' => auth()->id(),
            'book_id' => $validated['book_id'],
            'data_shtimit' => now(),
        ]);

        return redirect()->route('wishlists.index')->with('success', 'Book added to wishlist successfully!');
    }

    public function edit(Wishlist $wishlist)
    {
        $this->authorizeWishlist($wishlist);

        return Inertia::render('Wishlists/Edit', [
            'wishlist' => $wishlist,
            'books' => Book::with('author')->orderBy('titulli')->get(),
        ]);
    }

    public function update(Request $request, Wishlist $wishlist)
    {
        $this->authorizeWishlist($wishlist);

        $validated = $request->validate([
            'book_id' => [
                'required',
                'exists:books,id',
                Rule::unique('wishlists')->ignore($wishlist->id)->where(fn ($query) => $query->where('user_id', auth()->id())),
            ],
        ], [
            'book_id.unique' => 'This book is already in your wishlist.',
        ]);

        $wishlist->update($validated);

        return redirect()->route('wishlists.index')->with('success', 'Wishlist updated successfully!');
    }

    public function destroy(Wishlist $wishlist)
    {
        $this->authorizeWishlist($wishlist);

        $wishlist->delete();

        return redirect()->route('wishlists.index')->with('success', 'Book removed from wishlist successfully!');
    }

    private function authorizeWishlist(Wishlist $wishlist): void
    {
        if ($wishlist->user_id !== auth()->id()) {
            abort(403);
        }
    }
}
