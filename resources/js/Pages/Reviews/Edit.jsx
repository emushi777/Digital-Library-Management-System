import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, review, books }) {
    const { data, setData, put, processing, errors } = useForm({
        book_id: review.book_id || '',
        vleresimi: review.vleresimi || '5',
        komenti: review.komenti || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('reviews.update', review.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Review" />

            <div className="py-12 bg-[#f8f9fb] min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-slate-900 px-10 py-8 text-white">
                            <h2 className="text-2xl font-bold tracking-tight">Edit Review</h2>
                            <p className="text-slate-400 text-sm mt-1 font-medium">Update your rating and comment for this book.</p>
                        </div>

                        <form onSubmit={submit} className="p-10 space-y-8">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Book</label>
                                <select value={data.book_id} onChange={(e) => setData('book_id', e.target.value)} className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3 text-sm">
                                    <option value="">Select Book</option>
                                    {books.map((book) => (
                                        <option key={book.id} value={book.id}>{book.titulli} - {book.author ? `${book.author.emri} ${book.author.mbiemri}` : 'Unknown Author'}</option>
                                    ))}
                                </select>
                                {errors.book_id && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.book_id}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Rating</label>
                                <select value={data.vleresimi} onChange={(e) => setData('vleresimi', e.target.value)} className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3 text-sm">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <option key={value} value={value}>{value} / 5</option>
                                    ))}
                                </select>
                                {errors.vleresimi && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.vleresimi}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Comment</label>
                                <textarea value={data.komenti} onChange={(e) => setData('komenti', e.target.value)} rows="6" className="w-full border-gray-100 bg-gray-50 rounded-xl focus:bg-white focus:ring-black focus:border-black transition-all py-3" />
                                {errors.komenti && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.komenti}</p>}
                            </div>

                            <div className="flex items-center justify-between pt-6">
                                <Link href={route('reviews.index')} className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-all">
                                    Back to Reviews
                                </Link>
                                <button type="submit" disabled={processing} className="px-10 py-4 text-xs font-bold text-white rounded-xl shadow-lg transition-all uppercase tracking-[0.15em] bg-blue-600 hover:bg-blue-700">
                                    {processing ? 'Processing...' : 'Update Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


