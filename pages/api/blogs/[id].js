// pages/api/blogs/[id].js
import { getDB } from '../../../lib/db';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  const { id } = req.query;
  const db = getDB();

  // ── GET single post ───────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const [rows] = await db.execute(
        `SELECT p.*, c.name AS category_name FROM posts p
         LEFT JOIN categories c ON c.id = p.category_id
         WHERE p.id = ?`,
        [id]
      );
      if (!rows.length) return res.status(404).json({ error: 'Post not found' });
      return res.status(200).json({ post: rows[0] });
    } catch (err) {
      console.error('[blog GET id]', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // ── PUT — update post ─────────────────────────────────────
  if (req.method === 'PUT') {
    const {
      title, slug, excerpt, content, category_id,
      feature_image, status,
      meta_title, meta_description, meta_keywords, robots,
    } = req.body;

    if (!title?.trim()) return res.status(400).json({ error: 'Title is required' });
    if (!slug?.trim())  return res.status(400).json({ error: 'Slug is required' });

    try {
      // Check slug conflict (exclude current post)
      const [existing] = await db.execute(
        'SELECT id FROM posts WHERE slug = ? AND id != ?',
        [slug.trim(), id]
      );
      if (existing.length) return res.status(409).json({ error: 'Slug already taken by another post.' });

      // Get current status to decide published_at
      const [current] = await db.execute('SELECT status, published_at FROM posts WHERE id = ?', [id]);
      if (!current.length) return res.status(404).json({ error: 'Post not found' });

      let published_at = current[0].published_at;
      if (status === 'published' && !published_at) {
        published_at = new Date();
      } else if (status === 'draft') {
        published_at = null;
      }

      await db.execute(
        `UPDATE posts SET
           title=?, slug=?, excerpt=?, content=?, category_id=?,
           feature_image=?, status=?,
           meta_title=?, meta_description=?, meta_keywords=?, robots=?,
           published_at=?
         WHERE id=?`,
        [
          title.trim(), slug.trim(), excerpt?.trim() || null,
          content || null, category_id || null,
          feature_image || null, status || 'draft',
          meta_title?.trim() || null, meta_description?.trim() || null,
          meta_keywords?.trim() || null, robots || 'index,follow',
          published_at, id,
        ]
      );

      return res.status(200).json({ success: true, slug: slug.trim() });
    } catch (err) {
      console.error('[blog PUT]', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // ── DELETE ────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    try {
      await db.execute('DELETE FROM posts WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('[blog DELETE]', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
