<div class="container" style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: auto;">
    <h2 style="margin-bottom: 20px;">Add New Author</h2>

    <form action="{{ route('authors.store') }}" method="POST" style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        @csrf
        
        <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">First Name:</label>
            <input type="text" name="emri" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Last Name:</label>
            <input type="text" name="mbiemri" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Biography:</label>
            <textarea name="biografia" rows="5" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;" placeholder="Write a short bio..."></textarea>
        </div>

        <div style="margin-top: 20px;">
            <button type="submit" style="background: #4F46E5; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Save Author
            </button>
            <a href="{{ route('authors.index') }}" style="margin-left: 15px; color: #666; text-decoration: none;">Cancel</a>
        </div>
    </form>
</div>