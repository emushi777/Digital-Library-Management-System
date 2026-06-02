import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BookPicker from '@/Components/BookPicker';
import { Head, router, useForm } from '@inertiajs/react';

export default function Create({ auth, books, selectedBookId }) {
    const { data, setData, post, processing, errors } = useForm({
        book_id: selectedBookId || '',
        faqja: '',
        shenime: '',
    });

    const selectedBook = books.find((book) => String(book.id) === String(data.book_id));

    const submit = (e) => {
        e.preventDefault();
        post(route('bookmarks.store'));
    };

    const handleBack = () => {
        if (globalThis.history.length > 1) {
            globalThis.history.back();
            return;
        }

        router.visit(route('bookmarks.index'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Bookmark" />

            <div className="py-12 bg-[#f8f9fb] min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-slate-900 px-10 py-8 text-white">
                            <h2 className="text-2xl font-bold tracking-tight">Create Bookmark</h2>
                            <p className="text-slate-400 text-sm mt-1 font-medium">Save an important page from a book for later.</p>
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
                                <label htmlFor="bookmark-page" className="block text-xs font-bold text-gray-500 uppercase mb-2">Page</label>
                                <input
                                    id="bookmark-page"
                                    type="number"
                                    min="1"
                                    max={selectedBook?.numri_faqeve || undefined}
                                    value={data.faqja}
                                    onChange={(e) => setData('faqja', e.target.value)}
                                    className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3"
                                />
                                {selectedBook && (
                                    <p className="mt-2 text-[11px] text-gray-500">
                                        This book has {selectedBook.numri_faqeve} page{selectedBook.numri_faqeve === 1 ? '' : 's'}.
                                    </p>
                                )}
                                {errors.faqja && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.faqja}</p>}
                            </div>

                            <div>
                                <label htmlFor="bookmark-notes" className="block text-xs font-bold text-gray-500 uppercase mb-2">Notes</label>
                                <textarea
                                    id="bookmark-notes"
                                    value={data.shenime}
                                    onChange={(e) => setData('shenime', e.target.value)}
                                    rows="5"
                                    className="w-full border-gray-100 bg-gray-50 rounded-xl focus:bg-white focus:ring-black focus:border-black transition-all py-3"
                                />
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
                                    {processing ? 'Processing...' : 'Save Bookmark'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


