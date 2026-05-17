import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, books, selectedBookId }) {
    const { data, setData, post, processing, errors } = useForm({
        book_id: selectedBookId || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('wishlists.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Wishlist Item" />

            <div className="py-12 bg-[#f8f9fb] min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-slate-900 px-10 py-8 text-white">
                            <h2 className="text-2xl font-bold tracking-tight">Add To Wishlist</h2>
                            <p className="text-slate-400 text-sm mt-1 font-medium">Choose a book you want to save for later.</p>
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

                            <div className="flex items-center justify-between pt-6">
                                <Link href={route('wishlists.index')} className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-all">
                                    Back to Wishlist
                                </Link>
                                <button type="submit" disabled={processing} className="px-10 py-4 text-xs font-bold text-white rounded-xl shadow-lg transition-all uppercase tracking-[0.15em] bg-blue-600 hover:bg-blue-700">
                                    {processing ? 'Processing...' : 'Save Wishlist Item'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


