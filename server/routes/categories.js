// server/routes/categories.js
const express = require('express');
const { getDB }        = require('../lib/db');
const { requireAdmin } = require('../lib/auth');

const router = express.Router();

// GET /api/categories — public list
router.get('/', async (_req, res) => {
  const db = getDB();
  try {
    const [cats] = await db.execute('SELECT * FROM categories ORDER BY name');
    return res.status(200).json({ categories: cats });
  } catch (err) {
    console.error('[categories GET]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/categories — admin create
router.post('/', requireAdmin, async (req, res) => {
  const { name, slug } = req.body;
  if (!name?.trim() || !slug?.trim())
    return res.status(400).json({ error: 'Name and slug required' });

  const db = getDB();
  try {
    const [r] = await db.execute(
      'INSERT INTO categories (name, slug) VALUES (?,?)',
      [name.trim(), slug.trim()]
    );
    return res.status(201).json({ success: true, id: r.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ error: 'Category already exists' });
    console.error('[categories POST]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/categories/:id — admin delete
router.delete('/:id', requireAdmin, async (req, res) => {
  const db = getDB();
  try {
    await db.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[categories DELETE]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
