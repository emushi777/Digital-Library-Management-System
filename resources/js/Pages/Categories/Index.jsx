import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, categories, isAdmin }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            router.delete(route('categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories Management</h2>}
        >
            <Head title="Categories List" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg border border-gray-100">
                        <div className="p-8 text-gray-900">
                            
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900">Categories Inventory</h1>
                                    <p className="text-sm text-gray-500 mt-1">Organize and manage your library sections</p>
                                </div>
                                {isAdmin && (
                                    <Link 
                                        href={route('categories.create')} 
                                        className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all active:scale-95"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add New Category
                                    </Link>
                                )}
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-gray-100">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                            <th className="px-6 py-4 border-b font-bold italic">ID</th>
                                            <th className="px-6 py-4 border-b font-bold">Category Name</th>
                                            <th className="px-6 py-4 border-b font-bold">Description</th>
                                            {isAdmin && <th className="px-6 py-4 border-b font-bold text-right">Actions</th>}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {categories && categories.length > 0 ? (
                                            categories.map((category) => (
                                                <tr key={category.id} className="hover:bg-blue-50/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                                            #{category.id}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-gray-800 text-base flex items-center">
                                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                                            {category.emertimi}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-gray-500 text-sm italic line-clamp-1">
                                                            {category.pershkrimi || 'No description provided.'}
                                                        </p>
                                                    </td>
                                                    {isAdmin && (
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end gap-4">
                                                                <Link 
                                                                    href={route('categories.edit', category.id)} 
                                                                    className="text-indigo-600 hover:text-indigo-900 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-md transition"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button 
                                                                    onClick={() => handleDelete(category.id)}
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
                                                <td colSpan={isAdmin ? 4 : 3} className="px-6 py-16 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-gray-300 text-5xl mb-4">📂</span>
                                                        <p className="text-gray-400 font-medium">No categories found.</p>
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