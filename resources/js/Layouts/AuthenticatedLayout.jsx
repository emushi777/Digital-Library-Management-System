import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import SearchDropdown from '@/Components/SearchDropdown';
import { Link, usePage } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const { allBooks = [] } = usePage().props;

    return (
        <div className="min-h-screen bg-[#F8F9FB]">
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-black italic tracking-tighter text-gray-900 flex items-center">
                                Bookly<span className="text-blue-600">.</span>
                            </Link>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-12 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Home
                                </NavLink>

                                <NavLink href={route('books.index')} active={route().current('books.*')}>
                                    Books
                                </NavLink>

                                <NavLink href={route('authors.index')} active={route().current('authors.*')}>
                                    Authors
                                </NavLink>

                                <NavLink href={route('categories.index')} active={route().current('categories.*')}>
                                    Categories
                                </NavLink>

                                <NavLink href={route('bookmarks.index')} active={route().current('bookmarks.*')}>
                                    Bookmarks
                                </NavLink>

                                <NavLink href={route('reviews.index')} active={route().current('reviews.*')}>
                                    Reviews
                                </NavLink>

                                <NavLink href={route('collections.index')} active={route().current('collections.*')}>
                                    Collection
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6 gap-6">
                            <Link
                                href={route('wishlists.index')}
                                className="text-gray-400 hover:text-red-500 transition relative p-2"
                                title="Wishlist"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                                    />
                                </svg>
                            </Link>

                            <SearchDropdown
                                items={allBooks}
                                placeholder="Search..."
                                inputClassName="border-none bg-gray-100 rounded-full pl-10 pr-4 py-1 text-sm focus:ring-1 focus:ring-black w-40 lg:w-60"
                            />

                            <div className="ms-3 relative border-l pl-6 border-gray-100">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="inline-flex items-center gap-3 focus:outline-none group">
                                            <div className="text-right hidden lg:block">
                                                <p className="text-xs font-black text-gray-900 leading-none group-hover:text-blue-600 transition">
                                                    {user.name}
                                                </p>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                                                    Reader
                                                </p>
                                            </div>

                                            <div className="h-10 w-10 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center group-hover:border-blue-100 transition">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
                                                    alt={user.name}
                                                />
                                            </div>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {user.email === 'admin@gmail.com' && (
                                            <>
                                                <Dropdown.Link href={route('admin.feedback')} className="text-blue-600 font-bold">
                                                    View Feedback
                                                </Dropdown.Link>

                                                <Dropdown.Link href={route('faqs.index')} className="text-blue-600 font-bold">
                                                    Manage FAQ
                                                </Dropdown.Link>
                                            </>
                                        )}

                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile Settings
                                        </Dropdown.Link>

                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-white border-t border-gray-100'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Home
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('books.index')} active={route().current('books.*')}>
                            Books
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('authors.index')} active={route().current('authors.*')}>
                            Authors
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('categories.index')} active={route().current('categories.*')}>
                            Categories
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('bookmarks.index')} active={route().current('bookmarks.*')}>
                            Bookmarks
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('reviews.index')} active={route().current('reviews.*')}>
                            Reviews
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('collections.index')} active={route().current('collections.*')}>
                            Collection
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
        
    );
    
}
