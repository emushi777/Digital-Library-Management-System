<style>
    /* Stili i Erës për pastrimin e linjave të tabelës */
    table a, 
    table a:hover, 
    table a:visited, 
    table a:active {
        text-decoration: none !important;
        box-shadow: none !important;
        border-bottom: none !important;
    }

    button, button:focus {
        text-decoration: none !important;
        outline: none !important;
    }
</style>

<div class="container" style="padding: 20px; font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="color: #111827; margin: 0;">Books List</h2>
        
        {{-- LOGJIKA E RE: Kontrolli i butonave për Adminin --}}
        @if($isAdmin)
            <div>
                @if($editMode)
                    {{-- Butonat që shihen vetëm kur Edit Mode është AKTIV --}}
                    <a href="{{ route('books.index') }}" style="background: #10B981; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-right: 10px;">
                        Done Editing
                    </a>
                    <a href="{{ route('books.create') }}" style="background: #4F46E5; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                        + Add New Book
                    </a>
                @else
                    {{-- Butoni që aktivizon Edit Mode --}}
                    <a href="{{ route('books.index', ['edit_mode' => 1]) }}" style="background: #6B7280; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                        ⚙️ Edit Mode
                    </a>
                @endif
            </div>
        @endif
    </div>

    {{-- Mesazhi i suksesit pas veprimeve CRUD --}}
    @if(session('success'))
        <div style="background: #D1FAE5; color: #065F46; padding: 12px; border-radius: 6px; margin-bottom: 20px;">
            {{ session('success') }}
        </div>
    @endif

    <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
        <thead>
            <tr style="background: #F3F4F6; text-align: left;">
                <th style="padding: 15px; border-bottom: 2px solid #E5E7EB;">Cover</th>
                <th style="padding: 15px; border-bottom: 2px solid #E5E7EB;">Title</th>
                <th style="padding: 15px; border-bottom: 2px solid #E5E7EB;">Author</th>
                
                {{-- Shfaq kolonën Actions vetëm nëse Edit Mode është AKTIV --}}
                @if($editMode)
                    <th style="padding: 15px; border-bottom: 2px solid #E5E7EB; text-align: center;">Actions</th>
                @endif
            </tr>
        </thead>
        <tbody>
            @foreach($books as $book)
            <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 12px; vertical-align: middle;">
                    @if($book->foto_kopertines && $book->foto_kopertines != 'default.jpg')
                        <img src="{{ asset('uploads/books/' . $book->foto_kopertines) }}" 
                             alt="Cover" 
                             style="width: 50px; height: 70px; object-fit: cover; border-radius: 4px; border: 1px solid #E5E7EB;">
                    @else
                        <div style="width: 50px; height: 70px; background: #F9FAFB; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 10px; border: 1px solid #E5E7EB;">
                            No Image
                        </div>
                    @endif
                </td>
                <td style="padding: 12px; font-weight: 600; color: #1F2937; vertical-align: middle;">{{ $book->titulli }}</td>
                <td style="padding: 12px; color: #4B5563; vertical-align: middle;">
                    {{ $book->author->emri ?? 'N/A' }} {{ $book->author->mbiemri ?? '' }}
                </td>
                
                {{-- Shfaq butonat Edit/Delete vetëm nëse Edit Mode është AKTIV --}}
                @if($editMode)
                <td style="padding: 12px; vertical-align: middle;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <a href="{{ route('books.edit', $book->id) }}" 
                           style="display: flex; align-items: center; justify-content: center; background: #4F46E5; color: white; width: 80px; height: 30px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">
                            Edit
                        </a>

                        <form action="{{ route('books.destroy', $book->id) }}" method="POST" onsubmit="return confirm('Are you sure?')" style="margin: 0;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" 
                                    style="display: flex; align-items: center; justify-content: center; background: #EF4444; color: white; width: 80px; height: 30px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">
                                Delete
                            </button>
                        </form>
                    </div>
                </td>
                @endif
            </tr>
            @endforeach
        </tbody>
    </table>
</div>