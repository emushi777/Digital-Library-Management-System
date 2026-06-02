import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Index({ auth, categories, allBooks, isAdmin }) {
    const [selectedCategory, setSelectedCategory] = useState({ 
        id: 'all', 
        emertimi: 'All Categories', 
        books: allBooks 
    });

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 24;

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setCurrentPage(1); 
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure ypu want to delete this category?')) {
            router.delete(route('categories.destroy', id));
        }
    };

    const handleBookDelete = (id) => {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(route('books.destroy', id));
        }
    };

    const paginatedBooks = useMemo(() => {
        const startIndex = (currentPage - 1) * booksPerPage;
        return selectedCategory.books.slice(startIndex, startIndex + booksPerPage);
    }, [selectedCategory, currentPage]);

    const totalPages = Math.ceil(selectedCategory.books.length / booksPerPage);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />
                <div className="max-w-[1400px] mx-auto pt-8 px-8">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Explore by Category</h1>
                    {isAdmin && (
                        <Link 
                            href={route('categories.create')} 
                            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-md font-bold text-[13px] uppercase tracking-widest hover:bg-black transition-all"
                        >
                            Add Categories
                        </Link>
                    )}
                </div>

                {/* Kategorite */}
                <div className="flex flex-wrap gap-3 mb-12">
                    <button 
                        onClick={() => handleCategoryChange({ id: 'all', emertimi: 'All Categories', books: allBooks })}
                        className={`px-6 py-2.5 rounded-full font-bold text-sm transition ${selectedCategory.id === 'all' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                    >
                        All Categories
                    </button>

                    {categories.map((cat) => (
                        <div key={cat.id} className="relative group">
                            <button 
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${selectedCategory?.id === cat.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                            >
                                {cat.emertimi}
                            </button>

                            {isAdmin && (
                                <div className="absolute -top-3 -right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <Link href={route('categories.edit', cat.id)} className="p-2 bg-white/95 backdrop-blur rounded-lg shadow-md hover:bg-yellow-500 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></Link>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(cat.id); }} className="p-2 bg-white/95 backdrop-blur rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Grid-i i Librave */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 min-h-[400px]">
                    {paginatedBooks.length > 0 ? (
                        paginatedBooks.map((book) => (
                            <div key={book.id} className="group relative">
                                <div
                                    onClick={() => router.visit(route('books.show', book.id))}
                                    className="relative mb-3 overflow-hidden rounded-xl shadow-sm transition-all group-hover:shadow-xl cursor-pointer"
                                >
                                    <img
                                        src={book.foto_kopertines ? `/uploads/books/${book.foto_kopertines}` : '/images/placeholder.png'}
                                        alt={book.titulli}
                                        className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 p-3 flex flex-col justify-between">
                                        {isAdmin && (
                                            <div className="flex items-start justify-end gap-2">
                                                <Link
                                                    href={route('books.edit', book.id)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="p-2 bg-white/95 backdrop-blur rounded-lg shadow-md hover:bg-yellow-500 hover:text-white transition-all"
                                                >
                                                    ✎
                                                </Link>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleBookDelete(book.id);
                                                    }}
                                                    className="p-2 bg-white/95 backdrop-blur rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-all"
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 gap-2">
                                            <Link
                                                href={route('bookmarks.create', { book_id: book.id })}
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-2 text-[10px] font-bold uppercase rounded-lg bg-white/95 text-slate-900 text-center hover:bg-blue-500 hover:text-white transition-all"
                                            >
                                                Bookmark
                                            </Link>
                                            <Link
                                                href={route('reviews.create', { book_id: book.id })}
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-2 text-[10px] font-bold uppercase rounded-lg bg-white/95 text-slate-900 text-center hover:bg-amber-500 hover:text-white transition-all"
                                            >
                                                Review
                                            </Link>
                                            <Link
                                                href={route('wishlists.create', { book_id: book.id })}
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-2 text-[10px] font-bold uppercase rounded-lg bg-white/95 text-slate-900 text-center hover:bg-emerald-500 hover:text-white transition-all"
                                            >
                                                Wishlist
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <Link href={route('books.show', book.id)}>
                                    <h4 className="font-bold text-gray-900 text-sm truncate uppercase tracking-tight">{book.titulli}</h4>
                                    <p className="text-xs text-gray-500 font-medium">{book.author?.emri} {book.author?.mbiemri}</p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-400 py-20">No books found in this category.</p>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm rounded-lg font-bold bg-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300 transition shadow-sm"
                        >
                            « Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button 
                                key={i} 
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 text-sm rounded-lg font-bold transition shadow-sm ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm rounded-lg font-bold bg-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300 transition shadow-sm"
                        >
                            Next »
                        </button>
                    </div>
                )}
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
                                <li><Link href={route('profile.edit') + '#plans'} className="hover:text-white transition">Plans</Link></li>
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
