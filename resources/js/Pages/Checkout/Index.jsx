import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Index({ auth, plan }) {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const { post, processing } = useForm({
        plan_id: plan.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('subscribe.store'), {
            onSuccess: () => setPaymentSuccess(true),
        });
    };

    return (
        <>
            <Head title="Checkout" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                .checkout-root { min-height: 100vh; background: #f3f4f8; font-family: 'DM Sans', sans-serif; display: flex; flex-direction: column; }
                .checkout-nav { height: 70px; background: #fff; border-bottom: 1px solid #e8e8ee; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
                .nav-back { font-size: 13px; color: #9090aa; text-decoration: none; display: flex; align-items: center; gap: 6px; transition: color 0.2s; }
                .nav-back:hover { color: #1a1a2e; }
                .checkout-main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 50px 20px; }
                .checkout-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; width: 100%; max-width: 860px; }
                .card { background: #fff; border-radius: 24px; padding: 40px; box-shadow: 0 4px 40px rgba(0,0,0,0.07); }
                .card-title { font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #9090aa; margin-bottom: 24px; }
                .plan-box { background: #f3f4f8; border-radius: 14px; padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .plan-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #1a1a2e; }
                .plan-sub { font-size: 13px; color: #9090aa; margin-top: 4px; }
                .plan-price { font-size: 28px; font-weight: 800; color: #1a1a2e; }
                .plan-price span { font-size: 14px; font-weight: 400; color: #9090aa; }
                .divider { border: none; border-top: 1px solid #f0f0f0; margin: 16px 0; }
                .total-row { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 16px; color: #1a1a2e; }
                .secure-badge { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #9090aa; margin-top: 20px; }
                .secure-badge svg { color: #4f6ef7; }
                .field { margin-bottom: 16px; }
                .field label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; color: #4a4a6a; margin-bottom: 7px; text-transform: uppercase; }
                .field input, .field select { width: 100%; padding: 12px 16px; border: 1.5px solid #e0e2ef; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #1a1a2e; background: #fafbff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
                .field input:focus, .field select:focus { border-color: #4f6ef7; box-shadow: 0 0 0 3px rgba(79,110,247,0.1); background: #fff; }
                .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
                .btn-pay { width: 100%; padding: 15px; background: #1a1a2e; color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; margin-top: 8px; letter-spacing: 0.3px; }
                .btn-pay:hover:not(:disabled) { background: #4f6ef7; transform: translateY(-1px); }
                .btn-pay:disabled { opacity: 0.6; cursor: not-allowed; }
                .success-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
                .success-card { background: #fff; border-radius: 28px; padding: 56px 48px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
                .success-icon { width: 72px; height: 72px; background: #f0fdf4; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; }
                .success-icon svg { color: #22c55e; }
                .success-title { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: #1a1a2e; margin-bottom: 12px; }
                .success-subtitle { font-size: 15px; color: #9090aa; line-height: 1.6; margin-bottom: 32px; }
                .success-plan-badge { background: #f3f4f8; border-radius: 10px; padding: 12px 20px; font-weight: 700; color: #1a1a2e; margin-bottom: 32px; font-size: 15px; }
                .btn-go { display: block; width: 100%; padding: 14px; background: #1a1a2e; color: #fff; border-radius: 12px; font-size: 15px; font-weight: 700; text-decoration: none; transition: all 0.2s; }
                .btn-go:hover { background: #4f6ef7; transform: translateY(-1px); }
                @media (max-width: 768px) { .checkout-grid { grid-template-columns: 1fr; } .checkout-nav { padding: 0 20px; } .card { padding: 28px 22px; } .success-card { padding: 40px 28px; } }
            `}</style>

            <div className="checkout-root">
                <nav className="checkout-nav">
                    <Link href={route('dashboard')} className="text-2xl font-black italic tracking-tighter text-gray-900 flex items-center">
                        Bookly<span className="text-blue-600">.</span>
                    </Link>
                    <Link href={route('dashboard')} className="nav-back">← Back to dashboard</Link>
                </nav>

                <main className="checkout-main">
                    <div className="checkout-grid">
                        <div className="card">
                            <p className="card-title">Order Summary</p>
                            <div className="plan-box">
                                <div>
                                    <p className="plan-name">{plan.emertimi}</p>
                                    <p className="plan-sub">Monthly subscription</p>
                                </div>
                                <div className="plan-price">{plan.cmimi_mujor}€<span>/mo</span></div>
                            </div>
                            <hr className="divider" />
                            <div className="total-row">
                                <span>Total today</span>
                                <span>{plan.cmimi_mujor}€</span>
                            </div>
                            <div className="secure-badge">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                </svg>
                                Secured with 256-bit SSL encryption
                            </div>
                        </div>

                        <div className="card">
                            <p className="card-title">Payment Details</p>
                            <form onSubmit={handleSubmit}>
                                <div className="field">
                                    <label>Cardholder Name</label>
                                    <input type="text" required placeholder="John Doe" />
                                </div>
                                <div className="field">
                                    <label>Card Number</label>
                                    <input type="text" required placeholder="0000 0000 0000 0000" maxLength={19} />
                                </div>
                                <div className="field-row">
                                    <div className="field" style={{marginBottom: 0}}>
                                        <label>Month</label>
                                        <select required>
                                            <option value="" disabled>MM</option>
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <option key={i+1} value={String(i+1).padStart(2,'0')}>{String(i+1).padStart(2,'0')}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="field" style={{marginBottom: 0}}>
                                        <label>Year</label>
                                        <select required>
                                            <option value="" disabled>YY</option>
                                            {Array.from({ length: 10 }, (_, i) => {
                                                const year = new Date().getFullYear() + i;
                                                return <option key={year} value={String(year).slice(-2)}>{String(year).slice(-2)}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="field" style={{marginTop: 16}}>
                                    <label>CVC</label>
                                    <input type="text" required placeholder="123" maxLength={3} />
                                </div>
                                <button type="submit" className="btn-pay" disabled={processing}>
                                    {processing ? 'Processing...' : `Pay €${plan.cmimi_mujor} & Activate`}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>

            {paymentSuccess && (
                <div className="success-overlay">
                    <div className="success-card">
                        <div className="success-icon">
                            <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <h2 className="success-title">Payment Successful!</h2>
                        <p className="success-subtitle">Your subscription has been activated. Welcome to BooksHub — happy reading!</p>
                        <div className="success-plan-badge">✓ {plan.emertimi} — Active</div>
                        <Link href={route('books.index')} className="btn-go">Start Reading →</Link>
                    </div>
                </div>
            )}
        </>
    );
}