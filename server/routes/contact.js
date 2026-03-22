// server/routes/contact.js
const express = require('express');
const { getDB } = require('../lib/db');

const router = express.Router();

// POST /api/contact — public contact form submission
router.post('/', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim())
    return res.status(400).json({ error: 'Name, email, and message are required' });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Invalid email address' });

  const db = getDB();
  try {
    await db.execute(
      'INSERT INTO contacts (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), phone?.trim() || null, service?.trim() || null, message.trim()]
    );
    return res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('[contact]', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

module.exports = router;
