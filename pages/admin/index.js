// pages/admin/index.js  — Admin Login
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { getAdminFromRequest } from '../../lib/auth';
import s from '../../styles/admin-login.module.css';

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
      <div className={s.root}>
        <div className={s.background}>
          <div className={s.backgroundGrid} />
          <div className={s.backgroundOrb} />
        </div>
        <div className={s.card}>
          <div className={s.cardLogo}>
            <div>
              <div className={s.logoName}>CodePromix</div>
              <div className={s.logoSub}>Admin Panel</div>
            </div>
          </div>
          <h1 className={s.cardTitle}>Sign in to<br />your admin</h1>
          <form onSubmit={submit} className={s.form}>
            <div className={s.field}>
              <label>Email</label>
              <input name="email" type="email" value={form.email}
                onChange={handle} placeholder="admin@CodePromix.in" required />
            </div>
            <div className={s.field}>
              <label>Password</label>
              <input name="password" type="password" value={form.password}
                onChange={handle} placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading} className={s.submitButton}>
              {loading ? <><span className="spinner" /> Signing in…</> : <>Sign In →</>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
