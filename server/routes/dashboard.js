// server/routes/dashboard.js
const express = require('express');
const { getDB }        = require('../lib/db');
const { requireAdmin } = require('../lib/auth');

const router = express.Router();

// GET /api/dashboard/stats — admin dashboard data
router.get('/stats', requireAdmin, async (req, res) => {
  const db = getDB();
  try {
    const [[{ totalPosts }]]    = await db.execute("SELECT COUNT(*) AS totalPosts FROM posts");
    const [[{ published }]]     = await db.execute("SELECT COUNT(*) AS published FROM posts WHERE status='published'");
    const [[{ drafts }]]        = await db.execute("SELECT COUNT(*) AS drafts FROM posts WHERE status='draft'");
    const [[{ totalMessages }]] = await db.execute("SELECT COUNT(*) AS totalMessages FROM contacts");
    const [[{ unread }]]        = await db.execute("SELECT COUNT(*) AS unread FROM contacts WHERE is_read=0");

    const [recentPosts] = await db.execute(
      `SELECT id, title, slug, status, published_at, created_at FROM posts ORDER BY created_at DESC LIMIT 5`
    );
    const [recentMessages] = await db.execute(
      `SELECT id, name, email, service, is_read, created_at FROM contacts ORDER BY created_at DESC LIMIT 5`
    );

    return res.status(200).json({
      stats: { totalPosts, published, drafts, totalMessages, unread },
      recentPosts,
      recentMessages,
    });
  } catch (err) {
    console.error('[dashboard/stats]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
