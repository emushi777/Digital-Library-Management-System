<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return view('categories.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = \App\Models\Category::all();
        
        return view('categories.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'emertimi' => 'required',
            'pershkrimi' => 'nullable',
            'ikona' => 'nullable', 
            'kategoria_prind_id' => 'nullable|exists:categories,id',
        ]);

        \App\Models\Category::create($request->all());
        return redirect()->route('categories.index')->with('success', 'Category created successfully!');
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
    public function edit($id)
    {
        $category = \App\Models\Category::findOrFail($id);
        $categories = \App\Models\Category::all(); 
        return view('categories.edit', compact('category', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $category = \App\Models\Category::findOrFail($id);

        $request->validate([
            'emertimi' => 'required',
            'pershkrimi' => 'nullable',
            'ikona' => 'nullable',
            'kategoria_prind_id' => 'nullable|exists:categories,id', 
        ]);

        $category->fill($request->all());
        
        if (!$request->kategoria_prind_id) {
            $category->kategoria_prind_id = null;
        }

        $category->save();

        return redirect()->route('categories.index')->with('success', 'Category updated successfully!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully!');
    }
}
