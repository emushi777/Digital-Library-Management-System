<div class="container" style="padding: 20px; font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="font-size: 24px; font-weight: bold;">Authors List</h2>
        <a href="{{ route('authors.create') }}" style="background: #4F46E5; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
            + Add New Author
        </a>
    </div>

    <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr style="background: #F3F4F6; text-align: left;">
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Full Name</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Biography</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($authors as $author)
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">{{ $author->emri }} {{ $author->mbiemri }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">{{ Str::limit($author->biografia, 60) }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    <a href="{{ route('authors.edit', $author->id) }}" style="color: #4F46E5; text-decoration: none; margin-right: 10px;">Edit</a>
                    <form action="{{ route('authors.destroy', $author->id) }}" method="POST" style="display:inline;" onsubmit="return confirm('Are you sure?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" style="color: red; background: none; border: none; cursor: pointer;">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach

            @if($authors->isEmpty())
            <tr>
                <td colspan="3" style="padding: 20px; text-align: center; color: #666;">
                    No authors found. Click the button above to add one.
                </td>
            </tr>
            @endif
        </tbody>
    </table>
</div>