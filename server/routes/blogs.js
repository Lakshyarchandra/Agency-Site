// server/routes/blogs.js
const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { getDB }        = require('../lib/db');
const { requireAdmin } = require('../lib/auth');

const router = express.Router();

// ── Multer setup for image uploads ──────────────────────────
const uploadDir = path.join(__dirname, '..', 'uploads', 'posts');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    cb(null, allowed.includes(file.mimetype));
  },
});

// ── GET /api/blogs/published — public list of published posts ─
router.get('/published', async (_req, res) => {
  const db = getDB();
  try {
    const [posts] = await db.execute(
      `SELECT p.id, p.title, p.slug, p.excerpt, p.feature_image,
              p.published_at, c.name AS category
       FROM posts p
       LEFT JOIN categories c ON c.id = p.category_id
       WHERE p.status = 'published'
       ORDER BY p.published_at DESC`
    );
    return res.status(200).json({ posts });
  } catch (err) {
    console.error('[blogs/published GET]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/blogs/slug/:slug — single published post by slug (public) ─
router.get('/slug/:slug', async (req, res) => {
  const db = getDB();
  try {
    const [rows] = await db.execute(
      `SELECT p.*, c.name AS category, a.name AS author_name
       FROM posts p
       LEFT JOIN categories c ON c.id = p.category_id
       LEFT JOIN admins a ON a.id = p.author_id
       WHERE p.slug = ? AND p.status = 'published'`,
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: 'Post not found' });

    const [related] = await db.execute(
      `SELECT id, title, slug, feature_image, published_at
       FROM posts
       WHERE status='published' AND slug != ? AND category_id = ?
       LIMIT 3`,
      [req.params.slug, rows[0].category_id || 0]
    );

    return res.status(200).json({ post: rows[0], related });
  } catch (err) {
    console.error('[blogs/slug GET]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/blogs/upload — image upload (admin) ───────────
router.post('/upload', requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file received' });
  const url = `/uploads/posts/${req.file.filename}`;
  return res.status(200).json({ url });
});

// ── GET /api/blogs — list all posts (admin) ─────────────────
router.get('/', requireAdmin, async (req, res) => {
  const db = getDB();
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
});

// ── POST /api/blogs — create post (admin) ───────────────────
router.post('/', requireAdmin, upload.single('feature_image'), async (req, res) => {
  const {
    title, slug, excerpt, content, category_id,
    status, meta_title, meta_description, meta_keywords, robots,
  } = req.body;

  if (!title?.trim()) return res.status(400).json({ error: 'Title is required' });
  if (!slug?.trim())  return res.status(400).json({ error: 'Slug is required' });

  // Handle optional feature image from multer
  let feature_image = req.body.feature_image || null;
  if (req.file) {
    feature_image = `/uploads/posts/${req.file.filename}`;
  }

  const db = getDB();
  try {
    const [existing] = await db.execute('SELECT id FROM posts WHERE slug = ?', [slug.trim()]);
    if (existing.length) return res.status(409).json({ error: 'Slug already exists.' });

    const published_at = status === 'published' ? new Date() : null;

    const [result] = await db.execute(
      `INSERT INTO posts
         (title, slug, excerpt, content, feature_image, category_id, author_id,
          status, meta_title, meta_description, meta_keywords, robots, published_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        title.trim(), slug.trim(), excerpt?.trim() || null,
        content || null, feature_image,
        category_id || null, req.admin.id,
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
});

// ── GET /api/blogs/:id — single post by ID (admin) ─────────
router.get('/:id', requireAdmin, async (req, res) => {
  const db = getDB();
  try {
    const [rows] = await db.execute(
      `SELECT p.*, c.name AS category_name FROM posts p
       LEFT JOIN categories c ON c.id = p.category_id
       WHERE p.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Post not found' });
    return res.status(200).json({ post: rows[0] });
  } catch (err) {
    console.error('[blog GET id]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/blogs/:id — update post (admin) ────────────────
router.put('/:id', requireAdmin, upload.single('feature_image'), async (req, res) => {
  const { id } = req.params;
  const {
    title, slug, excerpt, content, category_id,
    status, meta_title, meta_description, meta_keywords, robots,
  } = req.body;

  if (!title?.trim()) return res.status(400).json({ error: 'Title is required' });
  if (!slug?.trim())  return res.status(400).json({ error: 'Slug is required' });

  let feature_image = req.body.feature_image || null;
  if (req.file) {
    feature_image = `/uploads/posts/${req.file.filename}`;
  }

  const db = getDB();
  try {
    const [existing] = await db.execute(
      'SELECT id FROM posts WHERE slug = ? AND id != ?',
      [slug.trim(), id]
    );
    if (existing.length) return res.status(409).json({ error: 'Slug already taken.' });

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
        feature_image, status || 'draft',
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
});

// ── DELETE /api/blogs/:id — delete post (admin) ─────────────
router.delete('/:id', requireAdmin, async (req, res) => {
  const db = getDB();
  try {
    await db.execute('DELETE FROM posts WHERE id = ?', [req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[blog DELETE]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
