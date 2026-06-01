import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(user.profile_photo_path || null);

    const { data, setData, patch, reset, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        photo: null,
    });
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    useEffect(() => {
        return () => {
            if (photoPreview && photoPreview.startsWith && photoPreview.startsWith('blob:')) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];

        setData('photo', file);

        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleCancel = () => setShowCancelConfirm(true);

    const confirmCancel = () => {
        reset();
        setPhotoPreview(user.profile_photo_path || null);
        setShowCancelConfirm(false);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="photo" value="Profile photo" />
                    <div className="mt-3 flex items-center gap-4">
                        <div className="h-20 w-20 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                            {photoPreview ? (
                                <img src={photoPreview} alt="Profile preview" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-2xl font-black text-slate-500">
                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>
                        <label className="inline-flex cursor-pointer items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                            Select photo
                            <input
                                id="photo"
                                name="photo"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handlePhotoChange}
                            />
                        </label>
                    </div>
                    <InputError className="mt-2" message={errors.photo} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full text-sm"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <SecondaryButton type="button" onClick={handleCancel}>Cancel</SecondaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
            <Modal show={showCancelConfirm} onClose={() => setShowCancelConfirm(false)} maxWidth="sm">
                <div className="p-6">
                    <h3 className="text-lg font-semibold">Discard changes?</h3>
                    <p className="mt-2 text-sm text-gray-600">Are you sure you don't want to save these changes?</p>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setShowCancelConfirm(false)}
                            className="rounded-2xl border px-4 py-2 text-sm font-semibold"
                        >
                            Keep editing
                        </button>
                        <button
                            type="button"
                            onClick={confirmCancel}
                            className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                        >
                            Discard
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
