import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BookPicker from '@/Components/BookPicker';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Edit({ auth, bookmark, books }) {
    const { data, setData, put, processing, errors } = useForm({
        book_id: bookmark.book_id || '',
        faqja: bookmark.faqja || '',
        shenime: bookmark.shenime || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('bookmarks.update', bookmark.id));
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
            return;
        }

        router.visit(route('bookmarks.index'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Bookmark" />

            <div className="py-12 bg-[#f8f9fb] min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-slate-900 px-10 py-8 text-white">
                            <h2 className="text-2xl font-bold tracking-tight">Edit Bookmark</h2>
                            <p className="text-slate-400 text-sm mt-1 font-medium">Update the saved page number and notes.</p>
                        </div>

                        <form onSubmit={submit} className="p-10 space-y-8">
                            <BookPicker
                                books={books}
                                value={data.book_id}
                                onChange={(value) => setData('book_id', value)}
                                error={errors.book_id}
                                label="Book"
                            />

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Page</label>
                                <input type="number" min="1" value={data.faqja} onChange={(e) => setData('faqja', e.target.value)} className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3" />
                                {errors.faqja && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.faqja}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Notes</label>
                                <textarea value={data.shenime} onChange={(e) => setData('shenime', e.target.value)} rows="5" className="w-full border-gray-100 bg-gray-50 rounded-xl focus:bg-white focus:ring-black focus:border-black transition-all py-3" />
                                {errors.shenime && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.shenime}</p>}
                            </div>

                            <div className="flex items-center justify-between pt-6">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-all"
                                >
                                    Go Back
                                </button>
                                <button type="submit" disabled={processing} className="px-10 py-4 text-xs font-bold text-white rounded-xl shadow-lg transition-all uppercase tracking-[0.15em] bg-blue-600 hover:bg-blue-700">
                                    {processing ? 'Processing...' : 'Update Bookmark'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


