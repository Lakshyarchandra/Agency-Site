// components/layout/AdminLayout.js
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';
import s from '../../styles/admin-layout.module.css';

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )},
  { href: '/admin/posts', label: 'Blog Posts', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  )},
  { href: '/admin/posts/new', label: 'New Post', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  )},
  { href: '/admin/messages', label: 'Messages', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )},
  { href: '/admin/categories', label: 'Categories', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  )},
];

export default function AdminLayout({ children, title = 'Admin Panel', admin }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const logout = async () => {
    await fetch('/api/auth/admin-logout', { method: 'POST' });
    toast.success('Logged out');
    router.push('/admin');
  };

  const isActive = (href) => router.pathname === href || router.pathname.startsWith(href + '/');

  return (
    <>
      <Head><title>{title} — CodePromix Admin</title></Head>
      <div className={`${s.shell} ${collapsed ? s.shellCollapsed : ''}`}>

        {/* ── Sidebar ─────────────────────────── */}
        <aside className={s.sidebar}>
          <div className={s.sidebarHeader}>
            <div className={s.sidebarLogo}>
              <div className={s.logoMark}>CP</div>
              {!collapsed && (
                <div>
                  <div className={s.logoName}>CodePromix</div>
                  <div className={s.logoSub}>Admin</div>
                </div>
              )}
            </div>
            <button className={s.collapseButton} onClick={() => setCollapsed(!collapsed)} title="Toggle sidebar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {collapsed
                  ? <polyline points="9 18 15 12 9 6" />
                  : <polyline points="15 18 9 12 15 6" />}
              </svg>
            </button>
          </div>

          <nav className={s.sidebarNav}>
            {NAV.map(({ href, label, icon }) => (
              <Link key={href} href={href}
                className={`${s.navLink} ${isActive(href) ? s.navLinkActive : ''}`}
                title={collapsed ? label : ''}>
                <span className={s.navIcon}>{icon}</span>
                {!collapsed && <span className={s.navLabel}>{label}</span>}
                {isActive(href) && <span className={s.activeBar} />}
              </Link>
            ))}
          </nav>

          <div className={s.sidebarFooter}>
            <Link href="/" target="_blank" className={`${s.navLink} ${s.viewSiteLink}`} title={collapsed ? 'View Site' : ''}>
              <span className={s.navIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </span>
              {!collapsed && <span className={s.navLabel}>View Site</span>}
            </Link>
            <button className={`${s.navLink} ${s.logoutButton}`} onClick={logout} title={collapsed ? 'Logout' : ''}>
              <span className={s.navIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </span>
              {!collapsed && <span className={s.navLabel}>Logout</span>}
            </button>
          </div>
        </aside>

        {/* ── Main area ───────────────────────── */}
        <div className={s.mainArea}>
          <header className={s.topbar}>
            <h1 className={s.topbarTitle}>{title}</h1>
            <div className={s.topbarRight}>
              <div className={s.topbarUser}>
                <div className={s.userAvatar}>{admin?.name?.[0] || 'A'}</div>
                {admin?.name && <span className={s.userName}>{admin.name}</span>}
              </div>
            </div>
          </header>

          <div className={s.content}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}