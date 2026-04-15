<div class="container" style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: auto;">
    <h2 style="text-align: center; color: #111827; margin-bottom: 25px;">Edit Category</h2>

    <form action="{{ route('categories.update', $category->id) }}" method="POST" 
          style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
        @csrf
        @method('PUT')

        <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px;">Category Name:</label>
            <input type="text" name="emertimi" value="{{ $category->emertimi }}" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px;">Parent Category:</label>
            <select name="kategoria_prind_id" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: white;">
                <option value="">None (Main Category)</option>
                @foreach($categories as $parent)
                    @if($parent->id != $category->id) 
                        <option value="{{ $parent->id }}" {{ (old('kategoria_prind_id', $category->kategoria_prind_id) == $parent->id) ? 'selected' : '' }}>
                            {{ $parent->emertimi }}
                        </option>
                    @endif
                @endforeach
            </select>
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px;">Icon (Class name):</label>
            <input type="text" name="ikona" value="{{ $category->ikona }}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px;">Description:</label>
            <textarea name="pershkrimi" rows="3" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">{{ $category->pershkrimi }}</textarea>
        </div>

        <button type="submit" style="width: 100%; background: #059669; color: white; padding: 14px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            Update Category
        </button>
    </form>
</div>