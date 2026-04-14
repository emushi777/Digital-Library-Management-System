<div class="container" style="padding: 20px; font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2>Books List</h2>
        <a href="{{ route('books.create') }}" style="background: #4F46E5; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
            + Add New Book
        </a>    
    </div>

    <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr style="background: #F3F4F6; text-align: left;">
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Title</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Author</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Category</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Year</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($books as $book)
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">{{ $book->titulli }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">{{ $book->author->emri ?? 'N/A' }} {{ $book->author->mbiemri ?? '' }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">{{ $book->category->emertimi ?? 'N/A' }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">{{ $book->viti_botimit }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    <form action="{{ route('books.destroy', $book->id) }}" method="POST">
                        @csrf @method('DELETE')
                        <button type="submit" style="color: red; background: none; border: none; cursor: pointer;">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>