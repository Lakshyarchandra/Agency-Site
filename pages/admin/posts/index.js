// pages/admin/posts/index.js
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/layout/AdminLayout';
import { getAdminFromRequest } from '../../../lib/auth';
import { getDB } from '../../../lib/db';
import toast from 'react-hot-toast';

export async function getServerSideProps({ req }) {
  const admin = getAdminFromRequest(req);
  if (!admin) return { redirect: { destination: '/admin', permanent: false } };

  const db = getDB();
  const [posts] = await db.execute(
    `SELECT p.id, p.title, p.slug, p.status, p.robots, p.published_at, p.created_at,
            c.name AS category
     FROM posts p
     LEFT JOIN categories c ON c.id = p.category_id
     ORDER BY p.created_at DESC`
  );

  return {
    props: {
      admin: JSON.parse(JSON.stringify(admin)),
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

export default function PostsList({ admin, posts }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleting, setDeleting] = useState(null);

  const filtered = posts.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const deletePost = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) { toast.success('Post deleted'); router.replace(router.asPath); }
      else toast.error('Failed to delete');
    } catch { toast.error('Network error'); }
    finally { setDeleting(null); }
  };

  return (
    <AdminLayout title="Blog Posts" admin={admin}>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-wrap">
            <svg className="si" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text" placeholder="Search posts…"
              value={search} onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-tabs">
            {['all', 'published', 'draft'].map(f => (
              <button key={f} className={`filter-tab ${filterStatus === f ? 'active' : ''}`}
                onClick={() => setFilterStatus(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="ftab-count">
                  {f === 'all' ? posts.length : posts.filter(p => p.status === f).length}
                </span>
              </button>
            ))}
          </div>
        </div>
        <Link href="/admin/posts/new" className="btn-primary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Post
        </Link>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>SEO</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="empty-row">No posts found.</td></tr>
            )}
            {filtered.map(post => (
              <tr key={post.id} className={deleting === post.id ? 'deleting' : ''}>
                <td className="td-title">
                  <Link href={`/admin/posts/${post.id}`} className="post-title-link">
                    {post.title}
                  </Link>
                  <span className="post-slug">/{post.slug}</span>
                </td>
                <td><span className="cat-pill">{post.category || '—'}</span></td>
                <td><span className={`status-badge ${post.status}`}>{post.status}</span></td>
                <td>
                  <span className={`robots-badge ${post.robots?.startsWith('index') ? 'index' : 'noindex'}`}>
                    {post.robots?.startsWith('index') ? 'Indexed' : 'No Index'}
                  </span>
                </td>
                <td className="td-date">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
                    : '—'}
                </td>
                <td className="td-actions">
                  <Link href={`/admin/posts/${post.id}`} className="action-btn edit" title="Edit">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </Link>
                  <Link href={`/blogs/${post.slug}`} target="_blank" className="action-btn view" title="View">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </Link>
                  <button className="action-btn delete" title="Delete"
                    onClick={() => deletePost(post.id, post.title)}
                    disabled={deleting === post.id}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6"/><path d="M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .toolbar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;
        }
        .toolbar-left { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .search-wrap { position: relative; }
        .si { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-3); }
        .search-wrap input {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 0.6rem 1rem 0.6rem 2.5rem;
          color: var(--text-1); font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          width: 240px;
          transition: border-color var(--transition);
        }
        .search-wrap input:focus { outline: none; border-color: var(--saffron); }
        .search-wrap input::placeholder { color: var(--text-3); }

        .filter-tabs { display: flex; gap: 0.25rem; }
        .filter-tab {
          display: flex; align-items: center; gap: 0.35rem;
          padding: 0.5rem 0.9rem;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); color: var(--text-2);
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500;
          cursor: pointer; transition: all var(--transition);
        }
        .filter-tab:hover { border-color: var(--border-2); color: var(--text-1); }
        .filter-tab.active { background: rgba(255,107,0,0.1); border-color: var(--border-2); color: var(--saffron); }
        .ftab-count {
          background: var(--surface-2); border-radius: 100px;
          padding: 1px 7px; font-size: 0.72rem; color: var(--text-3);
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.6rem 1.1rem;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          border-radius: var(--radius); color: white; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 700;
          box-shadow: 0 4px 16px rgba(255,107,0,0.3);
          transition: transform var(--transition), box-shadow var(--transition);
          text-decoration: none;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,107,0,0.45); }

        /* Table */
        .table-wrap {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius-lg); overflow: auto;
        }
        .posts-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        .posts-table thead tr {
          border-bottom: 1px solid var(--border);
          background: var(--surface-2);
        }
        .posts-table th {
          padding: 0.9rem 1.25rem;
          text-align: left; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3);
          white-space: nowrap;
        }
        .posts-table td { padding: 0.9rem 1.25rem; border-bottom: 1px solid rgba(255,107,0,0.06); }
        .posts-table tbody tr:last-child td { border-bottom: none; }
        .posts-table tbody tr:hover { background: rgba(255,107,0,0.03); }
        .posts-table tbody tr.deleting { opacity: 0.4; pointer-events: none; }

        .td-title { max-width: 320px; }
        .post-title-link {
          font-weight: 600; color: var(--text-1); text-decoration: none;
          display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          transition: color var(--transition);
        }
        .post-title-link:hover { color: var(--saffron); }
        .post-slug { display: block; font-size: 0.75rem; color: var(--text-3); margin-top: 2px; }

        .cat-pill {
          font-size: 0.75rem; padding: 3px 10px;
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: 100px; color: var(--text-2); white-space: nowrap;
        }
        .status-badge {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.07em;
          text-transform: uppercase; padding: 3px 10px; border-radius: 100px;
        }
        .status-badge.published { background: rgba(34,204,136,0.12); color: #22cc88; }
        .status-badge.draft     { background: rgba(255,179,71,0.12);  color: #FFB347; }
        .robots-badge {
          font-size: 0.68rem; font-weight: 700; padding: 3px 10px;
          border-radius: 100px; letter-spacing: 0.05em;
        }
        .robots-badge.index   { background: rgba(100,180,255,0.12); color: #64b4ff; }
        .robots-badge.noindex { background: rgba(255,100,100,0.12); color: #ff8888; }

        .td-date { font-size: 0.8rem; color: var(--text-3); white-space: nowrap; }
        .td-actions { white-space: nowrap; }
        .action-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 7px;
          transition: background var(--transition), color var(--transition);
          text-decoration: none; border: none; cursor: pointer; background: transparent;
          color: var(--text-3);
        }
        .action-btn:hover { background: var(--surface-2); }
        .action-btn.edit:hover  { color: var(--saffron); }
        .action-btn.view:hover  { color: #64b4ff; }
        .action-btn.delete:hover{ color: #ff6666; }
        .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .empty-row { text-align: center; padding: 3rem; color: var(--text-3); }
      `}</style>
    </AdminLayout>
  );
}
