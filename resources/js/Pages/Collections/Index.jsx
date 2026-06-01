import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, koleksionet }) {
    const handleDeleteCollection = (id, e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this collection?')) {
            router.delete(route('collections.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Collections</h2>}
        >
            <Head title="Collections" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Your Library</h3>
                            <p className="text-gray-500 text-sm mt-1">Manage and organize your books into custom collections.</p>
                        </div>
                        <Link
                            href={route('collections.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition shadow-sm"
                        >
                            + New Collection
                        </Link>
                    </div>

                    {koleksionet.length === 0 ? (
                        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm">
                            <p className="text-gray-500">You don't have any collections yet. Create your first one!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {koleksionet.map((koleksion) => (
                                <Link
                                    key={koleksion.id}
                                    href={route('collections.show', koleksion.id)}
                                    className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition duration-200 group relative"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                            </svg>
                                        </div>
                                        
                                        <div className="flex items-center space-x-1 z-10">
                                            <Link
                                                href={route('collections.edit', koleksion.id)}
                                                className="p-1 text-amber-600 hover:bg-amber-50 rounded transition text-xs font-medium"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={(e) => handleDeleteCollection(koleksion.id, e)}
                                                className="p-1 text-red-600 hover:bg-red-50 rounded transition text-xs font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                                        {koleksion.emertimi || "Unnamed Collection"}
                                    </h4>
                                    
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {koleksion.pershkrimi || "Personal collection created by you."}
                                    </p>
                                    
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-xs font-medium text-blue-600">
                                        View Books & Add More
                                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
