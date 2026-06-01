import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, collection }) {
    const { data, setData, patch, processing, errors } = useForm({
        emertimi: collection.emertimi || '',
        pershkrimi: collection.pershkrimi || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('collections.update', collection.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center w-full">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Collection: <span className="text-blue-600">{collection.emertimi}</span>
                    </h2>
                    <Link
                        href={route('collections.index')}
                        className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                    >
                        ← Cancel
                    </Link>
                </div>
            }
        >
            <Head title={`Edit - ${collection.emertimi}`} />

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

                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={route('collections.index')}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition"
                                >
                                    Cancel
                                </Link>
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
        </AuthenticatedLayout>
    );
}
