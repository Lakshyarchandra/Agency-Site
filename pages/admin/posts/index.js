// pages/admin/posts/index.js — Client-side data fetching
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/layout/AdminLayout';
import { isLoggedIn, getAdminInfo } from '../../../lib/auth';
import { apiGet, apiDelete } from '../../../lib/api';
import toast from 'react-hot-toast';
import s from '../../../styles/admin-posts.module.css';

export default function PostsList() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (!isLoggedIn()) { router.replace('/admin'); return; }
    setAdmin(getAdminInfo());
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await apiGet('/api/blogs');
      if (data) setPosts(data.posts);
    } catch {}
    finally { setLoading(false); }
  };

  const filtered = posts.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const deletePost = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await apiDelete(`/api/blogs/${id}`);
      toast.success('Post deleted');
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch { toast.error('Failed to delete'); }
    finally { setDeleting(null); }
  };

  if (loading) {
    return (
      <AdminLayout title="Blog Posts" admin={admin || {}}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <span className="spinner" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Blog Posts" admin={admin || {}}>
      {/* Toolbar */}
      <div className={s.toolbar}>
        <div className={s.toolbarLeft}>
          <div className={s.searchWrap}>
            <svg className={s.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text" placeholder="Search posts…"
              value={search} onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className={s.filterTabs}>
            {['all', 'published', 'draft'].map(f => (
              <button key={f}
                className={`${s.filterTab} ${filterStatus === f ? s.filterTabActive : ''}`}
                onClick={() => setFilterStatus(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className={s.filterCount}>
                  {f === 'all' ? posts.length : posts.filter(p => p.status === f).length}
                </span>
              </button>
            ))}
          </div>
        </div>
        <Link href="/admin/posts/new" className={s.newPostBtn}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Post
        </Link>
      </div>

      {/* Table */}
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr><th>Title</th><th>Category</th><th>Status</th><th>SEO</th><th>Published</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className={s.emptyRow}>No posts found.</td></tr>
            )}
            {filtered.map(post => (
              <tr key={post.id} className={deleting === post.id ? s.rowDeleting : ''}>
                <td className={s.tdTitle}>
                  <Link href={`/admin/posts/${post.id}`} className={s.postTitleLink}>{post.title}</Link>
                  <span className={s.postSlug}>/{post.slug}</span>
                </td>
                <td><span className={s.catPill}>{post.category || '—'}</span></td>
                <td><span className={`status-badge ${post.status}`}>{post.status}</span></td>
                <td>
                  <span className={`${s.robotsBadge} ${post.robots?.startsWith('index') ? s.robotsIndex : s.robotsNoindex}`}>
                    {post.robots?.startsWith('index') ? 'Indexed' : 'No Index'}
                  </span>
                </td>
                <td className={s.tdDate}>
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
                    : '—'}
                </td>
                <td className={s.tdActions}>
                  <Link href={`/admin/posts/${post.id}`} className={`${s.actionBtn} ${s.actionBtnEdit}`} title="Edit">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </Link>
                  <Link href={`/blogs/${post.slug}`} target="_blank" className={`${s.actionBtn} ${s.actionBtnView}`} title="View">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </Link>
                  <button className={`${s.actionBtn} ${s.actionBtnDelete}`} title="Delete"
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
    </AdminLayout>
  );
}
