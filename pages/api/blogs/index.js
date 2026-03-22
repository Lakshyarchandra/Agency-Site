// pages/api/blogs/index.js
import { getDB } from '../../../lib/db';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
  const db = getDB();

  // ── GET — list all posts (admin only) ─────────────────────
  if (req.method === 'GET') {
    const admin = requireAdmin(req, res);
    if (!admin) return;
    try {
      const [posts] = await db.execute(
        `SELECT p.id, p.title, p.slug, p.status, p.published_at, p.created_at,
                c.name AS category
         FROM posts p LEFT JOIN categories c ON c.id = p.category_id
         ORDER BY p.created_at DESC`
      );
      return res.status(200).json({ posts });
    } catch (err) {
      console.error('[blogs GET]', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // ── POST — create post ────────────────────────────────────
  if (req.method === 'POST') {
    const admin = requireAdmin(req, res);
    if (!admin) return;

    const {
      title, slug, excerpt, content, category_id,
      feature_image, status,
      meta_title, meta_description, meta_keywords, robots,
    } = req.body;

    if (!title?.trim()) return res.status(400).json({ error: 'Title is required' });
    if (!slug?.trim())  return res.status(400).json({ error: 'Slug is required' });

    try {
      // Check slug uniqueness
      const [existing] = await db.execute('SELECT id FROM posts WHERE slug = ?', [slug]);
      if (existing.length) return res.status(409).json({ error: 'Slug already exists. Please use a different one.' });

      const published_at = status === 'published' ? new Date() : null;

      const [result] = await db.execute(
        `INSERT INTO posts
         (title, slug, excerpt, content, category_id, author_id, feature_image, status,
          meta_title, meta_description, meta_keywords, robots, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title.trim(), slug.trim(), excerpt?.trim() || null,
          content || null, category_id || null, admin.id,
          feature_image || null,
          status || 'draft',
          meta_title?.trim() || null, meta_description?.trim() || null,
          meta_keywords?.trim() || null, robots || 'index,follow',
          published_at,
        ]
      );

      return res.status(201).json({ success: true, id: result.insertId, slug: slug.trim() });
    } catch (err) {
      console.error('[blogs POST]', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
