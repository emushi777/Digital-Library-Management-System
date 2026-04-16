<div class="container" style="padding: 20px; font-family: sans-serif; max-width: 700px; margin: auto;">
    <h2 style="text-align: center; color: #111827; margin-bottom: 25px;">Add New Author</h2>
    
    <form action="{{ route('authors.store') }}" method="POST" enctype="multipart/form-data" 
          style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
        @csrf
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">First Name:</label>
                <input type="text" name="emri" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>
            
            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Last Name:</label>
                <input type="text" name="mbiemri" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>
            
            <div style="grid-column: span 2;">
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Country / Origin:</label>
                <input type="text" name="vendi" placeholder="e.g. USA, Kosovo, Albania" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>
            
            <div style="grid-column: span 2;">
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Biography:</label>
                <textarea name="biografia" rows="4" placeholder="Write a short bio..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;"></textarea>
            </div>
            
            <div style="grid-column: span 2;">
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Profile Image:</label>
                <input type="file" name="foto_profili" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>
        </div>
        
        <button type="submit" style="width: 100%; background: #4F46E5; color: white; padding: 14px; border: none; border-radius: 6px; margin-top: 25px; font-weight: 600; cursor: pointer;">
            Save Author
        </button>
    </form>
</div>