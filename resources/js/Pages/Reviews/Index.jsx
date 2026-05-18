import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, reviews }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this review?')) {
            router.delete(route('reviews.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Reviews" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg border border-gray-100">
                        <div className="p-8 text-gray-900">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900">Book Reviews</h1>
                                    <p className="text-sm text-gray-500 mt-1">Browse what readers are saying about the books in your library.</p>
                                </div>
                                <Link href={route('reviews.create')} className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all active:scale-95">
                                    Add Review
                                </Link>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-gray-100">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                            <th className="px-6 py-4 border-b font-bold">Reviewer</th>
                                            <th className="px-6 py-4 border-b font-bold">Book</th>
                                            <th className="px-6 py-4 border-b font-bold">Author</th>
                                            <th className="px-6 py-4 border-b font-bold">Rating</th>
                                            <th className="px-6 py-4 border-b font-bold">Comment</th>
                                            <th className="px-6 py-4 border-b font-bold">Date</th>
                                            <th className="px-6 py-4 border-b font-bold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {reviews.length > 0 ? (
                                            reviews.map((review) => (
                                                <tr key={review.id} className="hover:bg-blue-50/30 transition-colors">
                                                    <td className="px-6 py-4 font-semibold text-gray-700">{review.user?.name || 'Unknown reader'}</td>
                                                    <td className="px-6 py-4 font-bold text-gray-800">{review.book?.titulli}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{review.book?.author ? `${review.book.author.emri} ${review.book.author.mbiemri}` : 'Unknown'}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-100">
                                                            {review.vleresimi}/5
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 italic">{review.komenti || 'No comment added.'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-400">{new Date(review.data_vleresimit).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        {review.user_id === auth.user.id ? (
                                                            <div className="flex justify-end gap-4">
                                                                <Link href={route('reviews.edit', review.id)} className="text-indigo-600 hover:text-indigo-900 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-md transition">
                                                                    Edit
                                                                </Link>
                                                                <button onClick={() => handleDelete(review.id)} className="text-red-600 hover:text-red-900 font-bold text-sm bg-red-50 px-3 py-1 rounded-md transition">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-300">
                                                                Read only
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-16 text-center text-gray-400">
                                                    No reviews yet.
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
