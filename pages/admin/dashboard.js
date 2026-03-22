// pages/admin/dashboard.js
import AdminLayout from '../../components/layout/AdminLayout';
import Link from 'next/link';
import { getAdminFromRequest } from '../../lib/auth';
import { getDB } from '../../lib/db';
import s from '../../styles/admin-dashboard.module.css';

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
      <div className={s.welcomeBar}>
        <div>
          <h2 className={s.greeting}>Good day, {admin.name?.split(' ')[0]} 👋</h2>
          <p className={s.subtitle}>Here's what's happening with your site today.</p>
        </div>
        <Link href="/admin/posts/new" className={s.newPostButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Post
        </Link>
      </div>

      {/* Stat cards */}
      <div className={s.statsGrid}>
        {STAT_CARDS.map(({ label, val, icon, color, href }) => (
          <Link key={label} href={href} className={s.statCard}>
            <div className={s.statIcon} style={{ background: `${color}18`, color }}>{icon}</div>
            <div className={s.statBody}>
              <div className={s.statValue} style={{ color }}>{val}</div>
              <div className={s.statLabel}>{label}</div>
            </div>
            <svg className={s.statArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        ))}
      </div>

      {/* Two-col grid */}
      <div className={s.dashGrid}>
        {/* Recent posts */}
        <div className={s.dashCard}>
          <div className={s.cardHeader}>
            <h3>Recent Posts</h3>
            <Link href="/admin/posts" className={s.seeAllLink}>See all →</Link>
          </div>
          <div className={s.cardList}>
            {recentPosts.length === 0 && (
              <div className={s.emptyMessage}>No posts yet. <Link href="/admin/posts/new">Create one →</Link></div>
            )}
            {recentPosts.map(post => (
              <div key={post.id} className={s.listItem}>
                <div className={s.itemInfo}>
                  <Link href={`/admin/posts/${post.id}`} className={s.itemTitle}>{post.title}</Link>
                  <span className={s.itemDate}>{new Date(post.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                </div>
                <span className={`status-badge ${post.status}`}>{post.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div className={s.dashCard}>
          <div className={s.cardHeader}>
            <h3>Recent Messages</h3>
            <Link href="/admin/messages" className={s.seeAllLink}>See all →</Link>
          </div>
          <div className={s.cardList}>
            {recentMessages.length === 0 && (
              <div className={s.emptyMessage}>No messages yet.</div>
            )}
            {recentMessages.map(msg => (
              <Link key={msg.id} href="/admin/messages"
                className={`${s.listItem} ${s.messageItem} ${!msg.is_read ? s.unread : ''}`}>
                <div className={s.messageAvatar}>{msg.name[0]}</div>
                <div className={s.itemInfo}>
                  <span className={s.itemTitle}>{msg.name}</span>
                  <span className={s.itemDate}>{msg.service || msg.email}</span>
                </div>
                {!msg.is_read && <span className={s.unreadDot} />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
