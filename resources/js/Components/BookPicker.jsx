import { useMemo, useState } from 'react';

const FALLBACK_BOOK_IMAGE = 'https://via.placeholder.com/120x160?text=No+Cover';

function getBookImageUrl(fileName) {
    if (!fileName) {
        return FALLBACK_BOOK_IMAGE;
    }

    return `/uploads/books/${fileName}`;
}

export default function BookPicker({ books, value, onChange, error, label = 'Book' }) {
    const [bookSearch, setBookSearch] = useState('');

    const selectedBook = useMemo(
        () => books.find((book) => String(book.id) === String(value)),
        [books, value],
    );

    const filteredBooks = useMemo(() => {
        if (selectedBook) {
            return [selectedBook];
        }

        const query = bookSearch.trim().toLowerCase();

        if (!query) {
            return books;
        }

        return books.filter((book) => {
            const authorName = book.author ? `${book.author.emri} ${book.author.mbiemri}` : 'Unknown Author';
            const searchableText = `${book.titulli} ${authorName}`.toLowerCase();

            return searchableText.includes(query);
        });
    }, [bookSearch, books, selectedBook]);

    const handleToggleBook = (book) => {
        if (String(value) === String(book.id)) {
            onChange('');
            return;
        }

        onChange(String(book.id));
    };

    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">{label}</label>
            <div className="mb-3 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="relative">
                    <input
                        type="text"
                        value={selectedBook ? `${selectedBook.titulli} - ${selectedBook.author ? `${selectedBook.author.emri} ${selectedBook.author.mbiemri}` : 'Unknown Author'}` : bookSearch}
                        onChange={(e) => {
                            if (selectedBook) {
                                return;
                            }

                            setBookSearch(e.target.value);
                        }}
                        placeholder="Search by book title or author..."
                        readOnly={Boolean(selectedBook)}
                        className={`w-full rounded-2xl border-0 bg-transparent py-3 pl-11 pr-4 text-sm text-gray-700 focus:ring-2 focus:ring-blue-300 ${
                            selectedBook ? 'cursor-pointer bg-blue-50/40' : ''
                        }`}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="rounded-[24px] border border-gray-200 bg-white p-3 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-3 px-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {selectedBook ? 'Selected book locked' : 'Choose a book'}
                    </p>
                    <p className="text-xs text-gray-400">
                        {selectedBook ? 'Click again to unlock' : `${filteredBooks.length} shown`}
                    </p>
                </div>

                <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => {
                            const isSelected = String(value) === String(book.id);

                            return (
                                <button
                                    key={book.id}
                                    type="button"
                                    onClick={() => handleToggleBook(book)}
                                    className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all ${
                                        isSelected
                                            ? 'border-blue-200 bg-blue-50 shadow-sm'
                                            : 'border-gray-100 bg-[#f8f9fb] hover:border-blue-100 hover:bg-blue-50/40'
                                    }`}
                                >
                                    <img
                                        src={getBookImageUrl(book.foto_kopertines)}
                                        alt={book.titulli}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = FALLBACK_BOOK_IMAGE;
                                        }}
                                        className="h-20 w-14 rounded-lg border border-gray-100 object-cover shadow-sm"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="line-clamp-2 text-sm font-bold uppercase tracking-tight text-gray-900">{book.titulli}</p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {book.author ? `${book.author.emri} ${book.author.mbiemri}` : 'Unknown Author'}
                                        </p>
                                        <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                            {isSelected ? 'Selected - click to remove' : 'Click to select'}
                                        </p>
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                        <p className="px-2 py-4 text-sm text-gray-400">No books matched your search.</p>
                    )}
                </div>
            </div>

            {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
        </div>
    );
}
