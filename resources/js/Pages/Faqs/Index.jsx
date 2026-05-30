import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, faqs, isAdmin }) {
    const [faqToDelete, setFaqToDelete] = useState(null);

    const handleDelete = (id) => {
        setFaqToDelete(id);
    };

    const confirmDelete = () => {
        if (!faqToDelete) {
            return;
        }

        router.delete(route('faqs.destroy', faqToDelete));
        setFaqToDelete(null);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="FAQ" />
            <ConfirmModal
                open={Boolean(faqToDelete)}
                title="Delete this FAQ?"
                message="This frequently asked question will be permanently removed from the help center."
                confirmLabel="Delete FAQ"
                onConfirm={confirmDelete}
                onCancel={() => setFaqToDelete(null)}
            />

            <div className="min-h-screen bg-[#f8f9fb] pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-2xl">
                            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
                                FAQ
                            </span>
                            <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                                Frequently asked questions
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                                Manage the help center questions readers see most often across your digital library.
                            </p>
                        </div>

                        {isAdmin && (
                            <Link
                                href={route('faqs.create')}
                                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-black hover:shadow-xl"
                            >
                                Add FAQ
                            </Link>
                        )}
                    </div>

                    <div className="space-y-4">
                        {faqs.length > 0 ? (
                            faqs.map((faq) => (
                                <article
                                    key={faq.id}
                                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-lg font-bold text-gray-900">{faq.pyetja}</h2>
                                                {faq.kategoria && (
                                                    <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                                        {faq.kategoria}
                                                    </span>
                                                )}
                                                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${faq.statusi === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                                                    {faq.statusi}
                                                </span>
                                            </div>
                                            <p className="mt-3 text-sm leading-7 text-gray-600">{faq.pergjigjja}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                                Order {faq.renditja}
                                            </span>
                                        </div>
                                    </div>

                                    {isAdmin && (
                                        <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
                                            <Link
                                                href={route('faqs.edit', faq.id)}
                                                className="rounded-lg bg-gray-100 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-600 transition hover:bg-gray-200"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(faq.id)}
                                                className="rounded-lg bg-red-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-red-600 transition hover:bg-red-600 hover:text-white"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </article>
                            ))
                        ) : (
                            <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900">No FAQs yet</h2>
                                <p className="mt-3 text-sm text-gray-400">
                                    Add your first frequently asked question to start building the help center.
                                </p>
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
                                <li>
                                    <Link
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
