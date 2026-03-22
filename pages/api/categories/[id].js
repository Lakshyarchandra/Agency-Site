// pages/api/categories/[id].js
import { requireAdmin } from '../../../lib/auth';
import { getDB } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });
  const admin = requireAdmin(req, res);
  if (!admin) return;
  const db = getDB();
  await db.execute('DELETE FROM categories WHERE id = ?', [req.query.id]);
  return res.status(200).json({ success: true });
}
