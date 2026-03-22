// pages/api/messages/index.js
import { getDB } from '../../../lib/db';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  const db = getDB();

  if (req.method === 'GET') {
    try {
      const [messages] = await db.execute(
        'SELECT * FROM contacts ORDER BY created_at DESC'
      );
      return res.status(200).json({ messages });
    } catch (err) {
      console.error('[messages GET]', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
