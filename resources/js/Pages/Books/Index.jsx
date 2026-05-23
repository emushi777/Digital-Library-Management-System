import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, books, categories, authors, isAdmin, selectedCategory, selectedAuthor }) {
    const [file, setFile] = useState(null);

    const handleImport = (e) => {
        e.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        router.post(route('books.import'), formData, { forceFormData: true });
    };

    const renderStars = (rating) => {
        const roundedRating = Math.round(Number(rating) || 0);
        return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
    };

    const getRatingLabel = (book) => {
        if (!book.reviews_count) {
            return 'No reviews yet';
        }
        return `${Number(book.reviews_avg_vleresimi).toFixed(1)} / 5`;
    };

    const handleFilter = (type, id) => {
        const params = {
            category: selectedCategory,
            author: selectedAuthor,
        };

        if (type === 'category') {
            params.category = id;
        } else if (type === 'author') {
            params.author = id;
        }

        // Pastrimi i vlerave null
        Object.keys(params).forEach(key => params[key] === null && delete params[key]);

        router.get(route('books.index'), params, {
            preserveState: true,
            replace: true,
            only: ['books', 'selectedCategory', 'selectedAuthor'],
        });
    };

    const getImageUrl = (fileName) => {
        if (!fileName) return 'https://via.placeholder.com/300x450?text=No+Cover';
        return `/uploads/books/${fileName}`;
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(route('books.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Library</h2>}
        >
            <Head title="Books" />

            <div className="bg-[#f8f9fb] min-h-screen pb-20">
                <div className="max-w-[1400px] mx-auto pt-8 px-8">
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">New Releases</h3>
                            <div className="flex gap-2">
                                <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">{'<'}</button>
                                <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">{'>'}</button>
                            </div>
                        </div>

                        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                            {books.data.slice(0, 3).map((book, idx) => (
                                <div
                                    key={book.id}
                                    className={`min-w-[350px] p-6 rounded-2xl flex gap-5 text-white transition-transform hover:scale-[1.02] cursor-pointer shadow-lg
                                    ${idx === 0 ? 'bg-gradient-to-br from-slate-700 to-slate-900' :
                                    idx === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-700' :
                                    'bg-gradient-to-br from-emerald-500 to-emerald-700'}`}
                                >
                                    <img src={getImageUrl(book.foto_kopertines)} className="w-24 h-36 object-cover rounded shadow-md" alt="" />
                                    <div className="flex flex-col justify-center flex-1">
                                        <h4 className="font-bold text-lg leading-tight mb-1 uppercase">{book.titulli}</h4>
                                        <p className="text-sm opacity-80 mb-2">By {book.author?.emri} {book.author?.mbiemri}</p>
                                        <div className="mb-3">
                                            <div className="flex text-yellow-400 text-xs">{renderStars(book.reviews_avg_vleresimi)}</div>
                                            <p className="mt-1 text-[11px] opacity-80">
                                                {getRatingLabel(book)}
                                                {book.reviews_count ? ` • ${book.reviews_count} review${book.reviews_count > 1 ? 's' : ''}` : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="flex-1">
                            <div className="flex flex-col mb-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">For You</h3>
                                <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-400 uppercase tracking-tighter border-b border-gray-100 pb-4">
                                    <button
                                        onClick={() => handleFilter('category', null)}
                                        className={!selectedCategory ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'pb-2 hover:text-gray-600'}
                                    >
                                        All Categories
                                    </button>
                                    {categories?.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleFilter('category', cat.id)}
                                            className={selectedCategory == cat.id ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'pb-2 hover:text-gray-600'}
                                        >
                                            {cat.emertimi}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                                {books.data.length > 0 ? (
                                    books.data.map((book) => (
                                        <div key={book.id} className="group cursor-pointer">
                                            <div className="relative mb-3 overflow-hidden rounded-xl shadow-sm transition-all group-hover:shadow-xl">
                                                <img src={getImageUrl(book.foto_kopertines)} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-500" alt={book.titulli} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 p-3 flex flex-col justify-between">
                                                    {isAdmin && (
                                                        <div className="flex items-start justify-end gap-2">
                                                            <Link href={route('books.edit', book.id)} className="p-2 bg-white/95 backdrop-blur rounded-lg shadow-md hover:bg-yellow-500 hover:text-white transition-all transform hover:-translate-y-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                            </Link>
                                                            <button onClick={(e) => { e.stopPropagation(); handleDelete(book.id); }} className="p-2 bg-white/95 backdrop-blur rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <h5 className="font-bold text-gray-900 text-sm truncate uppercase tracking-tight">{book.titulli}</h5>
                                            <p className="text-xs text-gray-500 font-medium">{book.author?.emri} {book.author?.mbiemri}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center text-gray-400 italic">Nuk u gjet asnje liber per kete perzgjedhje.</div>
                                )}
                            </div>

                            <div className="mt-12 flex justify-center gap-2">
                                {books.links.map((link, index) => (
                                    <Link key={index} href={link.url || '#'} className={`px-4 py-2 rounded-lg text-sm font-bold ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-80">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-gray-800">Top Authors</h3>
                                    <button onClick={() => handleFilter('author', null)} className="text-gray-400 text-xs hover:text-blue-600">Reset</button>
                                </div>
                                <div className="space-y-5">
                                    {authors?.map((author, idx) => (
                                        <button key={author.id} onClick={() => handleFilter('author', author.id)} className={`flex items-center w-full text-left group gap-4 transition-colors ${selectedAuthor == author.id ? 'text-blue-600' : 'text-gray-600 hover:text-black'}`}>
                                            <span className="text-xs font-black opacity-30 group-hover:opacity-100">{idx + 1}</span>
                                            <div className="flex-1"><p className="text-sm font-bold truncate">{author.emri} {author.mbiemri}</p></div>
                                            <div className={`w-2 h-2 rounded-full transition-all ${selectedAuthor == author.id ? 'bg-blue-600 scale-125' : 'bg-transparent'}`}></div>
                                        </button>
                                    ))}
                                </div>
                                {isAdmin && (
                                    <div className="mt-10 pt-6 border-t border-gray-50">
                                        <form onSubmit={handleImport} className="mb-4">
                                            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block w-full text-xs text-gray-500 mb-2" accept=".csv" />
                                            <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded-lg font-bold text-xs uppercase hover:bg-yellow-600 transition">Import CSV</button>
                                        </form>
                                        <Link href={route('books.create')} className="block w-full py-3 bg-gray-900 text-white text-center rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all">Add New Book</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-black text-white pt-20 pb-10 rounded-t-[50px] mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
                        <div className="col-span-1"><h2 className="text-2xl font-black mb-6 italic tracking-tighter">BooksHub</h2><p className="text-gray-400 text-sm leading-relaxed">Your ultimate destination for digital reading.</p></div>
                        <div><h4 className="font-bold mb-6 text-lg">Quick Links</h4><ul className="space-y-4 text-gray-400 text-sm"><li><Link href={route('books.index')} className="hover:text-white transition">Library</Link></li><li><Link href="#" className="hover:text-white transition">Authors</Link></li></ul></div>
                        <div><h4 className="font-bold mb-6 text-lg">Support</h4><ul className="space-y-4 text-gray-400 text-sm"><li><Link href="#" className="hover:text-white transition">Contact</Link></li><li><Link href="#" className="hover:text-white transition">Privacy</Link></li></ul></div>
                        <div><h4 className="font-bold mb-6 text-lg">Newsletter</h4><div className="flex gap-2 justify-center md:justify-start"><input type="email" placeholder="Email" className="bg-gray-900 border-none rounded-lg text-sm w-full focus:ring-1 focus:ring-white" /><button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition">Join</button></div></div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">© {new Date().getFullYear()} BooksHub · Built with Laravel & React</div>
                </div>
            </footer>
        </AuthenticatedLayout>
    );
}