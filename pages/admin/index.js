// pages/admin/index.js  — Admin Login
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { getAdminFromRequest } from '../../lib/auth';

export async function getServerSideProps({ req }) {
  const admin = getAdminFromRequest(req);
  if (admin) return { redirect: { destination: '/admin/dashboard', permanent: false } };
  return { props: {} };
}

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success(`Welcome, ${data.admin.name}!`);
      router.push('/admin/dashboard');
    } catch { toast.error('Network error.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <Head><title>Admin Login — CodePromix Agency</title></Head>
      <div className="login-root">
        <div className="login-bg">
          <div className="bg-grid" />
          <div className="bg-orb" />
        </div>
        <div className="login-card">
          <div className="lc-logo">
            <div className="logo-mark">IB</div>
            <div>
              <div className="logo-name">CodePromix</div>
              <div className="logo-sub">Admin Panel</div>
            </div>
          </div>
          <h1 className="lc-title">Sign in to<br />your admin</h1>
          <form onSubmit={submit} className="lc-form">
            <div className="field">
              <label>Email</label>
              <input name="email" type="email" value={form.email}
                onChange={handle} placeholder="admin@CodePromix.in" required />
            </div>
            <div className="field">
              <label>Password</label>
              <input name="password" type="password" value={form.password}
                onChange={handle} placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading} className="lc-btn">
              {loading ? <><span className="spinner" /> Signing in…</> : <>Sign In →</>}
            </button>
          </form>
          <p className="lc-hint">Default: admin@CodePromix.in / Admin@1234</p>
        </div>
      </div>

      <style jsx>{`
        .login-root {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .login-bg { position: absolute; inset: 0; pointer-events: none; }
        .bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,107,0,0.035) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,107,0,0.035) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .bg-orb {
          position: absolute; top: -200px; right: -200px;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%);
          filter: blur(100px);
        }
        .login-card {
          width: 100%; max-width: 420px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 2.5rem;
          position: relative; z-index: 1;
          animation: fadeUp 0.7s ease both;
          box-shadow: 0 24px 80px rgba(0,0,0,0.5);
        }
        .lc-logo { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 2rem; }
        .logo-mark {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; color: white;
          box-shadow: 0 0 20px rgba(255,107,0,0.35);
        }
        .logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--text-1);
        }
        .logo-sub {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem; letter-spacing: 0.3em;
          color: var(--saffron); text-transform: uppercase;
        }
        .lc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: var(--text-1);
          margin-bottom: 2rem; line-height: 1.2;
        }
        .lc-form { display: flex; flex-direction: column; gap: 1.1rem; }
        .field { display: flex; flex-direction: column; gap: 0.4rem; }
        .field label {
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--text-2);
        }
        .field input {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 0.8rem 1rem;
          color: var(--text-1); font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
          transition: border-color var(--transition);
        }
        .field input:focus { outline: none; border-color: var(--saffron); }
        .lc-btn {
          padding: 0.9rem;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          border: none; border-radius: var(--radius);
          color: white; font-family: 'DM Sans', sans-serif;
          font-size: 1rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center; gap: 0.4rem;
          box-shadow: 0 6px 24px rgba(255,107,0,0.35);
          transition: transform var(--transition), box-shadow var(--transition), opacity var(--transition);
        }
        .lc-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 32px rgba(255,107,0,0.5); }
        .lc-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: white;
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .lc-hint { margin-top: 1.25rem; font-size: 0.78rem; color: var(--text-3); text-align: center; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
