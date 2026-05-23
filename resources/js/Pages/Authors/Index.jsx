import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, authors, isAdmin }) {
    
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this author?")) {
            router.delete(route('authors.destroy', id));
        }
    };

    const getImageUrl = (fileName) => {
        return fileName ? `/uploads/authors/${fileName}` : null;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Authors Registry</h2>}
        >
            <Head title="Authors" />

            <div className="bg-[#f8f9fb] min-h-screen pb-20">
                <div className="max-w-[1400px] mx-auto pt-8 px-8">
                    
                    {/* Header Section */}
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Our Authors</h1>
                            <p className="text-gray-500 mt-2">Discover the brilliant minds behind our collection.</p>
                        </div>
                        {isAdmin && (
                            <Link 
                                href={route('authors.create')} 
                                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-xl"
                            >
                                Add New Author
                            </Link>
                        )}
                    </div>

                    {/* Authors Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {authors.length > 0 ? (
                            authors.map((author) => (
                                <div key={author.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xl border-2 border-white shadow-md overflow-hidden">
                                            {getImageUrl(author.foto_profili) ? (
                                                <img src={getImageUrl(author.foto_profili)} className="w-full h-full object-cover" alt={author.emri} />
                                            ) : (
                                                <span>{author.emri.charAt(0)}{author.mbiemri.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{author.emri} {author.mbiemri}</h3>
                                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                                                {author.vendi || 'Global'}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 leading-relaxed italic mb-4 line-clamp-3">
                                        {author.biografia || 'No biography provided for this author.'}
                                    </p>

                                    {/* Read More Link */}
                                    <Link 
                                        href={route('authors.show', author.id)} 
                                        className="w-full py-2 block text-center text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                                    >
                                        Read More
                                    </Link>

                                    {isAdmin && (
                                        <div className="flex gap-2 pt-4 mt-4 border-t border-gray-50">
                                            <Link 
                                                href={route('authors.edit', author.id)} 
                                                className="flex-1 py-2 text-center text-[10px] font-bold uppercase tracking-wider rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(author.id)}
                                                className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center text-gray-400 italic">
                                No authors are currently registered in the system.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}