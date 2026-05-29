import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const featuredBooks = [
        '/uploads/books/978-0141439747.jpg',
        '/uploads/books/978-0061120084.jpg',
        '/uploads/books/The Secret Garden.jpg',
        '/uploads/books/Moby-Dick.jpg',
    ];

    const fallbackCover = '/images/placeholder.png';

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-[#F8F9FB] text-gray-900">
                <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <Link href="/" className="flex items-center text-2xl font-black italic tracking-tighter text-gray-900">
                            Bookly<span className="text-blue-600">.</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-black px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-gray-800"
                                >
                                    Home
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-600 transition hover:border-black hover:text-black"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-black px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-gray-800"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <main>
                    <section className="relative overflow-hidden">
                        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr,1.05fr] lg:px-8 lg:py-16">
                            <div className="relative z-10 max-w-2xl">
                                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-500">Digital library</p>
                                <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                                    Read more.
                                    <br />
                                    Keep your place.
                                </h1>
                                <p className="mt-7 max-w-xl text-base leading-8 text-gray-500 sm:text-lg">
                                    Discover classic stories, new favorites, author collections, reviews, bookmarks, and reading plans in one quiet place built for readers.
                                </p>

                                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                    {auth?.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="inline-flex justify-center rounded-lg bg-black px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-gray-800"
                                        >
                                            Continue Reading
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('register')}
                                                className="inline-flex justify-center rounded-lg bg-black px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-gray-800"
                                            >
                                                Create Account
                                            </Link>
                                            <Link
                                                href={route('login')}
                                                className="inline-flex justify-center rounded-lg border border-gray-200 bg-white px-8 py-3 text-sm font-bold text-gray-700 transition hover:border-black hover:text-black"
                                            >
                                                Log In
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="relative min-h-[420px] lg:min-h-[560px]">
                                <div className="absolute inset-x-0 bottom-0 h-3/4 rounded-[40px] bg-[#EEEFF4]"></div>
                                <div className="relative mx-auto flex h-full max-w-xl items-end justify-center gap-4 pt-10">
                                    {featuredBooks.map((cover, index) => (
                                        <div
                                            key={cover}
                                            className={[
                                                'overflow-hidden rounded shadow-2xl ring-4 ring-white transition duration-300 hover:-translate-y-3',
                                                index === 0 ? 'mb-12 h-64 w-40 -rotate-12 sm:h-80 sm:w-52' : '',
                                                index === 1 ? 'z-20 mb-4 h-80 w-52 sm:h-[27rem] sm:w-72' : '',
                                                index === 2 ? 'mb-16 h-64 w-40 rotate-12 sm:h-80 sm:w-52' : '',
                                                index === 3 ? 'absolute right-3 top-10 hidden h-48 w-32 rotate-6 opacity-80 lg:block' : '',
                                            ].join(' ')}
                                        >
                                            <img
                                                src={cover}
                                                alt=""
                                                className="h-full w-full object-cover"
                                                onError={(event) => {
                                                    event.currentTarget.src = fallbackCover;
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="border-y border-gray-100 bg-white">
                        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
                            <div>
                                <p className="text-2xl font-black text-gray-900">Curated</p>
                                <p className="mt-1 text-sm text-gray-400">Books, authors, and categories</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-gray-900">Personal</p>
                                <p className="mt-1 text-sm text-gray-400">Bookmarks, reviews, and wishlists</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-gray-900">Flexible</p>
                                <p className="mt-1 text-sm text-gray-400">Basic and premium reading plans</p>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                        <div className="grid gap-6 md:grid-cols-3">
                            {[
                                ['Explore the library', 'Find books by category, author, and newest releases.'],
                                ['Build your shelf', 'Save bookmarks, wishlists, and reviews as you read.'],
                                ['Choose your pace', 'Start free with Basic or unlock unlimited reading with Premium.'],
                            ].map(([title, body]) => (
                                <div key={title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                                    <h2 className="text-lg font-black text-gray-900">{title}</h2>
                                    <p className="mt-3 text-sm leading-6 text-gray-500">{body}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
