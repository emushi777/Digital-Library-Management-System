import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, authors, isAdmin }) {
    const [editMode, setEditMode] = useState(false);

    // Funksioni për fshirje
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this author? This will affect books linked to them.")) {
            router.delete(route('authors.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    // Opcionale: mund të shtosh një njoftim këtu
                }
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Authors Management</h2>}
        >
            <Head title="Authors List" />

            {/* Ky është struktura e Modalit që pashë në foton tënde */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
                <div className="relative mx-auto p-5 border w-full max-w-4xl shadow-2xl rounded-2xl bg-white">
                    
                    {/* Header i Modalit */}
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h3 className="text-2xl font-bold text-gray-900">Authors List</h3>
                        <div className="flex gap-2">
                            {isAdmin && (
                                <button 
                                    onClick={() => setEditMode(!editMode)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                                        editMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                                    </svg>
                                    Edit Mode
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tabela e Autorëve */}
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Photo</th>
                                    <th className="px-6 py-4 font-bold">Full Name</th>
                                    <th className="px-6 py-4 font-bold">Country</th>
                                    {editMode && <th className="px-6 py-4 font-bold text-right">Actions</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {authors.map((author) => (
                                    <tr key={author.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                                                <img 
                                                    src={author.photo ? `/uploads/authors/${author.photo}` : 'https://ui-avatars.com/api/?name=' + author.name} 
                                                    alt={author.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-800">
                                            {author.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {author.country || 'N/A'}
                                        </td>
                                        {editMode && (
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-4">
                                                    <button 
                                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                        onClick={() => router.get(route('authors.edit', author.id))}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(author.id)}
                                                        className="text-red-600 hover:text-red-900 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer i Modalit */}
                    <div className="mt-8 flex justify-end">
                        <button 
                            onClick={() => window.history.back()}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}