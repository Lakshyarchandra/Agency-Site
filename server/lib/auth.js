// server/lib/auth.js
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'fallback_secret';

const signToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: '7d' });

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};

// Express middleware — reads Authorization: Bearer <token>
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Session expired' });
  }
  req.admin = user;
  next();
}

module.exports = { signToken, verifyToken, requireAdmin };
