import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, authors, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        titulli: '',
        isbn: '',
        autori_id: '',
        kategoria_id: '',
        viti_botimit: '',
        gjuha: '',
        numri_faqeve: '',
        formati: '',
        madhesia_mb: '',
        foto_kopertines: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'), { 
            forceFormData: true,
            onSuccess: () => console.log("Book created!"),
            onError: (err) => console.log("Validation Errors:", err)
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Add New Book" />
            <div className="py-12 bg-gray-50 min-h-screen font-sans">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <div className="mb-8 border-b pb-4">
                            <h2 className="text-3xl font-extrabold text-gray-900">Register New Book</h2>
                            <p className="text-gray-500 mt-2">Please fill in all the technical details of the book.</p>
                        </div>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Title */}
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Book Title</label>
                                    <input type="text" value={data.titulli} onChange={e => setData('titulli', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-blue-500 shadow-sm" placeholder="e.g. Atomic Love" />
                                    {errors.titulli && <p className="text-red-500 text-xs mt-1 font-medium">{errors.titulli}</p>}
                                </div>

                                {/* ISBN */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">ISBN</label>
                                    <input type="text" value={data.isbn} onChange={e => setData('isbn', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-blue-500 shadow-sm" placeholder="978-3-16..." />
                                    {errors.isbn && <p className="text-red-500 text-xs mt-1 font-medium">{errors.isbn}</p>}
                                </div>

                                {/* Author Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
                                    <select value={data.autori_id} onChange={e => setData('autori_id', e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm">
                                        <option value="">Select Author</option>
                                        {authors && authors.map(a => (
                                            <option key={a.id} value={a.id}>
                                                {a.emri ? `${a.emri} ${a.mbiemri || ''}` : (a.name || 'Unknown Author')}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.autori_id && <p className="text-red-500 text-xs mt-1 font-medium">{errors.autori_id}</p>}
                                </div>

                                {/* Category Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                                    <select value={data.kategoria_id} onChange={e => setData('kategoria_id', e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm">
                                        <option value="">Select Category</option>
                                        {categories && categories.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {c.emertimi || c.name || 'General'}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kategoria_id && <p className="text-red-500 text-xs mt-1 font-medium">{errors.kategoria_id}</p>}
                                </div>

                                {/* Publication Year */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Publication Year</label>
                                    <input type="number" value={data.viti_botimit} onChange={e => setData('viti_botimit', e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm" />
                                    {errors.viti_botimit && <p className="text-red-500 text-xs mt-1 font-medium">{errors.viti_botimit}</p>}
                                </div>

                                {/* Language */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Language</label>
                                    <input type="text" value={data.gjuha} onChange={e => setData('gjuha', e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm" />
                                    {errors.gjuha && <p className="text-red-500 text-xs mt-1 font-medium">{errors.gjuha}</p>}
                                </div>

                                {/* Page Count */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Page Count</label>
                                    <input type="number" value={data.numri_faqeve} onChange={e => setData('numri_faqeve', e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm" />
                                    {errors.numri_faqeve && <p className="text-red-500 text-xs mt-1 font-medium">{errors.numri_faqeve}</p>}
                                </div>

                                {/* Format */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Format</label>
                                    <select value={data.formati} onChange={e => setData('formati', e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm">
                                        <option value="">Select Format</option>
                                        <option value="PDF">PDF</option>
                                        <option value="EPUB">EPUB</option>
                                        <option value="Hardcover">Hardcover</option>
                                        <option value="Paperback">Paperback</option>
                                    </select>
                                    {errors.formati && <p className="text-red-500 text-xs mt-1 font-medium">{errors.formati}</p>}
                                </div>

                                {/* Size MB */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Size (MB)</label>
                                    <input type="number" step="0.01" value={data.madhesia_mb} onChange={e => setData('madhesia_mb', e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm" />
                                    {errors.madhesia_mb && <p className="text-red-500 text-xs mt-1 font-medium">{errors.madhesia_mb}</p>}
                                </div>

                                {/* Cover Image */}
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Image</label>
                                    <input type="file" onChange={e => setData('foto_kopertines', e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                    {errors.foto_kopertines && <p className="text-red-500 text-xs mt-1 font-medium">{errors.foto_kopertines}</p>}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-4 border-t pt-6">
                                <Link href={route('books.index')} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">Cancel</Link>
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className={`px-8 py-2.5 text-sm font-medium text-white rounded-lg shadow transition-all ${processing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {processing ? 'Saving...' : 'Save Book'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}