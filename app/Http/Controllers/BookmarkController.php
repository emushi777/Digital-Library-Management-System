<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    public function index()
    {
        $bookmarks = Bookmark::with(['book.author'])
            ->where('user_id', auth()->id())
            ->latest('data_krijimit')
            ->get();

        return Inertia::render('Bookmarks/Index', [
            'bookmarks' => $bookmarks,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Bookmarks/Create', [
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
                Rule::unique('bookmarks')->where(function ($query) use ($request) {
                    return $query
                        ->where('user_id', auth()->id())
                        ->where('book_id', $request->book_id)
                        ->where('faqja', $request->faqja);
                }),
            ],
            'faqja' => [
                'required',
                'integer',
                'min:1',
                function ($attribute, $value, $fail) use ($request) {
                    $book = Book::find($request->book_id);

                    if ($book && $value > $book->numri_faqeve) {
                        $fail("The {$attribute} must be between 1 and {$book->numri_faqeve} for the selected book.");
                    }
                },
            ],
            'shenime' => 'nullable|string|max:1000',
        ], [
            'book_id.unique' => 'A bookmark for this book and page already exists.',
        ]);

        Bookmark::create([
            'user_id' => auth()->id(),
            'book_id' => $validated['book_id'],
            'faqja' => $validated['faqja'],
            'shenime' => $validated['shenime'] ?? null,
            'data_krijimit' => now(),
        ]);

        return redirect()->route('bookmarks.index')->with('success', 'Bookmark created successfully!');
    }

    public function edit(Bookmark $bookmark)
    {
        $this->authorizeBookmark($bookmark);

        return Inertia::render('Bookmarks/Edit', [
            'bookmark' => $bookmark,
            'books' => Book::with('author')->orderBy('titulli')->get(),
        ]);
    }

    public function update(Request $request, Bookmark $bookmark)
    {
        $this->authorizeBookmark($bookmark);

        $validated = $request->validate([
            'book_id' => [
                'required',
                'exists:books,id',
                Rule::unique('bookmarks')->ignore($bookmark->id)->where(function ($query) use ($request) {
                    return $query
                        ->where('user_id', auth()->id())
                        ->where('book_id', $request->book_id)
                        ->where('faqja', $request->faqja);
                }),
            ],
            'faqja' => [
                'required',
                'integer',
                'min:1',
                function ($attribute, $value, $fail) use ($request) {
                    $book = Book::find($request->book_id);

                    if ($book && $value > $book->numri_faqeve) {
                        $fail("The {$attribute} must be between 1 and {$book->numri_faqeve} for the selected book.");
                    }
                },
            ],
            'shenime' => 'nullable|string|max:1000',
        ], [
            'book_id.unique' => 'A bookmark for this book and page already exists.',
        ]);

        $bookmark->update($validated);

        return redirect()->route('bookmarks.index')->with('success', 'Bookmark updated successfully!');
    }

    public function destroy(Bookmark $bookmark)
    {
        $this->authorizeBookmark($bookmark);

        $bookmark->delete();

        return redirect()->route('bookmarks.index')->with('success', 'Bookmark deleted successfully!');
    }

    private function authorizeBookmark(Bookmark $bookmark): void
    {
        if ($bookmark->user_id !== auth()->id()) {
            abort(403);
        }
    }
}
