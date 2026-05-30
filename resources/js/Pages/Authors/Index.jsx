import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, authors, isAdmin }) {
    
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this author?")) {
            router.delete(route('authors.destroy', id));
        }
    };

    const getImageUrl = (fileName) => {
        return fileName ? `/uploads/authors/${fileName}` : null;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Authors Registry</h2>}
        >
            <Head title="Authors" />

            <div className="bg-[#f8f9fb] min-h-screen pb-20">
                <div className="max-w-[1400px] mx-auto pt-8 px-8">
                    
                    {/* Header Section */}
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Our Authors</h1>
                            <p className="text-gray-500 mt-2">Discover the brilliant minds behind our collection.</p>
                        </div>
                        {isAdmin && (
                            <Link 
                                href={route('authors.create')} 
                                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-xl"
                            >
                                Add New Author
                            </Link>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {authors.length > 0 ? (
                            authors.map((author) => (
                                <div key={author.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xl border-2 border-white shadow-md overflow-hidden">
                                            {getImageUrl(author.foto_profili) ? (
                                                <img src={getImageUrl(author.foto_profili)} className="w-full h-full object-cover" alt={author.emri} />
                                            ) : (
                                                <span>{author.emri.charAt(0)}{author.mbiemri.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{author.emri} {author.mbiemri}</h3>
                                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                                                {author.vendi || 'Global'}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 leading-relaxed italic mb-4 line-clamp-3">
                                        {author.biografia || 'No biography provided for this author.'}
                                    </p>

                                    {/* Read More Link */}
                                    <Link 
                                        href={route('authors.show', author.id)} 
                                        className="w-full py-2 block text-center text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                                    >
                                        Read More
                                    </Link>

                                    {isAdmin && (
                                        <div className="flex gap-2 pt-4 mt-4 border-t border-gray-50">
                                            <Link 
                                                href={route('authors.edit', author.id)} 
                                                className="flex-1 py-2 text-center text-[10px] font-bold uppercase tracking-wider rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(author.id)}
                                                className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center text-gray-400 italic">
                                No authors are currently registered in the system.
                            </div>
                        )}
                    </div>
                </div>
                </div>
                <footer className="bg-black text-white pt-20 pb-10 rounded-t-[50px] mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 space-y-6">
                            <h2 className="text-2xl font-black italic tracking-tighter">Bookly</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Your ultimate destination for digital reading. Explore thousands of titles from anywhere.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Services</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href={route('books.index')} className="hover:text-white transition">Library</Link></li>
                                <li><Link href={route('authors.index')} className="hover:text-white transition">Authors</Link></li>
                                <li><Link href={route('categories.index')} className="hover:text-white transition">Categories</Link></li>

                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Support</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href={route('about.index')} className="hover:text-white transition">About Us</Link></li>
                                <li><Link href={route('about.index') + '#contactus'} className="hover:text-white transition">Contact Us</Link></li>
                                <li><Link href={route('about.index') + '#feedback'} className="hover:text-white transition">Feedback</Link></li>

                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-lg">Account</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href={route('profile.edit')} className="hover:text-white transition">Profile</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Plans</Link></li>
                                <li><Link 
                                        href={route('logout')} 
                                        method="post" 
                                        as="button" 
                                        className="hover:text-white transition"
                                        onClick={(e) => {
                                            if (!confirm('Are you sure you want to log out?')) {
                                                e.preventDefault(); 
                                            }
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
                        © {new Date().getFullYear()} Bookly. All rights reserved.
                    </div>
                </div>
            </footer>
        </AuthenticatedLayout>
    );
}