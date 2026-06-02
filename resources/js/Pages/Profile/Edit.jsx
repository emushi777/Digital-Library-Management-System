import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import Modal from '@/Components/Modal';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ auth, mustVerifyEmail, status, plans = [] }) {
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showPlansModal, setShowPlansModal] = useState(false);

    const subscription = auth.user?.subscription;
    const plan = subscription?.plan;
    const planName = plan?.emertimi ?? 'Free plan';
    const isSubscribed = Boolean(subscription?.is_active && plan);
    const isBasicPlan = Boolean(plan?.emertimi && plan.emertimi.toLowerCase().includes('basic'));
    const isPremiumPlan = isSubscribed && !isBasicPlan;
    const activePlanId = plan?.id;
    const formatDate = (value) => value ? new Date(value).toLocaleDateString('en-GB') : '—';
    const createdAt = auth.user?.created_at ? formatDate(auth.user.created_at) : 'Unknown';
    const expiresAt = subscription?.ends_at ? formatDate(subscription.ends_at) : '—';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),transparent_30%),#eff6ff] py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 shadow-[0_28px_80px_rgba(15,23,42,0.1)] backdrop-blur-xl">
                        <div className="relative overflow-hidden">
                            <div className="absolute -right-24 top-8 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl"></div>
                            <div className="absolute -left-24 bottom-10 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl"></div>
                            <div className="relative px-8 py-10 lg:px-12 lg:py-14">
                                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="max-w-2xl">
                                        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-500">Personal dashboard</p>
                                        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">Hello, {auth.user.name.split(' ')[0] || 'Reader'}.</h1>
                                        <p className="mt-4 text-base leading-7 text-slate-600">
                                            A polished view of your profile, membership, and account settings. Keep your information fresh and your reading experience seamless.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-4 sm:items-end sm:w-[280px]">
                                        <div className="flex w-full items-center gap-4 rounded-3xl bg-slate-950 px-5 py-4 text-white shadow-xl sm:w-[280px]">
                                            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-slate-950 shadow-xl">
                                                {auth.user.profile_photo_path ? (
                                                    <img
                                                        src={auth.user.profile_photo_path}
                                                        alt={auth.user.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-2xl font-black text-white">
                                                        {(auth.user.name || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Member since</p>
                                                <p className="mt-2 text-xl font-semibold">{createdAt}</p>
                                            </div>
                                        </div>

                                        <div className="w-full rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:w-[280px]">
                                            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Subscription</p>
                                            <p className="mt-3 text-2xl font-semibold text-slate-900">{isSubscribed ? planName : 'Free plan'}</p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {isSubscribed
                                                    ? isBasicPlan
                                                        ? 'Basic plan active'
                                                        : `Valid until ${expiresAt}`
                                                    : 'Upgrade for premium features.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[0.85fr_0.45fr]">
                        <div className="space-y-6">
                            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Profile details</p>
                                        <h2 className="mt-3 text-3xl font-bold text-slate-950">Account snapshot</h2>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {!showEditProfile && (
                                            <button
                                                type="button"
                                                onClick={() => setShowEditProfile(true)}
                                                className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                                            >
                                                Edit profile
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordForm((prev) => !prev)}
                                            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:border-slate-300"
                                        >
                                            {showPasswordForm ? 'Hide password form' : 'Change password'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowPlansModal(true)}
                                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-95"
                                        >
                                            Browse plans
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-4">
                                    <div className="relative overflow-hidden rounded-[32px] bg-slate-950 p-7 shadow-[0_28px_90px_rgba(15,23,42,0.16)] ring-1 ring-white/10 min-h-[170px]">
                                        <div className="absolute inset-x-6 top-0 h-1.5 rounded-full bg-sky-500/70" />
                                        <div className="relative h-full flex flex-col justify-between">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.35em] text-sky-300">Status</p>
                                                <p className="mt-4 text-2xl font-extrabold text-white">{isPremiumPlan ? 'Premium' : 'Standard'}</p>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-slate-300">{isPremiumPlan ? 'Full access to premium titles' : 'Basic access with room to upgrade'}</p>
                                        </div>
                                    </div>
                                    <div className="relative overflow-hidden rounded-[32px] bg-white p-7 shadow-[0_28px_90px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 min-h-[170px]">
                                        <div className="absolute inset-x-6 top-0 h-1.5 rounded-full bg-slate-200" />
                                        <div className="relative h-full flex flex-col justify-between">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Nickname</p>
                                                <p className="mt-4 text-2xl font-bold text-slate-950">{auth.user.name || 'No nickname yet'}</p>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-slate-500">Your displayed name in comments, bookmarks, and collections.</p>
                                        </div>
                                    </div>
                                    <div className="relative overflow-hidden rounded-[32px] bg-white p-7 shadow-[0_28px_90px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 min-h-[170px]">
                                        <div className="absolute inset-x-6 top-0 h-1.5 rounded-full bg-slate-200" />
                                        <div className="relative h-full flex flex-col justify-between">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Email</p>
                                                <p className="mt-4 text-xl font-bold text-slate-950">{auth.user.email}</p>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-slate-500">{auth.user.email_verified_at ? 'Verified email address' : 'Unverified email address'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {showEditProfile && (
                                <>
                                    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-lg">
                                        <div className="px-8 py-8">
                                            <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-3xl" onCancel={() => setShowEditProfile(false)} />
                                        </div>
                                    </div>
                                    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-lg">
                                        <div className="px-8 py-8">
                                            <DeleteUserForm className="max-w-3xl" />
                                        </div>
                                    </div>
                                </>
                            )}

                            {showPasswordForm && (
                                    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-lg">
                                        <div className="px-8 py-8">
                                            <UpdatePasswordForm className="max-w-3xl" onSuccess={() => setShowPasswordForm(false)} />
                                        </div>
                                    </div>
                            )}
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-900 p-8 text-white shadow-lg">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Premium benefits</p>
                                        <h2 className="mt-4 text-3xl font-black tracking-tight">Upgrade your experience</h2>
                                    </div>
                                    <div className="rounded-3xl bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200">
                                        {isSubscribed ? 'Active' : 'Recommended'}
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                                    Unlock unlimited downloads, exclusive titles, and curated reading recommendations with premium access.
                                </p>

                                <div className="mt-6 space-y-4 rounded-3xl bg-white/5 p-6">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 text-white">✓</span>
                                        <div>
                                            <p className="text-sm font-semibold text-white">Unlimited bookshelf</p>
                                            <p className="mt-1 text-xs text-slate-400">Keep all your favorites in one place.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 text-white">✓</span>
                                        <div>
                                            <p className="text-sm font-semibold text-white">Exclusive collections</p>
                                            <p className="mt-1 text-xs text-slate-400">Get early access to premium reads.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 text-white">✓</span>
                                        <div>
                                            <p className="text-sm font-semibold text-white">Personalized recommendations</p>
                                            <p className="mt-1 text-xs text-slate-400">Receive picks based on your reading taste.</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowPlansModal(true)}
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
                                >
                                    Browse plans
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            <Modal show={showPlansModal} onClose={() => setShowPlansModal(false)} maxWidth="4xl">
                <div className="bg-slate-950 text-white">
                    <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Choose your plan</h2>
                            <p className="mt-2 text-sm text-slate-300">See the full subscription lineup and activate the one that fits your reading style.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowPlansModal(false)}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Close
                        </button>
                    </div>

                    <div className="mx-auto grid max-w-6xl justify-center gap-6 p-6 sm:grid-cols-1 lg:grid-cols-2">
                        {plans.length > 0 ? (
                            plans.map((plan) => {
                                const isActive = activePlanId === plan.id;
                                const isFreePlan = Number(plan.cmimi_mujor) === 0;

                                return (
                                    <div key={plan.id} className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.35em] text-sky-300">{plan.emertimi}</p>
                                                <p className="mt-2 text-3xl font-black text-white">{isFreePlan ? 'Free' : `${plan.cmimi_mujor}€ / mo`}</p>
                                            </div>
                                            <div className="rounded-3xl bg-slate-900/90 px-3 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
                                                {plan.librat_max_mujor} books / mo
                                            </div>
                                        </div>

                                        <p className="mt-5 text-sm leading-6 text-slate-300 min-h-[80px]">{plan.pershkrimi || 'A great option to get more titles, better recommendations, and a polished reading experience.'}</p>

                                        <ul className="mt-6 space-y-3 text-sm text-slate-300">
                                            <li>✓ Unlimited saved books</li>
                                            <li>✓ Curated recommendations</li>
                                            <li>✓ Access to premium collections</li>
                                        </ul>

                                        <div className="mt-6">
                                            {isFreePlan ? (
                                                <button
                                                    type="button"
                                                    disabled
                                                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-600 px-4 py-3 text-sm font-bold text-slate-200"
                                                >
                                                    Free plan included
                                                </button>
                                            ) : (
                                                <Link
                                                    href={route('checkout.index', plan.id)}
                                                    className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-slate-600 text-slate-200 cursor-not-allowed' : 'bg-sky-500 text-white hover:bg-sky-400'}`}
                                                    onClick={(e) => {
                                                        if (isActive) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    {isActive ? 'Current Plan' : 'Select plan'}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center text-slate-200">
                                No plans are available right now. Please check back later.
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
