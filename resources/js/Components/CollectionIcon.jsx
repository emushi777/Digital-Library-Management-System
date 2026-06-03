export const COLLECTION_ICON_OPTIONS = [
    { value: 'bookmark', label: 'Bookmark' },
    { value: 'key', label: 'Key' },
    { value: 'books', label: 'Books' },
    { value: 'gift', label: 'Gift' },
    { value: 'document', label: 'Document' },
    { value: 'card', label: 'Card' },
    { value: 'utensils', label: 'Food' },
    { value: 'pills', label: 'Health' },
    { value: 'stethoscope', label: 'Care' },
    { value: 'home', label: 'Home' },
    { value: 'building', label: 'Building' },
    { value: 'bank', label: 'Bank' },
    { value: 'monitor', label: 'Screen' },
    { value: 'headphones', label: 'Audio' },
    { value: 'leaf', label: 'Nature' },
    { value: 'person', label: 'Person' },
    { value: 'paw', label: 'Pets' },
    { value: 'cart', label: 'Cart' },
    { value: 'briefcase', label: 'Work' },
    { value: 'package', label: 'Box' },
    { value: 'train', label: 'Travel' },
    { value: 'snowflake', label: 'Winter' },
    { value: 'flame', label: 'Fire' },
    { value: 'toolbox', label: 'Tools' },
    { value: 'scissors', label: 'Scissors' },
    { value: 'code', label: 'Code' },
    { value: 'bulb', label: 'Idea' },
    { value: 'chat', label: 'Chat' },
    { value: 'asterisk', label: 'Asterisk' },
    { value: 'square', label: 'Square' },
    { value: 'circle', label: 'Circle' },
    { value: 'triangle', label: 'Triangle' },
    { value: 'diamond', label: 'Diamond' },
    { value: 'star', label: 'Star' },
    { value: 'group', label: 'Group' },
    { value: 'music', label: 'Music' },
    { value: 'palette', label: 'Art' },
    { value: 'sunrise', label: 'Sunrise' },
    { value: 'globe', label: 'World' },
    { value: 'pencil', label: 'Writing' },
    { value: 'bike', label: 'Bike' },
    { value: 'heart', label: 'Heart' },
    { value: 'library', label: 'Library' },
    { value: 'sparkles', label: 'Sparkles' },
    { value: 'target', label: 'Target' },
];

