<div class="container" style="padding: 20px; font-family: sans-serif; max-width: 800px; margin: auto;">
    <h2 style="text-align: center; color: #111827; margin-bottom: 25px;">Edito Librin: {{ $book->titulli }}</h2>

    <form action="{{ route('books.update', $book->id) }}" method="POST" enctype="multipart/form-data" 
          style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
        @csrf
        @method('PUT')

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            
            <div style="grid-column: span 2;">
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Titulli i Librit:</label>
                <input type="text" name="titulli" value="{{ $book->titulli }}" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Autori:</label>
                <select name="autori_id" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: white;">
                    @foreach($authors as $author)
                        <option value="{{ $author->id }}" {{ $book->autori_id == $author->id ? 'selected' : '' }}>
                            {{ $author->emri }} {{ $author->mbiemri }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Kategoria:</label>
                <select name="kategoria_id" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: white;">
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ $book->kategoria_id == $category->id ? 'selected' : '' }}>
                            {{ $category->emertimi }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">ISBN:</label>
                <input type="text" name="isbn" value="{{ $book->isbn }}" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Viti i Botimit:</label>
                <input type="number" name="viti_botimit" value="{{ $book->viti_botimit }}" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Gjuha:</label>
                <input type="text" name="gjuha" value="{{ $book->gjuha }}" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Numri i Faqeve:</label>
                <input type="number" name="numri_faqeve" value="{{ $book->numri_faqeve }}" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Formati:</label>
                <select name="formati" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: white;">
                    <option value="Hardcover" {{ $book->formati == 'Hardcover' ? 'selected' : '' }}>Hardcover</option>
                    <option value="Paperback" {{ $book->formati == 'Paperback' ? 'selected' : '' }}>Paperback</option>
                    <option value="PDF" {{ $book->formati == 'PDF' ? 'selected' : '' }}>PDF</option>
                    <option value="E-pub" {{ $book->formati == 'E-pub' ? 'selected' : '' }}>E-pub</option>
                </select>
            </div>

            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Madhësia (MB):</label>
                <input type="number" step="0.01" name="madhesia_mb" value="{{ $book->madhesia_mb }}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>

            <div style="grid-column: span 2;">
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Foto e Kopertinës:</label>
                @if($book->foto_kopertines)
                    <div style="margin-bottom: 10px;">
                        <img src="{{ asset('uploads/books/' . $book->foto_kopertines) }}" style="width: 60px; border-radius: 4px; border: 1px solid #ddd;">
                        <small style="display: block; color: #666;">Kopertina aktuale</small>
                    </div>
                @endif
                <input type="file" name="foto_kopertines" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            </div>

        </div>

        <button type="submit" style="width: 100%; background: #059669; color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 600; margin-top: 25px;">
            Përditëso Librin
        </button>
        
        <a href="{{ route('books.index') }}" style="display: block; text-align: center; margin-top: 15px; color: #6b7280; text-decoration: none; font-size: 14px;">
            Anulo dhe kthehu mbrapa
        </a>
    </form>
</div>