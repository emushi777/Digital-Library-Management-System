import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import useUnsavedChangesModal from '@/Hooks/useUnsavedChangesModal';

const initialBookRequestData = {
    titulli_librit: '',
    autori: '',
};

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm(initialBookRequestData);
    const { confirmDiscard, modal: unsavedChangesModal } = useUnsavedChangesModal(initialBookRequestData, data);

    const submit = (e) => {
        e.preventDefault();
        post(route('book-requests.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Request a New Book</h2>}
        >
            <Head title="Request a Book" />
            {unsavedChangesModal}

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="titulli_librit" value="Book Title" />
                                <TextInput
                                    id="titulli_librit"
                                    type="text"
                                    value={data.titulli_librit}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('titulli_librit', e.target.value)}
                                    required
                                />
                                <InputError message={errors.titulli_librit} className="mt-2" />
                            </div>

                            <div className="mb-6">
                                <InputLabel htmlFor="autori" value="Author" />
                                <TextInput
                                    id="autori"
                                    type="text"
                                    value={data.autori}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('autori', e.target.value)}
                                    required
                                />
                                <InputError message={errors.autori} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    onClick={() => confirmDiscard(() => router.visit(route('books.index')))}
                                    className="text-gray-600 hover:text-gray-900 mr-4"
                                >
                                    Cancel
                                </button>

                                <PrimaryButton className="ml-4" disabled={processing}>
                                    {processing ? 'Sending...' : 'Submit Request'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
