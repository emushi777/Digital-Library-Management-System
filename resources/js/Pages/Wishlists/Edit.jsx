import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import WishlistForm from './WishlistForm';

export default function Edit({ auth, wishlist, books }) {
    const { data, setData, put, processing, errors } = useForm({
        book_id: wishlist.book_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('wishlists.update', wishlist.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Wishlist Item" />

            <WishlistForm
                title="Update your wishlist"
                description="Keep one selected book locked in place until you click it again and choose another one."
                submitLabel="Update wishlist item"
                processing={processing}
                data={data}
                setData={setData}
                errors={errors}
                books={books}
                onSubmit={submit}
            />
        </AuthenticatedLayout>
    );
}
