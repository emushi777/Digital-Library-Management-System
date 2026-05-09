<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class AuthorController extends Controller
{
    public function index(Request $request)
    {
        $authors = Author::all();
        $isAdmin = auth()->user() && auth()->user()->role === 'admin';
        
        return Inertia::render('Authors/Index', [
            'authors' => $authors,
            'isAdmin' => $isAdmin
        ]);
    }

    public function create()
    {
        if (auth()->user()->role !== 'admin') { abort(403); }
        return Inertia::render('Authors/Create');
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') { abort(403); }

        // RREGULLIMI: Emrat e fushave duhet të jenë si në React (Create.jsx)
        $request->validate([
            'emri'      => 'required|string|max:255', 
            'mbiemri'   => 'required|string|max:255',
            'vendi'     => 'required|string|max:255',
            'biografia' => 'nullable|string',
            'photo'     => 'nullable|image|max:2048',
        ]);

        $data = [
            'emri'      => $request->emri,
            'mbiemri'   => $request->mbiemri,
            'vendi'     => $request->vendi,
            'biografia' => $request->biografia,
        ];

        if ($request->hasFile('photo')) {
            $fileName = time() . '_' . $request->file('photo')->getClientOriginalName();
            $request->file('photo')->move(public_path('uploads/authors'), $fileName);
            $data['foto_profili'] = $fileName;
        }

        Author::create($data);
        return redirect()->route('authors.index')->with('success', 'Author created!');
    }

    public function edit($id)
    {
        if (auth()->user()->role !== 'admin') { abort(403); }

        $author = Author::findOrFail($id);

        return Inertia::render('Authors/Edit', [
            'author' => [
                'id'        => $author->id,
                'emri'      => $author->emri,
                'mbiemri'   => $author->mbiemri,
                'vendi'     => $author->vendi,
                'biografia' => $author->biografia,
                'photo_url' => $author->foto_profili ? "/uploads/authors/{$author->foto_profili}" : null,
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->role !== 'admin') { abort(403); }

        $author = Author::findOrFail($id);

        $request->validate([
            'emri'      => 'required|string|max:255',
            'mbiemri'   => 'required|string|max:255',
            'vendi'     => 'required|string|max:255',
            'biografia' => 'nullable|string',
            'photo'     => 'nullable|image|max:2048',
        ]);

        $author->emri = $request->emri;
        $author->mbiemri = $request->mbiemri;
        $author->vendi = $request->vendi;
        $author->biografia = $request->biografia;

        if ($request->hasFile('photo')) {
            if ($author->foto_profili && File::exists(public_path('uploads/authors/' . $author->foto_profili))) {
                File::delete(public_path('uploads/authors/' . $author->foto_profili));
            }
            $fileName = time() . '_' . $request->file('photo')->getClientOriginalName();
            $request->file('photo')->move(public_path('uploads/authors'), $fileName);
            $author->foto_profili = $fileName;
        }

        $author->save();
        return redirect()->route('authors.index')->with('success', 'Author updated!');
    }

    public function destroy($id)
    {
        if (auth()->user()->role !== 'admin') { abort(403); }

        $author = Author::findOrFail($id);

        if ($author->foto_profili && File::exists(public_path('uploads/authors/' . $author->foto_profili))) {
            File::delete(public_path('uploads/authors/' . $author->foto_profili));
        }

        $author->delete();
        return redirect()->route('authors.index')->with('success', 'Author deleted!');
    }
}