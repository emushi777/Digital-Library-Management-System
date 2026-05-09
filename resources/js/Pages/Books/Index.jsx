import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, books, isAdmin }) {
    
    // Funksioni për fshirje
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this book?")) {
            router.delete(route('books.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Library Books</h2>}
        >
            <Head title="Books List" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg border border-gray-100">
                        <div className="p-8 text-gray-900">
                            
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900">Books Inventory</h1>
                                    <p className="text-sm text-gray-500 mt-1">Manage and view all library resources</p>
                                </div>
                                {isAdmin && (
                                    <Link 
                                        href={route('books.create')} 
                                        className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all active:scale-95"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add New Book
                                    </Link>
                                )}
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-gray-100">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                            <th className="px-6 py-4 border-b font-bold">Cover</th>
                                            <th className="px-6 py-4 border-b font-bold">Title</th>
                                            <th className="px-6 py-4 border-b font-bold">Author</th>
                                            <th className="px-6 py-4 border-b font-bold">Category</th>
                                            {isAdmin && <th className="px-6 py-4 border-b font-bold text-right">Actions</th>}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {books && books.length > 0 ? (
                                            books.map((book) => (
                                                <tr key={book.id} className="hover:bg-blue-50/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="w-14 h-20 bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                                            <img 
                                                                // Përdorim folderin uploads/books siç e kemi në Controller
                                                                src={book.foto_kopertines ? `/uploads/books/${book.foto_kopertines}` : 'https://via.placeholder.com/150x200?text=No+Cover'} 
                                                                alt={book.titulli} 
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {e.target.src = 'https://via.placeholder.com/150x200?text=No+Cover'}}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-gray-800 text-base">{book.titulli}</div>
                                                        <div className="text-xs text-gray-400 mt-1">ISBN: {book.isbn || 'N/A'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600">
                                                        {/* Kontrollojmë për .emri ose .name për të shmangur 'Unknown Author' */}
                                                        {book.author ? `${book.author.emri || book.author.name || '' } ${book.author.mbiemri || ''}` : 'Unknown Author'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100">
                                                            {/* Kontrollojmë për .emertimi ose .name */}
                                                            {book.category?.emertimi || book.category?.name || 'General'}
                                                        </span>
                                                    </td>
                                                    {isAdmin && (
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end gap-4">
                                                                <Link 
                                                                    href={route('books.edit', book.id)} 
                                                                    className="text-indigo-600 hover:text-indigo-900 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-md transition"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button 
                                                                    onClick={() => handleDelete(book.id)}
                                                                    className="text-red-600 hover:text-red-900 font-bold text-sm bg-red-50 px-3 py-1 rounded-md transition"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={isAdmin ? 5 : 4} className="px-6 py-16 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-gray-300 text-5xl mb-4">📚</span>
                                                        <p className="text-gray-400 font-medium">No books found in the library inventory.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}