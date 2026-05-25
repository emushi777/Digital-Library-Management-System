import BookPicker from '@/Components/BookPicker';
import { Link, router } from '@inertiajs/react';

export default function WishlistForm({
    title,
    description,
    submitLabel,
    processing,
    data,
    setData,
    errors,
    books,
    onSubmit,
}) {
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
            return;
        }

        router.visit(route('wishlists.index'));
    };

    return (
        <div className="min-h-screen bg-[#f8f9fb] pb-20">
            <div className="mx-auto max-w-5xl px-8 pt-8">
                <div className="overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-sm">
                    <div className="grid lg:grid-cols-[0.9fr,1.1fr]">
                        <section className="relative overflow-hidden bg-gray-900 px-8 py-10 text-white sm:px-10 lg:px-12">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.08),_transparent_35%)]" />
                            <div className="relative">
                                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-200">
                                    Reading list
                                </span>
                                <h1 className="mt-5 max-w-sm text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 sm:text-[15px]">{description}</p>

                                <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-inner shadow-black/10">
                                    <p className="text-sm font-semibold text-slate-100">Why use a wishlist?</p>
                                    <ul className="mt-4 space-y-3 text-sm text-slate-300">
                                        <li>Keep books you want to read later in one place.</li>
                                        <li>Search first, then pin exactly one title before saving.</li>
                                        <li>Tap the selected book again whenever you want to switch it.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="px-6 py-8 sm:px-10 sm:py-10">
                            <form onSubmit={onSubmit} className="space-y-8">
                                <BookPicker
                                    books={books}
                                    value={data.book_id}
                                    onChange={(value) => setData('book_id', value)}
                                    error={errors.book_id}
                                />

                                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                                    >
                                        Go back
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {processing ? 'Saving...' : submitLabel}
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
