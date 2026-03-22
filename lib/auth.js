// lib/auth.js
import jwt from 'jsonwebtoken';
import { serialize, parse } from 'cookie';

const SECRET = process.env.JWT_SECRET || 'fallback_secret';
const COOKIE = 'CodePromix_admin_token';

export const signToken  = (p) => jwt.sign(p, SECRET, { expiresIn: '7d' });
export const verifyToken = (t) => { try { return jwt.verify(t, SECRET); } catch { return null; } };

export function setCookie(res, token) {
  res.setHeader('Set-Cookie', serialize(COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/',
  }));
}
export function clearCookie(res) {
  res.setHeader('Set-Cookie', serialize(COOKIE, '', {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', maxAge: 0, path: '/',
  }));
}
export function getToken(req) {
  return parse(req.headers.cookie || '')[COOKIE] || null;
}
export function requireAdmin(req, res) {
  const token = getToken(req);
  if (!token) { res.status(401).json({ error: 'Not authenticated' }); return null; }
  const user = verifyToken(token);
  if (!user) { res.status(401).json({ error: 'Session expired' }); return null; }
  return user;
}

// For getServerSideProps
export function getAdminFromRequest(req) {
  const token = getToken(req);
  if (!token) return null;
  return verifyToken(token);
}
