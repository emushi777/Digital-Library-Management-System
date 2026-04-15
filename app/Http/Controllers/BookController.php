<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Author;
use App\Models\Category;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $books = \App\Models\Book::with(['author', 'category'])->get();
        return view('books.index', compact('books'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $authors = Author::all();
        $categories = Category::all();
    
        return view('books.create', compact('authors', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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

        \App\Models\Book::create($data); 

        return redirect()->route('books.index')->with('success', 'Libri u shtua me sukses!');
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $book = Book::findOrFail($id);
        $authors = Author::all();
        $categories = Category::all();

        return view('books.edit', compact('book', 'authors', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $book = \App\Models\Book::findOrFail($id);

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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $book = Book::findOrFail($id);
        $book->delete();

        return redirect()->route('books.index')->with('success', 'Book has been deleted!');
    }
}
