<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authors = \App\Models\Author::all();
        return view('authors.index', compact('authors'));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('authors.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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

        \App\Models\Author::create($data);
        return redirect()->route('authors.index')->with('success', 'Author added successfully!');
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
        $author = Author::findOrFail($id);
        return view('authors.edit', compact('author'));
    }

    public function update(Request $request, $id)
    {
        $author = \App\Models\Author::findOrFail($id);

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
        return redirect()->route('authors.index')->with('success', 'Author updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author)
    {
        $author->delete();
        return redirect()->route('authors.index')->with('success', 'Author deleted successfully!');
    }
}
