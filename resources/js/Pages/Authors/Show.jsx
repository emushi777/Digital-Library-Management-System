import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, author }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`${author.emri} ${author.mbiemri}`} />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Profili i Autorin */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {author.photo_url ? (
                            <img src={author.photo_url} className="w-48 h-48 rounded-2xl object-cover shadow-xl" alt={author.emri} />
                        ) : (
                            <div className="w-48 h-48 rounded-2xl bg-gray-200 flex items-center justify-center">No Photo</div>
                        )}
                        <div>
                            <h1 className="text-4xl font-black text-gray-900">{author.emri} {author.mbiemri}</h1>
                            <p className="text-blue-600 font-bold uppercase text-xs tracking-widest mt-1">{author.vendi}</p>
                            <p className="mt-6 text-gray-600 leading-relaxed">{author.biografia || 'No biography provided.'}</p>
                        </div>
                    </div>

                    {/* Seksioni i Librave */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-black text-gray-900 mb-6">Books by {author.emri}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {author.books && author.books.length > 0 ? (
                                author.books.map(book => (
                                    <div key={book.id} className="bg-white p-4 rounded-2xl border shadow-sm hover:shadow-md transition">
                                        <div className="h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">Book Cover</div>
                                        <h3 className="font-bold text-sm text-gray-900">{book.titulli}</h3>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">No books listed for this author yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}