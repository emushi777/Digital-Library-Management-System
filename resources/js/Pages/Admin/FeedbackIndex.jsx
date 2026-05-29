import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function FeedbackIndex({ auth, feedbacks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Feedback</h2>}
        >
            <Head title="Feedback Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-6">Recent Feedbacks</h3>
                            
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        <th className="p-4">ID</th>
                                        <th className="p-4">User</th>
                                        <th className="p-4">Message</th>
                                        <th className="p-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedbacks.length > 0 ? (
                                        feedbacks.map((fb) => (
                                            <tr key={fb.id} className="border-b hover:bg-gray-50">
                                                <td className="p-4">{fb.id}</td>
                                                <td className="p-4">{fb.user ? fb.user.name : 'Guest'}</td>
                                                <td className="p-4">{fb.message}</td>
                                                <td className="p-4 text-sm text-gray-500">
                                                    {new Date(fb.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-gray-500">
                                                No feedback received yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}