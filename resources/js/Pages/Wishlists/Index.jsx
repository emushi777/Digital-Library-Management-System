import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, wishlists }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this book from your wishlist?')) {
            router.delete(route('wishlists.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Wishlists" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg border border-gray-100">
                        <div className="p-8 text-gray-900">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900">My Wishlist</h1>
                                    <p className="text-sm text-gray-500 mt-1">Keep track of the books you want to read later.</p>
                                </div>
                                <Link href={route('wishlists.create')} className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all active:scale-95">
                                    Add Book
                                </Link>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-gray-100">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                            <th className="px-6 py-4 border-b font-bold">Book</th>
                                            <th className="px-6 py-4 border-b font-bold">Author</th>
                                            <th className="px-6 py-4 border-b font-bold">Added On</th>
                                            <th className="px-6 py-4 border-b font-bold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {wishlists.length > 0 ? (
                                            wishlists.map((wishlist) => (
                                                <tr key={wishlist.id} className="hover:bg-blue-50/30 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-gray-800">{wishlist.book?.titulli}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{wishlist.book?.author ? `${wishlist.book.author.emri} ${wishlist.book.author.mbiemri}` : 'Unknown'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-400">{new Date(wishlist.data_shtimit).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-4">
                                                            <Link href={route('wishlists.edit', wishlist.id)} className="text-indigo-600 hover:text-indigo-900 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-md transition">
                                                                Edit
                                                            </Link>
                                                            <button onClick={() => handleDelete(wishlist.id)} className="text-red-600 hover:text-red-900 font-bold text-sm bg-red-50 px-3 py-1 rounded-md transition">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-16 text-center text-gray-400">
                                                    No wishlist items yet.
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
