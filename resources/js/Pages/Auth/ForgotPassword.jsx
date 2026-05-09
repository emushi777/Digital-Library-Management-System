import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                .auth-root { min-height: 100vh; background: #f3f4f8; font-family: 'DM Sans', sans-serif; display: flex; flex-direction: column; }
                .auth-nav { height: 70px; background: #fff; border-bottom: 1px solid #e8e8ee; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
                .nav-logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #1a1a2e; text-decoration: none; }
                .nav-logo span { color: #4f6ef7; }
                .nav-link-outline { padding: 9px 22px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; color: #4a4a6a; border: 1.5px solid #dde0f0; transition: all 0.2s; }
                .nav-link-outline:hover { border-color: #4f6ef7; color: #4f6ef7; }
                .auth-main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
                .auth-card { background: #fff; border-radius: 28px; padding: 52px; width: 100%; max-width: 460px; box-shadow: 0 4px 40px rgba(0,0,0,0.07); }
                .auth-eyebrow { font-size: 12px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #4f6ef7; margin-bottom: 10px; }
                .auth-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; }
                .auth-subtitle { font-size: 14px; color: #9090aa; margin-bottom: 32px; line-height: 1.6; }
                .status-msg { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 20px; }
                .field { margin-bottom: 18px; }
                .field label { display: block; font-size: 13px; font-weight: 500; color: #4a4a6a; margin-bottom: 7px; }
                .field input { width: 100%; padding: 12px 16px; border: 1.5px solid #e0e2ef; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #1a1a2e; background: #fafbff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
                .field input:focus { border-color: #4f6ef7; box-shadow: 0 0 0 3px rgba(79,110,247,0.1); background: #fff; }
                .field-error { font-size: 12px; color: #ef4444; margin-top: 5px; }
                .btn-submit { width: 100%; padding: 14px; background: #1a1a2e; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; margin-top: 8px; }
                .btn-submit:hover:not(:disabled) { background: #4f6ef7; transform: translateY(-1px); }
                .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
                .auth-bottom-link { text-align: center; margin-top: 22px; font-size: 13px; color: #9090aa; }
                .auth-bottom-link a { color: #4f6ef7; font-weight: 500; text-decoration: none; }
                .auth-bottom-link a:hover { text-decoration: underline; }
                @media (max-width: 480px) { .auth-nav { padding: 0 20px; } .auth-card { padding: 36px 24px; border-radius: 20px; } }
            `}</style>

            <div className="auth-root">
                <nav className="auth-nav">
                    <Link href="/" className="nav-logo">Books<span>Hub.</span></Link>
                    <Link href={route('login')} className="nav-link-outline">Log in</Link>
                </nav>

                <main className="auth-main">
                    <div className="auth-card">
                        <p className="auth-eyebrow">Password reset</p>
                        <h1 className="auth-title">Forgot your<br />password?</h1>
                        <p className="auth-subtitle">No problem. Enter your email and we'll send you a reset link.</p>

                        {status && <div className="status-msg">{status}</div>}

                        <form onSubmit={submit}>
                            <div className="field">
                                <label htmlFor="email">Email address</label>
                                <input id="email" type="email" name="email" value={data.email} autoFocus onChange={(e) => setData('email', e.target.value)} />
                                {errors.email && <p className="field-error">{errors.email}</p>}
                            </div>
                            <button type="submit" className="btn-submit" disabled={processing}>
                                {processing ? 'Sending...' : 'Send reset link'}
                            </button>
                        </form>

                        <p className="auth-bottom-link">
                            Remembered it? <Link href={route('login')}>Back to login</Link>
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}