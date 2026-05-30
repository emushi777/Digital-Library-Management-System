<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index()
    {
        return Inertia::render('Faqs/Index', [
            'faqs' => Faq::orderBy('renditja')->orderBy('created_at', 'desc')->get(),
            'isAdmin' => auth()->user() && auth()->user()->role === 'admin',
        ]);
    }

    public function create()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('Faqs/Create');
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'pyetja' => 'required|string|max:255',
            'pergjigjja' => 'required|string',
            'kategoria' => 'nullable|string|max:255',
            'statusi' => 'required|in:active,inactive',
            'renditja' => 'nullable|integer|min:0',
        ]);

        Faq::create([
            ...$validated,
            'renditja' => $validated['renditja'] ?? 0,
        ]);

        return redirect()->route('faqs.index')->with('success', 'FAQ created successfully.');
    }

    public function edit($id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('Faqs/Edit', [
            'faq' => Faq::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $faq = Faq::findOrFail($id);

        $validated = $request->validate([
            'pyetja' => 'required|string|max:255',
            'pergjigjja' => 'required|string',
            'kategoria' => 'nullable|string|max:255',
            'statusi' => 'required|in:active,inactive',
            'renditja' => 'nullable|integer|min:0',
        ]);

        $faq->update([
            ...$validated,
            'renditja' => $validated['renditja'] ?? 0,
        ]);

        return redirect()->route('faqs.index')->with('success', 'FAQ updated successfully.');
    }

    public function destroy($id)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $faq = Faq::findOrFail($id);
        $faq->delete();

        return redirect()->route('faqs.index')->with('success', 'FAQ deleted successfully.');
    }
}
