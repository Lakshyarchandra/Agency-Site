// components/layout/Footer.js
import Link from 'next/link';

const SERVICES = [
  'Web Development', 'UI/UX Design', 'Digital Marketing',
  'SEO Optimization', 'WordPress Plugins', 'E-Commerce Solutions',
  'Logo & Branding', 'Social Media Marketing',
];

const QUICK_LINKS = [
  { label: 'Home',        href: '/' },
  { label: 'About Us',    href: '/about' },
  { label: 'Services',    href: '/#services' },
  { label: 'Blog',        href: '/blogs' },
  { label: 'Contact',     href: '/contact' },
  { label: 'Admin Panel', href: '/admin' },
];

const AREAS = [
  'Kolkata', 'Mumbai', 'Delhi NCR', 'Bengaluru',
  'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad',
  'Pan India', 'USA', 'UK', 'Canada', 'Australia', 'UAE',
];

const SOCIAL = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/CodePromix',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/CodePromix',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Twitter/X',
    href: 'https://twitter.com/CodePromix',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/CodePromix',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@CodePromix',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919999999999',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        {/* Animated top border */}
        <div className="footer-border" />

        {/* Newsletter strip
        <div className="newsletter-strip">
          <div className="container ns-inner">
            <div className="ns-text">
              <span className="ns-badge">Newsletter</span>
              <h3>Stay ahead with CodePromix insights</h3>
              <p>Tips on web, SEO, and digital growth — straight to your inbox.</p>
            </div>
            <form className="ns-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div> */}

        {/* Main footer grid */}
        <div className="footer-main container">
          <div className="footer-grid">

            {/* Col 1 — Brand */}
            <div className="fc-brand">
            <Link href="/" className="logo">
            {/* Same image — CSS handles dark/light appearance */}
            <img
              src="/logo.png"
              alt="CodePromix"
              className="logo-img"
            />
          </Link>
              <p className="foot-about">
                We craft digital experiences that drive real growth — from stunning websites and
                powerful SEO to WordPress plugins built for performance.
              </p>
              {/* Social icons */}
              <div className="socials">
                {SOCIAL.map(({ name, href, icon }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                    className="social-btn" title={name}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div className="fc-col">
              <h4 className="fc-title">Quick Links</h4>
              <ul className="fc-list">
                {QUICK_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="fc-link">
                      <span className="fc-arrow">›</span> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Services */}
            <div className="fc-col">
              <h4 className="fc-title">Our Services</h4>
              <ul className="fc-list">
                {SERVICES.map(s => (
                  <li key={s}>
                    <Link href="/#services" className="fc-link">
                      <span className="fc-arrow">›</span> {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Areas & Contact */}
            <div className="fc-col">
              <h4 className="fc-title">Areas We Serve</h4>
              <div className="areas-cloud">
                {AREAS.map(a => (
                  <span key={a} className="area-pill">{a}</span>
                ))}
              </div>

              <h4 className="fc-title" style={{ marginTop: '1.75rem' }}>Get In Touch</h4>
              <div className="contact-list">
                <a href="mailto:hello@CodePromix.in" className="contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  hello@CodePromix.in
                </a>
                <a href="tel:+919999999999" className="contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 99999 99999
                </a>
                <span className="contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Kolkata, West Bengal, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="container fb-inner">
            <p className="copyright">
              © {year} <strong>CodePromix</strong>. All rights reserved.</p>
            <div className="footer-legal">
              <Link href="/privacy" className="legal-link">Privacy Policy</Link>
              <span className="sep">·</span>
              <Link href="/terms" className="legal-link">Terms of Service</Link>
              <span className="sep">·</span>
              <Link href="/sitemap.xml" className="legal-link">Sitemap</Link>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="footer-glow glow-1" />
        <div className="footer-glow glow-2" />
      </footer>

      <style jsx>{`
        .footer {
          position: relative; overflow: hidden;
          background: var(--ink);
          margin-top: 6rem;
        }

        /* Animated top border */
        .footer-border {
          height: 2px;
          background: linear-gradient(90deg,
            transparent 0%, var(--saffron-dk) 20%,
            var(--saffron) 50%, var(--gold) 65%,
            var(--saffron-dk) 80%, transparent 100%);
          background-size: 200% 100%;
          animation: borderShimmer 4s linear infinite;
        }
        @keyframes borderShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }

        /* Newsletter strip */
        .newsletter-strip {
          background: linear-gradient(135deg, rgba(255,107,0,0.06), rgba(255,107,0,0.02));
          border-bottom: 1px solid var(--border);
          padding: 2.5rem 0;
        }
        .ns-inner {
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 2rem; flex-wrap: wrap;
        }
        .ns-badge {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--saffron);
          background: rgba(255,107,0,0.1);
          border: 1px solid var(--border-2);
          padding: 3px 10px; border-radius: 100px;
          margin-bottom: 0.5rem;
        }
        .ns-text h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 700;
          color: var(--text-1); margin-bottom: 0.2rem;
        }
        .ns-text p { font-size: 0.88rem; color: var(--text-2); }
        .ns-form {
          display: flex; gap: 0.5rem; flex-wrap: wrap;
          flex-shrink: 0;
        }
        .ns-form input {
          padding: 0.65rem 1.1rem;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 100px;
          color: var(--text-1); font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; min-width: 220px;
          transition: border-color var(--transition);
        }
        .ns-form input:focus { outline: none; border-color: var(--saffron); }
        .ns-form button {
          padding: 0.65rem 1.5rem;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          border: none; border-radius: 100px;
          color: white; font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 600;
          box-shadow: 0 4px 20px rgba(255,107,0,0.3);
          transition: transform var(--transition), box-shadow var(--transition);
        }
        .ns-form button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(255,107,0,0.45);
        }

        /* Main footer grid */
        .footer-main { padding: 4rem 0 3rem; }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 1fr 1.2fr;
          gap: 3rem;
        }

        /* Brand col */
        .foot-logo {
          display: flex; align-items: center; gap: 0.6rem;
          margin-bottom: 1.2rem;
        }

        /* Logo */
        .logo {
          display: flex; align-items: center;
          text-decoration: none; flex-shrink: 0;
        }
        .logo-img {
          height: 115px;
          width: auto;
          display: block;
          object-fit: contain;
          transition: opacity var(--transition), filter var(--transition);
          /*
           * Logo has transparent bg with dark grey text + orange icon.
           * Dark mode  → looks perfect as-is (dark text reads on dark bg? No —
           *              dark grey on dark bg is invisible, so we brighten it)
           * Light mode → dark grey text disappears on light bg, so we invert
           *              to make text white... but orange must stay orange.
           *              We use brightness(0) invert to flip dark→white,
           *              then drop-shadow to restore a warm tone.
           */
        }

        /* DARK MODE — logo has dark grey text + orange icon on transparent bg.
           Strategy: invert makes text white + turns orange to blue,
           then hue-rotate(180deg) flips blue back to orange range,
           saturate boosts the orange back to full vibrancy. */
        [data-theme="dark"] .logo-img {
          filter: invert(1) hue-rotate(180deg) saturate(3) brightness(1.3) contrast(1.1);
        }

        /* LIGHT MODE — works perfectly as-is, no filter. */
        [data-theme="light"] .logo-img {
          filter: none;
        }

        .logo:hover .logo-img { opacity: 0.82; }
        .foot-about {
          font-size: 0.88rem; line-height: 1.75;
          color: var(--text-2); margin-bottom: 1.25rem;
        }
        .mantra-wrap {
          margin-bottom: 1.5rem;
          display: inline-block;
          padding: 5px 14px;
          border: 1px solid var(--border-2);
          border-radius: 6px;
          background: rgba(255,107,0,0.04);
        }
        .mantra {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem; color: var(--gold);
          letter-spacing: 0.12em;
          animation: mantraGlow 3s ease-in-out infinite;
        }
        @keyframes mantraGlow {
          0%,100% { text-shadow: 0 0 6px rgba(255,179,71,0.2); }
          50%      { text-shadow: 0 0 20px rgba(255,179,71,0.6); }
        }
        .socials { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .social-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-3);
          transition: color var(--transition), border-color var(--transition),
                      background var(--transition), transform var(--transition),
                      box-shadow var(--transition);
        }
        .social-btn:hover {
          color: var(--saffron);
          border-color: var(--border-2);
          background: rgba(255,107,0,0.08);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(255,107,0,0.2);
        }

        /* Column base */
        .fc-col {}
        .fc-title {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--saffron); margin-bottom: 1.1rem;
        }
        .fc-list { list-style: none; display: flex; flex-direction: column; gap: 0.25rem; }
        .fc-link {
          display: flex; align-items: center; gap: 0.35rem;
          font-size: 0.88rem; color: var(--text-2);
          padding: 0.3rem 0;
          transition: color var(--transition), gap var(--transition);
        }
        .fc-link:hover { color: var(--text-1); gap: 0.55rem; }
        .fc-arrow { color: var(--saffron); font-size: 1rem; transition: transform var(--transition); }
        .fc-link:hover .fc-arrow { transform: translateX(2px); }

        /* Areas cloud */
        .areas-cloud { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .area-pill {
          font-size: 0.75rem; font-weight: 500;
          padding: 3px 10px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 100px; color: var(--text-2);
          transition: border-color var(--transition), color var(--transition), background var(--transition);
        }
        .area-pill:hover {
          border-color: var(--border-2);
          color: var(--saffron);
          background: rgba(255,107,0,0.06);
        }

        /* Contact list */
        .contact-list {
          display: flex; flex-direction: column; gap: 0.6rem;
          margin-top: 0.5rem;
        }
        .contact-item {
          display: flex; align-items: center; gap: 0.55rem;
          font-size: 0.86rem; color: var(--text-2);
          transition: color var(--transition);
        }
        a.contact-item:hover { color: var(--saffron); }
        .contact-item svg { flex-shrink: 0; color: var(--saffron); }

        /* Bottom bar */
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding: 1.25rem 0;
        }
        .fb-inner {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
        }
        .copyright { font-size: 0.82rem; color: var(--text-3); }
        .copyright strong { color: var(--text-2); }
        .footer-legal { display: flex; align-items: center; gap: 0.75rem; }
        .legal-link { font-size: 0.82rem; color: var(--text-3); transition: color var(--transition); }
        .legal-link:hover { color: var(--saffron); }
        .sep { color: var(--text-3); font-size: 0.75rem; }

        /* Decorative glows */
        .footer-glow {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
        }
        .glow-1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%);
          bottom: 0; left: -100px;
          animation: glowFloat 12s ease-in-out infinite alternate;
        }
        .glow-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,179,71,0.04) 0%, transparent 70%);
          top: 100px; right: -50px;
          animation: glowFloat 16s ease-in-out infinite alternate-reverse;
        }
        @keyframes glowFloat {
          from { transform: translate(0,0); }
          to   { transform: translate(20px,20px); }
        }

        @media (max-width: 1100px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; }
          .ns-inner { flex-direction: column; }
          .fb-inner { flex-direction: column; text-align: center; }
          .footer-legal { justify-content: center; }
        }
      `}</style>
    </>
  );
}
