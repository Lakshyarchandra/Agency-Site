// pages/api/contact/[id]/read.js  — mark message as read
import { requireAdmin } from '../../../../lib/auth';
import { getDB } from '../../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });
  const admin = requireAdmin(req, res);
  if (!admin) return;
  const db = getDB();
  await db.execute('UPDATE contacts SET is_read = 1 WHERE id = ?', [req.query.id]);
  return res.status(200).json({ success: true });
}
