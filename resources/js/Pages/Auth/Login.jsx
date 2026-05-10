import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => { reset('password'); };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                .login-root { min-height: 100vh; background: #f3f4f8; font-family: 'DM Sans', sans-serif; display: flex; flex-direction: column; }
                .login-nav { height: 70px; background: #fff; border-bottom: 1px solid #e8e8ee; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
                .nav-register { padding: 9px 22px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; color: #4a4a6a; border: 1.5px solid #dde0f0; transition: all 0.2s; }
                .nav-register:hover { border-color: #4f6ef7; color: #4f6ef7; }
                .login-main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
                .login-card { background: #fff; border-radius: 28px; padding: 56px 52px; width: 100%; max-width: 460px; box-shadow: 0 4px 40px rgba(0,0,0,0.07); }
                .login-eyebrow { font-size: 12px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #4f6ef7; margin-bottom: 10px; }
                .login-title { font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; line-height: 1.2; }
                .login-subtitle { font-size: 14px; color: #9090aa; margin-bottom: 36px; }
                .status-msg { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 20px; }
                .field { margin-bottom: 20px; }
                .field label { display: block; font-size: 13px; font-weight: 500; color: #4a4a6a; margin-bottom: 7px; }
                .field input { width: 100%; padding: 12px 16px; border: 1.5px solid #e0e2ef; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #1a1a2e; background: #fafbff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
                .field input:focus { border-color: #4f6ef7; box-shadow: 0 0 0 3px rgba(79,110,247,0.1); background: #fff; }
                .field-error { font-size: 12px; color: #ef4444; margin-top: 5px; }
                .login-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
                .remember-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6b6b8a; cursor: pointer; }
                .forgot-link { font-size: 13px; color: #4f6ef7; text-decoration: none; font-weight: 500; }
                .forgot-link:hover { text-decoration: underline; }
                .btn-login { width: 100%; padding: 14px; background: #1a1a2e; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; letter-spacing: 0.3px; }
                .btn-login:hover:not(:disabled) { background: #4f6ef7; transform: translateY(-1px); }
                .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }
                .login-register-link { text-align: center; margin-top: 24px; font-size: 13px; color: #9090aa; }
                .login-register-link a { color: #4f6ef7; font-weight: 500; text-decoration: none; }
                .login-register-link a:hover { text-decoration: underline; }
                @media (max-width: 480px) { .login-nav { padding: 0 20px; } .login-card { padding: 36px 24px; border-radius: 20px; } .login-title { font-size: 28px; } }
            `}</style>

            <div className="login-root">
                <nav className="login-nav">
                    <Link href="/" className="text-2xl font-black italic tracking-tighter text-gray-900 flex items-center">
                        BooksHub<span className="text-blue-600">.</span>
                    </Link>
                    <Link href={route('register')} className="nav-register">Create account</Link>
                </nav>

                <main className="login-main">
                    <div className="login-card">
                        <p className="login-eyebrow">Welcome back</p>
                        <h1 className="login-title">Log in to<br />BooksHub</h1>
                        <p className="login-subtitle">Enter your credentials to continue reading.</p>
                        {status && <div className="status-msg">{status}</div>}
                        <form onSubmit={submit}>
                            <div className="field">
                                <label htmlFor="email">Email address</label>
                                <input id="email" type="email" name="email" value={data.email} autoComplete="username" autoFocus onChange={(e) => setData('email', e.target.value)} />
                                {errors.email && <p className="field-error">{errors.email}</p>}
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" name="password" value={data.password} autoComplete="current-password" onChange={(e) => setData('password', e.target.value)} />
                                {errors.password && <p className="field-error">{errors.password}</p>}
                            </div>
                            <div className="login-meta">
                                <label className="remember-label">
                                    <Checkbox name="remember" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                                    Remember me
                                </label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="forgot-link">Forgot password?</Link>
                                )}
                            </div>
                            <button type="submit" className="btn-login" disabled={processing}>
                                {processing ? 'Logging in...' : 'Log in'}
                            </button>
                        </form>
                        <p className="login-register-link">
                            Don't have an account?{' '}<Link href={route('register')}>Create one</Link>
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}