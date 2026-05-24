import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, book, similarBooks = [] }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const getImageUrl = (fileName) => {
        if (!fileName) return 'https://via.placeholder.com/450x600?text=No+Cover';
        return `/uploads/books/${fileName}`;
    };

    const deleteBook = () => {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(route('books.destroy', book.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={book.titulli} />
            
            <div className="bg-white min-h-screen py-8 text-[#333333]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[250px,1fr] gap-10">
                    <aside className="sticky top-8 self-start">
                        <div className="w-full border border-gray-300 p-1 shadow-sm">
                            <img src={getImageUrl(book.foto_kopertines)} className="w-full h-auto" alt={book.titulli} />
                        </div>
                        
                        <div className="mt-4 space-y-3">
                            <button className="w-full bg-[#377458] text-white font-semibold py-2 rounded-sm hover:bg-[#2d5d44] transition">
                                Read Now
                            </button>

                            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#377458] transition">
                                    <span>🔖</span>Add to Bookmarks
                                </button>
                                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#377458] transition">
                                    <span>♡</span>Add to Wishlist
                                </button>
                                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#377458] transition">
                                    <span>★</span>Rate this book
                                </button>
                            </div>

                            {auth.user?.role === 'admin' && (
                                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                    <Link 
                                        href={route('books.edit', book.id)} 
                                        className="w-full text-center text-sm py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded border border-gray-300 transition"
                                    >
                                        Edit Book
                                    </Link>
                                    <button 
                                        onClick={deleteBook}
                                        className="w-full text-sm py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded border border-red-200 transition"
                                    >
                                        Delete Book
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>

                    <main>
                        <h1 className="text-[38px] font-bold text-gray-900 leading-tight font-serif border-b border-gray-200 pb-2">
                            {book.titulli}
                        </h1>
                        
                        <p className="text-xl text-[#333333] font-serif mt-3">
                            by <span className="text-[#377458] hover:underline cursor-pointer font-bold">{book.author?.emri} {book.author?.mbiemri}</span>
                        </p>
                        
                        <div className="flex items-center gap-3 mt-3">
                            <div className="flex text-amber-400 text-lg">★★★★☆</div>
                            <span className="text-gray-500 text-sm font-semibold">3.82 • 360,950 ratings</span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Link href={`/books?category=${book.category?.id}`} className="bg-[#f4f1ea] text-[#377458] px-3 py-1 text-sm rounded-full hover:bg-[#e9e4d5] border border-[#d8d0b5]">
                                {book.category?.emertimi}
                            </Link>
                        </div>

                        <div className="mt-6">
                            <div className={`text-[16px] text-[#333333] leading-[1.6] font-serif ${!isExpanded ? 'line-clamp-4' : ''}`}>
                                {book.pershkrimi || "No description available."}
                            </div>
                            <button onClick={() => setIsExpanded(!isExpanded)} className="text-[#377458] hover:underline text-sm font-medium mt-1">
                                {isExpanded ? '(less)' : '...more'}
                            </button>
                        </div>

                        {/* SEKSIONI I AUTORIT */}
                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4 text-lg">About the author</h3>
                            <div className="flex gap-4 items-start">
                                {/* KETU ESHTE NDRYSHIMI */}
                                {book.author?.foto_profili ? (
                                    <img 
                                        src={`/uploads/authors/${book.author.foto_profili}`} 
                                        alt={book.author.emri}
                                        className="w-16 h-16 rounded-full object-cover border border-gray-200"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-xl">
                                        {book.author?.emri[0]}
                                    </div>
                                )}
                                
                                <div>
                                    <h4 className="font-bold text-[#377458] hover:underline cursor-pointer text-lg">
                                        {book.author?.emri} {book.author?.mbiemri}
                                    </h4>
                                    <p className="text-sm text-gray-600 font-serif mt-1">
                                        {book.author?.biografia || "No biography available."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <h3 className="font-bold text-gray-800 mb-4 text-lg">Similar books</h3>
                            {similarBooks.length > 0 ? (
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                    {similarBooks.map((simBook) => (
                                        <Link href={route('books.show', simBook.id)} key={simBook.id} className="block">
                                            <div className="aspect-[2/3] w-full rounded-sm border border-gray-300 overflow-hidden hover:opacity-80 transition">
                                                <img src={`/uploads/books/${simBook.foto_kopertines}`} alt={simBook.titulli} className="w-full h-full object-cover" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic text-sm">No similar books found.</p>
                            )}
                        </div>
                        {/* REVIEWS SECTION */}
                        <div className="mt-12 border-t border-gray-200 pt-8">
                            <h3 className="font-bold text-gray-800 mb-6 text-xl">Ratings & Reviews</h3>
                        </div>
                    </main>
                </div>
            </div>
            <footer className="bg-black text-white pt-20 pb-10 rounded-t-[50px] mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1">
                            <h2 className="text-2xl font-black mb-6 italic tracking-tighter">BooksHub</h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Your ultimate destination for digital reading. Explore thousands of titles from anywhere.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Services</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href={route('books.index')} className="hover:text-white transition">Library</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Audiobooks</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Authors</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Support</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
                            <div className="flex gap-2">
                                <input type="email" placeholder="Email" className="bg-gray-900 border-none rounded-lg text-sm w-full focus:ring-0" />
                                <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition">Join</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
                        © {new Date().getFullYear()} BooksHub · Read more, know more.
                    </div>
                </div>
            </footer>
        </AuthenticatedLayout>
    );
}