// pages/contact.js
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/layout/SEOHead';
import toast from 'react-hot-toast';

const SERVICES = [
  'Web Development', 'UI/UX Design', 'Digital Marketing',
  'SEO Optimization', 'WordPress Plugin', 'E-Commerce', 'Other',
];

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', message:'' });
  const [loading, setLoading] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success('Message sent! We\'ll respond within 24 hours.');
      setForm({ name:'', email:'', phone:'', service:'', message:'' });
    } catch { toast.error('Network error. Please try again.'); }
    finally   { setLoading(false); }
  };

  return (
    <>
      <SEOHead
        title="Contact CodePromix Agency — Let's Build Your Digital Future"
        description="Reach out to CodePromix Agency for web development, SEO, digital marketing or WordPress plugin projects. Free consultation available."
        canonical="/contact"
      />
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────── */}
        <section className="contact-hero">
          <div className="container">
            <span className="section-label">Get In Touch</span>
            <h1 className="ch-title">Let's Build Something<br /><em>Extraordinary</em></h1>
            <p className="ch-desc">Free consultation · Transparent pricing · No-obligation quote</p>
          </div>
          <div className="hero-orb" />
        </section>

        {/* ── Contact grid ─────────────────── */}
        <section className="contact-section">
          <div className="container contact-grid">
            {/* Left — Info */}
            <div className="contact-info">
              <h2 className="ci-title">We'd love to hear<br />from you</h2>
              <p className="ci-text">
                Whether you need a new website, SEO help, a WordPress plugin, or a full digital
                marketing strategy — we're here to make it happen.
              </p>
              <div className="ci-items">
                {[
                  { icon: '📧', label: 'Email',    val: 'hello@CodePromix.in',       href: 'mailto:hello@CodePromix.in' },
                  { icon: '📞', label: 'Phone',    val: '+91 99999 99999',       href: 'tel:+919999999999' },
                  { icon: '💬', label: 'WhatsApp', val: 'Chat with us',          href: 'https://wa.me/919999999999' },
                  { icon: '📍', label: 'Office',   val: 'Kolkata, West Bengal',  href: '#' },
                ].map(({ icon, label, val, href }) => (
                  <a key={label} href={href} className="ci-item">
                    <div className="ci-icon">{icon}</div>
                    <div>
                      <div className="ci-label">{label}</div>
                      <div className="ci-val">{val}</div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="ci-hours">
                <span className="ci-dot" />
                <span>Mon–Sat · 9am–7pm IST · Usually respond same day</span>
              </div>
            </div>

            {/* Right — Form */}
            <div className="contact-form-wrap">
              <form className="contact-form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input name="name" type="text" value={form.name} onChange={handle}
                      placeholder="Your name" required />
                  </div>
                  <div className="form-field">
                    <label>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handle}
                      placeholder="you@email.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Phone Number</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handle}
                      placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="form-field">
                    <label>Service Interested In</label>
                    <select name="service" value={form.service} onChange={handle}>
                      <option value="">Select a service</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-field">
                  <label>Your Message *</label>
                  <textarea name="message" rows={6} value={form.message} onChange={handle}
                    placeholder="Tell us about your project, goals, timeline, and budget..." required />
                </div>
                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? (
                    <><span className="spinner" /> Sending…</>
                  ) : (
                    <>Send Message <span>→</span></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .contact-hero {
          padding: calc(var(--header-h) + 5rem) 0 4rem;
          text-align: center; position: relative; overflow: hidden;
        }
        .hero-orb {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,107,0,0.07) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none;
        }
        .ch-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 700; line-height: 1.1; color: var(--text-1);
          margin: 1rem 0 0.75rem;
          animation: fadeUp 0.8s ease both;
        }
        .ch-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ch-desc {
          font-size: 0.95rem; color: var(--text-2);
          animation: fadeUp 0.8s 0.2s ease both;
        }
        .section-label {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--saffron); background: rgba(255,107,0,0.08);
          border: 1px solid rgba(255,107,0,0.28);
          padding: 4px 12px; border-radius: 100px; margin-bottom: 1rem;
        }

        .contact-section { padding: 2rem 0 7rem; }
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem;
          align-items: start;
        }

        /* Info */
        .ci-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: var(--text-1); margin-bottom: 1rem;
        }
        .ci-text { font-size: 0.92rem; line-height: 1.8; color: var(--text-2); margin-bottom: 2rem; }
        .ci-items { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .ci-item {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          transition: border-color var(--transition), transform var(--transition);
          text-decoration: none;
        }
        .ci-item:hover { border-color: var(--border-2); transform: translateX(4px); }
        .ci-icon { font-size: 1.4rem; }
        .ci-label { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
        .ci-val { font-size: 0.92rem; font-weight: 600; color: var(--text-1); }
        .ci-hours {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.82rem; color: var(--text-3);
        }
        .ci-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #44cc88; flex-shrink: 0;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* Form */
        .contact-form-wrap {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 2.5rem;
        }
        .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .form-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-field label {
          font-size: 0.8rem; font-weight: 600; letter-spacing: 0.07em;
          text-transform: uppercase; color: var(--text-2);
        }
        .form-field input,
        .form-field select,
        .form-field textarea {
          background: var(--surface-3); border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 0.8rem 1rem; color: var(--text-1);
          font-family: 'DM Sans', sans-serif; font-size: 0.92rem;
          transition: border-color var(--transition);
          resize: none;
        }
        .form-field input::placeholder,
        .form-field textarea::placeholder { color: var(--text-3); }
        .form-field select { color: var(--text-1); }
        .form-field select option { background: var(--surface-3); }
        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(255,107,0,0.1);
        }
        .form-submit {
          width: 100%; padding: 1rem;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          border: none; border-radius: var(--radius);
          color: white; font-family: 'DM Sans', sans-serif;
          font-size: 1rem; font-weight: 700; letter-spacing: 0.05em;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.4rem;
          box-shadow: 0 6px 30px rgba(255,107,0,0.35);
          transition: transform var(--transition), box-shadow var(--transition), opacity var(--transition);
        }
        .form-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(255,107,0,0.5);
        }
        .form-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; }
          .contact-form-wrap { padding: 1.5rem; }
        }
      `}</style>
    </>
  );
}
