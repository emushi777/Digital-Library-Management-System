import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

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
        pershkrimi: '',
        foto_kopertines: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'), {
            forceFormData: true,
            onSuccess: () => console.log('Book created!'),
            onError: (err) => console.log('Validation Errors:', err),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Add New Book" />

            <div className="py-12 bg-[#f8f9fb] min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-slate-900 px-10 py-8 text-white">
                            <h2 className="text-2xl font-bold tracking-tight">Register New Book</h2>
                            <p className="text-slate-400 text-sm mt-1 font-medium">Add technical details and content for your digital library.</p>
                        </div>

                        <form onSubmit={submit} className="p-10 space-y-8">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6">General Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Book Title</label>
                                        <input
                                            type="text"
                                            value={data.titulli}
                                            onChange={(e) => setData('titulli', e.target.value)}
                                            className="w-full rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-black focus:border-black transition-all py-3"
                                            placeholder="e.g. Atomic Love"
                                        />
                                        {errors.titulli && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.titulli}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
                                        <textarea
                                            value={data.pershkrimi}
                                            onChange={(e) => setData('pershkrimi', e.target.value)}
                                            rows="4"
                                            className="w-full border-gray-100 bg-gray-50 rounded-xl focus:bg-white focus:ring-black focus:border-black transition-all py-3"
                                            placeholder="Provide a short summary for the 'Read More' section..."
                                        ></textarea>
                                        {errors.pershkrimi && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.pershkrimi}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-50">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Technical Metadata</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Author</label>
                                        <select
                                            value={data.autori_id}
                                            onChange={(e) => setData('autori_id', e.target.value)}
                                            className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3 text-sm"
                                        >
                                            <option value="">Select Author</option>
                                            {authors?.map((a) => (
                                                <option key={a.id} value={a.id}>{a.emri} {a.mbiemri}</option>
                                            ))}
                                        </select>
                                        {errors.autori_id && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.autori_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Category</label>
                                        <select
                                            value={data.kategoria_id}
                                            onChange={(e) => setData('kategoria_id', e.target.value)}
                                            className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3 text-sm"
                                        >
                                            <option value="">Select Category</option>
                                            {categories?.map((c) => (
                                                <option key={c.id} value={c.id}>{c.emertimi}</option>
                                            ))}
                                        </select>
                                        {errors.kategoria_id && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.kategoria_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">ISBN</label>
                                        <input
                                            type="text"
                                            value={data.isbn}
                                            onChange={(e) => setData('isbn', e.target.value)}
                                            className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3"
                                            placeholder="978-..."
                                        />
                                        {errors.isbn && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.isbn}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Publication Year</label>
                                        <input
                                            type="number"
                                            value={data.viti_botimit}
                                            onChange={(e) => setData('viti_botimit', e.target.value)}
                                            className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3"
                                            placeholder="2024"
                                        />
                                        {errors.viti_botimit && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.viti_botimit}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Language</label>
                                        <input
                                            type="text"
                                            value={data.gjuha}
                                            onChange={(e) => setData('gjuha', e.target.value)}
                                            className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3"
                                        />
                                        {errors.gjuha && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.gjuha}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Pages</label>
                                        <input
                                            type="number"
                                            value={data.numri_faqeve}
                                            onChange={(e) => setData('numri_faqeve', e.target.value)}
                                            className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3"
                                        />
                                        {errors.numri_faqeve && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.numri_faqeve}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Format</label>
                                        <select
                                            value={data.formati}
                                            onChange={(e) => setData('formati', e.target.value)}
                                            className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3 text-sm"
                                        >
                                            <option value="">Select</option>
                                            <option value="PDF">PDF</option>
                                            <option value="EPUB">EPUB</option>
                                            <option value="Hardcover">Hardcover</option>
                                            <option value="Paperback">Paperback</option>
                                        </select>
                                        {errors.formati && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.formati}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Size (MB)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.madhesia_mb}
                                            onChange={(e) => setData('madhesia_mb', e.target.value)}
                                            className="w-full rounded-xl border-gray-100 bg-gray-50 focus:ring-black focus:border-black py-3"
                                            placeholder="5.50"
                                        />
                                        {errors.madhesia_mb && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.madhesia_mb}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-50">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-4 text-center md:text-left">Book Cover Image</label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-100 border-dashed rounded-[20px] cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="text-xs text-gray-500"><span className="font-bold text-blue-600">Click to upload</span> or drag and drop</p>
                                            <p className="text-[10px] text-gray-400 mt-1 uppercase">PNG, JPG or WEBP (MAX. 2MB)</p>
                                        </div>
                                        <input type="file" className="hidden" onChange={(e) => setData('foto_kopertines', e.target.files[0])} />
                                    </label>
                                </div>
                                {data.foto_kopertines && <p className="text-center text-[10px] font-bold text-emerald-600 mt-2 uppercase tracking-widest italic">File Selected: {data.foto_kopertines.name}</p>}
                                {errors.foto_kopertines && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase text-center">{errors.foto_kopertines}</p>}
                            </div>

                            <div className="flex items-center justify-between pt-10">
                                <Link href={route('books.index')} className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-all">
                                    ← Back to Library
                                </Link>
                                <div className="flex gap-4">
                                    <Link href={route('books.index')} className="px-8 py-3 text-xs font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all uppercase tracking-widest">
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`px-10 py-4 text-xs font-bold text-white rounded-xl shadow-lg transition-all uppercase tracking-[0.15em] ${processing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'}`}
                                    >
                                        {processing ? 'Processing...' : 'Register Book'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}