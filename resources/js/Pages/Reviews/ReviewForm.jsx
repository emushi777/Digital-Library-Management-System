import BookPicker from '@/Components/BookPicker';
import { Link, router } from '@inertiajs/react';

const RATING_LABELS = {
    1: 'Needs work',
    1.5: 'Needs work',
    2: 'Fair read',
    2.5: 'Fair read',
    3: 'Good',
    3.5: 'Good',
    4: 'Very good',
    4.5: 'Very good',
    5: 'Excellent',
};

function StarIcon({ full, half }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`h-7 w-7 transition ${full || half ? 'text-amber-400' : 'text-slate-300'}`}
        >
            <path
                stroke="currentColor"
                strokeWidth="1.7"
                fill={full || half ? 'currentColor' : 'transparent'}
                style={half ? { clipPath: 'inset(0 50% 0 0)' } : undefined}
                d="M12 3.75l2.53 5.13 5.66.82-4.09 3.98.97 5.63L12 16.6l-5.07 2.71.97-5.63L3.81 9.7l5.66-.82L12 3.75z"
            />
        </svg>
    );
}

export default function ReviewForm({
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
    const selectedRating = Number(data.vleresimi || 0);
    const commentLength = data.komenti?.length || 0;
    const starValues = [1, 2, 3, 4, 5];
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
            return;
        }

        router.visit(route('reviews.index'));
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
                                    Reader feedback
                                </span>
                                <h1 className="mt-5 max-w-sm text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 sm:text-[15px]">{description}</p>

                                <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-inner shadow-black/10">
                                    <p className="text-sm font-semibold text-slate-100">What makes a strong review?</p>
                                    <ul className="mt-4 space-y-3 text-sm text-slate-300">
                                        <li>Share what stood out about the story, writing, or pacing.</li>
                                        <li>Mention who you think would enjoy this book.</li>
                                        <li>Keep it honest, helpful, and respectful for other readers.</li>
                                    </ul>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3 text-xs font-medium text-slate-300">
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">5-star rating</span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">One review per book</span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Up to 2000 characters</span>
                                </div>
                            </div>
                        </section>

                        <section className="px-6 py-8 sm:px-10 sm:py-10">
                            <form onSubmit={onSubmit} className="space-y-8">
                                <div className="rounded-[28px] border border-gray-100 bg-[#f8f9fb] p-5 sm:p-6">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Your rating</p>
                                            <p className="mt-1 text-sm text-gray-500">Choose the score that best matches your reading experience.</p>
                                        </div>
                                        <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                                            {selectedRating ? `${selectedRating}/5 - ${RATING_LABELS[selectedRating]}` : 'Pick a rating'}
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-5 gap-3">
                                        {starValues.map((starValue) => {
                                            const isSameStar = selectedRating === starValue;
                                            const isHalfStar = selectedRating === starValue - 0.5;
                                            const full = selectedRating >= starValue;
                                            const half = selectedRating >= starValue - 0.5 && selectedRating < starValue;

                                            return (
                                                <button
                                                    key={starValue}
                                                    type="button"
                                                    onClick={() => {
                                                        if (isSameStar) {
                                                            setData('vleresimi', String(starValue - 0.5));
                                                        } else if (isHalfStar) {
                                                            setData('vleresimi', String(starValue));
                                                        } else {
                                                            setData('vleresimi', String(starValue));
                                                        }
                                                    }}
                                                    className={`rounded-2xl border px-2 py-4 transition ${
                                                        isSameStar || isHalfStar
                                                            ? 'border-blue-200 bg-blue-50 shadow-sm'
                                                            : 'border-gray-200 bg-white hover:border-blue-100 hover:bg-blue-50/50'
                                                    }`}
                                                >
                                                    <div className="flex justify-center">
                                                        <StarIcon full={full} half={half} />
                                                    </div>
                                                    <p className={`mt-2 text-center text-xs font-semibold ${isSameStar || isHalfStar ? 'text-blue-700' : 'text-gray-500'}`}>
                                                        {starValue} star
                                                    </p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {errors.vleresimi && <p className="mt-3 text-sm font-medium text-red-500">{errors.vleresimi}</p>}
                                </div>

                                <BookPicker
                                    books={books}
                                    value={data.book_id}
                                    onChange={(value) => setData('book_id', value)}
                                    error={errors.book_id}
                                />

                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <label className="block text-sm font-semibold text-gray-900">Review</label>
                                        <span className="text-xs font-medium text-gray-400">{commentLength}/2000</span>
                                    </div>
                                    <textarea
                                        value={data.komenti}
                                        onChange={(e) => setData('komenti', e.target.value)}
                                        rows="7"
                                        maxLength="2000"
                                        placeholder="Write about the book's story, characters, pacing, or what you enjoyed most..."
                                        className="w-full rounded-[24px] border border-gray-200 bg-white px-4 py-4 text-sm text-gray-700 shadow-sm transition focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                                    />
                                    {errors.komenti && <p className="mt-2 text-sm font-medium text-red-500">{errors.komenti}</p>}
                                </div>

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
