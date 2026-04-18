<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Category::all();
        
        // Kontrollojmë nëse përdoruesi është admin
        $isAdmin = auth()->user() && auth()->user()->role === 'admin';
        
        // Aktivizojmë Edit Mode nëse kërkohet nga admini
        $editMode = $request->has('edit_mode') && $isAdmin;

        return view('categories.index', compact('categories', 'isAdmin', 'editMode'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Siguria: Vetëm për admin
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $categories = Category::all();
        return view('categories.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $request->validate([
            'emertimi' => 'required',
            'pershkrimi' => 'nullable',
            'ikona' => 'nullable', 
            'kategoria_prind_id' => 'nullable|exists:categories,id',
        ]);

        Category::create($request->all());
        
        // Kthehemi te index duke mbajtur Edit Mode aktiv
        return redirect()->route('categories.index', ['edit_mode' => 1])->with('success', 'Category created successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $category = Category::findOrFail($id);
        $categories = Category::all(); 
        return view('categories.edit', compact('category', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $category = Category::findOrFail($id);

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

        return redirect()->route('categories.index', ['edit_mode' => 1])->with('success', 'Category updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('categories.index', ['edit_mode' => 1])->with('success', 'Category deleted successfully!');
    }
}