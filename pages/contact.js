// pages/contact.js
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/layout/SEOHead';
import toast from 'react-hot-toast';
import { useScrollReveal } from '../lib/useGSAP';
import s from '../styles/contact.module.css';

const SERVICES = [
  'Web Development', 'UI/UX Design', 'Digital Marketing',
  'SEO Optimization', 'WordPress Plugin', 'E-Commerce', 'Other',
];

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', message:'' });
  const [loading, setLoading] = useState(false);
  const revealRef = useScrollReveal();

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
      if (res.ok) {
        toast.success('Message sent! We\'ll get back to you within 24 hours.');
        setForm({ name:'', email:'', phone:'', service:'', message:'' });
      } else {
        const data = await res.json();
        toast.error(data.error || 'Something went wrong.');
      }
    } catch { toast.error('Network error.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <SEOHead
        title="Contact Us — CodePromix Agency"
        description="Get in touch with CodePromix for web development, digital marketing, SEO, and more."
        canonical="/contact"
      />
      <Navbar />

      <main>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroBg} />
          <div className="container" ref={revealRef}>
            <span className="section-label">Contact Us</span>
            <h1 className={s.heroTitle}>
              Let's <em>Build</em> Something Great
            </h1>
            <p className={s.heroSub}>
              Whether you have a project in mind or just want to chat,
              we'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Main Grid */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className={s.grid}>

              {/* Left — Info */}
              <div>
                <div className={s.infoGroup} ref={revealRef} data-stagger-children={`.${s.infoCard}`} data-stagger="0.1">
                  <div className={s.infoCard}>
                    <div className={s.infoIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                    <div>
                      <div className={s.infoLabel}>Email</div>
                      <div className={s.infoValue}>hello@CodePromix.in</div>
                    </div>
                  </div>
                  <a href="tel:+919999999999" className={s.infoCard} style={{ textDecoration:'none' }}>
                    <div className={s.infoIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <div className={s.infoLabel}>Phone</div>
                      <div className={s.infoValue}>+91 99999 99999</div>
                    </div>
                  </a>
                  <div className={s.infoCard}>
                    <div className={s.infoIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <div className={s.infoLabel}>Location</div>
                      <div className={s.infoValue}>Kolkata, West Bengal, India</div>
                    </div>
                  </div>
                </div>

                <div className={s.quickLinks} ref={revealRef}>
                  <a href="https://wa.me/919999999999" target="_blank" rel="noopener" className={s.quickLink}>💬 WhatsApp</a>
                  <a href="https://instagram.com/CodePromix" target="_blank" rel="noopener" className={s.quickLink}>📸 Instagram</a>
                  <a href="https://linkedin.com/company/CodePromix" target="_blank" rel="noopener" className={s.quickLink}>💼 LinkedIn</a>
                </div>
              </div>

              {/* Right — Form */}
              <div className={s.formCard} ref={revealRef}>
                <h3 className={s.formTitle}>Send us a message</h3>
                <form onSubmit={submit} className={s.form}>
                  <div className={s.formRow}>
                    <div className="form-field">
                      <label>Name *</label>
                      <input name="name" value={form.name} onChange={handle} placeholder="John Doe" required />
                    </div>
                    <div className="form-field">
                      <label>Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handle} placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className={s.formRow}>
                    <div className="form-field">
                      <label>Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+91 99999 99999" />
                    </div>
                    <div className="form-field">
                      <label>Service</label>
                      <select name="service" value={form.service} onChange={handle}>
                        <option value="">Select a service</option>
                        {SERVICES.map(sv => <option key={sv} value={sv}>{sv}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Message *</label>
                    <textarea name="message" rows={5} value={form.message} onChange={handle}
                      placeholder="Tell us about your project…" required />
                  </div>
                  <button type="submit" className={s.submitButton} disabled={loading}>
                    {loading ? <><span className="spinner" /> Sending…</> : 'Send Message →'}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
