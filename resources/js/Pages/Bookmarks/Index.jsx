import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const FALLBACK_BOOK_IMAGE = 'https://via.placeholder.com/160x240?text=No+Cover';

function getBookImageUrl(fileName) {
    if (!fileName) {
        return FALLBACK_BOOK_IMAGE;
    }

    return `/uploads/books/${fileName}`;
}

export default function Index({ auth, bookmarks }) {
    const [bookmarkToDelete, setBookmarkToDelete] = useState(null);

    const totals = useMemo(() => {
        const pages = bookmarks.reduce((sum, bookmark) => sum + Number(bookmark.faqja || 0), 0);
        const noted = bookmarks.filter((bookmark) => bookmark.shenime && bookmark.shenime.trim().length > 0).length;

        return {
            total: bookmarks.length,
            pages,
            noted,
        };
    }, [bookmarks]);

    const latestBookmarks = useMemo(
        () =>
            [...bookmarks]
                .sort((a, b) => new Date(b.data_krijimit) - new Date(a.data_krijimit))
                .slice(0, 3),
        [bookmarks],
    );

    const confirmDelete = () => {
        if (!bookmarkToDelete) {
            return;
        }

        router.delete(route('bookmarks.destroy', bookmarkToDelete));
        setBookmarkToDelete(null);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Bookmarks" />

            <ConfirmModal
                open={Boolean(bookmarkToDelete)}
                title="Delete this bookmark?"
                message="This saved page and its note will be removed from your bookmarks."
                confirmLabel="Delete bookmark"
                onConfirm={confirmDelete}
                onCancel={() => setBookmarkToDelete(null)}
            />

            <div className="min-h-screen bg-[#f8f9fb] pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
                                Bookmarks
                            </span>
                            <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                                Keep track of the pages you want to return to
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                                Save important reading moments, organize quick notes, and jump back into any book without losing your place.
                            </p>
                        </div>

                        <Link
                            href={route('bookmarks.create')}
                            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-black hover:shadow-xl"
                        >
                            Add bookmark
                        </Link>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-8">
                        <section className="space-y-4">
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">Your saved pages</p>
                                        <p className="mt-1 text-sm text-gray-400">
                                            {totals.total > 0
                                                ? `${totals.total} ${totals.total === 1 ? 'bookmark' : 'bookmarks'} across your reading list`
                                                : 'Start saving pages from the books you are reading.'}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                                            {totals.noted} with notes
                                        </span>
                                        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                                            {totals.pages} total pages saved
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    {bookmarks.length > 0 ? (
                                        bookmarks.map((bookmark) => (
                                            <article
                                                key={bookmark.id}
                                                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-lg"
                                            >
                                                <div className="grid gap-5 sm:grid-cols-[140px,minmax(0,1fr)]">
                                                    <Link
                                                        href={bookmark.book ? route('books.show', bookmark.book.id) : '#'}
                                                        className="block overflow-hidden rounded-xl bg-gray-100 shadow-sm transition hover:scale-[1.02]"
                                                    >
                                                        <img
                                                            src={getBookImageUrl(bookmark.book?.foto_kopertines)}
                                                            alt={bookmark.book?.titulli || 'Book cover'}
                                                            onError={(e) => {
                                                                e.currentTarget.onerror = null;
                                                                e.currentTarget.src = FALLBACK_BOOK_IMAGE;
                                                            }}
                                                            className="aspect-[2/3] w-full object-cover"
                                                        />
                                                    </Link>

                                                    <div className="flex min-w-0 flex-col">
                                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                            <div className="min-w-0">
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <Link
                                                                        href={bookmark.book ? route('books.show', bookmark.book.id) : '#'}
                                                                        className="text-lg font-black tracking-tight text-gray-900 transition hover:text-blue-600"
                                                                    >
                                                                        {bookmark.book?.titulli || 'Untitled book'}
                                                                    </Link>
                                                                    <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-600">
                                                                        Page {bookmark.faqja}
                                                                    </span>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">
                                                                    {bookmark.book?.author
                                                                        ? `${bookmark.book.author.emri} ${bookmark.book.author.mbiemri}`
                                                                        : 'Unknown author'}
                                                                </p>
                                                            </div>

                                                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
                                                                {new Date(bookmark.data_krijimit).toLocaleDateString()}
                                                            </p>
                                                        </div>

                                                        <div className="mt-4 flex flex-1 flex-col rounded-xl bg-gray-50 px-4 py-4">
                                                            <div className="flex-1">
                                                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                                                    Note
                                                                </p>
                                                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                                                    {bookmark.shenime?.trim()
                                                                        ? bookmark.shenime
                                                                        : 'No note added yet. Save a short reminder here for your next reading session.'}
                                                                </p>
                                                            </div>
                                                            <div className="mt-4 flex gap-2 pt-2">
                                                                <Link
                                                                    href={route('bookmarks.edit', bookmark.id)}
                                                                    className="flex-1 rounded-lg bg-white px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-gray-600 transition-all hover:bg-gray-200"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    onClick={() => setBookmarkToDelete(bookmark.id)}
                                                                    className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-red-600 transition-all hover:bg-red-600 hover:text-white"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        ))
                                    ) : (
                                        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
                                            <p className="text-lg font-semibold text-gray-800">No bookmarks yet</p>
                                            <p className="mt-2 text-sm text-gray-400">
                                                Save a page from any book and it will show up here with your reading note.
                                            </p>
                                            <Link
                                                href={route('bookmarks.create')}
                                                className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-700"
                                            >
                                                Add first bookmark
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        <aside className="space-y-4">
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <p className="text-lg font-bold text-gray-900">Bookmark stats</p>
                                <p className="mt-1 text-sm text-gray-400">A quick overview of what you saved for later.</p>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <div className="rounded-xl bg-blue-50 p-4">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">Saved</p>
                                        <p className="mt-2 text-3xl font-black tracking-tight text-gray-900">{totals.total}</p>
                                        <p className="mt-1 text-xs text-gray-500">Total bookmarks</p>
                                    </div>
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Notes</p>
                                        <p className="mt-2 text-3xl font-black tracking-tight text-gray-900">{totals.noted}</p>
                                        <p className="mt-1 text-xs text-gray-500">With comments</p>
                                    </div>
                                </div>

                                <div className="mt-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Reading focus</p>
                                    <p className="mt-2 text-3xl font-black tracking-tight text-gray-900">{totals.pages}</p>
                                    <p className="mt-1 text-xs text-gray-500">Combined bookmarked pages</p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <p className="text-lg font-bold text-gray-900">Recent saves</p>
                                <p className="mt-1 text-sm text-gray-400">Your latest bookmarked books.</p>

                                <div className="mt-5 space-y-4">
                                    {latestBookmarks.length > 0 ? (
                                        latestBookmarks.map((bookmark) => (
                                            <Link
                                                key={bookmark.id}
                                                href={bookmark.book ? route('books.show', bookmark.book.id) : '#'}
                                                className="flex items-center gap-3 rounded-xl border border-gray-100 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/40"
                                            >
                                                <img
                                                    src={getBookImageUrl(bookmark.book?.foto_kopertines)}
                                                    alt={bookmark.book?.titulli || 'Book cover'}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = FALLBACK_BOOK_IMAGE;
                                                    }}
                                                    className="h-16 w-12 rounded-lg object-cover shadow-sm"
                                                />
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold text-gray-900">
                                                        {bookmark.book?.titulli || 'Untitled book'}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">Page {bookmark.faqja}</p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400">No recent saves yet.</p>
                                    )}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
