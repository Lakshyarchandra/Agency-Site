// pages/api/auth/admin-login.js
import bcrypt from 'bcryptjs';
import { getDB } from '../../../lib/db';
import { signToken, setCookie } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email?.trim() || !password) return res.status(400).json({ error: 'Email and password required' });

  const db = getDB();
  try {
    const [rows] = await db.execute(
      'SELECT id, name, email, password, role FROM admins WHERE email = ?',
      [email.toLowerCase().trim()]
    );
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

    const admin = rows[0];
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken({ id: admin.id, name: admin.name, email: admin.email, role: admin.role, type: 'admin' });
    setCookie(res, token);

    return res.status(200).json({
      success: true,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    console.error('[admin-login]', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
