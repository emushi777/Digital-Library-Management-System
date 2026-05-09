import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .welcome-root {
                    min-height: 100vh;
                    background: #f3f4f8;
                    font-family: 'DM Sans', sans-serif;
                    display: flex;
                    flex-direction: column;
                }

                /* ── NAVBAR ── */
                .welcome-nav {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    height: 70px;
                    background: #fff;
                    border-bottom: 1px solid #e8e8ee;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 40px;
                    z-index: 100;
                }

                .nav-logo {
                    font-family: 'Playfair Display', serif;
                    font-size: 22px;
                    font-weight: 700;
                    color: #1a1a2e;
                    text-decoration: none;
                    letter-spacing: -0.3px;
                }

                .nav-logo span {
                    color: #4f6ef7;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .nav-link {
                    padding: 9px 22px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .nav-link-outline {
                    color: #4a4a6a;
                    border: 1.5px solid #dde0f0;
                    background: transparent;
                }

                .nav-link-outline:hover {
                    border-color: #4f6ef7;
                    color: #4f6ef7;
                }

                .nav-link-filled {
                    color: #fff;
                    background: #1a1a2e;
                }

                .nav-link-filled:hover {
                    background: #4f6ef7;
                }

                .nav-link-dashboard {
                    color: #4f6ef7;
                    border: 1.5px solid #4f6ef7;
                    background: #f0f3ff;
                }

                .nav-link-dashboard:hover {
                    background: #4f6ef7;
                    color: #fff;
                }

                /* ── HERO ── */
                .welcome-hero {
                    margin-top: 70px;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 40px;
                    min-height: calc(100vh - 70px);
                }

                .hero-card {
                    background: #fff;
                    border-radius: 28px;
                    padding: 70px 80px;
                    max-width: 960px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 70px;
                    box-shadow: 0 4px 40px rgba(0,0,0,0.07);
                }

                .hero-text {
                    flex: 1;
                }

                .hero-eyebrow {
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #4f6ef7;
                    margin-bottom: 18px;
                }

                .hero-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 48px;
                    font-weight: 700;
                    color: #1a1a2e;
                    line-height: 1.15;
                    margin-bottom: 20px;
                }

                .hero-title span {
                    color: #4f6ef7;
                }

                .hero-desc {
                    font-size: 16px;
                    color: #6b6b8a;
                    line-height: 1.7;
                    margin-bottom: 36px;
                    max-width: 380px;
                }

                .hero-actions {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .btn-primary {
                    padding: 13px 30px;
                    background: #1a1a2e;
                    color: #fff;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.2s;
                    display: inline-block;
                }

                .btn-primary:hover {
                    background: #4f6ef7;
                    transform: translateY(-1px);
                }

                .btn-secondary {
                    padding: 13px 30px;
                    background: #f3f4f8;
                    color: #1a1a2e;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.2s;
                    display: inline-block;
                    border: 1.5px solid #e0e2ef;
                }

                .btn-secondary:hover {
                    border-color: #4f6ef7;
                    color: #4f6ef7;
                    background: #f0f3ff;
                }

                /* ── BOOK ILLUSTRATION ── */
                .hero-visual {
                    flex-shrink: 0;
                    position: relative;
                    width: 240px;
                    height: 280px;
                }

                .book-stack {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                .book-item {
                    position: absolute;
                    border-radius: 6px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                }

                .book-item:nth-child(1) {
                    width: 120px; height: 175px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    bottom: 20px; left: 10px;
                    transform: rotate(-8deg);
                }

                .book-item:nth-child(2) {
                    width: 125px; height: 185px;
                    background: linear-gradient(135deg, #1a1a2e, #16213e);
                    bottom: 30px; left: 60px;
                    transform: rotate(2deg);
                }

                .book-item:nth-child(3) {
                    width: 110px; height: 165px;
                    background: linear-gradient(135deg, #06d6a0, #0cb8a0);
                    bottom: 15px; left: 115px;
                    transform: rotate(9deg);
                }

                /* ── FEATURES ROW ── */
                .welcome-features {
                    background: #fff;
                    border-top: 1px solid #e8e8ee;
                    padding: 30px 40px;
                    display: flex;
                    justify-content: center;
                    gap: 60px;
                }

                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #6b6b8a;
                    font-size: 14px;
                    font-weight: 400;
                }

                .feature-dot {
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    background: #4f6ef7;
                    flex-shrink: 0;
                }

                /* ── RESPONSIVE ── */
                @media (max-width: 768px) {
                    .welcome-nav { padding: 0 20px; }

                    .hero-card {
                        flex-direction: column;
                        padding: 40px 28px;
                        gap: 40px;
                        text-align: center;
                    }

                    .hero-title { font-size: 34px; }
                    .hero-desc { max-width: 100%; }
                    .hero-actions { justify-content: center; }

                    .hero-visual { width: 200px; height: 220px; }
                    .book-item:nth-child(1) { width: 95px; height: 140px; }
                    .book-item:nth-child(2) { width: 100px; height: 150px; left: 50px; }
                    .book-item:nth-child(3) { width: 90px; height: 130px; left: 95px; }

                    .welcome-features {
                        flex-direction: column;
                        align-items: center;
                        gap: 16px;
                    }

                    .welcome-hero { padding: 30px 16px; }
                }

                @media (max-width: 480px) {
                    .nav-logo { font-size: 18px; }
                    .hero-title { font-size: 28px; }
                    .btn-primary, .btn-secondary { padding: 11px 22px; font-size: 14px; }
                }
            `}</style>

            <div className="welcome-root">

                {/* NAVBAR */}
                <nav className="welcome-nav">
                    <a href="/" className="nav-logo">
                        Books<span>Hub.</span>
                    </a>

                    <div className="nav-links">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="nav-link nav-link-dashboard">
                                Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="nav-link nav-link-outline">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="nav-link nav-link-filled">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* HERO */}
                <main className="welcome-hero">
                    <div className="hero-card">

                        <div className="hero-text">
                            <p className="hero-eyebrow">Welcome to BooksHub</p>
                            <h1 className="hero-title">
                                Your next great<br />read is <span>waiting</span>
                            </h1>
                            <p className="hero-desc">
                                Discover thousands of books across every genre. 
                                Join our community of readers, track your reading 
                                journey, and never lose your place again.
                            </p>

                            <div className="hero-actions">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="btn-primary">
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('register')} className="btn-primary">
                                            Create an account
                                        </Link>
                                        <Link href={route('login')} className="btn-secondary">
                                            Log in
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Book stack visual */}
                        <div className="hero-visual">
                            <div className="book-stack">
                                <div className="book-item"></div>
                                <div className="book-item"></div>
                                <div className="book-item"></div>
                            </div>
                        </div>

                    </div>
                </main>

                {/* FEATURES STRIP */}
                <footer className="welcome-features">
                    <div className="feature-item">
                        <div className="feature-dot"></div>
                        Thousands of books available
                    </div>
                    <div className="feature-item">
                        <div className="feature-dot"></div>
                        Track your reading progress
                    </div>
                    <div className="feature-item">
                        <div className="feature-dot"></div>
                        New releases every week
                    </div>
                </footer>

            </div>
        </>
    );
}