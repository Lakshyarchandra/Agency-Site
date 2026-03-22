// server/routes/auth.js
const express = require('express');
const bcrypt  = require('bcryptjs');
const { getDB }       = require('../lib/db');
const { signToken, requireAdmin } = require('../lib/auth');

const router = express.Router();

// POST /api/auth/admin-login
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;
  if (!email?.trim() || !password)
    return res.status(400).json({ error: 'Email and password required' });

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

    const token = signToken({
      id: admin.id, name: admin.name,
      email: admin.email, role: admin.role, type: 'admin',
    });

    return res.status(200).json({
      success: true,
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    console.error('[admin-login]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/admin-logout  (no-op — frontend clears localStorage)
router.post('/admin-logout', (_req, res) => {
  return res.status(200).json({ success: true });
});

// GET /api/auth/me  — verify token & return admin info
router.get('/me', requireAdmin, (req, res) => {
  return res.status(200).json({ admin: req.admin });
});

module.exports = router;
