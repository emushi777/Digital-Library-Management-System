import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ReviewForm from './ReviewForm';

export default function Edit({ auth, review, books, returnToBook = false }) {
    const { data, setData, put, processing, errors } = useForm({
        book_id: review.book_id || '',
        vleresimi: review.vleresimi || '5',
        komenti: review.komenti || '',
        return_to_book: returnToBook ? 1 : 0,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('reviews.update', review.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Review" />

            <ReviewForm
                title="Update your review"
                description="Fine-tune your score and written feedback without changing the rest of the reviews flow."
                submitLabel="Update review"
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
