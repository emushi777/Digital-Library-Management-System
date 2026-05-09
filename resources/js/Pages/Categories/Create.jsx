import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

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
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Category</h2>}>
            <Head title="Add New Category" />
            <div className="py-12">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Category Name</label>
                            <input 
                                type="text" 
                                value={data.emri} 
                                onChange={e => setData('emri', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                                placeholder="e.g. Science Fiction"
                            />
                            {errors.emri && <p className="text-red-500 text-xs mt-1">{errors.emri}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Description</label>
                            <textarea 
                                value={data.pershkrimi} 
                                onChange={e => setData('pershkrimi', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                                rows="4"
                            ></textarea>
                            {errors.pershkrimi && <p className="text-red-500 text-xs mt-1">{errors.pershkrimi}</p>}
                        </div>

                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                            <button type="submit" disabled={processing} className="px-10 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg transition">
                                {processing ? 'Saving...' : 'Save Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}