import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ auth, plans }) {
    const { post, processing } = useForm();

    const handleSubscribe = (e, plan) => {
        // Kjo ndalon refresh-in e faqes
        e.preventDefault();

        if (parseFloat(plan.cmimi_mujor) === 0) {
            // Pakoja Free: Dërgohet direkt në Controller
            post(route('subscribe.store'), {
                plan_id: plan.id,
            });
        } else {
            // Pakoja Premium: Dërgohet në Checkout
            window.location.href = route('checkout.index', { plan_id: plan.id });
        }
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
                        <div className="text-gray-900 mb-6 font-medium">
                            Welcome back, {auth.user.name}! You're logged in.
                        </div>
                        
                        <h3 className="text-xl font-bold mb-8 text-center text-gray-800">
                            Choose Your Reading Plan
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {plans && plans.length > 0 ? (
                                plans.map((plan) => (
                                    <div key={plan.id} className="border-2 border-gray-100 rounded-xl p-8 shadow-sm bg-white flex flex-col justify-between hover:shadow-md transition">
                                        <div>
                                            <h4 className="text-2xl font-bold text-blue-800">{plan.emertimi}</h4>
                                            <p className="text-gray-600 my-4 leading-relaxed">
                                                {plan.pershkrimi}
                                            </p>
                                            
                                            <div className="text-4xl font-black my-6 text-gray-900">
                                                {parseFloat(plan.cmimi_mujor) === 0 ? (
                                                    <span className="text-green-600">Free</span>
                                                ) : (
                                                    <span>{plan.cmimi_mujor}€</span>
                                                )}
                                                {parseFloat(plan.cmimi_mujor) !== 0 && (
                                                    <span className="text-sm font-normal text-gray-500 ml-1">/month</span>
                                                )}
                                            </div>

                                            <ul className="space-y-3 text-sm text-gray-600 mb-8">
                                                <li className="flex items-center">
                                                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Monthly limit: {plan.librat_max_mujor} books
                                                </li>
                                                <li className="flex items-center">
                                                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Full access to digital library
                                                </li>
                                                
                                                {parseFloat(plan.cmimi_mujor) > 0 && (
                                                    <li className="flex items-center text-gray-500 pt-2 border-t border-gray-100 mt-2">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Cancel any time
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        
                                        <button 
                                            type="button" 
                                            disabled={processing}
                                            // Këtu i dërgojmë 'e' dhe 'plan' që të punojë logjika
                                            onClick={(e) => handleSubscribe(e, plan)}
                                            className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-200 transform active:scale-95 ${
                                                parseFloat(plan.cmimi_mujor) === 0 
                                                ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200 shadow-lg' 
                                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 shadow-lg'
                                            } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {processing ? 'Processing...' : (
                                                parseFloat(plan.cmimi_mujor) === 0 ? 'Get Started' : 'Subscribe Now'
                                            )}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10 bg-red-50 rounded-lg">
                                    <p className="text-red-600 font-semibold">No plans found in database.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}