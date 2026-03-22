// pages/admin/messages.js
import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { getAdminFromRequest } from '../../lib/auth';
import { getDB } from '../../lib/db';
import toast from 'react-hot-toast';

export async function getServerSideProps({ req }) {
  const admin = getAdminFromRequest(req);
  if (!admin) return { redirect: { destination: '/admin', permanent: false } };

  const db = getDB();
  const [messages] = await db.execute('SELECT * FROM contacts ORDER BY created_at DESC');

  return { props: { admin: JSON.parse(JSON.stringify(admin)), messages: JSON.parse(JSON.stringify(messages)) } };
}

export default function Messages({ admin, messages: initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState(null);

  const open = async (msg) => {
    setSelected(msg);
    if (!msg.is_read) {
      await fetch(`/api/contact/${msg.id}/read`, { method: 'PATCH' });
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: 1 } : m));
    }
  };

  const deleteMsg = async (id) => {
    if (!confirm('Delete this message?')) return;
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selected?.id === id) setSelected(null);
      toast.success('Message deleted');
    }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <AdminLayout title="Messages" admin={admin}>
      <div className="inbox-root">
        {/* List pane */}
        <div className="inbox-list">
          <div className="inbox-header">
            <h2>Inbox</h2>
            {unreadCount > 0 && <span className="inbox-badge">{unreadCount} new</span>}
          </div>
          <div className="msg-list">
            {messages.length === 0 && (
              <div className="msg-empty">No messages yet.</div>
            )}
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`msg-row ${!msg.is_read ? 'unread' : ''} ${selected?.id === msg.id ? 'active' : ''}`}
                onClick={() => open(msg)}
              >
                <div className="mr-avatar">{msg.name[0].toUpperCase()}</div>
                <div className="mr-body">
                  <div className="mr-top">
                    <span className="mr-name">{msg.name}</span>
                    <span className="mr-time">{new Date(msg.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</span>
                  </div>
                  <div className="mr-service">{msg.service || msg.email}</div>
                  <div className="mr-preview">{msg.message.slice(0, 70)}…</div>
                </div>
                {!msg.is_read && <span className="unread-dot" />}
              </div>
            ))}
          </div>
        </div>

        {/* Detail pane */}
        <div className="inbox-detail">
          {!selected ? (
            <div className="detail-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <p>Select a message to read it</p>
            </div>
          ) : (
            <div className="detail-content">
              <div className="detail-header">
                <div className="dh-info">
                  <div className="dh-avatar">{selected.name[0]}</div>
                  <div>
                    <h3 className="dh-name">{selected.name}</h3>
                    <p className="dh-meta">
                      <a href={`mailto:${selected.email}`}>{selected.email}</a>
                      {selected.phone && <> · <a href={`tel:${selected.phone}`}>{selected.phone}</a></>}
                    </p>
                  </div>
                </div>
                <button className="del-btn" onClick={() => deleteMsg(selected.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                  </svg>
                  Delete
                </button>
              </div>

              {selected.service && (
                <div className="detail-service">
                  <span className="service-label">Interested in</span>
                  <span className="service-val">{selected.service}</span>
                </div>
              )}

              <div className="detail-date">
                {new Date(selected.created_at).toLocaleString('en-IN', {
                  weekday: 'long', day: 'numeric', month: 'long',
                  year: 'numeric', hour: '2-digit', minute: '2-digit',
                })}
              </div>

              <div className="detail-msg">{selected.message}</div>

              <div className="detail-actions">
                <a href={`mailto:${selected.email}?subject=Re: Your enquiry — CodePromix Agency`}
                  className="reply-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
                  </svg>
                  Reply via Email
                </a>
                {selected.phone && (
                  <a href={`https://wa.me/${selected.phone.replace(/\D/g,'')}`}
                    target="_blank" rel="noopener noreferrer" className="wa-btn">
                    💬 WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .inbox-root {
          display: grid; grid-template-columns: 360px 1fr; gap: 0;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius-lg); overflow: hidden;
          min-height: 600px;
        }

        /* List pane */
        .inbox-list { border-right: 1px solid var(--border); display: flex; flex-direction: column; }
        .inbox-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border);
        }
        .inbox-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--text-1);
        }
        .inbox-badge {
          font-size: 0.68rem; font-weight: 700; padding: 3px 10px;
          background: rgba(255,107,0,0.15); border: 1px solid rgba(255,107,0,0.3);
          color: var(--saffron); border-radius: 100px;
        }
        .msg-list { flex: 1; overflow-y: auto; }
        .msg-empty { padding: 3rem; text-align: center; color: var(--text-3); font-size: 0.9rem; }
        .msg-row {
          display: flex; align-items: flex-start; gap: 0.85rem;
          padding: 1rem 1.5rem; border-bottom: 1px solid var(--border);
          cursor: pointer; position: relative;
          transition: background var(--transition);
        }
        .msg-row:hover { background: rgba(255,107,0,0.04); }
        .msg-row.active { background: rgba(255,107,0,0.08); }
        .msg-row.unread .mr-name { color: var(--saffron); }
        .mr-avatar {
          width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700; color: white;
        }
        .mr-body { flex: 1; min-width: 0; }
        .mr-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
        .mr-name { font-size: 0.9rem; font-weight: 700; color: var(--text-1); }
        .mr-time { font-size: 0.72rem; color: var(--text-3); }
        .mr-service { font-size: 0.78rem; color: var(--saffron); font-weight: 500; margin-bottom: 3px; }
        .mr-preview { font-size: 0.8rem; color: var(--text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .unread-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--saffron); flex-shrink: 0; margin-top: 4px;
        }

        /* Detail pane */
        .inbox-detail { display: flex; flex-direction: column; }
        .detail-empty {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1rem; color: var(--text-3);
        }
        .detail-empty p { font-size: 0.9rem; }
        .detail-content { padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .detail-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .dh-info { display: flex; align-items: center; gap: 1rem; }
        .dh-avatar {
          width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; font-weight: 700; color: white;
        }
        .dh-name { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 700; color: var(--text-1); }
        .dh-meta { font-size: 0.85rem; color: var(--text-3); margin-top: 2px; }
        .dh-meta a { color: var(--saffron); }
        .del-btn {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.5rem 1rem; background: rgba(255,80,80,0.08);
          border: 1px solid rgba(255,80,80,0.2); border-radius: var(--radius);
          color: #ff8888; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 600;
          cursor: pointer; transition: background var(--transition);
        }
        .del-btn:hover { background: rgba(255,80,80,0.15); }
        .detail-service {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(255,107,0,0.06); border: 1px solid rgba(255,107,0,0.15);
          border-radius: var(--radius);
        }
        .service-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-3); }
        .service-val { font-size: 0.9rem; font-weight: 700; color: var(--saffron); }
        .detail-date { font-size: 0.8rem; color: var(--text-3); }
        .detail-msg {
          font-size: 0.96rem; line-height: 1.8; color: var(--text-1);
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 1.5rem;
          white-space: pre-wrap;
        }
        .detail-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .reply-btn, .wa-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.65rem 1.25rem; border-radius: var(--radius);
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 700;
          text-decoration: none; transition: transform var(--transition), box-shadow var(--transition);
        }
        .reply-btn {
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          color: white; box-shadow: 0 4px 16px rgba(255,107,0,0.3);
        }
        .reply-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,107,0,0.45); }
        .wa-btn {
          background: rgba(34,180,100,0.12); border: 1px solid rgba(34,180,100,0.3);
          color: #22b464;
        }
        .wa-btn:hover { background: rgba(34,180,100,0.2); }

        @media (max-width: 768px) {
          .inbox-root { grid-template-columns: 1fr; }
          .inbox-list { border-right: none; border-bottom: 1px solid var(--border); max-height: 300px; }
        }
      `}</style>
    </AdminLayout>
  );
}
