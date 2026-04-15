<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<div class="container" style="padding: 20px; font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="margin: 0;">Categories List</h2>
        <a href="{{ route('categories.create') }}" style="background: #4F46E5; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">+ Add New Category</a>
    </div>

    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <thead>
            <tr style="background: #f3f4f6; text-align: left; border-bottom: 2px solid #e5e7eb;">
                <th style="padding: 15px;">Icon</th>
                <th style="padding: 15px;">Category Name</th>
                <th style="padding: 15px;">Parent Category</th>
                <th style="padding: 15px; text-align: center;">Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($categories as $category)
            <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px; text-align: center; width: 60px;">
                    <span style="background: #f3f4f6; padding: 8px; border-radius: 6px; color: #4F46E5;">
                        <i class="fa {{ $category->ikona ?? 'fa-folder' }}"></i>
                    </span>
                </td>
                <td style="padding: 15px; font-weight: 600; color: #111827;">{{ $category->emertimi }}</td>
                <td style="padding: 15px; color: #6b7280;">
                    {{ $category->parent->emertimi ?? '—' }} 
                </td>
                <td style="padding: 15px;">
                    <div style="display: flex; gap: 8px; justify-content: center; align-items: center;">
                        <a href="{{ route('categories.edit', $category->id) }}" style="background: #4F46E5; color: white; padding: 6px 15px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">Edit</a>
                        <form action="{{ route('categories.destroy', $category->id) }}" method="POST" style="margin: 0;" onsubmit="return confirm('Are you sure?')">
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
