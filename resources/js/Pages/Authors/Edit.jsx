import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, author }) {
    const { data, setData, post, errors, processing } = useForm({
        first_name: author.first_name || '',
        last_name: author.last_name || '',
        country: author.country || '', 
        bio: author.bio || '',
        photo: null,
        _method: 'PUT',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('authors.update', author.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">Edit Author Profile</h2>}
        >
            <Head title={`Edit ${data.first_name}`} />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100 p-8">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700">First Name</label>
                                    <input 
                                        type="text" 
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
                                    />
                                    {errors.first_name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.first_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700">Last Name</label>
                                    <input 
                                        type="text" 
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
                                    />
                                    {errors.last_name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.last_name}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700">Country</label>
                                <input 
                                    type="text" 
                                    value={data.country}
                                    onChange={e => setData('country', e.target.value)}
                                    className="mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
                                />
                                {errors.country && <p className="text-red-500 text-xs mt-1 font-medium">{errors.country}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700">Biography</label>
                                <textarea 
                                    value={data.bio}
                                    onChange={e => setData('bio', e.target.value)}
                                    rows="4"
                                    className="mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
                                ></textarea>
                                {errors.bio && <p className="text-red-500 text-xs mt-1 font-medium">{errors.bio}</p>}
                            </div>

                            <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-inner">
                                <label className="block text-sm font-bold text-indigo-900 mb-2">Update Photo</label>
                                <input 
                                    type="file" 
                                    onChange={e => setData('photo', e.target.files[0])}
                                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                                />
                                {errors.photo && <p className="text-red-500 text-xs mt-1 font-medium">{errors.photo}</p>}
                            </div>

                            <div className="flex justify-end items-center gap-4 pt-4">
                                <Link 
                                    href={route('authors.index')} 
                                    className="text-sm font-bold text-gray-400 hover:text-gray-600 transition"
                                >
                                    Cancel
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-12 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition active:scale-95 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Update Author'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}