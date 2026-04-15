import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, plan }) {
    const { post, processing } = useForm({
        plan_id: plan.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('subscribe.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subscription</h2>}
        >
            <Head title="Checkout" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Order Summary */}
                        <div className="bg-white p-8 shadow-sm rounded-xl border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-700 mb-6">Order Summary</h3>
                            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                                <div>
                                    <p className="font-bold text-blue-900">{plan.emertimi}</p>
                                    <p className="text-sm text-blue-700">Monthly Plan</p>
                                </div>
                                <span className="text-xl font-black">{plan.cmimi_mujor}€</span>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between border-t pt-2 font-bold text-gray-800 text-lg">
                                    <span>Total Amount:</span>
                                    <span>{plan.cmimi_mujor}€</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-white p-8 shadow-sm rounded-xl border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-700 mb-6">Complete Your Subscription</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                                    <input type="text" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Card name" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                    <input type="text" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="0000 0000 0000 0000" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                                        <div className="flex gap-2">
                                            <select required className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500">
                                                <option value="" disabled selected>MM</option>
                                                {Array.from({ length: 12 }, (_, i) => (
                                                    <option key={i+1} value={String(i+1).padStart(2,'0')}>{String(i+1).padStart(2,'0')}</option>
                                                ))}
                                            </select>
                                            <select required className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500">
                                                <option value="" disabled selected>YY</option>
                                                {Array.from({ length: 10 }, (_, i) => {
                                                    const year = new Date().getFullYear() + i;
                                                    return <option key={year} value={String(year).slice(-2)}>{String(year).slice(-2)}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">CVC</label>
                                        <input type="text" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="123" />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition active:scale-95 disabled:opacity-50"
                                    >
                                        {processing ? 'Processing...' : 'Pay & Activate Plan'}
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