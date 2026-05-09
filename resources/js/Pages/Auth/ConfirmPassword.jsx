import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => { reset('password'); };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <>
            <Head title="Confirm Password" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                .auth-root { min-height: 100vh; background: #f3f4f8; font-family: 'DM Sans', sans-serif; display: flex; flex-direction: column; }
                .auth-nav { height: 70px; background: #fff; border-bottom: 1px solid #e8e8ee; display: flex; align-items: center; padding: 0 40px; }
                .nav-logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #1a1a2e; text-decoration: none; }
                .nav-logo span { color: #4f6ef7; }
                .auth-main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
                .auth-card { background: #fff; border-radius: 28px; padding: 52px; width: 100%; max-width: 460px; box-shadow: 0 4px 40px rgba(0,0,0,0.07); }
                .auth-eyebrow { font-size: 12px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #4f6ef7; margin-bottom: 10px; }
                .auth-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; }
                .auth-subtitle { font-size: 14px; color: #9090aa; margin-bottom: 32px; line-height: 1.6; }
                .field { margin-bottom: 18px; }
                .field label { display: block; font-size: 13px; font-weight: 500; color: #4a4a6a; margin-bottom: 7px; }
                .field input { width: 100%; padding: 12px 16px; border: 1.5px solid #e0e2ef; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #1a1a2e; background: #fafbff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
                .field input:focus { border-color: #4f6ef7; box-shadow: 0 0 0 3px rgba(79,110,247,0.1); background: #fff; }
                .field-error { font-size: 12px; color: #ef4444; margin-top: 5px; }
                .btn-submit { width: 100%; padding: 14px; background: #1a1a2e; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; margin-top: 8px; }
                .btn-submit:hover:not(:disabled) { background: #4f6ef7; transform: translateY(-1px); }
                .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
                @media (max-width: 480px) { .auth-nav { padding: 0 20px; } .auth-card { padding: 36px 24px; border-radius: 20px; } }
            `}</style>

            <div className="auth-root">
                <nav className="auth-nav">
                    <Link href="/" className="nav-logo">Books<span>Hub.</span></Link>
                </nav>

                <main className="auth-main">
                    <div className="auth-card">
                        <p className="auth-eyebrow">Security check</p>
                        <h1 className="auth-title">Confirm password</h1>
                        <p className="auth-subtitle">This is a secure area. Please confirm your password before continuing.</p>

                        <form onSubmit={submit}>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" name="password" value={data.password} autoFocus onChange={(e) => setData('password', e.target.value)} />
                                {errors.password && <p className="field-error">{errors.password}</p>}
                            </div>
                            <button type="submit" className="btn-submit" disabled={processing}>
                                {processing ? 'Confirming...' : 'Confirm'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}