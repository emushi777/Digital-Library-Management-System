import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';

export default function Edit({ auth, book, authors, categories }) {
    const { data, setData, errors, processing } = useForm({
        titulli: book.titulli || '',
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
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Edit ${book.titulli}`} />
            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <div className="mb-8 border-b pb-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900">Edit Book</h2>
                                <p className="text-gray-500 mt-1">Updating: <span className="text-blue-600 font-medium">{book.titulli}</span></p>
                            </div>
                            {book.foto_kopertines && (
                                <div className="text-center">
                                    <img src={`/storage/books/${book.foto_kopertines}`} className="w-16 h-20 object-cover rounded shadow-md border" />
                                    <p className="text-[10px] text-gray-400 mt-1">Current Cover</p>
                                </div>
                            )}
                        </div>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                                    <input type="text" value={data.titulli} onChange={e => setData('titulli', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-blue-500" />
                                    {errors.titulli && <p className="text-red-500 text-xs mt-1">{errors.titulli}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">ISBN</label>
                                    <input type="text" value={data.isbn} onChange={e => setData('isbn', e.target.value)} className="w-full rounded-lg border-gray-300" />
                                    {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
                                    <select value={data.autori_id} onChange={e => setData('autori_id', e.target.value)} className="w-full rounded-lg border-gray-300">
                                        <option value="">Select Author</option>
                                        {authors.map(a => (
                                            <option key={a.id} value={a.id}>
                                                {a.emri ? `${a.emri} ${a.mbiemri || ''}` : (a.name || 'Unknown')}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.autori_id && <p className="text-red-500 text-xs mt-1 font-medium">{errors.autori_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                                    <select value={data.kategoria_id} onChange={e => setData('kategoria_id', e.target.value)} className="w-full rounded-lg border-gray-300">
                                        <option value="">Select Category</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {c.emertimi || c.name || 'General'}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kategoria_id && <p className="text-red-500 text-xs mt-1 font-medium">{errors.kategoria_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Publication Year</label>
                                    <input type="number" value={data.viti_botimit} onChange={e => setData('viti_botimit', e.target.value)} className="w-full rounded-lg border-gray-300" />
                                    {errors.viti_botimit && <p className="text-red-500 text-xs mt-1">{errors.viti_botimit}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Language</label>
                                    <input type="text" value={data.gjuha} onChange={e => setData('gjuha', e.target.value)} className="w-full rounded-lg border-gray-300" />
                                    {errors.gjuha && <p className="text-red-500 text-xs mt-1">{errors.gjuha}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Page Count</label>
                                    <input type="number" value={data.numri_faqeve} onChange={e => setData('numri_faqeve', e.target.value)} className="w-full rounded-lg border-gray-300" />
                                    {errors.numri_faqeve && <p className="text-red-500 text-xs mt-1">{errors.numri_faqeve}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Format</label>
                                    <input type="text" value={data.formati} onChange={e => setData('formati', e.target.value)} className="w-full rounded-lg border-gray-300" placeholder="PDF, EPUB, etc." />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Size (MB)</label>
                                    <input type="number" step="0.01" value={data.madhesia_mb} onChange={e => setData('madhesia_mb', e.target.value)} className="w-full rounded-lg border-gray-300" />
                                </div>

                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Change Cover Image (Leave empty to keep current)</label>
                                    <input type="file" onChange={e => setData('foto_kopertines', e.target.files[0])} className="w-full text-sm text-gray-500" />
                                    {errors.foto_kopertines && <p className="text-red-500 text-xs mt-1">{errors.foto_kopertines}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 border-t pt-6 mt-8">
                                <Link href={route('books.index')} className="px-6 py-2.5 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-50">Cancel</Link>
                                <button type="submit" disabled={processing} className="px-8 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition-all">
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