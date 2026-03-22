// lib/api.js — Central API helper for calling the backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/** Get the auth token (client-side only) */
function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('codepromix_admin_token');
}

/** Build headers with optional auth */
function authHeaders(extra = {}) {
  const headers = { ...extra };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

/**
 * Server-side fetch (from getStaticProps / getServerSideProps).
 * No auth needed — public endpoints only.
 */
export async function serverFetch(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

/** GET request (client-side, with auth) */
export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (res.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('codepromix_admin_token');
    window.location.href = '/admin';
    return null;
  }
  if (!res.ok) throw { status: res.status, ...data };
  return data;
}

/** POST request (JSON body, with auth) */
export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (res.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('codepromix_admin_token');
    window.location.href = '/admin';
    return null;
  }
  if (!res.ok) throw { status: res.status, ...data };
  return data;
}

/** PUT request (JSON body, with auth) */
export async function apiPut(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (res.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('codepromix_admin_token');
    window.location.href = '/admin';
    return null;
  }
  if (!res.ok) throw { status: res.status, ...data };
  return data;
}

/** DELETE request (with auth) */
export async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (res.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('codepromix_admin_token');
    window.location.href = '/admin';
    return null;
  }
  if (!res.ok) throw { status: res.status, ...data };
  return data;
}

/** PATCH request (JSON body, with auth) */
export async function apiPatch(path, body = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'PATCH',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (res.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('codepromix_admin_token');
    window.location.href = '/admin';
    return null;
  }
  if (!res.ok) throw { status: res.status, ...data };
  return data;
}

/** Upload file (FormData, with auth) */
export const apiUpload = async (url, formData, method = 'POST') => {
  const token = getToken();
  const res = await fetch(`${API_URL}${url}`, {
    method,
    headers: { Authorization: token ? `Bearer ${token}` : '' },
    body: formData,
  });
  const data = await res.json();
  if (res.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('codepromix_admin_token');
    window.location.href = '/admin';
    return null;
  }
  if (!res.ok) throw { status: res.status, ...data };
  return data;
}

/** Get full URL for an upload path (e.g. /uploads/posts/image.jpg) */
export function uploadUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
}

/** API base URL export for direct usage */
export { API_URL };
