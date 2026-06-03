<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::with('books')->get();
        
        $isAdmin = auth()->user() && auth()->user()->role === 'admin';

        return Inertia::render('Categories/Index', [
        'categories' => Category::with('books')->get(),
        'allBooks' => \App\Models\Book::all(), 
        'isAdmin' => auth()->user() && auth()->user()->role === 'admin'
    ]);
    
    }

    public function create()
    {
        if (auth()->user()->role !== 'admin') abort(403);
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') abort(403);

        $request->validate([
            'emri' => 'required|string|max:255',
            'pershkrimi' => 'nullable|string',
        ]);

        Category::create([
            'emertimi' => $request->emri, 
            'pershkrimi' => $request->pershkrimi,
        ]);
        
        return redirect()->route('categories.index')->with('success', 'Category created successfully!');
    }

    public function edit($id)
    {
        if (auth()->user()->role !== 'admin') abort(403);

        $category = Category::findOrFail($id);

        return Inertia::render('Categories/Edit', [
            'category' => [
                'id' => $category->id,
                'emri' => $category->emertimi,
                'pershkrimi' => $category->pershkrimi,
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->role !== 'admin') abort(403);

        $category = Category::findOrFail($id);

        $request->validate([
            'emri' => 'required|string|max:255',
            'pershkrimi' => 'nullable|string',
        ]);

        $category->update([
            'emertimi' => $request->emri,
            'pershkrimi' => $request->pershkrimi,
        ]);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully!');
    }
    
    public function destroy($id)
    {
        if (auth()->user()->role !== 'admin') abort(403);

        $category = Category::findOrFail($id);
        $category->delete();
        $this->authorize('delete', $category); 

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully!');
    }
    public function show($id)
    {
        $category = Category::findOrFail($id);
        $books = $category->books; 
        return inertia('Categories/Show', [
            'category' => $category,
            'books' => $books
        ]);
    }
}