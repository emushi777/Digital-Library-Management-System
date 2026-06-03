import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Show({ auth, collection, books, all_books = [] }) {
    const isFinishedCollection = collection.emertimi === 'Finished';
    const [bookSearch, setBookSearch] = useState('');
    const [showBookResults, setShowBookResults] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        collection_id: collection.id,
        book_id: '',
    });

    const selectedBook = useMemo(
        () => all_books.find((book) => String(book.id) === String(data.book_id)),
        [all_books, data.book_id],
    );

    const filteredBooks = useMemo(() => {
        const query = bookSearch.trim().toLowerCase();
        const currentBookIds = new Set(books.map((book) => String(book.id)));

        return all_books
            .filter((book) => !currentBookIds.has(String(book.id)))
            .filter((book) => {
                if (!query) {
                    return true;
                }

                return (book.titulli || book.title || '').toLowerCase().includes(query);
            })
            .slice(0, 8);
    }, [all_books, bookSearch, books]);

    const handleAddBook = (e) => {
        e.preventDefault();
        if (!data.book_id) return;
        post(route('collections.addBook'), {
            onSuccess: () => {
                reset('book_id');
                setBookSearch('');
                setShowBookResults(false);
            },
        });
    };

    const handleRemoveBook = (bookId) => {
        if (confirm('Are you sure you want to remove this book from the collection?')) {
            router.post(route('collections.removeBook'), {
                collection_id: collection.id,
                book_id: bookId
            });
        }
    };

    const handleDeleteCollection = () => {
        if (confirm('Are you sure you want to completely delete this collection?')) {
            router.delete(route('collections.destroy', collection.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center w-full">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Collection: <span className="text-blue-600">{collection.emertimi}</span>
                    </h2>
                    {!isFinishedCollection && (
                        <div className="flex items-center space-x-2">
                            <Link
                                href={route('collections.edit', collection.id)}
                                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition"
                            >
                                Rename / Edit
                            </Link>
                            <button
                                onClick={handleDeleteCollection}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition"
                            >
                                Delete Collection
                            </button>
                        </div>
                    )}
                </div>
            }
        >
            <Head title={collection.emertimi} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Add a Book to this Collection</h3>
                            <p className="text-gray-500 text-xs mt-0.5">Select a book from the library catalog to add it here.</p>
                        </div>
                        <form onSubmit={handleAddBook} className="flex items-center space-x-3 w-full md:w-auto">
                            <div className="relative w-full md:w-80">
                                <input
                                    type="text"
                                    value={selectedBook ? (selectedBook.titulli || selectedBook.title) : bookSearch}
                                    onChange={(e) => {
                                        setData('book_id', '');
                                        setBookSearch(e.target.value);
                                        setShowBookResults(true);
                                    }}
                                    onFocus={() => setShowBookResults(true)}
                                    onBlur={() => setTimeout(() => setShowBookResults(false), 120)}
                                    placeholder="Search books..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    required
                                />

                                {selectedBook && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setData('book_id', '');
                                            setBookSearch('');
                                            setShowBookResults(true);
                                        }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-700"
                                    >
                                        Clear
                                    </button>
                                )}

                                {showBookResults && !selectedBook && (
                                    <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                        {filteredBooks.length > 0 ? (
                                            filteredBooks.map((book) => (
                                                <button
                                                    key={book.id}
                                                    type="button"
                                                    onMouseDown={() => {
                                                        setData('book_id', String(book.id));
                                                        setBookSearch(book.titulli || book.title);
                                                        setShowBookResults(false);
                                                    }}
                                                    className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50"
                                                >
                                                    {book.titulli || book.title}
                                                </button>
                                            ))
                                        ) : (
                                            <p className="px-4 py-3 text-sm text-gray-400">No books found.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing || !data.book_id}
                                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition shadow-sm whitespace-nowrap"
                            >
                                {processing ? 'Adding...' : 'Add Book'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Books in this Collection ({books.length})</h3>
                        
                        {books.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                                <span className="text-3xl">📚</span>
                                <p className="text-gray-500 text-sm mt-2">There are no books in this collection right now.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {books.map((book) => (
                                    <div key={book.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative group hover:border-red-200 transition">
                                        
                                        <button
                                            onClick={() => handleRemoveBook(book.id)}
                                            className={`${isFinishedCollection ? 'hidden' : ''} absolute top-2 right-2 bg-white text-red-500 hover:bg-red-50 p-1 rounded-full shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition duration-150 text-xs font-bold`}
                                            title="Remove from collection"
                                        >
                                            ✕
                                        </button>

                                        <div className="w-full h-36 bg-blue-50 rounded-lg mb-3 flex items-center justify-center text-2xl">
                                            📖
                                        </div>
                                        <h4 className="font-bold text-sm text-gray-800 truncate" title={book.titulli || book.title}>
                                            {book.titulli || book.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                            {book.autori || 'Unknown Author'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <Link href={route('collections.index')} className="text-sm text-gray-600 hover:text-blue-600 transition inline-block">
                        ← Back to all collections
                    </Link>
                </div>
            </div>
            <footer className="bg-black text-white pt-20 pb-10 rounded-t-[50px] mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 space-y-6">
                            <h2 className="text-2xl font-black italic tracking-tighter">Bookly</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Your ultimate destination for digital reading. Explore thousands of titles from anywhere.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Services</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href={route('books.index')} className="hover:text-white transition">Library</Link></li>
                                <li><Link href={route('authors.index')} className="hover:text-white transition">Authors</Link></li>
                                <li><Link href={route('categories.index')} className="hover:text-white transition">Categories</Link></li>

                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Support</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href={route('about.index')} className="hover:text-white transition">About Us</Link></li>
                                <li><Link href={route('about.index') + '#contactus'} className="hover:text-white transition">Contact Us</Link></li>
                                <li><Link href={route('about.index') + '#feedback'} className="hover:text-white transition">Feedback</Link></li>

                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-lg">Account</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href={route('profile.edit')} className="hover:text-white transition">Profile</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Plans</Link></li>
                                <li><Link 
                                        href={route('logout')} 
                                        method="post" 
                                        as="button" 
                                        className="hover:text-white transition"
                                        onClick={(e) => {
                                            if (!confirm('Are you sure you want to log out?')) {
                                                e.preventDefault(); 
                                            }
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
                        © {new Date().getFullYear()} Bookly. All rights reserved.
                    </div>
                </div>
                </footer>
        </AuthenticatedLayout>
    );
}
