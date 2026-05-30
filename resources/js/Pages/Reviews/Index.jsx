import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const ratingOrder = [5, 4, 3, 2, 1];

function StarRow({ rating, size = 'md' }) {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
    };

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
                <svg
                    key={value}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={`${sizes[size]} ${value <= Math.round(Number(rating) || 0) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-slate-300'}`}
                >
                    <path
                        stroke="currentColor"
                        strokeWidth="1.7"
                        d="M12 3.75l2.53 5.13 5.66.82-4.09 3.98.97 5.63L12 16.6l-5.07 2.71.97-5.63L3.81 9.7l5.66-.82L12 3.75z"
                    />
                </svg>
            ))}
        </div>
    );
}

function getBookImageUrl(fileName) {
    if (!fileName) {
        return 'https://via.placeholder.com/120x180?text=No+Cover';
    }

    return `/uploads/books/${fileName}`;
}

export default function Index({ auth, reviews }) {
    const [reviewToDelete, setReviewToDelete] = useState(null);

    const handleDelete = (id) => {
        setReviewToDelete(id);
    };

    const confirmDelete = () => {
        if (!reviewToDelete) {
            return;
        }

        router.delete(route('reviews.destroy', reviewToDelete));
        setReviewToDelete(null);
    };

    const totalReviews = reviews.length;
    const averageRating = totalReviews
        ? reviews.reduce((sum, review) => sum + Number(review.vleresimi || 0), 0) / totalReviews
        : 0;
    const ratingBreakdown = ratingOrder.map((rating) => {
        const count = reviews.filter((review) => Number(review.vleresimi) === rating).length;
        const percentage = totalReviews ? (count / totalReviews) * 100 : 0;

        return { rating, count, percentage };
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Reviews" />
            <ConfirmModal
                open={Boolean(reviewToDelete)}
                title="Delete this review?"
                message="This review will be permanently removed from your reading feedback."
                confirmLabel="Delete review"
                onConfirm={confirmDelete}
                onCancel={() => setReviewToDelete(null)}
            />

            <div className="min-h-screen bg-[#f8f9fb] pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-2xl">
                            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
                                Reviews
                            </span>
                            <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">See what readers think about the books they finished</h1>
                            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                                Browse recent ratings, helpful comments, and overall feedback from readers across your digital library.
                            </p>
                        </div>
                        <Link
                            href={route('reviews.create')}
                            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-black hover:shadow-xl"
                        >
                            Write a review
                        </Link>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[320px,1fr] xl:gap-8">
                        <aside className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <p className="text-lg font-bold text-gray-900">Average Rating</p>
                            <div className="mt-5 flex items-end gap-3">
                                <span className="text-5xl font-black tracking-tight text-gray-900">{totalReviews ? averageRating.toFixed(1) : '0.0'}</span>
                                <span className="pb-2 text-sm font-medium text-gray-400">/ 5</span>
                            </div>
                            <div className="mt-3">
                                <StarRow rating={averageRating} />
                            </div>
                            <p className="mt-2 text-sm text-gray-400">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>

                            <div className="mt-8 space-y-4">
                                {ratingBreakdown.map(({ rating, count, percentage }) => (
                                    <div key={rating} className="grid grid-cols-[18px,1fr,44px] items-center gap-3 text-sm text-gray-500">
                                        <span className="font-semibold text-gray-700">{rating}</span>
                                        <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                                            <div
                                                className="h-full rounded-full bg-blue-600 transition-all"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-right text-xs font-semibold text-gray-400">{count}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                                <p className="text-sm font-semibold text-gray-900">Write your review</p>
                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Add a clear rating and a helpful comment so other readers can decide what to open next.
                                </p>
                                <Link
                                    href={route('reviews.create')}
                                    className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-700"
                                >
                                    Submit review
                                </Link>
                            </div>
                        </aside>

                        <section className="space-y-4">
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <p className="text-lg font-bold text-gray-900">Customer Feedback</p>
                                <p className="mt-1 text-sm text-gray-400">Recent reviews from your digital library readers.</p>

                                <div className="mt-6 space-y-4">
                                    {reviews.length > 0 ? (
                                        reviews.map((review) => {
                                            const reviewerName = review.user?.name || 'Unknown reader';
                                            const initials = reviewerName
                                                .split(' ')
                                                .map((part) => part[0])
                                                .join('')
                                                .slice(0, 2)
                                                .toUpperCase();

                                            return (
                                                <article
                                                    key={review.id}
                                                    className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm transition-all hover:shadow-lg sm:px-6"
                                                >
                                                    <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_120px] sm:items-start">
                                                        <div className="min-w-0">
                                                            <div className="flex min-w-0 gap-4">
                                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-600 shadow-sm">
                                                                    {initials || 'R'}
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                                                        <h2 className="text-base font-bold text-gray-900">{reviewerName}</h2>
                                                                        <span className="max-w-full rounded bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                                                            {review.book?.titulli || 'Book review'}
                                                                        </span>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-400">
                                                                        {review.book?.author ? `${review.book.author.emri} ${review.book.author.mbiemri}` : 'Unknown author'} -{' '}
                                                                        {new Date(review.data_vleresimit).toLocaleDateString()}
                                                                    </p>
                                                                    <div className="mt-4 flex flex-wrap items-center gap-3">
                                                                        <StarRow rating={review.vleresimi} size="sm" />
                                                                        <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                                                                            {review.vleresimi}/5
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <p className="mt-4 pr-0 text-sm leading-7 text-gray-500 sm:pr-4">
                                                                {review.komenti || 'This reader left a rating without a written comment.'}
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-start sm:justify-end">
                                                            {review.book ? (
                                                                <Link
                                                                    href={route('books.show', review.book.id)}
                                                                    className="block transition hover:scale-[1.02]"
                                                                >
                                                                    <img
                                                                        src={getBookImageUrl(review.book?.foto_kopertines)}
                                                                        alt={review.book?.titulli || 'Book cover'}
                                                                        className="h-36 w-24 rounded-xl border border-gray-100 object-cover shadow-sm"
                                                                    />
                                                                </Link>
                                                            ) : (
                                                                <img
                                                                    src={getBookImageUrl(review.book?.foto_kopertines)}
                                                                    alt={review.book?.titulli || 'Book cover'}
                                                                    className="h-36 w-24 rounded-xl border border-gray-100 object-cover shadow-sm"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-5 flex flex-col gap-3 border-t border-gray-50 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
                                                            {review.user_id === auth.user.id ? 'Your review' : 'Community review'}
                                                        </span>

                                                        {review.user_id === auth.user.id ? (
                                                            <div className="flex flex-wrap gap-3">
                                                                <Link
                                                                    href={route('reviews.edit', review.id)}
                                                                    className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-600 transition-all hover:bg-gray-200"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDelete(review.id)}
                                                                    className="inline-flex items-center rounded-lg bg-red-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-red-600 transition-all hover:bg-red-600 hover:text-white"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm font-medium text-gray-400">Read only</span>
                                                        )}
                                                    </div>
                                                </article>
                                            );
                                        })
                                    ) : (
                                        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-14 text-center">
                                            <p className="text-lg font-semibold text-gray-800">No reviews yet</p>
                                            <p className="mt-2 text-sm text-gray-400">Be the first reader to rate a book and set the tone for this section.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
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
