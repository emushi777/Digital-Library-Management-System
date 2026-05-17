import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, bookmarks }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this bookmark?')) {
            router.delete(route('bookmarks.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Bookmarks" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg border border-gray-100">
                        <div className="p-8 text-gray-900">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900">My Bookmarks</h1>
                                    <p className="text-sm text-gray-500 mt-1">Save important pages so you can jump back into reading anytime.</p>
                                </div>
                                <Link href={route('bookmarks.create')} className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all active:scale-95">
                                    Add Bookmark
                                </Link>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-gray-100">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                            <th className="px-6 py-4 border-b font-bold">Book</th>
                                            <th className="px-6 py-4 border-b font-bold">Author</th>
                                            <th className="px-6 py-4 border-b font-bold">Page</th>
                                            <th className="px-6 py-4 border-b font-bold">Notes</th>
                                            <th className="px-6 py-4 border-b font-bold">Created</th>
                                            <th className="px-6 py-4 border-b font-bold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {bookmarks.length > 0 ? (
                                            bookmarks.map((bookmark) => (
                                                <tr key={bookmark.id} className="hover:bg-blue-50/30 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-gray-800">{bookmark.book?.titulli}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{bookmark.book?.author ? `${bookmark.book.author.emri} ${bookmark.book.author.mbiemri}` : 'Unknown'}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                                                            Page {bookmark.faqja}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 italic">{bookmark.shenime || 'No notes added.'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-400">{new Date(bookmark.data_krijimit).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-4">
                                                            <Link href={route('bookmarks.edit', bookmark.id)} className="text-indigo-600 hover:text-indigo-900 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-md transition">
                                                                Edit
                                                            </Link>
                                                            <button onClick={() => handleDelete(bookmark.id)} className="text-red-600 hover:text-red-900 font-bold text-sm bg-red-50 px-3 py-1 rounded-md transition">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-16 text-center text-gray-400">
                                                    No bookmarks yet.
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
