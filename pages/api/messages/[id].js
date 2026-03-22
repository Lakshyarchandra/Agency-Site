// pages/api/messages/[id].js
import { getDB } from '../../../lib/db';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  const { id } = req.query;
  const db = getDB();

  // Mark as read
  if (req.method === 'PATCH') {
    try {
      await db.execute('UPDATE contacts SET is_read = 1 WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // Delete
  if (req.method === 'DELETE') {
    try {
      await db.execute('DELETE FROM contacts WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
