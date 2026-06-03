import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ReviewForm from './ReviewForm';

export default function Create({ auth, books, selectedBookId }) {
    const initialReviewData = {
        book_id: selectedBookId || '',
        vleresimi: '5',
        komenti: '',
    };
    const { data, setData, post, processing, errors } = useForm(initialReviewData);

    const submit = (e) => {
        e.preventDefault();
        post(route('reviews.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Review" />

            <ReviewForm
                title="Rate a book"
                description="Share a thoughtful review to help other readers discover what is worth reading next."
                submitLabel="Save review"
                processing={processing}
                data={data}
                setData={setData}
                errors={errors}
                books={books}
                onSubmit={submit}
                initialData={initialReviewData}
            />
        </AuthenticatedLayout>
    );
}
