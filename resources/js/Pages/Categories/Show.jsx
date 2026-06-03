import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import useConfirmModal from '@/Hooks/useConfirmModal';

export default function Show({ category, books, auth }) {
    const { confirm, modal } = useConfirmModal();

    const handleDelete = (id) => {
        confirm({
            title: 'Delete this category?',
            message: 'This category will be permanently removed.',
            confirmLabel: 'Delete category',
            onConfirm: () => router.delete(route('categories.destroy', id)),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{category.emertimi}</h2>}
        >
            <Head title={category.emertimi} />
            {modal}

            <div className="bg-[#F8F9FB] min-h-screen py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <Link href={route('categories.index')} className="text-gray-500 hover:text-black text-sm mb-4 inline-block">
                            ← Back to Categories
                        </Link>
                        
                        <h1 className="text-4xl font-black text-gray-900">{category.emertimi}</h1>
                        
                        {category.pershkrimi && (
                            <p className="text-gray-600 mt-4 max-w-2xl italic">{category.pershkrimi}</p>
                        )}

                        {auth.user?.role === 'admin' && (
                            <div className="flex gap-2 mt-6">
                                <Link 
                                    href={route('categories.edit', category.id)} 
                                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition"
                                >
                                    Edit Category
                                </Link>
                                <button 
                                    onClick={() => handleDelete(category.id)} 
                                    className="px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-100 transition"
                                >
                                    Delete Category
                                </button>
                            </div>
                        )}
                        
                        <p className="text-gray-500 mt-4">Explore our collection of {books.length} books in this genre.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                        {books.length > 0 ? (
                            books.map((book) => (
                                <div key={book.id} className="text-center group">
                                    <Link href={route('books.show', book.id)} className="block relative aspect-[2/3] bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                                        <img
                                            src={`/uploads/books/${book.foto_kopertines}`}
                                            alt={book.titulli}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            onError={(e) => e.target.src = '/images/placeholder.png'}
                                        />
                                    </Link>
                                    <h3 className="font-bold text-gray-700 text-sm truncate">{book.titulli}</h3>
                                    <p className="text-gray-400 text-[10px] uppercase tracking-widest">{book.author?.emri} {book.author?.mbiemri}</p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-gray-400">No books found in this category yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
