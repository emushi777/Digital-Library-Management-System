<div class="container" style="padding: 20px; font-family: sans-serif; max-width: 600px;">
    <h2 style="margin-bottom: 20px;">Add New Category</h2>

    <form action="{{ route('categories.store') }}" method="POST" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        @csrf
        
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Category Name:</label>
            <input type="text" name="emertimi" required placeholder="e.g. Romane, Science, History" 
                   style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Description:</label>
            <textarea name="pershkrimi" rows="4" placeholder="Short description of the category..." 
                      style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"></textarea>
        </div>

        <div style="margin-top: 20px;">
            <button type="submit" style="background: #4F46E5; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Save Category
            </button>
            <a href="{{ route('categories.index') }}" style="margin-left: 15px; color: #666; text-decoration: none;">
                Cancel
            </a>
        </div>
    </form>
</div>