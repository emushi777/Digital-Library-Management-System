<style>
    /* Heqim nënvizimet e linkave që vijnë nga stilet e default */
    table a, table a:hover, table a:visited, table a:active {
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
        <h2 style="margin: 0; color: #111827;">Categories List</h2>
        
        {{-- Shfaqet butoni Edit Mode vetëm nëse përdoruesi është Admin --}}
        @if($isAdmin)
            <div>
                @if($editMode)
                    <a href="{{ route('categories.index') }}" style="background: #10B981; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-right: 10px;">
                        Done Editing
                    </a>
                    <a href="{{ route('categories.create') }}" style="background: #4F46E5; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                        + Add New Category
                    </a>
                @else
                    <a href="{{ route('categories.index', ['edit_mode' => 1]) }}" style="background: #6B7280; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                        ⚙️ Edit Mode
                    </a>
                @endif
            </div>
        @endif
    </div>

    {{-- Mesazhi për sukses pas shtimit/fshirjes --}}
    @if(session('success'))
        <div style="background: #D1FAE5; color: #065F46; padding: 12px; border-radius: 6px; margin-bottom: 20px;">
            {{ session('success') }}
        </div>
    @endif

    <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
        <thead>
            <tr style="background: #F3F4F6; text-align: left; border-bottom: 2px solid #E5E7EB;">
                <th style="padding: 15px;">#</th>
                <th style="padding: 15px;">Category Name</th>
                <th style="padding: 15px;">Description</th>
                
                {{-- Kjo kolonë shihet vetëm kur Edit Mode është AKTIV --}}
                @if($editMode)
                    <th style="padding: 15px; text-align: center;">Actions</th>
                @endif
            </tr>
        </thead>
        <tbody>
            @foreach($categories as $category)
            <tr style="border-bottom: 1px solid #F3F4F6; background: white;">
                <td style="padding: 15px; color: #6B7280;">{{ $loop->iteration }}</td>
                <td style="padding: 15px; font-weight: 600; color: #1F2937;">
                    {{ $category->emertimi }}
                </td>
                <td style="padding: 15px; color: #4B5563;">
                    {{ $category->pershkrimi ?? 'No description provided.' }}
                </td>
                
                @if($editMode)
                <td style="padding: 15px; vertical-align: middle;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <a href="{{ route('categories.edit', $category->id) }}" 
                           style="background: #4F46E5; color: white; padding: 6px 15px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">
                            Edit
                        </a>

                        <form action="{{ route('categories.destroy', $category->id) }}" method="POST" onsubmit="return confirm('Delete this category?')" style="margin: 0;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" 
                                    style="background: #EF4444; color: white; padding: 6px 15px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">
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