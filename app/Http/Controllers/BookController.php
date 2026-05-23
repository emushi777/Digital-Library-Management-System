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
        // Ndryshimi: Zëvendësuam ->get() me ->paginate(20)
        $books = Book::with(['author', 'category'])
            ->withAvg('reviews', 'vleresimi')
            ->withCount('reviews')
            ->when($request->category, fn($query, $id) => $query->where('kategoria_id', $id))
            ->when($request->author, fn($query, $id) => $query->where('autori_id', $id))
            ->latest()
            ->paginate(20)
            ->withQueryString(); // Kjo ruan filtrat kur ndërron faqen

        return Inertia::render('Books/Index', [
            'books' => $books,
            'categories' => Category::all(),
            'authors' => Author::all(),
            'isAdmin' => auth()->user()?->role === 'admin',
            'selectedCategory' => $request->category,
            'selectedAuthor' => $request->author,
        ]);
    }

    // Pjesa tjetër e metodave (store, edit, update, destroy, etj) mbetet e njëjtë
    public function create()
    {
        $this->authorizeAdmin();
        return Inertia::render('Books/Create', [
            'authors' => Author::all(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizeAdmin();
        $validated = $request->validate([
            'titulli' => 'required|string|max:255',
            'isbn' => 'required|unique:books,isbn',
            'autori_id' => 'required|exists:authors,id',
            'kategoria_id' => 'required|exists:categories,id',
            'viti_botimit' => 'required|integer',
            'gjuha' => 'required|string',
            'numri_faqeve' => 'required|integer',
            'formati' => 'required|string',
            'madhesia_mb' => 'required|numeric',
            'foto_kopertines' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $validated['shtegu_skedarit'] = 'N/A';
        if ($request->hasFile('foto_kopertines')) {
            $validated['foto_kopertines'] = $this->uploadImage($request->file('foto_kopertines'));
        }

        Book::create($validated);
        return redirect()->route('books.index')->with('success', 'Libri u shtua me sukses!');
    }

    public function edit(string $id)
    {
        $this->authorizeAdmin();
        return Inertia::render('Books/Edit', [
            'book' => Book::findOrFail($id),
            'authors' => Author::all(),
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->authorizeAdmin();
        $book = Book::findOrFail($id);
        $validated = $request->validate([
            'titulli' => 'required|string',
            'isbn' => 'required|unique:books,isbn,' . $id,
            'autori_id' => 'required',
            'kategoria_id' => 'required',
            'viti_botimit' => 'required|integer',
            'foto_kopertines' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('foto_kopertines')) {
            $this->deleteImage($book->foto_kopertines);
            $validated['foto_kopertines'] = $this->uploadImage($request->file('foto_kopertines'));
        }

        $book->update($validated);
        return redirect()->route('books.index')->with('success', 'Libri u përditësua!');
    }

    public function destroy(string $id)
    {
        $this->authorizeAdmin();
        $book = Book::findOrFail($id);
        $this->deleteImage($book->foto_kopertines);
        $book->delete();
        
        return redirect()->route('books.index')->with('success', 'Libri u fshi!');
    }

    private function authorizeAdmin()
    {
        if (auth()->user()?->role !== 'admin') abort(403);
    }

    private function uploadImage($file)
    {
        $safeName = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads/books'), $safeName);
        return $safeName;
    }

    private function deleteImage($fileName)
    {
        if ($fileName && $fileName !== 'n/a' && File::exists(public_path('uploads/books/' . $fileName))) {
            File::delete(public_path('uploads/books/' . $fileName));
        }
    }
}