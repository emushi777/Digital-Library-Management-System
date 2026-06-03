import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, book, similarBooks = [], readingInfo = {} }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const reviews = book.reviews || [];
    const totalReviews = reviews.length;
    const [showLimitPopup, setShowLimitPopup] = useState(false);
    const paragrafet = book.pershkrimi ? book.pershkrimi.split('\n').filter(p => p.trim() !== '') : [];
    const eshteIGjate = paragrafet.length > 3 || (book.pershkrimi?.length > 300);
    const [isFinishing, setIsFinishing] = useState(false);
    const [hasFinished, setHasFinished] = useState(Boolean(readingInfo?.hasFinishedThisBookThisMonth));
    const [reviewToDelete, setReviewToDelete] = useState(null);

    const averageRating = totalReviews
        ? reviews.reduce((sum, review) => sum + Number(review.vleresimi || 0), 0) / totalReviews
        : 0;

    const ratingBreakdown = [5, 4, 3, 2, 1].map((rating) => {
        const count = reviews.filter((review) => Number(review.vleresimi) === rating).length;
        const percentage = totalReviews ? (count / totalReviews) * 100 : 0;

        return { rating, count, percentage };
    });

    const getImageUrl = (fileName) => {
        if (!fileName) return 'https://via.placeholder.com/450x600?text=No+Cover';

        return `/uploads/books/${fileName}`;
    };

    const getPdfUrl = (fileName) => {
        if (!fileName) return '#';

        const pdfPath = String(fileName).trim();

        if (pdfPath.startsWith('http://') || pdfPath.startsWith('https://')) {
            return pdfPath;
        }

        if (pdfPath.startsWith('/uploads/')) {
            return pdfPath;
        }

        if (pdfPath.startsWith('/')) {
            return pdfPath;
        }

        if (pdfPath.startsWith('file:///')) {
            const fileParts = pdfPath.split('/');
            const localFileName = fileParts[fileParts.length - 1];

            return `/uploads/books/pdf-files/${localFileName}`;
        }

        return `/uploads/books/pdf-files/${pdfPath}`;
    };

    const deleteBook = () => {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(route('books.destroy', book.id));
        }
    };

    const confirmDeleteReview = () => {
        if (!reviewToDelete) {
            return;
        }

        router.delete(route('reviews.destroy', reviewToDelete), {
            data: { book_id: book.id },
        });
        setReviewToDelete(null);
    };

    const readBook = () => {
        if (!readingInfo?.canReadBook) {
            setShowLimitPopup(true);
            return;
        }

        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    };

    const finishBook = () => {
        if (!readingInfo?.canFinishBook) {
            setShowLimitPopup(true);
            return;
        }
        const isFinishingNewBook = !readingInfo?.hasFinishedThisBookThisMonth;

        setIsFinishing(true);
        router.post(
            route('books.finish', book.id),
            {},
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    setHasFinished(true);

                    if (isFinishingNewBook && page.props.readingInfo?.hasReachedMonthlyLimit) {
                        setShowLimitPopup(true);
                    }
                },
                onError: (errors) => {
                    if (errors.finish) {
                        setShowLimitPopup(true);
                    }
                },
                onFinish: () => setIsFinishing(false),
            }
        );
    };

    const renderStars = (rating, size = 'text-lg') => {
        const roundedRating = Math.round(Number(rating) || 0);

        return (
            <div className={`flex text-amber-400 ${size}`}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <span key={value}>{value <= roundedRating ? '★' : '☆'}</span>
                ))}
            </div>
        );
    };

    const pdfUrl = getPdfUrl(book.shtegu_skedarit);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={book.titulli} />
            <ConfirmModal
                open={Boolean(reviewToDelete)}
                title="Delete this review?"
                message="This review will be permanently removed from the book page and your reviews."
                confirmLabel="Delete review"
                onConfirm={confirmDeleteReview}
                onCancel={() => setReviewToDelete(null)}
            />
            
            <div className="bg-white min-h-screen py-8 text-[#333333]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[250px,1fr] gap-10">
                    <aside className="sticky top-8 self-start">
                        <div className="w-full border border-gray-300 p-1 shadow-sm">
                            <img src={getImageUrl(book.foto_kopertines)} className="w-full h-auto" alt={book.titulli} />
                        </div>
                        
                        <div className="mt-4 space-y-3">
                            <button
                                type="button"
                                onClick={readBook}
                                className="block w-full text-center bg-[#377458] text-white font-semibold py-2 rounded-sm hover:bg-[#2d5d44] transition"
                            >
                                Read Now
                            </button>

                            <button
                                type="button"
                                onClick={finishBook}
                                disabled={isFinishing || hasFinished}
                                className={`block w-full text-center font-semibold py-2 rounded-sm mt-2 transition border ${hasFinished ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
                            >
                                {hasFinished ? 'Finished' : (isFinishing ? 'Saving...' : 'Finish Book')}
                            </button>

                        {showLimitPopup && (
                            <div className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-auto">
                                <div className="absolute inset-0 bg-black/30"></div>

                                <div className="relative bg-white rounded-2xl p-6 shadow-lg max-w-md w-full z-10">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Monthly limit reached
                                    </h2>
                                    <p className="mt-3 text-sm text-gray-600">
                                        {readingInfo?.isBasicPlan ? (
                                            <>You have reached your monthly reading limit of {readingInfo.monthlyLimit} books. Upgrade to Premium to continue reading unlimited books.</>
                                        ) : readingInfo?.isPremiumLimitApplicable ? (
                                            <>You have reached your premium monthly limit of {readingInfo.monthlyLimit} books. Renew your Premium plan to continue reading.</>
                                        ) : (
                                            <>You have reached your monthly reading limit. Please check your plan or contact support.</>
                                        )}
                                    </p>
                                    <div className="mt-6 flex flex-col gap-3">
                                        {readingInfo?.premiumPlanId && (
                                            <Link
                                                href={route('checkout.index', readingInfo.premiumPlanId)}
                                                className="w-full rounded-lg bg-[#377458] px-4 py-2 text-sm font-bold text-white hover:bg-[#2d5d44] transition"
                                            >
                                                {readingInfo?.isBasicPlan ? 'Upgrade to Premium' : 'Renew Premium'}
                                            </Link>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => setShowLimitPopup(false)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                                <Link href={route('bookmarks.create', { book_id: book.id })} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#377458] transition">
                                    <span>🔖</span>Add to Bookmarks
                                </Link>
                                <Link href={route('wishlists.create', { book_id: book.id })} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#377458] transition">
                                    <span>♡</span>Add to Wishlist
                                </Link>
                                <Link href={route('reviews.create', { book_id: book.id })} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#377458] transition">
                                    <span>★</span>Rate this book
                                </Link>
                            </div>

                            {auth.user?.role === 'admin' && (
                                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                    <Link 
                                        href={route('books.edit', book.id)} 
                                        className="w-full text-center text-sm py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded border border-gray-300 transition"
                                    >
                                        Edit Book
                                    </Link>
                                    <button 
                                        onClick={deleteBook}
                                        className="w-full text-sm py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded border border-red-200 transition"
                                    >
                                        Delete Book
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>

                    <main>
                        <h1 className="text-[38px] font-bold text-gray-900 leading-tight font-serif border-b border-gray-200 pb-2">
                            {book.titulli}
                        </h1>
                        
                        <p className="text-xl text-[#333333] font-serif mt-3">
                            by 
                            {book.author ? (
                                <Link 
                                    href={route('authors.show', book.author.id)} 
                                    className="text-[#377458] hover:underline cursor-pointer font-bold ml-1"
                                >
                                    {book.author?.emri} {book.author?.mbiemri}
                                </Link>
                            ) : (
                                <span className="font-bold ml-1 text-gray-500">Unknown author</span>
                            )}
                        </p>
                        
                        <div className="flex items-center gap-3 mt-3">
                            {renderStars(averageRating)}
                            <span className="text-gray-500 text-sm font-semibold">
                                {totalReviews ? averageRating.toFixed(1) : '0.0'} • {totalReviews} {totalReviews === 1 ? 'rating' : 'ratings'}
                            </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Link href={`/books?category=${book.category?.id}`} className="bg-[#f4f1ea] text-[#377458] px-3 py-1 text-sm rounded-full hover:bg-[#e9e4d5] border border-[#d8d0b5]">
                                {book.category?.emertimi}
                            </Link>
                        </div>

                        <div className="mt-6">
                            <div className={`text-[16px] text-[#333333] leading-[1.6] font-serif break-all ${!isExpanded ? 'line-clamp-4' : ''}`}>
                                {book.pershkrimi || "No description available."}
                            </div>
                            
                            {eshteIGjate && (
                                <button 
                                    onClick={() => setIsExpanded(!isExpanded)} 
                                    className="text-[#377458] hover:underline text-sm font-medium mt-1"
                                >
                                    {isExpanded ? '(less)' : '...more'}
                                </button>
                            )}
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4 text-lg">About the author</h3>
                            <div className="flex gap-4 items-start">
                                {book.author?.foto_profili ? (
                                    <img 
                                        src={`/uploads/authors/${book.author.foto_profili}`} 
                                        alt={book.author.emri}
                                        className="w-16 h-16 rounded-sm object-cover border border-gray-200" 
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-300 rounded-sm flex-shrink-0 flex items-center justify-center font-bold text-white text-xl">
                                        {book.author?.emri?.[0] || '?'}
                                    </div>
                                )}
                                
                                <div>
                                    <h4 className="font-bold text-[#377458] hover:underline cursor-pointer text-lg">
                                        {book.author ? (
                                            <Link href={route('authors.show', book.author.id)}>
                                                {book.author?.emri} {book.author?.mbiemri}
                                            </Link>
                                        ) : (
                                            <span className="text-gray-500">Unknown author</span>
                                        )}
                                    </h4>
                                    <p className="text-sm text-gray-600 font-serif mt-1">
                                        {book.author?.biografia || "No biography available."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <h3 className="font-bold text-gray-800 mb-4 text-lg">Similar books</h3>
                            {similarBooks.length > 0 ? (
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                    {similarBooks.map((simBook) => (
                                        <Link href={route('books.show', simBook.id)} key={simBook.id} className="block">
                                            <div className="aspect-[2/3] w-full rounded-sm border border-gray-300 overflow-hidden hover:opacity-80 transition">
                                                <img src={`/uploads/books/${simBook.foto_kopertines}`} alt={simBook.titulli} className="w-full h-full object-cover" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic text-sm">No similar books found.</p>
                            )}
                        </div>

                        <div className="mt-12 border-t border-gray-200 pt-8">
                            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="font-bold text-gray-800 text-xl">Ratings & Reviews</h3>
                                <Link
                                    href={route('reviews.create', { book_id: book.id })}
                                    className="inline-flex items-center justify-center rounded-lg bg-[#377458] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#2d5d44]"
                                >
                                    Write a review
                                </Link>
                            </div>
                            <div className="grid gap-6 lg:grid-cols-[240px,1fr]">
                                <aside className="rounded-2xl border border-gray-200 bg-[#fafafa] p-5">
                                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400">Overview</p>
                                    <div className="mt-4 flex items-end gap-3">
                                        <span className="text-5xl font-bold text-gray-900">
                                            {totalReviews ? averageRating.toFixed(1) : '0.0'}
                                        </span>
                                        <span className="pb-2 text-sm font-semibold text-gray-400">/ 5</span>
                                    </div>
                                    <div className="mt-3">
                                        {renderStars(averageRating, 'text-xl')}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                                    </p>

                                    <div className="mt-6 space-y-3">
                                        {ratingBreakdown.map(({ rating, count, percentage }) => (
                                            <div key={rating} className="grid grid-cols-[18px,1fr,24px] items-center gap-3">
                                                <span className="text-sm font-semibold text-gray-700">{rating}</span>
                                                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                                    <div className="h-full rounded-full bg-[#377458]" style={{ width: `${percentage}%` }} />
                                                </div>
                                                <span className="text-xs font-semibold text-gray-400">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </aside>

                                <div className="space-y-4">
                                    {reviews.length > 0 ? (
                                        reviews.map((review) => (
                                            <article key={review.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                                <div className="flex flex-wrap items-center justify-between gap-3">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-gray-900">
                                                            {review.user?.name || 'Unknown reader'}
                                                        </h4>
                                                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-gray-300">
                                                            {new Date(review.data_vleresimit).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        {renderStars(review.vleresimi, 'text-base')}
                                                        <span className="rounded-full bg-[#f4f1ea] px-3 py-1 text-xs font-semibold text-[#377458]">
                                                            {review.vleresimi}/5
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="mt-4 text-[15px] leading-7 text-gray-600 font-serif">
                                                    {review.komenti || 'This reader left a rating without a written review.'}
                                                </p>

                                                {(review.user_id === auth.user?.id || auth.user?.role === 'admin') && (
                                                    <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
                                                        {review.user_id === auth.user?.id ? (
                                                            <Link
                                                                href={route('reviews.edit', review.id, { return_to_book: 1 })}
                                                                className="rounded-lg bg-gray-100 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-600 transition hover:bg-gray-200"
                                                            >
                                                                Edit
                                                            </Link>
                                                        ) : null}
                                                        <button
                                                            onClick={() => setReviewToDelete(review.id)}
                                                            className="rounded-lg bg-red-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-red-600 transition hover:bg-red-600 hover:text-white"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </article>
                                        ))
                                    ) : (
                                        <div className="rounded-2xl border border-dashed border-gray-200 bg-[#fafafa] px-6 py-12 text-center">
                                            <p className="text-lg font-semibold text-gray-800">No reviews for this book yet</p>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Be the first reader to leave a rating and review for this title.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
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
                                <li><Link href={route('profile.edit') + '#plans'} className="hover:text-white transition">Plans</Link></li>
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
