// components/layout/Footer.js
import Link from 'next/link';
import s from '../../styles/footer.module.css';

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
    <footer className={s.footer}>
      {/* Animated top border */}
      <div className={s.topBorder} />

      {/* Main footer grid */}
      <div className={`${s.mainSection} container`}>
        <div className={s.grid}>

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className={s.logo}>
              <img src="/logo.png" alt="CodePromix" className={s.logoImage} />
            </Link>
            <p className={s.aboutText}>
              We craft digital experiences that drive real growth — from stunning websites and
              powerful SEO to WordPress plugins built for performance.
            </p>
            <div className={s.socials}>
              {SOCIAL.map(({ name, href, icon }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                  className={s.socialButton} title={name}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className={s.columnTitle}>Quick Links</h4>
            <ul className={s.linkList}>
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={s.columnLink}>
                    <span className={s.linkArrow}>›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className={s.columnTitle}>Our Services</h4>
            <ul className={s.linkList}>
              {SERVICES.map(sv => (
                <li key={sv}>
                  <Link href="/#services" className={s.columnLink}>
                    <span className={s.linkArrow}>›</span> {sv}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Areas & Contact */}
          <div>
            <h4 className={s.columnTitle}>Areas We Serve</h4>
            <div className={s.areasCloud}>
              {AREAS.map(a => (
                <span key={a} className={s.areaPill}>{a}</span>
              ))}
            </div>

            <h4 className={s.columnTitle} style={{ marginTop: '1.75rem' }}>Get In Touch</h4>
            <div className={s.contactList}>
              <a href="mailto:hello@CodePromix.in" className={s.contactItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                hello@CodePromix.in
              </a>
              <a href="tel:+919999999999" className={s.contactItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 99999 99999
              </a>
              <span className={s.contactItem}>
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
      <div className={s.bottomBar}>
        <div className={`container ${s.bottomInner}`}>
          <p className={s.copyright}>
            © {year} <strong>CodePromix</strong>. All rights reserved.
          </p>
          <div className={s.legalLinks}>
            <Link href="/privacy" className={s.legalLink}>Privacy Policy</Link>
            <span className={s.separator}>·</span>
            <Link href="/terms" className={s.legalLink}>Terms of Service</Link>
            <span className={s.separator}>·</span>
            <Link href="/sitemap.xml" className={s.legalLink}>Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className={`${s.glow} ${s.glow1}`} />
      <div className={`${s.glow} ${s.glow2}`} />
    </footer>
  );
}
