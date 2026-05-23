import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, categories, allBooks, isAdmin }) {
    const [selectedCategory, setSelectedCategory] = useState({ 
        id: 'all', 
        emertimi: 'All Categories', 
        books: allBooks 
    });

    const handleDelete = (id) => {
        if (confirm('A jeni të sigurt që doni ta fshini këtë kategori?')) {
            router.delete(route('categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />
            
            <div className="max-w-7xl mx-auto py-12 px-6">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Explore by Category</h1>
                    {isAdmin && (
                        <Link href={route('categories.create')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-bold shadow-lg transition">
                            + Add Category
                        </Link>
                    )}
                </div>

                {/* Kategoritë */}
                <div className="flex flex-wrap gap-3 mb-12">
                    <button 
                        onClick={() => setSelectedCategory({ id: 'all', emertimi: 'All Categories', books: allBooks })}
                        className={`px-6 py-2.5 rounded-full font-bold text-sm transition ${
                            selectedCategory.id === 'all' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        All Categories
                    </button>

                    {categories.map((cat) => (
                        <div key={cat.id} className="relative group">
                            <button 
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                                    selectedCategory?.id === cat.id 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {cat.emertimi}
                            </button>

                            {/* Admin Opsionet - Stiluar identik me librat */}
                            {isAdmin && (
                                <div className="absolute -top-3 -right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <Link 
                                        href={route('categories.edit', cat.id)} 
                                        className="p-2 bg-white/95 backdrop-blur rounded-lg shadow-md hover:bg-yellow-500 hover:text-white transition-all transform hover:-translate-y-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </Link>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleDelete(cat.id); }}
                                        className="p-2 bg-white/95 backdrop-blur rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Grid-i i Librave */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">
                    {selectedCategory.books?.length > 0 ? (
                        selectedCategory.books.map((book) => (
                            <Link 
                                key={book.id} 
                                href={`/books/${book.id}`} 
                                className="flex flex-col group block"
                            >
                                <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border border-gray-100">
                                    <img 
                                        src={book.foto_kopertines ? `/uploads/books/${book.foto_kopertines}` : '/images/placeholder.png'} 
                                        alt={book.titulli} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h4 className="font-bold text-gray-800 text-sm truncate transition-colors">
                                    {book.titulli}
                                </h4>
                            </Link>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-400 py-20 font-medium">No books found in this category.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}