import React, { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

export default function SearchDropdown({ items = [], inputClassName, placeholder }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const getBookTitle = (item) => {
        return item.title || item.titulli || '';
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const searchValue = value.toLowerCase().trim();

        if (searchValue.length > 0) {
            const results = items.filter((item) => {
                const title = getBookTitle(item).toLowerCase();
                return title.includes(searchValue);
            });

            setFilteredItems(results);
            setShowDropdown(results.length > 0);
        } else {
            setFilteredItems([]);
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex items-center" ref={dropdownRef}>
            <div className="absolute left-3 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => {
                    if (searchTerm.length > 0 && filteredItems.length > 0) {
                        setShowDropdown(true);
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && filteredItems.length > 0) {
                        router.get(route('books.show', filteredItems[0].id));
                    }
                }}
                placeholder={placeholder}
                className={inputClassName}
            />

            {showDropdown && filteredItems.length > 0 && (
                <ul className="absolute top-full left-0 z-[100] w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1">
                    {filteredItems.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                            onClick={() => {
                                setShowDropdown(false);
                                setSearchTerm("");
                                router.get(route('books.show', item.id));
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332-.477-4.5-1.253" />
                            </svg>

                            <span className="text-xs text-gray-700 truncate">
                                {item.title || item.titulli}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}