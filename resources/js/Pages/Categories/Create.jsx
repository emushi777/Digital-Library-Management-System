import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        emri: '',
        pershkrimi: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('categories.store'));
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Category</h2>}
        >
            <Head title="Add New Category" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <form onSubmit={submit} className="space-y-6">
                        
                        {/* Emri */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Category Name</label>
                            <input 
                                type="text" 
                                value={data.emri} 
                                onChange={e => setData('emri', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="e.g. Science Fiction"
                            />
                            {errors.emri && <p className="text-red-500 text-xs mt-1">{errors.emri}</p>}
                        </div>

                        {/* Pershkrimi */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Description</label>
                            <textarea 
                                value={data.pershkrimi} 
                                onChange={e => setData('pershkrimi', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                                rows="4"
                            ></textarea>
                            {errors.pershkrimi && <p className="text-red-500 text-xs mt-1">{errors.pershkrimi}</p>}
                        </div>

                        {/* Butonat */}
                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                            <Link 
                                href={route('categories.index')} 
                                className="text-gray-600 hover:text-gray-900 font-medium text-sm transition"
                            >
                                Cancel
                            </Link>
                            
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}