// components/layout/AdminLayout.js
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';

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
      <Head><title>{title} — IBarts Admin</title></Head>
      <div className={`admin-shell ${collapsed ? 'collapsed' : ''}`}>

        {/* ── Sidebar ─────────────────────────── */}
        <aside className="sidebar">
          <div className="sb-header">
            <div className="sb-logo">
              <div className="logo-mark">IB</div>
              {!collapsed && (
                <div>
                  <div className="logo-name">IBarts</div>
                  <div className="logo-sub">Admin</div>
                </div>
              )}
            </div>
            <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} title="Toggle sidebar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {collapsed
                  ? <polyline points="9 18 15 12 9 6" />
                  : <polyline points="15 18 9 12 15 6" />}
              </svg>
            </button>
          </div>

          <nav className="sb-nav">
            {NAV.map(({ href, label, icon }) => (
              <Link key={href} href={href}
                className={`sb-link ${isActive(href) ? 'active' : ''}`}
                title={collapsed ? label : ''}>
                <span className="sb-icon">{icon}</span>
                {!collapsed && <span className="sb-label">{label}</span>}
                {isActive(href) && <span className="active-bar" />}
              </Link>
            ))}
          </nav>

          <div className="sb-footer">
            <Link href="/" target="_blank" className="sb-link view-site" title={collapsed ? 'View Site' : ''}>
              <span className="sb-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </span>
              {!collapsed && <span className="sb-label">View Site</span>}
            </Link>
            <button className="sb-link logout-btn" onClick={logout} title={collapsed ? 'Logout' : ''}>
              <span className="sb-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </span>
              {!collapsed && <span className="sb-label">Logout</span>}
            </button>
          </div>
        </aside>

        {/* ── Main area ───────────────────────── */}
        <div className="admin-main">
          {/* Top bar */}
          <header className="admin-topbar">
            <h1 className="topbar-title">{title}</h1>
            <div className="topbar-right">
              <div className="topbar-user">
                <div className="user-avatar">{admin?.name?.[0] || 'A'}</div>
                {admin?.name && <span className="user-name">{admin.name}</span>}
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="admin-content">
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-shell {
          display: flex; min-height: 100vh;
          background: var(--deep);
          --sb-w: 240px;
        }
        .admin-shell.collapsed { --sb-w: 68px; }

        /* Sidebar */
        .sidebar {
          width: var(--sb-w); flex-shrink: 0;
          background: var(--ink);
          border-right: 1px solid var(--border);
          display: flex; flex-direction: column;
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
          transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
        }
        .sb-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1rem 1rem;
          border-bottom: 1px solid var(--border);
          min-height: 64px;
        }
        .sb-logo { display: flex; align-items: center; gap: 0.65rem; overflow: hidden; }
        .logo-mark {
          width: 36px; height: 36px; flex-shrink: 0; border-radius: 10px;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 700; color: white;
          box-shadow: 0 0 16px rgba(255,107,0,0.3);
        }
        .logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; color: var(--text-1); white-space: nowrap;
        }
        .logo-sub {
          font-family: 'Space Mono', monospace;
          font-size: 0.5rem; letter-spacing: 0.3em; color: var(--saffron); text-transform: uppercase;
        }
        .collapse-btn {
          width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
          background: var(--surface-2); border: 1px solid var(--border);
          color: var(--text-3); display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: color var(--transition), border-color var(--transition);
        }
        .collapse-btn:hover { color: var(--saffron); border-color: var(--border-2); }

        /* Nav */
        .sb-nav { flex: 1; padding: 1rem 0.75rem; display: flex; flex-direction: column; gap: 0.2rem; overflow-y: auto; }
        .sb-link {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.65rem 0.75rem; border-radius: var(--radius);
          color: var(--text-2); font-size: 0.9rem; font-weight: 500;
          position: relative; white-space: nowrap; overflow: hidden;
          transition: color var(--transition), background var(--transition);
          text-decoration: none; border: none; background: none; width: 100%; cursor: pointer;
        }
        .sb-link:hover { color: var(--text-1); background: rgba(255,107,0,0.07); }
        .sb-link.active { color: var(--saffron); background: rgba(255,107,0,0.1); }
        .active-bar {
          position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 3px; background: var(--saffron); border-radius: 0 2px 2px 0;
        }
        .sb-icon { display: flex; align-items: center; flex-shrink: 0; }
        .sb-label { flex: 1; }

        .sb-footer {
          padding: 0.75rem; border-top: 1px solid var(--border);
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .view-site { color: var(--text-3); }
        .logout-btn { color: var(--text-3); }
        .logout-btn:hover { color: #ff6666 !important; background: rgba(255,80,80,0.08) !important; }

        /* Main */
        .admin-main {
          flex: 1; margin-left: var(--sb-w);
          display: flex; flex-direction: column;
          min-height: 100vh;
          transition: margin-left 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .admin-topbar {
          height: 64px; position: sticky; top: 0; z-index: 50;
          background: rgba(8,8,16,0.9); backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2rem;
        }
        .topbar-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 700; color: var(--text-1);
        }
        .topbar-right { display: flex; align-items: center; }
        .topbar-user { display: flex; align-items: center; gap: 0.6rem; }
        .user-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700; color: white;
        }
        .user-name { font-size: 0.88rem; font-weight: 600; color: var(--text-2); }
        .admin-content { flex: 1; padding: 2rem; }

        @media (max-width: 768px) {
          .admin-shell { --sb-w: 68px; }
          .sb-label, .logo-name, .logo-sub { display: none; }
        }
      `}</style>
    </>
  );
}