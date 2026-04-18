<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) // 1. Duhet të ketë Request $request
    {
        $authors = Author::all();
        
        // 2. Kjo vlerëson nëse je Admin
        $isAdmin = auth()->user() && auth()->user()->role === 'admin';
        
        // 3. Kjo kontrollon nese duhet te jete hapur edit mode
        $editMode = $request->has('edit_mode') && $isAdmin;

        // SHIKO KETU: Sigurohu qe i ke shkruajtur te gjitha ne compact()
        return view('authors.index', compact('authors', 'isAdmin', 'editMode'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Siguria: Vetëm admini mund të shohë formën e krijimit
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        return view('authors.create');
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
            'emri' => 'required',
            'mbiemri' => 'required',
            'biografia' => 'nullable',
            'vendi' => 'required',
            'foto_profili' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('foto_profili')) {
            $fileName = time() . '_' . $request->file('foto_profili')->getClientOriginalName();
            $request->file('foto_profili')->move(public_path('uploads/authors'), $fileName);
            $data['foto_profili'] = $fileName;
        }

        Author::create($data);
        return redirect()->route('authors.index', ['edit_mode' => 1])->with('success', 'Author added successfully!');
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
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $author = Author::findOrFail($id);
        return view('authors.edit', compact('author'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $author = Author::findOrFail($id);

        $request->validate([
            'emri' => 'required',
            'mbiemri' => 'required',
            'biografia' => 'nullable',
            'vendi' => 'required',
            'foto_profili' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('foto_profili')) {
            if ($author->foto_profili && file_exists(public_path('uploads/authors/' . $author->foto_profili))) {
                unlink(public_path('uploads/authors/' . $author->foto_profili));
            }

            $fileName = time() . '_' . $request->file('foto_profili')->getClientOriginalName();
            $request->file('foto_profili')->move(public_path('uploads/authors'), $fileName);
            $data['foto_profili'] = $fileName;
        }

        $author->update($data);
        return redirect()->route('authors.index', ['edit_mode' => 1])->with('success', 'Author updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        // Fshijmë foton nga serveri para se të fshijmë rekordin
        if ($author->foto_profili && file_exists(public_path('uploads/authors/' . $author->foto_profili))) {
            unlink(public_path('uploads/authors/' . $author->foto_profili));
        }

        $author->delete();
        return redirect()->route('authors.index', ['edit_mode' => 1])->with('success', 'Author deleted successfully!');
    }
}