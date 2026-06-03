import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import WishlistForm from './WishlistForm';

export default function Create({ auth, books, selectedBookId }) {
    const initialWishlistData = {
        book_id: selectedBookId || '',
    };
    const { data, setData, post, processing, errors } = useForm(initialWishlistData);

    const submit = (e) => {
        e.preventDefault();
        post(route('wishlists.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Wishlist Item" />

            <WishlistForm
                title="Add to your wishlist"
                description="Search for a title, pin it in place, and save it for the next time you want something new to read."
                submitLabel="Save wishlist item"
                processing={processing}
                data={data}
                setData={setData}
                errors={errors}
                books={books}
                onSubmit={submit}
                initialData={initialWishlistData}
            />
        </AuthenticatedLayout>
    );
}