function iconPaths(icon) {
    switch (icon) {
        case 'key':
            return <><circle cx="7" cy="14" r="3" /><path d="M10 14h10l-2 2 2 2" /></>;
        case 'books':
            return <><path d="M4 19V5h4v14" /><path d="M10 19V5h4v14" /><path d="M16 19V7l4 1v11" /></>;
        case 'gift':
            return <><path d="M4 12h16v8H4z" /><path d="M12 8v12" /><path d="M4 12V8h16v4" /><path d="M8 8a2 2 0 1 1 4 0" /><path d="M16 8a2 2 0 1 0-4 0" /></>;
        case 'document':
            return <><path d="M6 3h8l5 5v13H6z" /><path d="M14 3v6h5" /></>;
        case 'card':
            return <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" /></>;
        case 'utensils':
            return <><path d="M7 3v8" /><path d="M5 3v8" /><path d="M9 3v8" /><path d="M5 11h4" /><path d="M7 11v10" /><path d="M16 3v18" /><path d="M16 3c3 2 4 5 2 8h-2" /></>;
        case 'pills':
            return <><path d="M10 21l9-9a4 4 0 0 0-6-6l-9 9a4 4 0 0 0 6 6z" /><path d="M8 13l6 6" /><circle cx="6.5" cy="7.5" r="2.5" /><path d="M4.7 5.7l3.6 3.6" /></>;
        case 'stethoscope':
            return <><path d="M6 4v5a4 4 0 0 0 8 0V4" /><path d="M10 13v3a4 4 0 0 0 8 0v-2" /><circle cx="19" cy="12" r="2" /></>;
        case 'home':
            return <><path d="M3 11l9-8 9 8" /><path d="M5 10v11h14V10" /><path d="M9 21v-6h6v6" /></>;
        case 'building':
            return <><path d="M5 21V4h14v17" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" /><path d="M3 21h18" /></>;
        case 'bank':
            return <><path d="M3 9l9-5 9 5" /><path d="M5 10h14" /><path d="M7 10v8M12 10v8M17 10v8" /><path d="M4 18h16M3 21h18" /></>;
        case 'monitor':
            return <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></>;
        case 'headphones':
            return <><path d="M4 14a8 8 0 0 1 16 0" /><path d="M4 14v4a2 2 0 0 0 2 2h2v-7H6a2 2 0 0 0-2 2z" /><path d="M20 14v4a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 2z" /></>;
        case 'leaf':
            return <><path d="M20 4c-9 0-14 5-14 14" /><path d="M20 4c0 9-5 14-14 14" /><path d="M6 18c4-1 7-4 9-8" /></>;
        case 'person':
            return <><circle cx="12" cy="7" r="3" /><path d="M8 21v-5a4 4 0 0 1 8 0v5" /><path d="M10 14h4" /></>;
        case 'paw':
            return <><circle cx="7" cy="9" r="2" /><circle cx="12" cy="7" r="2" /><circle cx="17" cy="9" r="2" /><path d="M7.5 17a4.5 4.5 0 0 1 9 0 3 3 0 0 1-4.5 2.6A3 3 0 0 1 7.5 17z" /></>;
        case 'cart':
            return <><path d="M4 4h2l2 12h11l2-8H7" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>;
        case 'briefcase':
            return <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></>;
        case 'package':
            return <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 8v9l9 5 9-5V8" /><path d="M12 13v9" /></>;
        case 'train':
            return <><rect x="6" y="3" width="12" height="14" rx="2" /><path d="M8 7h8M8 11h8" /><circle cx="9" cy="15" r="1" /><circle cx="15" cy="15" r="1" /><path d="M9 21l3-4 3 4" /></>;
        case 'snowflake':
            return <><path d="M12 2v20M4 6l16 12M20 6L4 18" /><path d="M8 4l4 4 4-4M8 20l4-4 4 4" /></>;
        case 'flame':
            return <><path d="M12 22c4-2 6-5 5-9-1-3-4-5-4-9-4 3-7 7-6 12a5 5 0 0 0 5 6z" /><path d="M12 22c2-2 3-4 2-6-1 1-3 2-3 5" /></>;
        case 'toolbox':
            return <><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M8 8V5h8v3" /><path d="M3 13h18" /><path d="M12 12v3" /></>;
        case 'scissors':
            return <><circle cx="6" cy="7" r="3" /><circle cx="6" cy="17" r="3" /><path d="M8.5 8.5L20 20" /><path d="M8.5 15.5L20 4" /></>;
        case 'code':
            return <><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M14 4l-4 16" /></>;
        case 'bulb':
            return <><path d="M9 18h6" /><path d="M10 22h4" /><path d="M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 4H9c0-2 0-3-1-4z" /></>;
        case 'chat':
            return <><path d="M4 5h16v11H8l-4 4V5z" /><path d="M8 9h8M8 13h5" /></>;
        case 'asterisk':
            return <><path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" /></>;
        case 'square':
            return <rect x="6" y="6" width="12" height="12" rx="2" />;
        case 'circle':
            return <circle cx="12" cy="12" r="7" />;
        case 'triangle':
            return <path d="M12 4l9 16H3L12 4z" />;
        case 'diamond':
            return <path d="M12 3l9 9-9 9-9-9 9-9z" />;
        case 'star':
            return <path d="m12 2 3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.77l-6.18 3.24L7 14.13 2 9.26l6.91-1L12 2z" />;
        case 'group':
            return <><circle cx="12" cy="8" r="3" /><path d="M6 21a6 6 0 0 1 12 0" /><circle cx="5" cy="10" r="2" /><circle cx="19" cy="10" r="2" /><path d="M2 21a5 5 0 0 1 5-5M17 16a5 5 0 0 1 5 5" /></>;
        case 'music':
            return <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>;
        case 'palette':
            return <><path d="M12 3a9 9 0 0 0 0 18h2a2 2 0 0 0 1-3.7 1.7 1.7 0 0 1 1-3.3h1a5 5 0 0 0 0-10c-1.4-.7-3.1-1-5-1z" /><circle cx="7.5" cy="10" r="1" /><circle cx="10" cy="7.5" r="1" /><circle cx="14" cy="7.5" r="1" /></>;
        case 'sunrise':
            return <><path d="M3 18h18" /><path d="M5 14a7 7 0 0 1 14 0" /><path d="M12 3v4M4 8l3 3M20 8l-3 3" /></>;
        case 'globe':
            return <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18" /><path d="M12 3a14 14 0 0 0 0 18" /></>;
        case 'pencil':
            return <><path d="M4 20l4-1 12-12-3-3L5 16l-1 4z" /><path d="M14 6l3 3" /></>;
        case 'bike':
            return <><circle cx="6" cy="17" r="4" /><circle cx="18" cy="17" r="4" /><path d="M8 17l4-8 4 8M12 9h3M10 6h3" /></>;
        case 'heart':
            return <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />;
        case 'sparkles':
            return <><path d="M13 2l1.8 5.2L20 9l-5.2 1.8L13 16l-1.8-5.2L6 9l5.2-1.8L13 2z" /><path d="M6 14l.9 2.6L10 18l-3.1 1.4L6 22l-.9-2.6L2 18l3.1-1.4L6 14z" /></>;
        case 'target':
            return <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>;
        case 'library':
            return <><path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></>;
        case 'bookmark':
        default:
            return <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />;
    }
}

export default function CollectionIcon({ icon = 'bookmark', className = 'h-6 w-6' }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            {iconPaths(icon)}
        </svg>
    );
}
