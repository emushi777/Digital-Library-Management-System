import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                .auth-root { min-height: 100vh; background: #f3f4f8; font-family: 'DM Sans', sans-serif; display: flex; flex-direction: column; }
                .auth-nav { height: 70px; background: #fff; border-bottom: 1px solid #e8e8ee; display: flex; align-items: center; padding: 0 40px; }
                .auth-main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
                .auth-card { background: #fff; border-radius: 28px; padding: 52px; width: 100%; max-width: 460px; box-shadow: 0 4px 40px rgba(0,0,0,0.07); }
                .auth-eyebrow { font-size: 12px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #4f6ef7; margin-bottom: 10px; }
                .auth-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; }
                .auth-subtitle { font-size: 14px; color: #9090aa; margin-bottom: 28px; line-height: 1.6; }
                .status-msg { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 24px; }
                .btn-submit { width: 100%; padding: 14px; background: #1a1a2e; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
                .btn-submit:hover:not(:disabled) { background: #4f6ef7; transform: translateY(-1px); }
                .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
                .logout-link { display: block; text-align: center; margin-top: 20px; font-size: 13px; color: #9090aa; text-decoration: none; transition: color 0.2s; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; width: 100%; }
                .logout-link:hover { color: #ef4444; }
                @media (max-width: 480px) { .auth-nav { padding: 0 20px; } .auth-card { padding: 36px 24px; border-radius: 20px; } }
            `}</style>

            <div className="auth-root">
                <nav className="auth-nav">
                    <Link href="/" className="text-2xl font-black italic tracking-tighter text-gray-900 flex items-center">
                        BooksHub<span className="text-blue-600">.</span>
                    </Link>
                </nav>

                <main className="auth-main">
                    <div className="auth-card">
                        <p className="auth-eyebrow">One more step</p>
                        <h1 className="auth-title">Verify your<br />email</h1>
                        <p className="auth-subtitle">Thanks for signing up! We sent a verification link to your email address. Click it to activate your account.</p>
                        {status === 'verification-link-sent' && (
                            <div className="status-msg">A new verification link has been sent to your email address.</div>
                        )}
                        <form onSubmit={submit}>
                            <button type="submit" className="btn-submit" disabled={processing}>
                                {processing ? 'Sending...' : 'Resend verification email'}
                            </button>
                        </form>
                        <Link href={route('logout')} method="post" as="button" className="logout-link">
                            Log out
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}