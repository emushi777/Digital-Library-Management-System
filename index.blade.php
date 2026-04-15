<div class="container" style="padding: 20px; font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="margin: 0;">Authors List</h2>
        <a href="{{ route('authors.create') }}" style="background: #4F46E5; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">+ Add New Author</a>
    </div>

    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <thead>
            <tr style="background: #f3f4f6; text-align: left; border-bottom: 2px solid #e5e7eb;">
                <th style="padding: 15px;">Photo</th>
                <th style="padding: 15px;">Full Name</th>
                <th style="padding: 15px;">Country</th>
                <th style="padding: 15px; text-align: center;">Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($authors as $author)
            <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px;">
                    @if($author->foto_profili)
                        <img src="{{ asset('uploads/authors/' . $author->foto_profili) }}" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 1px solid #ddd;">
                    @else
                        <div style="width: 45px; height: 45px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #6b7280;">N/A</div>
                    @endif
                </td>
                <td style="padding: 15px; font-weight: 600; color: #111827;">{{ $author->emri }} {{ $author->mbiemri }}</td>
                <td style="padding: 15px; color: #4b5563;">{{ $author->vendi }}</td>
                <td style="padding: 15px;">
                    <div style="display: flex; gap: 8px; justify-content: center; align-items: center;">
                        <a href="{{ route('authors.edit', $author->id) }}" style="background: #4F46E5; color: white; padding: 6px 15px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">Edit</a>
                        <form action="{{ route('authors.destroy', $author->id) }}" method="POST" style="margin: 0;" onsubmit="return confirm('Are you sure?')">
                            @csrf @method('DELETE')
                            <button type="submit" style="background: #EF4444; color: white; padding: 6px 15px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">Delete</button>
                        </form>
                    </div>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>