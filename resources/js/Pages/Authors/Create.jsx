import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    // NDRYSHIMI: 'shteti' u bë 'vendi' që të përputhet me Database dhe Controller
    const { data, setData, post, errors, processing } = useForm({
        emri: '',
        mbiemri: '',
        vendi: '', 
        biografia: '',
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('authors.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Author</h2>}
        >
            <Head title="Add Author" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100">
                        
                        <div className="p-6 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800">Author Details</h3>
                            <p className="text-sm text-gray-500">Fill in the information to register a new author.</p>
                        </div>

                        <div className="p-8">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                        <input 
                                            type="text" 
                                            value={data.emri}
                                            onChange={e => setData('emri', e.target.value)}
                                            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                                            placeholder="Enter first name..."
                                        />
                                        {errors.emri && <div className="text-red-500 text-xs mt-1">{errors.emri}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                        <input 
                                            type="text" 
                                            value={data.mbiemri}
                                            onChange={e => setData('mbiemri', e.target.value)}
                                            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                                            placeholder="Enter last name..."
                                        />
                                        {errors.mbiemri && <div className="text-red-500 text-xs mt-1">{errors.mbiemri}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                                    <input 
                                        type="text" 
                                        value={data.vendi} // NDRYSHIMI: data.vendi
                                        onChange={e => setData('vendi', e.target.value)} // NDRYSHIMI: 'vendi'
                                        className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                                        placeholder="Origin country..."
                                    />
                                    {errors.vendi && <div className="text-red-500 text-xs mt-1">{errors.vendi}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Biography</label>
                                    <textarea 
                                        value={data.biografia}
                                        onChange={e => setData('biografia', e.target.value)}
                                        rows="4"
                                        className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                                        placeholder="Brief description about the author..."
                                    ></textarea>
                                    {errors.biografia && <div className="text-red-500 text-xs mt-1">{errors.biografia}</div>}
                                </div>

                                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                                    <label className="block text-sm font-bold text-indigo-900 mb-2">Author Photo</label>
                                    <input 
                                        type="file" 
                                        onChange={e => setData('photo', e.target.files[0])}
                                        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                                    />
                                    {errors.photo && <div className="text-red-500 text-xs mt-1">{errors.photo}</div>}
                                </div>

                                <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-100">
                                    <Link 
                                        href={route('authors.index')} 
                                        className="text-sm font-bold text-gray-500 hover:text-gray-800 transition"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Author'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}