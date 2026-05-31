import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    // Këtu u ndryshua në 'enertimi' që të përputhet me PHP-në tënde
    const { data, setData, post, processing, errors } = useForm({
        enertimi: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('collections.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Krijo Koleksion të Ri</h2>}
        >
            <Head title="Krijo Koleksion" />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Emërto Koleksionin Tënd</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="enertimi" className="block text-sm font-medium text-gray-700 mb-1">
                                    Emri i Koleksionit
                                </label>
                                <input
                                    type="text"
                                    id="enertimi"
                                    value={data.enertimi}
                                    onChange={(e) => setData('enertimi', e.target.value)}
                                    placeholder="p.sh. Romancë, Thriller, Want to Read"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                                    required
                                />
                                
                                {errors.enertimi && (
                                    <p className="text-red-500 text-xs mt-1">{errors.enertimi}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                >
                                    Anulo
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition shadow-sm"
                                >
                                    {processing ? 'Duke u ruajtur...' : 'Krijo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
