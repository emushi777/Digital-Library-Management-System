<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with(['book.author', 'user'])
            ->latest('data_vleresimit')
            ->get();

        return Inertia::render('Reviews/Index', [
            'reviews' => $reviews,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Reviews/Create', [
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
                Rule::unique('reviews')->where(fn ($query) => $query->where('user_id', auth()->id())),
            ],
            'vleresimi' => 'required|integer|min:1|max:5',
            'komenti' => 'nullable|string|max:2000',
        ], [
            'book_id.unique' => 'You have already reviewed this book.',
        ]);

        Review::create([
            'user_id' => auth()->id(),
            'book_id' => $validated['book_id'],
            'vleresimi' => $validated['vleresimi'],
            'komenti' => $validated['komenti'] ?? null,
            'data_vleresimit' => now(),
        ]);

        return redirect()->route('reviews.index')->with('success', 'Review saved successfully!');
    }

    public function edit(Request $request, Review $review)
    {
        $this->authorizeReview($review);

        return Inertia::render('Reviews/Edit', [
            'review' => $review,
            'books' => Book::with('author')->orderBy('titulli')->get(),
            'returnToBook' => $request->boolean('return_to_book'),
        ]);
    }

    public function update(Request $request, Review $review)
    {
        $this->authorizeReview($review);

        $validated = $request->validate([
            'book_id' => [
                'required',
                'exists:books,id',
                Rule::unique('reviews')->ignore($review->id)->where(fn ($query) => $query->where('user_id', auth()->id())),
            ],
            'vleresimi' => 'required|integer|min:1|max:5',
            'komenti' => 'nullable|string|max:2000',
            'return_to_book' => 'nullable|boolean',
        ], [
            'book_id.unique' => 'You have already reviewed this book.',
        ]);

        $review->update($validated);

        if ($request->boolean('return_to_book')) {
            return redirect()->route('books.show', $review->book_id)->with('success', 'Review updated successfully!');
        }

        return redirect()->route('reviews.index')->with('success', 'Review updated successfully!');
    }

    public function destroy(Request $request, Review $review)
    {
        $this->authorizeReview($review);

        $bookId = $request->integer('book_id') ?: $review->book_id;
        $review->delete();

        if ($request->filled('book_id')) {
            return redirect()->route('books.show', $bookId)->with('success', 'Review deleted successfully!');
        }

        return redirect()->route('reviews.index')->with('success', 'Review deleted successfully!');
    }

    private function authorizeReview(Review $review): void
    {
        if ($review->user_id !== auth()->id()) {
            abort(403);
        }
    }
}
