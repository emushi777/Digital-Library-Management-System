<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $books = Book::with(['author', 'category'])
            ->when($request->category, function ($query, $categoryId) {
                $query->where('kategoria_id', $categoryId);
            })
            ->when($request->author, function ($query, $authorId) {
                $query->where('autori_id', $authorId);
            })
            ->latest()
            ->get();

        $isAdmin = auth()->user() && auth()->user()->role === 'admin';

        return Inertia::render('Books/Index', [
            'books' => $books,
            'categories' => Category::all(),
            'authors' => Author::all(),
            'isAdmin' => $isAdmin,
            'selectedCategory' => $request->category,
            'selectedAuthor' => $request->author,
        ]);
    }

    public function create()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('Books/Create', [
            'authors' => Author::all(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'titulli' => 'required',
            'pershkrimi' => 'nullable|string',
            'isbn' => 'required|unique:books,isbn',
            'autori_id' => 'required',
            'kategoria_id' => 'required',
            'viti_botimit' => 'required|integer',
            'gjuha' => 'required',
            'numri_faqeve' => 'required|integer',
            'formati' => 'required',
            'madhesia_mb' => 'required|numeric',
            'foto_kopertines' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $validated['shtegu_skedarit'] = 'N/A';

        if ($request->hasFile('foto_kopertines')) {
            $file = $request->file('foto_kopertines');
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeName = time() . '_' . Str::slug($originalName) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/books'), $safeName);
            $validated['foto_kopertines'] = $safeName;
        }

        Book::create($validated);

        return redirect()->route('books.index')->with('success', 'Libri u shtua me sukses!');
    }

    public function edit(string $id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $book = Book::findOrFail($id);

        return Inertia::render('Books/Edit', [
            'book' => $book,
            'authors' => Author::all(),
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $book = Book::findOrFail($id);

        $validated = $request->validate([
            'titulli' => 'required',
            'pershkrimi' => 'nullable|string',
            'isbn' => 'required|unique:books,isbn,' . $id,
            'autori_id' => 'required',
            'kategoria_id' => 'required',
            'viti_botimit' => 'required|integer',
            'gjuha' => 'required',
            'numri_faqeve' => 'required|integer',
            'formati' => 'required',
            'madhesia_mb' => 'required|numeric',
            'foto_kopertines' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('foto_kopertines')) {
            if ($book->foto_kopertines && File::exists(public_path('uploads/books/' . $book->foto_kopertines))) {
                File::delete(public_path('uploads/books/' . $book->foto_kopertines));
            }

            $file = $request->file('foto_kopertines');
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeName = time() . '_' . Str::slug($originalName) . '.' . $file->getClientOriginalExtension();

            $file->move(public_path('uploads/books'), $safeName);
            $validated['foto_kopertines'] = $safeName;
        }

        $book->update($validated);

        return redirect()->route('books.index')->with('success', 'Libri u përditësua me sukses!');
    }

    public function destroy(string $id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $book = Book::findOrFail($id);

        if ($book->foto_kopertines && File::exists(public_path('uploads/books/' . $book->foto_kopertines))) {
            File::delete(public_path('uploads/books/' . $book->foto_kopertines));
        }

        $book->delete();

        return redirect()->route('books.index')->with('success', 'Libri u fshi me sukses!');
    }
}
