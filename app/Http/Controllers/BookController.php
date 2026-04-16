<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Author;
use App\Models\Category;

class BookController extends Controller
{
   public function index(Request $request) {
        $books = Book::with(['author', 'category'])->get();
        $isAdmin = auth()->user()->role === 'admin';
        
        // Kjo shikon nëse kemi shtypur butonin "Edit Mode"
        $editMode = $request->has('edit_mode') && $isAdmin;

        return view('books.index', compact('books', 'isAdmin', 'editMode'));
    }

    public function create()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }
        $authors = Author::all();
        $categories = Category::all();
    
        return view('books.create', compact('authors', 'categories'));
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $request->validate([
            'titulli' => 'required',
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

        $data = $request->all();
        $data['shtegu_skedarit'] = 'N/A';

        if ($request->hasFile('foto_kopertines')) {
            $fileName = time() . '_' . $request->file('foto_kopertines')->getClientOriginalName();
            $request->file('foto_kopertines')->move(public_path('uploads/books'), $fileName);
            $data['foto_kopertines'] = $fileName;
        }

        Book::create($data); 

        return redirect()->route('books.index')->with('success', 'Libri u shtua me sukses!');
    }

    public function edit(string $id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }
        $book = Book::findOrFail($id);
        $authors = Author::all();
        $categories = Category::all();

        return view('books.edit', compact('book', 'authors', 'categories'));
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $book = Book::findOrFail($id);
        $request->validate([
            'titulli' => 'required',
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

        $data = $request->all();

        if ($request->hasFile('foto_kopertines')) {
            if ($book->foto_kopertines && file_exists(public_path('uploads/books/' . $book->foto_kopertines))) {
                unlink(public_path('uploads/books/' . $book->foto_kopertines));
            }
            $fileName = time() . '_' . $request->file('foto_kopertines')->getClientOriginalName();
            $request->file('foto_kopertines')->move(public_path('uploads/books'), $fileName);
            $data['foto_kopertines'] = $fileName;
        }

        $book->update($data);
        return redirect()->route('books.index')->with('success', 'Libri u përditësua me sukses!');
    }

    public function destroy(string $id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }
        $book = Book::findOrFail($id);
        
        if ($book->foto_kopertines && file_exists(public_path('uploads/books/' . $book->foto_kopertines))) {
            unlink(public_path('uploads/books/' . $book->foto_kopertines));
        }

        $book->delete();
        return redirect()->route('books.index')->with('success', 'Book has been deleted!');
    }
}