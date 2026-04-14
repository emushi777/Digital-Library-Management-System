<div class="container" style="padding: 20px; font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="font-size: 24px; font-weight: bold;">Categories List</h2>
        <a href="{{ route('categories.create') }}" style="background: #10B981; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
            + Add New Category
        </a>
    </div>

    <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr style="background: #F3F4F6; text-align: left;">
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Category Name</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Description</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($categories as $category)
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">{{ $category->emertimi }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">{{ $category->pershkrimi ?? 'No description' }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    <a href="{{ route('categories.edit', $category->id) }}" style="color: #4F46E5; text-decoration: none; margin-right: 10px;">Edit</a>
                    <form action="{{ route('categories.destroy', $category->id) }}" method="POST" style="display:inline;" onsubmit="return confirm('Are you sure?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" style="color: red; background: none; border: none; cursor: pointer;">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach

            @if($categories->isEmpty())
            <tr>
                <td colspan="3" style="padding: 20px; text-align: center; color: #666;">
                    No categories found.
                </td>
            </tr>
            @endif
        </tbody>
    </table>
</div>