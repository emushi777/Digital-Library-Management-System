import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({ auth, plans, categories, latestBooks, authors, hasActivePlan, filters }) {
    const [isSubscribing, setIsSubscribing] = useState(false);

    const renderStars = (rating) => {
        const roundedRating = Math.round(Number(rating) || 0);
        return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
    };

    const getRatingLabel = (book) => {
        if (!book.reviews_count) {
            return 'No reviews yet';
        }
        return `${Number(book.reviews_avg_vleresimi).toFixed(1)} / 5`;
    };

    const isSearching = filters?.search;

    const handleSubscribe = (plan) => {
        if (!plan || !plan.id) return;
        setIsSubscribing(true);
        router.post(
            route('subscribe.store'),
            {
                plan_id: plan.id,
                checkout: parseFloat(plan.cmimi_mujor) > 0,
            },
            {
                onFinish: () => setIsSubscribing(false),
            }
        );
    };

    const getImageUrl = (fileName, folder) => {
        if (!fileName) return '/images/placeholder.png';
        const subFolder = folder === 'kopertina' ? 'books' : 'authors';
        return `/uploads/${subFolder}/${fileName}`;
    };

    const heroBooks = latestBooks?.slice(0, 3) || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home Page</h2>}
        >
            <Head title="Home" />

            <div className="bg-[#F8F9FB] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {!isSearching && (
                        <div className="mb-20">
                            <div className="bg-[#EEEFF4] rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between shadow-sm overflow-hidden relative border border-gray-200">
                                <div className="md:w-1/2 z-10">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Featured</h4>
                                    <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Atomic Love</h1>
                                    <p className="text-gray-500 mb-8 max-w-sm leading-relaxed italic">
                                        "The more that you read, the more things you will know. The more that you learn, the more places you'll go."
                                    </p>
                                    <Link
                                        href={route('books.index')}
                                        className="bg-black text-white px-10 py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg inline-block"
                                    >
                                        Read More
                                    </Link>
                                </div>

                                <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center gap-4 relative">
                                    {heroBooks.length > 0 ? (
                                        <>
                                            <div className="w-36 h-52 bg-white rounded shadow-2xl transform -rotate-12 transition hover:rotate-0 overflow-hidden border-2 border-white">
                                                <img
                                                    src={getImageUrl(heroBooks[0]?.foto_kopertines, 'kopertina')}
                                                    className="w-full h-full object-cover"
                                                    alt="Hero 1"
                                                    onError={(e) => e.target.src = '/images/placeholder.png'}
                                                />
                                            </div>
                                            <div className="w-44 h-60 bg-white rounded shadow-2xl z-20 transition hover:scale-105 overflow-hidden border-4 border-white">
                                                <img
                                                    src={getImageUrl(heroBooks[1]?.foto_kopertines || heroBooks[0]?.foto_kopertines, 'kopertina')}
                                                    className="w-full h-full object-cover"
                                                    alt="Hero 2"
                                                    onError={(e) => e.target.src = '/images/placeholder.png'}
                                                />
                                            </div>
                                            <div className="w-36 h-52 bg-white rounded shadow-2xl transform rotate-12 transition hover:rotate-0 overflow-hidden border-2 border-white">
                                                <img
                                                    src={getImageUrl(heroBooks[2]?.foto_kopertines || heroBooks[0]?.foto_kopertines, 'kopertina')}
                                                    className="w-full h-full object-cover"
                                                    alt="Hero 3"
                                                    onError={(e) => e.target.src = '/images/placeholder.png'}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="h-60 flex items-center text-gray-300 italic font-medium">No books available</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mb-20">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    {isSearching ? `Search Results for "${isSearching}"` : "New Released Books"}
                                </h2>
                                <p className="text-gray-400 text-sm mt-1">
                                    {isSearching ? `Found ${latestBooks.length} items.` : "Discover the latest additions."}
                                </p>
                            </div>
                            <Link href={route('books.index')} className="text-gray-400 font-bold hover:text-black border-b-2 border-transparent hover:border-black transition pb-1">
                                View All
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                            {latestBooks.length > 0 ? (
                                latestBooks.map((book) => (
                                    <Link key={book.id} href={route('books.index')} className="text-center group cursor-pointer">
                                        <div className="aspect-[2/3] bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                                            <img
                                                src={getImageUrl(book.foto_kopertines, 'kopertina')}
                                                alt={book.titulli}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/images/placeholder.png'}
                                            />
                                        </div>
                                        <h3 className="font-bold text-gray-700 text-sm truncate px-2 capitalize group-hover:text-black transition">{book.titulli}</h3>
                                        <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">
                                            {book.author ? `${book.author.emri} ${book.author.mbiemri}` : 'Unknown Author'}
                                        </p>
                                        <div className="mt-2">
                                            <div className="flex justify-center text-yellow-400 text-[10px] mb-1">
                                                {renderStars(book.reviews_avg_vleresimi)}
                                            </div>
                                            <p className="text-[10px] text-gray-400">
                                                {getRatingLabel(book)}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20">
                                    <p className="text-gray-400 italic text-lg">No books found matching your search.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {!hasActivePlan && !isSearching && (
                        <div className="bg-white rounded-[40px] p-12 shadow-sm border border-gray-50 mb-20">
                            <div className="text-center max-w-2xl mx-auto mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Reading Plans</h2>
                                <p className="text-gray-500 italic">"Choose a plan to unlock full access to our digital library and start your journey today."</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {plans?.map((plan) => (
                                    <div key={plan.id} className="bg-[#F8F9FB] rounded-3xl p-10 border-2 border-transparent hover:border-black transition-all group">
                                        <h4 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">{plan.emertimi}</h4>
                                        <div className="text-4xl font-bold mb-6 text-gray-900">
                                            {parseFloat(plan.cmimi_mujor) === 0 ? "FREE" : `€${plan.cmimi_mujor}`}
                                            <span className="text-sm font-normal text-gray-400">/mo</span>
                                        </div>
                                        <p className="text-gray-500 mb-8 text-sm line-clamp-2">{plan.pershkrimi}</p>
                                        <button
                                            onClick={() => handleSubscribe(plan)}
                                            disabled={isSubscribing}
                                            className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition transform active:scale-95 shadow-lg"
                                        >
                                            {parseFloat(plan.cmimi_mujor) === 0 ? 'Start Reading' : 'Upgrade Now'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!isSearching && (
                        <div className="mb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900">Authors of the Month</h2>
                                <div className="w-20 h-1 bg-black mx-auto mt-2 rounded-full"></div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-14">
                                {authors?.map((author) => (
                                    <Link key={author.id} href={route('authors.index')} className="text-center group">
                                        <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg group-hover:scale-110 group-hover:border-black transition duration-300">
                                            <img
                                                src={getImageUrl(author.foto_profili || author.foto, 'autoret')}
                                                alt={author.emri}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/images/placeholder.png'}
                                            />
                                        </div>
                                        <p className="text-sm font-bold text-gray-600 group-hover:text-black transition capitalize">
                                            {author.emri} {author.mbiemri}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {!isSearching && (
                        <div className="mb-20 text-center py-16 bg-white rounded-[40px] shadow-sm border border-gray-50 px-6">
                            <p className="text-2xl md:text-3xl font-serif italic text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                "The more that you read, the more things you will know. <br className="hidden md:block" />
                                The more that you learn, the more places you'll go."
                            </p>
                            <div className="mt-6 w-12 h-1 bg-blue-600 mx-auto rounded-full"></div>
                        </div>
                    )}

                    {!isSearching && (
                        <div className="mb-20">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore Genres</h2>
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                {categories?.slice(0, 6).map((cat) => (
                                    <Link key={cat.id} href={route('books.index', { category: cat.id })} className="bg-black text-white rounded-2xl p-6 h-32 flex flex-col justify-end hover:bg-gray-800 transition">
                                        <h3 className="font-bold">{cat.emertimi}</h3>
                                        <p className="text-[10px] text-gray-400">View Collection</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

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
                                <li><Link href={route('logout')} method="post" as="button" className="hover:text-white transition">Logout</Link></li>

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
