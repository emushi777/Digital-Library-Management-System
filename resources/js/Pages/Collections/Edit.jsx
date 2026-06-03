import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CollectionIcon, { COLLECTION_ICON_OPTIONS } from '@/Components/CollectionIcon';
import { Head, useForm, Link, router } from '@inertiajs/react';
import useConfirmModal from '@/Hooks/useConfirmModal';
import useUnsavedChangesModal from '@/Hooks/useUnsavedChangesModal';

export default function Edit({ auth, collection }) {
    const { confirm, modal } = useConfirmModal();
    const initialCollectionData = {
        emertimi: collection.emertimi || '',
        pershkrimi: collection.pershkrimi || '',
        icon: collection.icon || 'library',
    };
    const { data, setData, patch, processing, errors } = useForm(initialCollectionData);
    const { confirmDiscard, modal: unsavedChangesModal } = useUnsavedChangesModal(initialCollectionData, data);

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('collections.update', collection.id));
    };

    const handleCancel = () => confirmDiscard(() => router.visit(route('collections.index')));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center w-full">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Collection: <span className="text-blue-600">{collection.emertimi}</span>
                    </h2>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                    >
                        ← Cancel
                    </button>
                </div>
            }
        >
            <Head title={`Edit - ${collection.emertimi}`} />
            {modal}
            {unsavedChangesModal}

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm border border-gray-200 sm:rounded-xl p-6 md:p-8">
                        
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Collection Details</h3>
                            <p className="text-gray-500 text-xs mt-0.5">Update the title or description of this collection.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Collection Name
                                </label>
                                <input
                                    type="text"
                                    value={data.emertimi}
                                    onChange={(e) => setData('emertimi', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition shadow-sm"
                                    placeholder="e.g., My Favorite Thrillers"
                                    required
                                />
                                {errors.emertimi && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">{errors.emertimi}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={data.pershkrimi}
                                    onChange={(e) => setData('pershkrimi', e.target.value)}
                                    rows="4"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition shadow-sm resize-none"
                                    placeholder="Add a brief description about this curated list..."
                                />
                                {errors.pershkrimi && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">{errors.pershkrimi}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Collection Icon
                                </label>
                                <div className="grid grid-cols-6 sm:grid-cols-9 gap-4">
                                    {COLLECTION_ICON_OPTIONS.map((option) => {
                                        const isSelected = data.icon === option.value;

                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                title={option.label}
                                                aria-label={option.label}
                                                onClick={() => setData('icon', option.value)}
                                                className={`relative flex h-12 w-12 items-center justify-center rounded-full transition ${
                                                    isSelected
                                                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                                                }`}
                                            >
                                                <CollectionIcon icon={option.value} className="h-6 w-6" />
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.icon && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">{errors.icon}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition shadow-sm"
                                >
                                    {processing ? 'Saving Changes...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>

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
                                <li><Link href={route('profile.edit') + '#plans'} className="hover:text-white transition">Plans</Link></li>
                                <li><Link 
                                        href={route('logout')} 
                                        method="post" 
                                        as="button" 
                                        className="hover:text-white transition"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            confirm({
                                                title: 'Log out?',
                                                message: 'You will need to sign in again to continue using your account.',
                                                confirmLabel: 'Log out',
                                                onConfirm: () => router.post(route('logout')),
                                            });
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
