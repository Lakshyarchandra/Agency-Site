// pages/admin/dashboard.js
import AdminLayout from '../../components/layout/AdminLayout';
import Link from 'next/link';
import { getAdminFromRequest } from '../../lib/auth';
import { getDB } from '../../lib/db';

export async function getServerSideProps({ req }) {
  const admin = getAdminFromRequest(req);
  if (!admin) return { redirect: { destination: '/admin', permanent: false } };

  const db = getDB();
  const [[{ totalPosts }]]     = await db.execute("SELECT COUNT(*) AS totalPosts FROM posts");
  const [[{ published }]]      = await db.execute("SELECT COUNT(*) AS published FROM posts WHERE status='published'");
  const [[{ drafts }]]         = await db.execute("SELECT COUNT(*) AS drafts FROM posts WHERE status='draft'");
  const [[{ totalMessages }]]  = await db.execute("SELECT COUNT(*) AS totalMessages FROM contacts");
  const [[{ unread }]]         = await db.execute("SELECT COUNT(*) AS unread FROM contacts WHERE is_read=0");

  const [recentPosts] = await db.execute(
    `SELECT id, title, slug, status, published_at, created_at FROM posts ORDER BY created_at DESC LIMIT 5`
  );
  const [recentMessages] = await db.execute(
    `SELECT id, name, email, service, is_read, created_at FROM contacts ORDER BY created_at DESC LIMIT 5`
  );

  return {
    props: {
      admin: JSON.parse(JSON.stringify(admin)),
      stats: { totalPosts, published, drafts, totalMessages, unread },
      recentPosts: JSON.parse(JSON.stringify(recentPosts)),
      recentMessages: JSON.parse(JSON.stringify(recentMessages)),
    },
  };
}

export default function Dashboard({ admin, stats, recentPosts, recentMessages }) {
  const STAT_CARDS = [
    { label: 'Total Posts',     val: stats.totalPosts,    icon: '📝', color: '#FF6B00', href: '/admin/posts' },
    { label: 'Published',       val: stats.published,     icon: '✅', color: '#22cc88', href: '/admin/posts' },
    { label: 'Drafts',          val: stats.drafts,        icon: '📋', color: '#FFB347', href: '/admin/posts' },
    { label: 'Unread Messages', val: stats.unread,        icon: '💬', color: '#FF6B00', href: '/admin/messages' },
  ];

  return (
    <AdminLayout title="Dashboard" admin={admin}>
      {/* Welcome */}
      <div className="welcome-bar">
        <div>
          <h2 className="wb-greeting">Good day, {admin.name?.split(' ')[0]} 👋</h2>
          <p className="wb-sub">Here's what's happening with your site today.</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Post
        </Link>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        {STAT_CARDS.map(({ label, val, icon, color, href }) => (
          <Link key={label} href={href} className="stat-card">
            <div className="sc-icon" style={{ background: `${color}18`, color }}>{icon}</div>
            <div className="sc-body">
              <div className="sc-val" style={{ color }}>{val}</div>
              <div className="sc-label">{label}</div>
            </div>
            <svg className="sc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        ))}
      </div>

      {/* Two-col grid */}
      <div className="dash-grid">
        {/* Recent posts */}
        <div className="dash-card">
          <div className="dc-header">
            <h3>Recent Posts</h3>
            <Link href="/admin/posts" className="dc-see-all">See all →</Link>
          </div>
          <div className="dc-list">
            {recentPosts.length === 0 && (
              <div className="dc-empty">No posts yet. <Link href="/admin/posts/new">Create one →</Link></div>
            )}
            {recentPosts.map(post => (
              <div key={post.id} className="dc-item">
                <div className="dci-info">
                  <Link href={`/admin/posts/${post.id}`} className="dci-title">{post.title}</Link>
                  <span className="dci-date">{new Date(post.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                </div>
                <span className={`status-badge ${post.status}`}>{post.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div className="dash-card">
          <div className="dc-header">
            <h3>Recent Messages</h3>
            <Link href="/admin/messages" className="dc-see-all">See all →</Link>
          </div>
          <div className="dc-list">
            {recentMessages.length === 0 && (
              <div className="dc-empty">No messages yet.</div>
            )}
            {recentMessages.map(msg => (
              <Link key={msg.id} href="/admin/messages" className={`dc-item msg-item ${!msg.is_read ? 'unread' : ''}`}>
                <div className="msg-avatar">{msg.name[0]}</div>
                <div className="dci-info">
                  <span className="dci-title">{msg.name}</span>
                  <span className="dci-date">{msg.service || msg.email}</span>
                </div>
                {!msg.is_read && <span className="unread-dot" />}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .welcome-bar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;
        }
        .wb-greeting {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 700; color: var(--text-1);
        }
        .wb-sub { font-size: 0.9rem; color: var(--text-2); margin-top: 0.25rem; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          border-radius: var(--radius); color: white;
          font-size: 0.9rem; font-weight: 700; border: none; cursor: pointer;
          box-shadow: 0 4px 20px rgba(255,107,0,0.3);
          transition: transform var(--transition), box-shadow var(--transition);
          text-decoration: none;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(255,107,0,0.45); }

        /* Stats */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 2rem; }
        .stat-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 1.25rem 1.5rem;
          display: flex; align-items: center; gap: 1rem;
          text-decoration: none;
          transition: border-color var(--transition), transform var(--transition);
        }
        .stat-card:hover { border-color: var(--border-2); transform: translateY(-2px); }
        .sc-icon {
          width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
        }
        .sc-body { flex: 1; }
        .sc-val { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; line-height: 1; }
        .sc-label { font-size: 0.8rem; color: var(--text-3); margin-top: 2px; }
        .sc-arrow { color: var(--text-3); margin-left: auto; }

        /* Dash grid */
        .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .dash-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius-lg); overflow: hidden;
        }
        .dc-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border);
        }
        .dc-header h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 700; color: var(--text-1);
        }
        .dc-see-all { font-size: 0.82rem; color: var(--saffron); font-weight: 600; text-decoration: none; }
        .dc-list { padding: 0.5rem 0; }
        .dc-empty { padding: 2rem; text-align: center; font-size: 0.9rem; color: var(--text-3); }
        .dc-empty a { color: var(--saffron); }
        .dc-item {
          display: flex; align-items: center; gap: 0.85rem;
          padding: 0.8rem 1.5rem;
          border-bottom: 1px solid var(--border);
          transition: background var(--transition); text-decoration: none;
        }
        .dc-item:last-child { border-bottom: none; }
        .dc-item:hover { background: rgba(255,107,0,0.04); }
        .dci-info { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
        .dci-title {
          font-size: 0.88rem; font-weight: 600; color: var(--text-1);
          text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .dci-date { font-size: 0.75rem; color: var(--text-3); }
        .status-badge {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 3px 10px; border-radius: 100px; flex-shrink: 0;
        }
        .status-badge.published { background: rgba(34,204,136,0.12); color: #22cc88; }
        .status-badge.draft     { background: rgba(255,179,71,0.12);  color: #FFB347; }
        .msg-item { cursor: pointer; }
        .msg-avatar {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700; color: white;
        }
        .msg-item.unread .dci-title { color: var(--saffron); }
        .unread-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--saffron); flex-shrink: 0;
        }

        @media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px)  {
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .dash-grid  { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px)  { .stats-grid { grid-template-columns: 1fr; } }
      `}</style>
    </AdminLayout>
  );
}
