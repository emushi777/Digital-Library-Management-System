import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import useUnsavedChangesModal from '@/Hooks/useUnsavedChangesModal';

export default function Edit({ auth, category }) {
    const initialCategoryData = {
        emri: category.emri || '',
        pershkrimi: category.pershkrimi || '',
    };
    const { data, setData, put, processing, errors } = useForm(initialCategoryData);
    const { confirmDiscard, modal: unsavedChangesModal } = useUnsavedChangesModal(initialCategoryData, data);

    const submit = (e) => {
        e.preventDefault();
        put(route('categories.update', category.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Category: {category.emri}</h2>}>
            <Head title="Edit Category" />
            {unsavedChangesModal}
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
                            <button
                                type="button"
                                onClick={() => confirmDiscard(() => router.visit(route('categories.index')))}
                                className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition flex items-center"
                            >
                                Cancel
                            </button>
                            <button type="submit" disabled={processing} className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition">
                                {processing ? 'Updating...' : 'Update Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
