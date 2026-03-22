// pages/api/categories/index.js
import { getDB } from '../../../lib/db';

export default async function handler(req, res) {
  const db = getDB();

  if (req.method === 'GET') {
    try {
      const [cats] = await db.execute('SELECT * FROM categories ORDER BY name');
      return res.status(200).json({ categories: cats });
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
  if (req.method === 'POST') {
    const admin = (await import('../../../lib/auth')).requireAdmin(req, res);
    if (!admin) return;
    const { name, slug } = req.body;
    if (!name?.trim() || !slug?.trim()) return res.status(400).json({ error: 'Name and slug required' });
    try {
      const [r] = await db.execute('INSERT INTO categories (name, slug) VALUES (?,?)', [name.trim(), slug.trim()]);
      return res.status(201).json({ success: true, id: r.insertId });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Category already exists' });
      return res.status(500).json({ error: 'Server error' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
