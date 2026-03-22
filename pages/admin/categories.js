// pages/admin/categories.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/layout/AdminLayout';
import { getAdminFromRequest } from '../../lib/auth';
import { getDB } from '../../lib/db';
import toast from 'react-hot-toast';
import s from '../../styles/admin-categories.module.css';

export async function getServerSideProps({ req }) {
  const admin = getAdminFromRequest(req);
  if (!admin) return { redirect: { destination: '/admin', permanent: false } };
  const db = getDB();
  const [categories] = await db.execute(
    `SELECT c.*, COUNT(p.id) AS post_count
     FROM categories c
     LEFT JOIN posts p ON p.category_id = c.id
     GROUP BY c.id ORDER BY c.name`
  );
  return { props: { admin: JSON.parse(JSON.stringify(admin)), categories: JSON.parse(JSON.stringify(categories)) } };
}

export default function Categories({ admin, categories: initialCats }) {
  const router = useRouter();
  const [cats, setCats]     = useState(initialCats);
  const [name, setName]     = useState('');
  const [saving, setSaving] = useState(false);

  const slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), slug }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success('Category added!');
      setName('');
      router.replace(router.asPath);
    } catch { toast.error('Error adding category'); }
    finally { setSaving(false); }
  };

  const del = async (id, catName) => {
    if (!confirm(`Delete "${catName}"?`)) return;
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Deleted'); router.replace(router.asPath); }
    else toast.error('Failed to delete');
  };

  return (
    <AdminLayout title="Categories" admin={admin}>
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
                    <td><span className={s.postCount}>{c.post_count}</span></td>
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
