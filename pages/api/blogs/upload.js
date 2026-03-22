// pages/api/blogs/upload.js
// Feature image upload — saves to /public/uploads/
// Returns the public URL path

import fs from 'fs';
import path from 'path';
import { requireAdmin } from '../../../lib/auth';

export const config = { api: { bodyParser: false } };

// Simple multipart parser without multer (no extra deps needed)
async function parseFormData(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      const boundary = req.headers['content-type']?.split('boundary=')[1];
      if (!boundary) return reject(new Error('No boundary'));

      const parts = body.toString('binary').split(`--${boundary}`);
      let fileBuffer = null;
      let fileName   = 'upload.jpg';
      let mimeType   = 'image/jpeg';

      for (const part of parts) {
        if (part.includes('Content-Disposition') && part.includes('filename=')) {
          const nameMatch = part.match(/filename="([^"]+)"/);
          if (nameMatch) fileName = nameMatch[1];
          const typeMatch = part.match(/Content-Type: ([^\r\n]+)/);
          if (typeMatch) mimeType = typeMatch[1].trim();

          const dataStart = part.indexOf('\r\n\r\n') + 4;
          const dataEnd   = part.lastIndexOf('\r\n');
          if (dataStart > 4 && dataEnd > dataStart) {
            fileBuffer = Buffer.from(part.slice(dataStart, dataEnd), 'binary');
          }
        }
      }
      resolve({ fileBuffer, fileName, mimeType });
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    const { fileBuffer, fileName, mimeType } = await parseFormData(req);

    if (!fileBuffer) return res.status(400).json({ error: 'No file received' });

    // Validate image type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(mimeType)) {
      return res.status(400).json({ error: 'Only JPEG, PNG, WebP and GIF images are allowed' });
    }

    // Limit size: 5 MB
    if (fileBuffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'Image must be under 5MB' });
    }

    const ext      = path.extname(fileName) || '.jpg';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    fs.writeFileSync(path.join(uploadDir, safeName), fileBuffer);

    return res.status(200).json({ url: `/uploads/${safeName}` });
  } catch (err) {
    console.error('[upload]', err);
    return res.status(500).json({ error: 'Upload failed. Please try again.' });
  }
}
