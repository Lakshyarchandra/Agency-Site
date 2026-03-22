// server/index.js — CodePromix API Server
require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── CORS ─────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// ── Body parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Serve uploaded files ─────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1y',
  immutable: true,
}));

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/blogs',      require('./routes/blogs'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/messages',   require('./routes/messages'));
app.use('/api/contact',    require('./routes/contact'));
app.use('/api/dashboard',  require('./routes/dashboard'));

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 ──────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ── Error handler ────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[server error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🚀 CodePromix API Server running on http://localhost:${PORT}\n`);
});
