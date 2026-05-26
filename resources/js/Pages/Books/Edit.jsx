import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';

export default function Edit({ auth, book, authors, categories }) {
    const { data, setData, errors, processing } = useForm({
        titulli: book.titulli || '',
        pershkrimi: book.pershkrimi || '', 
        isbn: book.isbn || '',
        autori_id: book.autori_id || '',
        kategoria_id: book.kategoria_id || '',
        viti_botimit: book.viti_botimit || '',
        gjuha: book.gjuha || '',
        numri_faqeve: book.numri_faqeve || '',
        formati: book.formati || '',
        madhesia_mb: book.madhesia_mb || '',
        foto_kopertines: null,
        _method: 'PUT',
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('books.update', book.id), data, { forceFormData: true });
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Book: {book.titulli}</h2>}
        >
            <Head title={`Edit ${book.titulli}`} />
            
            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        {/* Header me foton aktuale */}
                        <div className="mb-8 flex justify-between items-center pb-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
                                <p className="text-gray-500 text-sm">Update the information for {book.titulli}</p>
                            </div>
                            <div className="text-center">
                                {book.foto_kopertines ? (
                                    <img 
                                        src={`/uploads/books/${book.foto_kopertines}`} 
                                        alt="Current Cover"
                                        className="w-16 h-20 object-cover rounded-lg shadow-sm border border-gray-200"
                                        onError={(e) => { e.target.style.display = 'none'; }} 
                                    />
                                ) : (
                                    <div className="w-16 h-20 bg-gray-50 flex items-center justify-center rounded-lg border border-dashed border-gray-300">
                                        <span className="text-[10px] text-gray-400">No Img</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Titulli */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700">Title</label>
                                    <input type="text" value={data.titulli} onChange={e => setData('titulli', e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>

                                {/* Pershkrimi */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                                    <textarea 
                                        value={data.pershkrimi} 
                                        onChange={e => setData('pershkrimi', e.target.value)} 
                                        rows="4"
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                                    />
                                    {errors.pershkrimi && <p className="text-red-500 text-xs mt-1">{errors.pershkrimi}</p>}
                                </div>

                                {/* Autori & Kategoria */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Author</label>
                                    <select value={data.autori_id} onChange={e => setData('autori_id', e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition">
                                        <option value="">Select Author</option>
                                        {authors.map(a => <option key={a.id} value={a.id}>{a.emri} {a.mbiemri}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Category</label>
                                    <select value={data.kategoria_id} onChange={e => setData('kategoria_id', e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition">
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.emertimi}</option>)}
                                    </select>
                                </div>

                                {/* Detajet teknike */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">ISBN</label>
                                    <input type="text" value={data.isbn} onChange={e => setData('isbn', e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Year</label>
                                    <input type="number" value={data.viti_botimit} onChange={e => setData('viti_botimit', e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Language</label>
                                    <input type="text" value={data.gjuha} onChange={e => setData('gjuha', e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Pages</label>
                                    <input type="number" value={data.numri_faqeve} onChange={e => setData('numri_faqeve', e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>

                                {/* File Upload */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700">Change Cover Image</label>
                                    <input type="file" onChange={e => setData('foto_kopertines', e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                                </div>
                            </div>

                            {/* Butonat */}
                            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                                {/* Butoni 1: Kthimi te lista e librave */}
                                <Link 
                                    href={route('books.index')} 
                                    className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition"
                                >
                                    Back to List
                                </Link>

                                {/* Butoni 2: Kthimi te faqja e librit (Cancel) */}
                                <Link 
                                    href={route('books.show', book.id)} 
                                    className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition border-l border-gray-200"
                                >
                                    Cancel
                                </Link>

                                {/* Butoni Update */}
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition"
                                >
                                    {processing ? 'Saving...' : 'Update Book'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}