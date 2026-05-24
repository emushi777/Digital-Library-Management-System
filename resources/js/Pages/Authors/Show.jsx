import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, author }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`${author.emri} ${author.mbiemri}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        
                        <div className="mb-6">
                            <Link 
                                href={route('authors.index')} 
                                className="text-gray-500 hover:text-gray-900 flex items-center gap-2 font-medium transition"
                            >
                                <span>←</span> Back to Authors
                            </Link>
                        </div>

                        <div className="flex items-center gap-6 mb-10">
                            <img
                                src={author.photo_url ? author.photo_url : '/images/placeholder.png'}
                                alt={author.emri}
                                className="w-32 h-32 rounded-full object-cover shadow-md"
                            />
                            <div>
                                <h1 className="text-4xl font-black text-gray-900">
                                    {author.emri} {author.mbiemri}
                                </h1>
                                <p className="text-blue-600 font-bold mt-1">
                                    {author.vendi}
                                </p>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-4">Biography</h3>
                        <p className="text-gray-600 mb-10 leading-relaxed">
                            {author.biografia}
                        </p>

                        <h3 className="text-xl font-bold mb-6 border-t pt-6">
                            Books by this Author
                        </h3>

                        {author.books && author.books.length > 0 ? (
                            <div className="space-y-6">
                                {author.books.map((book) => (
                                    <div
                                        key={book.id}
                                        className="flex gap-6 border-b border-gray-100 pb-6 hover:bg-gray-50 transition p-3 rounded-lg"
                                    >
                                        <div className="w-20 h-28 flex-shrink-0 bg-gray-100 rounded-lg shadow-sm overflow-hidden">
                                            <img
                                                src={book.foto_kopertines ? `/uploads/books/${book.foto_kopertines}` : '/images/placeholder.png'}
                                                alt={book.titulli}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center">
                                            <div className="text-lg font-bold text-gray-900 mb-2">
                                                {book.titulli}
                                            </div>

                                            <Link
                                                href={route('books.show', book.id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-semibold w-max transition"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">
                                No books registered for this author yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <footer className="bg-black text-white pt-20 pb-10 rounded-t-[50px] mt-20">
                            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center md:text-left">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                                    <div className="col-span-1">
                                        <h2 className="text-2xl font-black mb-6 italic tracking-tighter">BooksHub</h2>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                            Your ultimate destination for digital reading. Explore thousands of titles from anywhere.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-6 text-lg">Services</h4>
                                        <ul className="space-y-4 text-gray-400 text-sm">
                                            <li><Link href={route('books.index')} className="hover:text-white transition">Library</Link></li>
                                            <li><Link href="#" className="hover:text-white transition">Audiobooks</Link></li>
                                            <li><Link href="#" className="hover:text-white transition">Authors</Link></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-6 text-lg">Support</h4>
                                        <ul className="space-y-4 text-gray-400 text-sm">
                                            <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
                                            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
                                        <div className="flex gap-2">
                                            <input type="email" placeholder="Email" className="bg-gray-900 border-none rounded-lg text-sm w-full focus:ring-0" />
                                            <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition">Join</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
                                    © {new Date().getFullYear()} BooksHub · Read more, know more.
                                </div>
                            </div>
                        </footer>
        </AuthenticatedLayout>
    );
}