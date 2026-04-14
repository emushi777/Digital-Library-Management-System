import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ auth, plans }) {
    const { post } = useForm();

    const handleSubscribe = (planId) => {
        post(route('subscribe.store'), {
            plan_id: planId,
        }, {
            onSuccess: () => {
                alert('Success! Check your database.');
            },
            onFinish: () => {
                console.log('Request finished');
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="text-gray-900 mb-6">You're logged in!</div>
                        
                        <h3 className="text-lg font-bold mb-6">Choose Your Reading Plan</h3>
                        
                        {/* Grid starts here */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {plans && plans.length > 0 ? (
                                plans.map((plan) => (
                                    <div key={plan.id} className="border rounded-lg p-6 shadow-sm bg-gray-50 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-xl font-bold text-blue-700">{plan.emertimi}</h4>
                                            <p className="text-gray-600 my-3">{plan.pershkrimi}</p>
                                            <div className="text-3xl font-black my-4">{plan.cmimi_mujor}€</div>
                                            <ul className="text-sm text-gray-500 mb-6 italic">
                                                <li>• Monthly limit: {plan.librat_max_mujor} books</li>
                                                <li>• Full access to digital library</li>
                                            </ul>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleSubscribe(plan.id)}
                                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition"
                                        >
                                            Subscribe Now
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-red-500">No plans found in database. Please run your seeder.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}