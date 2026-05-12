import { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { books = [] } = usePage().props;
    
    // Logjika e kërkimit
    const { data, setData, get } = useForm({
        search: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('dashboard'), {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div className="min-h-screen bg-[#F8F9FB]">
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-black italic tracking-tighter text-gray-900 flex items-center">
                                BooksHub<span className="text-blue-600">.</span>
                            </Link>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-12 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Home
                                </NavLink>
                                
                                <NavLink 
                                    href={route('books.index')} 
                                    active={route().current('books.*')}
                                >
                                    Books
                                </NavLink>

                                <NavLink 
                                    href={route('authors.index')} 
                                    active={route().current('authors.*')}
                                >
                                    Authors
                                </NavLink>

                                <NavLink 
                                    href={route('categories.index')} 
                                    active={route().current('categories.*')}
                                >
                                    Categories
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6 gap-6">
                            
                            {/* Search Form me Magnifier */}
                            <form onSubmit={handleSearch} className="relative flex items-center">
                                <input 
                                    type="text"
                                    value={data.search}
                                    onChange={e => setData('search', e.target.value)}
                                    placeholder="Search..."
                                    className="border-none bg-gray-100 rounded-full pl-10 pr-4 py-1 text-sm focus:ring-1 focus:ring-black w-40 lg:w-60"
                                />
                                <button type="submit" className="absolute left-3 text-gray-400 hover:text-gray-900 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </form>

                            <button className="text-gray-400 hover:text-gray-900 transition relative p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                                    0
                                </span>
                            </button>

                            <div className="ms-3 relative border-l pl-6 border-gray-100">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="inline-flex items-center gap-3 focus:outline-none group">
                                            <div className="text-right hidden lg:block">
                                                <p className="text-xs font-black text-gray-900 leading-none group-hover:text-blue-600 transition">{user.name}</p>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Reader</p>
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
                                        <Dropdown.Link href={route('profile.edit')}>Profile Settings</Dropdown.Link>
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
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                        <ResponsiveNavLink href={route('books.index')} active={route().current('books.index')}>
                            Books
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('authors.index')} active={route().current('authors.index')}>
                            Authors
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('categories.index')} active={route().current('categories.index')}>
                            Categories
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}