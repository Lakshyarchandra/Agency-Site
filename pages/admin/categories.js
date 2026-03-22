// pages/admin/categories.js — Client-side data fetching
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/layout/AdminLayout';
import { isLoggedIn, getAdminInfo } from '../../lib/auth';
import { apiGet, apiPost, apiDelete } from '../../lib/api';
import toast from 'react-hot-toast';
import s from '../../styles/admin-categories.module.css';

export default function Categories() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [cats, setCats]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName]   = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { router.replace('/admin'); return; }
    setAdmin(getAdminInfo());
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await apiGet('/api/categories');
      if (data) setCats(data.categories);
    } catch {}
    finally { setLoading(false); }
  };

  const slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await apiPost('/api/categories', { name: name.trim(), slug });
      toast.success('Category added!');
      setName('');
      loadCategories();
    } catch (err) { toast.error(err?.error || 'Error adding category'); }
    finally { setSaving(false); }
  };

  const del = async (id, catName) => {
    if (!confirm(`Delete "${catName}"?`)) return;
    try {
      await apiDelete(`/api/categories/${id}`);
      toast.success('Deleted');
      setCats(prev => prev.filter(c => c.id !== id));
    } catch { toast.error('Failed to delete'); }
  };

  if (loading) {
    return (
      <AdminLayout title="Categories" admin={admin || {}}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <span className="spinner" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Categories" admin={admin || {}}>
      <div className={s.grid}>
        {/* Add form */}
        <div className={s.formCard}>
          <h3 className={s.cardTitle}>Add New Category</h3>
          <form onSubmit={add} className={s.form}>
            <div className={s.field}>
              <label>Category Name *</label>
              <input type="text" value={name} onChange={e=>setName(e.target.value)}
                placeholder="e.g. WordPress Tips" required />
            </div>
            <div className={s.field}>
              <label>Slug (auto-generated)</label>
              <input type="text" value={slug} readOnly className={s.slugPreview} />
            </div>
            <button type="submit" className={s.addButton} disabled={saving || !name.trim()}>
              {saving ? <span className={s.miniSpinner}/> : '+'}
              Add Category
            </button>
          </form>
        </div>

        {/* List */}
        <div className={s.listCard}>
          <h3 className={s.cardTitle}>All Categories ({cats.length})</h3>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr><th>Name</th><th>Slug</th><th>Posts</th><th></th></tr>
              </thead>
              <tbody>
                {cats.map(c => (
                  <tr key={c.id}>
                    <td className={s.categoryName}>{c.name}</td>
                    <td className={s.categorySlug}>/{c.slug}</td>
                    <td><span className={s.postCount}>{c.post_count || 0}</span></td>
                    <td>
                      <button className={s.deleteButton} onClick={()=>del(c.id,c.name)}
                        title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {cats.length === 0 && (
                  <tr><td colSpan={4} className={s.emptyRow}>No categories yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
