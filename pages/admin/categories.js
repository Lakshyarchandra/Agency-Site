// pages/admin/categories.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/layout/AdminLayout';
import { getAdminFromRequest } from '../../lib/auth';
import { getDB } from '../../lib/db';
import toast from 'react-hot-toast';

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
      <div className="cats-grid">
        {/* Add form */}
        <div className="cat-form-card">
          <h3 className="card-title">Add New Category</h3>
          <form onSubmit={add} className="cat-form">
            <div className="field">
              <label>Category Name *</label>
              <input type="text" value={name} onChange={e=>setName(e.target.value)}
                placeholder="e.g. WordPress Tips" required />
            </div>
            <div className="field">
              <label>Slug (auto-generated)</label>
              <input type="text" value={slug} readOnly className="slug-preview" />
            </div>
            <button type="submit" className="btn-add" disabled={saving || !name.trim()}>
              {saving ? <span className="mini-spin"/> : '+'}
              Add Category
            </button>
          </form>
        </div>

        {/* List */}
        <div className="cats-list-card">
          <h3 className="card-title">All Categories ({cats.length})</h3>
          <div className="cats-table-wrap">
            <table className="cats-table">
              <thead>
                <tr><th>Name</th><th>Slug</th><th>Posts</th><th></th></tr>
              </thead>
              <tbody>
                {cats.map(c => (
                  <tr key={c.id}>
                    <td className="ct-name">{c.name}</td>
                    <td className="ct-slug">/{c.slug}</td>
                    <td><span className="ct-count">{c.post_count}</span></td>
                    <td>
                      <button className="del-btn" onClick={()=>del(c.id,c.name)}
                        title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {cats.length === 0 && (
                  <tr><td colSpan={4} className="empty">No categories yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cats-grid { display: grid; grid-template-columns: 340px 1fr; gap: 1.5rem; align-items: start; }
        .cat-form-card, .cats-list-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 1.5rem;
        }
        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 700; color: var(--text-1);
          margin-bottom: 1.25rem; padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }
        .cat-form { display: flex; flex-direction: column; gap: 1rem; }
        .field { display: flex; flex-direction: column; gap: 0.35rem; }
        .field label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-2); }
        .field input {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 0.7rem 1rem;
          color: var(--text-1); font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          transition: border-color var(--transition);
        }
        .field input:focus { outline: none; border-color: var(--saffron); }
        .field input::placeholder { color: var(--text-3); }
        .slug-preview { color: var(--saffron) !important; font-family: 'Space Mono', monospace !important; font-size: 0.82rem !important; }
        .btn-add {
          display: flex; align-items: center; justify-content: center; gap: 0.4rem;
          padding: 0.75rem;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          border: none; border-radius: var(--radius); color: white;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 700;
          cursor: pointer; box-shadow: 0 4px 16px rgba(255,107,0,0.3);
          transition: transform var(--transition), box-shadow var(--transition), opacity var(--transition);
        }
        .btn-add:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,107,0,0.45); }
        .btn-add:disabled { opacity: 0.5; cursor: not-allowed; }
        .mini-spin { width:14px; height:14px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.7s linear infinite; display:inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cats-table-wrap { overflow-x: auto; }
        .cats-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        .cats-table th { padding: 0.7rem 1rem; text-align: left; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); border-bottom: 1px solid var(--border); }
        .cats-table td { padding: 0.85rem 1rem; border-bottom: 1px solid rgba(255,107,0,0.05); }
        .cats-table tbody tr:last-child td { border-bottom: none; }
        .cats-table tbody tr:hover { background: rgba(255,107,0,0.03); }
        .ct-name { font-weight: 600; color: var(--text-1); }
        .ct-slug { font-family: 'Space Mono', monospace; font-size: 0.78rem; color: var(--text-3); }
        .ct-count { padding: 2px 8px; background: rgba(255,107,0,0.1); border-radius: 100px; font-size: 0.75rem; font-weight: 700; color: var(--saffron); }
        .del-btn { background: none; border: none; color: var(--text-3); cursor: pointer; padding: 4px; border-radius: 6px; display: flex; transition: color var(--transition), background var(--transition); }
        .del-btn:hover { color: #ff6666; background: rgba(255,80,80,0.1); }
        .empty { text-align: center; padding: 2rem; color: var(--text-3); }
        @media (max-width: 768px) { .cats-grid { grid-template-columns: 1fr; } }
      `}</style>
    </AdminLayout>
  );
}
