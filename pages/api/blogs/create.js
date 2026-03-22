// pages/api/blogs/create.js
// Handles multipart/form-data (title, content, feature image upload)

import { requireAdmin } from '../../../lib/auth';
import { getDB } from '../../../lib/db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

function ensureUploadDir() {
  const dir = path.join(process.cwd(), 'public', 'uploads', 'posts');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function parseForm(req) {
  const uploadDir = ensureUploadDir();
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
    filter: ({ mimetype }) => mimetype && mimetype.startsWith('image/'),
  });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    const { fields, files } = await parseForm(req);
    const f = (k) => Array.isArray(fields[k]) ? fields[k][0] : fields[k] || '';

    const title       = f('title').trim();
    const slug        = f('slug').trim();
    const excerpt     = f('excerpt').trim();
    const content     = f('content').trim();
    const category_id = f('category_id') || null;
    const status      = f('status') || 'draft';
    const meta_title  = f('meta_title').trim();
    const meta_desc   = f('meta_description').trim();
    const meta_kw     = f('meta_keywords').trim();
    const robots      = f('robots') || 'index,follow';

    if (!title) return res.status(400).json({ error: 'Title is required' });
    if (!slug)  return res.status(400).json({ error: 'Slug is required' });

    // Handle feature image
    let feature_image = null;
    const imgFile = files.feature_image;
    if (imgFile) {
      const file = Array.isArray(imgFile) ? imgFile[0] : imgFile;
      const ext  = path.extname(file.originalFilename || file.newFilename || '.jpg');
      const name = `${slug}-${Date.now()}${ext}`;
      const dest = path.join(ensureUploadDir(), name);
      fs.renameSync(file.filepath, dest);
      feature_image = `/uploads/posts/${name}`;
    }

    const db = getDB();

    // Check duplicate slug
    const [existing] = await db.execute('SELECT id FROM posts WHERE slug = ?', [slug]);
    if (existing.length) return res.status(409).json({ error: 'Slug already exists. Change your title or slug.' });

    const published_at = status === 'published' ? new Date() : null;

    const [result] = await db.execute(
      `INSERT INTO posts
         (title, slug, excerpt, content, feature_image, category_id, author_id,
          status, meta_title, meta_description, meta_keywords, robots, published_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [title, slug, excerpt, content, feature_image,
       category_id || null, admin.id,
       status, meta_title, meta_desc, meta_kw, robots, published_at]
    );

    return res.status(201).json({ success: true, id: result.insertId, slug });
  } catch (err) {
    console.error('[create post]', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
