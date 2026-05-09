import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Dashboard({ auth, plans, latestBooks, authors }) {
    const { post, processing, transform } = useForm({
        plan_id: '',
    });

    const handleSubscribe = (e, plan) => {
        e.preventDefault();
        if (parseFloat(plan.cmimi_mujor) === 0) {
            transform((data) => ({ ...data, plan_id: plan.id }));
            post(route('subscribe.store'));
        } else {
            window.location.href = route('books.index', { plan_id: plan.id });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home Page</h2>}
        >
            <Head title="Home" />

            <div className="bg-[#F8F9FB] min-h-screen pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* --- SECTION: THIS MONTH (Hero) --- */}
                    <div className="pt-10 pb-16">
                        <div className="bg-[#EEEFF4] rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between shadow-sm overflow-hidden relative">
                            <div className="md:w-1/2 z-10">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">This Month</h4>
                                <h1 className="text-5xl font-black text-gray-900 mb-6">Atomic Love</h1>
                                <p className="text-gray-500 mb-8 max-w-sm leading-relaxed">
                                    "The more that you read, the more things you will know. The more that you learn, the more places you'll go."
                                </p>
                                <button className="bg-black text-white px-10 py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg">
                                    Read More
                                </button>
                            </div>
                            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center gap-4 relative">
                                {/* Simulim i librave në foto */}
                                <div className="w-40 h-56 bg-purple-600 rounded shadow-2xl transform -rotate-6 transition hover:rotate-0"></div>
                                <div className="w-48 h-64 bg-blue-900 rounded shadow-2xl z-20 transition hover:scale-105"></div>
                                <div className="w-40 h-56 bg-cyan-400 rounded shadow-2xl transform rotate-6 transition hover:rotate-0"></div>
                            </div>
                        </div>
                    </div>

                    {/* --- SECTION: NEW RELEASED BOOKS --- */}
                    <div className="mb-20">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">New Released Books</h2>
                                <p className="text-gray-400 text-sm mt-1">Discover the latest additions to our library.</p>
                            </div>
                            <Link href="/books" className="text-gray-400 font-bold hover:text-black border-b-2 border-transparent hover:border-black transition pb-1">View All</Link>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                            {latestBooks?.map((book) => (
                                <div key={book.id} className="text-center group cursor-pointer">
                                    <div className="aspect-[2/3] bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm truncate px-2">{book.titulli}</h3>
                                    <p className="text-gray-400 text-xs mt-1">€{book.cmimi}</p>
                                </div>
                            )) || <div className="col-span-5 text-center text-gray-400 italic">No books found.</div>}
                        </div>
                    </div>

                    {/* --- SECTION: SUBSCRIPTION PLANS (Lidhja me kodin tënd) --- */}
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
                                        onClick={(e) => handleSubscribe(e, plan)}
                                        disabled={processing}
                                        className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition transform active:scale-95 shadow-lg"
                                    >
                                        {parseFloat(plan.cmimi_mujor) === 0 ? 'Start Reading' : 'Upgrade Now'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- SECTION: FAVORITE AUTHORS --- */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Favorite Authors</h2>
                        <div className="flex flex-wrap justify-center gap-12">
                            {authors?.map((author) => (
                                <div key={author.id} className="text-center group">
                                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md group-hover:scale-110 transition duration-300">
                                        <img src={author.foto} alt={author.emri} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-xs font-bold text-gray-700 uppercase tracking-tight">{author.emri}</p>
                                </div>
                            )) || <p className="text-gray-300 italic">Adding authors soon...</p>}
                        </div>
                    </div>
                    {/* --- SECTION: QUOTE --- */}
                    <div className="my-20 text-center py-16 bg-white rounded-[40px] shadow-sm border border-gray-50 px-6">
                        <p className="text-2xl md:text-3xl font-serif italic text-gray-700 max-w-4xl mx-auto leading-relaxed">
                            "The more that you read, the more things you will know. <br className="hidden md:block" /> 
                            The more that you learn, the more places you'll go."
                        </p>
                        <div className="mt-6 w-12 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                </div>
            </div>
            {/* --- FOOTER --- */}
            <footer className="bg-black text-white pt-20 pb-10 rounded-t-[50px] mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Logo & About */}
                        <div className="col-span-1">
                            <h2 className="text-2xl font-black mb-6 italic tracking-tighter">BooksHub</h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Your ultimate destination for digital reading. Explore thousands of titles from anywhere, anytime.
                            </p>
                            <div className="flex gap-4">
                                {/* Social Icons Placeholder */}
                                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">f</div>
                                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition cursor-pointer">ig</div>
                                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition cursor-pointer">tw</div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Services</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href="#" className="hover:text-white transition">Free Books</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Premium Library</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Audiobooks</Link></li>
                                <li><Link href="#" className="hover:text-white transition">New Releases</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-lg">Support</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
                            <p className="text-gray-400 text-sm mb-4">Subscribe for newest books updates.</p>
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="bg-gray-900 border-none rounded-lg text-sm w-full focus:ring-1 focus:ring-blue-500"
                                />
                                <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs italic">
                        © 2024 BooksHub Library. All rights reserved. Designed with ❤️ by [Emri Yt]
                    </div>
                </div>
            </footer>
        </AuthenticatedLayout>
    );
}