import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import useConfirmModal from '@/Hooks/useConfirmModal';

export default function Index({ auth, requests }) {
    const { confirm, modal } = useConfirmModal();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Book Requests</h2>}
        >
            <Head title="Book Requests" />
            {modal}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-4">List of Requested Books</h3>
                            
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested At</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {requests.map((request) => (
                                        <tr key={request.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{request.titulli_librit}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{request.emri_autorit}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    request.statusi === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {request.statusi || 'pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(request.created_at).toLocaleDateString()}
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                                                {request.statusi === 'pending' && (
                                                    <>
                                                        <button 
                                                            onClick={() => router.patch(route('book-requests.update', request.id))}
                                                            className="text-green-600 hover:text-green-800 transition p-1"
                                                            title="Mark as complete"
                                                        >
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                        </button>

                                                        <button 
                                                            onClick={() => {
                                                                confirm({
                                                                    title: 'Delete this request?',
                                                                    message: 'This book request will be permanently removed.',
                                                                    confirmLabel: 'Delete request',
                                                                    onConfirm: () => router.delete(route('book-requests.destroy', request.id)),
                                                                });
                                                            }}
                                                            className="text-red-600 hover:text-red-800 transition p-1"
                                                            title="Delete request"
                                                        >
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                            </svg>
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
