import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';

export default function Show({ auth, collection, books, all_books = [] }) {
    const { data, setData, post, processing, reset } = useForm({
        collection_id: collection.id,
        book_id: '',
    });

    const handleAddBook = (e) => {
        e.preventDefault();
        if (!data.book_id) return;
        post(route('collections.addBook'), {
            onSuccess: () => reset('book_id'),
        });
    };

    const handleRemoveBook = (bookId) => {
        if (confirm('A jeni i sigurt që dëshironi ta hiqni këtë libër nga koleksioni?')) {
            router.post(route('collections.removeBook'), {
                collection_id: collection.id,
                book_id: bookId
            });
        }
    };

    const handleDeleteCollection = () => {
        if (confirm('A jeni i sigurt që dëshironi ta fshini krejt këtë koleksion?')) {
            router.delete(route('collections.destroy', collection.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center w-full">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Koleksioni: <span className="text-blue-600">{collection.emertimi}</span>
                    </h2>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={route('collections.edit', collection.id)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition"
                        >
                            Ndrysho (Rename)
                        </Link>
                        <button
                            onClick={handleDeleteCollection}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition"
                        >
                            Fshij Koleksionin
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={collection.emertimi} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Paneli i shtimit të librit */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Shto një Libër në këtë Koleksion</h3>
                            <p className="text-gray-500 text-xs mt-0.5">Zgjidhni një nga librat e bibliotekës për ta futur këtu.</p>
                        </div>
                        <form onSubmit={handleAddBook} className="flex items-center space-x-3 w-full md:w-auto">
                            <select
                                value={data.book_id}
                                onChange={(e) => setData('book_id', e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm w-full md:w-64"
                                required
                            >
                                <option value="">-- Zgjidh Librin --</option>
                                {all_books.map((book) => (
                                    <option key={book.id} value={book.id}>
                                        {book.titulli || book.title}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition shadow-sm whitespace-nowrap"
                            >
                                {processing ? 'Duke u shtuar...' : 'Shto Libër'}
                            </button>
                        </form>
                    </div>

                    {/* Lista e Librave me butonin për heqje */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Librat në këtë Koleksion ({books.length})</h3>
                        
                        {books.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                                <span className="text-3xl">📚</span>
                                <p className="text-gray-500 text-sm mt-2">Nuk ka asnjë libër në këtë koleksion aktualisht.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {books.map((book) => (
                                    <div key={book.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative group hover:border-red-200 transition">
                                        
                                        {/* Butoni i vogël X te cepi i librit për ta hequr */}
                                        <button
                                            onClick={() => handleRemoveBook(book.id)}
                                            className="absolute top-2 right-2 bg-white text-red-500 hover:bg-red-50 p-1 rounded-full shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition duration-150 text-xs font-bold"
                                            title="Hiqe nga ky koleksion"
                                        >
                                            ✕
                                        </button>

                                        <div className="w-full h-36 bg-blue-50 rounded-lg mb-3 flex items-center justify-center text-2xl">
                                            📖
                                        </div>
                                        <h4 className="font-bold text-sm text-gray-800 truncate" title={book.titulli || book.title}>
                                            {book.titulli || book.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                            {book.autori || 'Autor i Panjohur'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <Link href={route('collections.index')} className="text-sm text-gray-600 hover:text-blue-600 transition inline-block">
                        ← Kthehu te të gjitha koleksionet
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
