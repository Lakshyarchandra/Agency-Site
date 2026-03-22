// pages/admin/messages.js
import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { getAdminFromRequest } from '../../lib/auth';
import { getDB } from '../../lib/db';
import toast from 'react-hot-toast';
import s from '../../styles/admin-messages.module.css';

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
      <div className={s.inboxRoot}>
        {/* List pane */}
        <div className={s.listPane}>
          <div className={s.listHeader}>
            <h2>Inbox</h2>
            {unreadCount > 0 && <span className={s.badge}>{unreadCount} new</span>}
          </div>
          <div className={s.messageList}>
            {messages.length === 0 && (
              <div className={s.emptyState}>No messages yet.</div>
            )}
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`${s.messageRow} ${!msg.is_read ? s.messageRowUnread : ''} ${selected?.id === msg.id ? s.messageRowActive : ''}`}
                onClick={() => open(msg)}
              >
                <div className={s.avatar}>{msg.name[0].toUpperCase()}</div>
                <div className={s.messageBody}>
                  <div className={s.messageTop}>
                    <span className={s.senderName}>{msg.name}</span>
                    <span className={s.messageTime}>{new Date(msg.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</span>
                  </div>
                  <div className={s.messageService}>{msg.service || msg.email}</div>
                  <div className={s.messagePreview}>{msg.message.slice(0, 70)}…</div>
                </div>
                {!msg.is_read && <span className={s.unreadDot} />}
              </div>
            ))}
          </div>
        </div>

        {/* Detail pane */}
        <div className={s.detailPane}>
          {!selected ? (
            <div className={s.detailEmpty}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <p>Select a message to read it</p>
            </div>
          ) : (
            <div className={s.detailContent}>
              <div className={s.detailHeader}>
                <div className={s.detailHeaderInfo}>
                  <div className={s.detailAvatar}>{selected.name[0]}</div>
                  <div>
                    <h3 className={s.detailName}>{selected.name}</h3>
                    <p className={s.detailMeta}>
                      <a href={`mailto:${selected.email}`}>{selected.email}</a>
                      {selected.phone && <> · <a href={`tel:${selected.phone}`}>{selected.phone}</a></>}
                    </p>
                  </div>
                </div>
                <button className={s.deleteButton} onClick={() => deleteMsg(selected.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                  </svg>
                  Delete
                </button>
              </div>

              {selected.service && (
                <div className={s.serviceTag}>
                  <span className={s.serviceLabel}>Interested in</span>
                  <span className={s.serviceValue}>{selected.service}</span>
                </div>
              )}

              <div className={s.detailDate}>
                {new Date(selected.created_at).toLocaleString('en-IN', {
                  weekday: 'long', day: 'numeric', month: 'long',
                  year: 'numeric', hour: '2-digit', minute: '2-digit',
                })}
              </div>

              <div className={s.detailMessage}>{selected.message}</div>

              <div className={s.detailActions}>
                <a href={`mailto:${selected.email}?subject=Re: Your enquiry — CodePromix Agency`}
                  className={s.replyButton}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
                  </svg>
                  Reply via Email
                </a>
                {selected.phone && (
                  <a href={`https://wa.me/${selected.phone.replace(/\D/g,'')}`}
                    target="_blank" rel="noopener noreferrer" className={s.whatsappButton}>
                    💬 WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
