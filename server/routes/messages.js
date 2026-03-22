// server/routes/messages.js
const express = require('express');
const { getDB }        = require('../lib/db');
const { requireAdmin } = require('../lib/auth');

const router = express.Router();

// GET /api/messages — list all contacts (admin)
router.get('/', requireAdmin, async (req, res) => {
  const db = getDB();
  try {
    const [messages] = await db.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    return res.status(200).json({ messages });
  } catch (err) {
    console.error('[messages GET]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/messages/:id — mark as read (admin)
router.patch('/:id', requireAdmin, async (req, res) => {
  const db = getDB();
  try {
    await db.execute('UPDATE contacts SET is_read = 1 WHERE id = ?', [req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[messages PATCH]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/messages/:id — delete (admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  const db = getDB();
  try {
    await db.execute('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[messages DELETE]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
