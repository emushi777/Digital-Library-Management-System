import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import useUnsavedChangesModal from '@/Hooks/useUnsavedChangesModal';

export default function Edit({ auth, faq }) {
    const initialFaqData = {
        pyetja: faq.pyetja || '',
        pergjigjja: faq.pergjigjja || '',
        kategoria: faq.kategoria || '',
        statusi: faq.statusi || 'active',
        renditja: faq.renditja ?? '',
    };
    const { data, setData, put, processing, errors } = useForm(initialFaqData);
    const { confirmDiscard, modal: unsavedChangesModal } = useUnsavedChangesModal(initialFaqData, data);

    const submit = (e) => {
        e.preventDefault();
        put(route('faqs.update', faq.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit FAQ" />
            {unsavedChangesModal}

            <div className="py-12">
                <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Question</label>
                            <input
                                type="text"
                                value={data.pyetja}
                                onChange={(e) => setData('pyetja', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                            />
                            {errors.pyetja && <p className="mt-1 text-xs text-red-500">{errors.pyetja}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Answer</label>
                            <textarea
                                value={data.pergjigjja}
                                onChange={(e) => setData('pergjigjja', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                                rows="6"
                            />
                            {errors.pergjigjja && <p className="mt-1 text-xs text-red-500">{errors.pergjigjja}</p>}
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Category</label>
                                <input
                                    type="text"
                                    value={data.kategoria}
                                    onChange={(e) => setData('kategoria', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Status</label>
                                <select
                                    value={data.statusi}
                                    onChange={(e) => setData('statusi', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                {errors.statusi && <p className="mt-1 text-xs text-red-500">{errors.statusi}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Order</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.renditja}
                                    onChange={(e) => setData('renditja', e.target.value === '' ? '' : Number(e.target.value))}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                                />
                                {errors.renditja && <p className="mt-1 text-xs text-red-500">{errors.renditja}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-6">
                            <button
                                type="button"
                                onClick={() => confirmDiscard(() => router.visit(route('faqs.index')))}
                                className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-blue-600 px-6 py-2.5 font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update FAQ'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
