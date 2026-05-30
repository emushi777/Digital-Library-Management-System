import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const FALLBACK_BOOK_IMAGE = 'https://via.placeholder.com/320x420?text=No+Cover';

function getBookImageUrl(fileName) {
    if (!fileName) {
        return FALLBACK_BOOK_IMAGE;
    }

    return `/uploads/books/${fileName}`;
}

export default function Index({ auth, wishlists }) {
    const [wishlistToDelete, setWishlistToDelete] = useState(null);

    const handleDelete = (id) => {
        setWishlistToDelete(id);
    };

    const confirmDelete = () => {
        if (!wishlistToDelete) {
            return;
        }

        router.delete(route('wishlists.destroy', wishlistToDelete));
        setWishlistToDelete(null);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Wishlists" />
            <ConfirmModal
                open={Boolean(wishlistToDelete)}
                title="Remove this wishlist book?"
                message="This book will be removed from your wishlist. You can always add it again later."
                confirmLabel="Remove book"
                onConfirm={confirmDelete}
                onCancel={() => setWishlistToDelete(null)}
            />

            <div className="min-h-screen bg-[#f8f9fb] pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                    <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Home / Wishlist</p>
                            <div className="mt-4 flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none text-gray-700">
                                        <path
                                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">My Wishlist</h1>
                                    <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">Saved books you want to come back to later.</p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route('wishlists.create')}
                            className="inline-flex h-12 items-center justify-center self-start rounded-xl bg-gray-900 px-6 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-black hover:shadow-xl lg:self-center"
                        >
                            Add to wishlist
                        </Link>
                    </div>

                    {wishlists.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-5 min-h-[400px]">
                            {wishlists.map((wishlist) => (
                                <article
                                    key={wishlist.id}
                                    className="group relative flex h-full flex-col"
                                >
                                    <div className="relative mb-3 overflow-hidden rounded-xl bg-white shadow-sm transition-all group-hover:shadow-xl">
                                        <img
                                            src={getBookImageUrl(wishlist.book?.foto_kopertines)}
                                            alt={wishlist.book?.titulli || 'Book cover'}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = FALLBACK_BOOK_IMAGE;
                                            }}
                                            className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />
                                        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            <Link
                                                href={wishlist.book ? route('books.show', wishlist.book.id) : '#'}
                                                className="rounded-lg bg-white/95 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-md backdrop-blur transition hover:bg-blue-500 hover:text-white"
                                            >
                                                Quick view
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(wishlist.id)}
                                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-md backdrop-blur transition hover:bg-red-600 hover:text-white"
                                                aria-label="Remove from wishlist"
                                            >
                                                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <h2 className="min-h-[2.5rem] text-sm font-bold leading-5 tracking-tight text-gray-800 line-clamp-2">
                                            {wishlist.book?.titulli || 'Untitled book'}
                                        </h2>
                                        <p className="mt-1 min-h-[1.25rem] text-xs font-medium text-gray-500">
                                            {wishlist.book?.author ? `${wishlist.book.author.emri} ${wishlist.book.author.mbiemri}` : 'Unknown author'}
                                        </p>
                                        <p className="mt-2 min-h-[1rem] text-[10px] uppercase tracking-widest text-gray-400">
                                            Added {new Date(wishlist.data_shtimit).toLocaleDateString()}
                                        </p>
                                        <div className="mt-4 flex gap-2 pt-1">
                                            <Link
                                                href={route('wishlists.edit', wishlist.id)}
                                                className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-gray-600 transition-all hover:bg-gray-200"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(wishlist.id)}
                                                className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-red-600 transition-all hover:bg-red-600 hover:text-white"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900">Your wishlist is empty</h2>
                            <p className="mt-3 text-sm text-gray-400">
                                Save books you want to read later and they will show up here in a cleaner gallery.
                            </p>
                            <Link
                                href={route('wishlists.create')}
                                className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-700"
                            >
                                Add first book
                            </Link>
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
