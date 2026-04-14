<div class="container" style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: auto;">
    <h2 style="margin-bottom: 20px; color: #111827;">Add New Book</h2>

    <form action="{{ route('books.store') }}" method="POST" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
        @csrf
        
        <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #374151;">Book Title:</label>
            <input type="text" name="titulli" required placeholder="Enter book title"
                   style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; box-sizing: border-box;">
        </div>

        <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #374151;">Select Author:</label>
            <select name="autori_id" required style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; background-color: white; cursor: pointer; box-sizing: border-box;">
                <option value="" disabled selected>-- Choose an Author --</option>
                @foreach($authors as $author)
                    <option value="{{ $author->id }}">{{ $author->emri }} {{ $author->mbiemri }}</option>
                @endforeach
            </select>
        </div>

        <div style="margin-bottom: 25px;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #374151;">Select Category:</label>
            <select name="kategoria_id" required style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; background-color: white; cursor: pointer; box-sizing: border-box;">
                <option value="" disabled selected>-- Choose a Category --</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}">{{ $category->emertimi }}</option>
                @endforeach
            </select>
        </div>
        <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px;">ISBN:</label>
            <input type="text" name="isbn" required 
            style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
        </div>

        <button type="submit" style="width: 100%; background: #4F46E5; color: white; padding: 14px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 600; transition: background 0.2s;">
            Save Book
        </button>
        
        <div style="text-align: center; margin-top: 15px;">
            <a href="{{ route('books.index') }}" style="color: #6B7280; text-decoration: none; font-size: 14px;">Cancel and go back</a>
        </div>
    </form>
</div>