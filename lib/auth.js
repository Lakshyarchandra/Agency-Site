// lib/auth.js — Client-side auth helpers (no server-side code)
const TOKEN_KEY = 'codepromix_admin_token';
const ADMIN_KEY = 'codepromix_admin_info';

/** Store JWT token after login */
export function setToken(token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

/** Get stored JWT token */
export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Remove token on logout */
export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

/** Check if user is logged in */
export function isLoggedIn() {
  return !!getToken();
}

/** Store admin info after login */
export function setAdminInfo(admin) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

/** Get stored admin info */
export function getAdminInfo() {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(ADMIN_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
