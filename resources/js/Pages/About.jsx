import { useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';

export default function About({ auth }) {
    const feedbackRef = useRef(null);
    const contactRef = useRef(null);
    const { flash } = usePage().props;

    const { data, setData, post, processing, reset, recentlySuccessful } = useForm({
        message: '',
    });

    const submitFeedback = (e) => {
        e.preventDefault();
        post(route('feedback.store'), {
            onSuccess: () => reset(),
        });
    };

    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#feedback' && feedbackRef.current) {
            feedbackRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (hash === '#contactus' && contactRef.current) {
            contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">About Us</h2>}
        >
            <Head title="About Bookly" />

            <div className="bg-gray-50 min-h-screen py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-16">
                    
                    <div className="text-center">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">About Bookly</h1>
                        <p className="text-xl text-gray-500 italic">"Connecting readers to the worlds they love."</p>
                    </div>

                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Bookly was founded with a singular mission: to modernize the way we access 
                            and manage digital literature. We recognized the need for a seamless platform 
                            that brings books, knowledge, and readers together in one place.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Whether you are a student or a passionate reader, Bookly is designed 
                            to make your journey easier, faster, and more enjoyable.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-900 text-white p-8 rounded-3xl">
                            <h3 className="font-bold text-lg mb-2">Our Mission</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                To empower learners by providing a centralized, accessible, and user-friendly digital library experience.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-2 text-gray-900">Our Vision</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                To become the ultimate digital ecosystem where knowledge meets innovation and community.
                            </p>
                        </div>
                    </div>

                    <div ref={feedbackRef} id="feedback" className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-1">Feedback</h2>
                        <p className="text-gray-500 mb-6 text-sm">We value your opinion. Let us know how we can improve.</p>
                        
                        {recentlySuccessful && (
                            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-100">
                                Thank you! Your feedback has been received.
                            </div>
                        )}

                        <form onSubmit={submitFeedback} className="space-y-4">
                            <textarea 
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full border-gray-200 bg-gray-50 rounded-2xl p-4 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition" 
                                rows="4" 
                                placeholder="Share your thoughts..."
                                required
                            ></textarea>
                            <button 
                                disabled={processing}
                                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                {processing ? 'Sending...' : 'Send Feedback'}
                            </button>
                        </form>
                    </div>

                    <div ref={contactRef} id="contactus" className="text-center py-10 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                        <p className="text-gray-500 mb-4 text-sm">Have questions? Reach out to our team at:</p>
                        <a href="mailto:support@bookly.com" className="text-lg font-bold text-gray-900 hover:text-gray-600 transition underline decoration-2 underline-offset-4">
                            support@bookly.com
                        </a>
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