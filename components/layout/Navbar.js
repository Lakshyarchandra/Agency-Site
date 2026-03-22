// components/layout/Navbar.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../../context/ThemeContext';

const NAV = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blogs',    href: '/blogs' },
];

export default function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [router.pathname]);

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href.replace('/#', '/'));
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner container">

          {/* Logo */}
          <Link href="/" className="logo">
            {/* Same image — CSS handles dark/light appearance */}
            <img
              src="/logo.png"
              alt="CodePromix"
              className="logo-img"
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={`nav-link ${isActive(href) ? 'active' : ''}`}>
                  {label}
                  <span className="nav-underline" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="nav-cta">

            {/* Theme toggle */}
            {mounted && (
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <span className="theme-toggle-thumb">
                  {theme === 'dark' ? '🌙' : '☀️'}
                </span>
              </button>
            )}

            <Link href="/contact" className="btn-nav">
              Get Started
            </Link>

            <button
              className={`burger ${open ? 'open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${open ? 'open' : ''}`}>
        <ul>
          {NAV.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={`mob-link ${isActive(href) ? 'active' : ''}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mob-bottom">
          <Link href="/contact" className="mob-cta">Get Started</Link>
          {mounted && (
            <button className="mob-theme-btn" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          )}
        </div>
      </div>
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      <style jsx>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          height: var(--header-h);
          transition: background var(--transition), border-color var(--transition), box-shadow var(--transition);
        }
        .navbar.scrolled {
          background: var(--ink);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
          box-shadow: var(--shadow-md);
        }
        [data-theme="light"] .navbar.scrolled {
          background: rgba(255,255,255,0.92);
        }
        .nav-inner { height: 100%; display: flex; align-items: center; }

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

        /* Nav links */
        .nav-links {
          display: flex; list-style: none; gap: 3.00rem;
          margin: 0 auto; padding: 0;
        }
        .nav-link {
          position: relative; display: block;
          padding: 0.45rem 1rem;
          font-size: 0.92rem; font-weight: 500;
          color: var(--text-2); letter-spacing: 0.02em;
          transition: color var(--transition);
        }
        .nav-link:hover, .nav-link.active { color: var(--text-1); }
        .nav-underline {
          position: absolute; bottom: -2px; 
          height: 2px; background: var(--saffron); border-radius: 1px;
          transition: left var(--transition), right var(--transition);
        }
        .nav-link:hover .nav-underline,
        .nav-link.active .nav-underline { left: 1rem; right: 1rem; }

        /* Right side */
        .nav-cta { display: flex; align-items: center; gap: 0.85rem; margin-left: auto; }

        /* CTA button */
        .btn-nav {
          display: inline-block;
          padding: 0.52rem 1.4rem;
          background: var(--saffron);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; border-radius: 7px;
          border-top: 1px solid rgba(255,255,255,0.25);
          border-left: 1px solid rgba(255,255,255,0.15);
          border-right: 1px solid rgba(0,0,0,0.15);
          border-bottom: 1px solid rgba(0,0,0,0.15);
          box-shadow: 0 5px 0 0 var(--saffron-dk), 0 6px 16px rgba(201,77,0,0.5);
          position: relative; top: 0;
          transition: top 0.08s ease, box-shadow 0.08s ease, background 0.12s ease;
          user-select: none; white-space: nowrap;
        }
        .btn-nav:hover {
          background: var(--saffron-lt); top: -2px;
          box-shadow: 0 7px 0 0 var(--saffron-dk), 0 10px 22px rgba(201,77,0,0.55);
        }
        .btn-nav:active {
          background: var(--saffron-dk); top: 5px;
          box-shadow: 0 0px 0 0 var(--saffron-dk), 0 2px 8px rgba(201,77,0,0.3);
        }

        /* Burger */
        .burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; }
        .burger span {
          display: block; width: 22px; height: 2px;
          background: var(--text-1); border-radius: 1px;
          transition: transform 0.3s, opacity 0.3s, background var(--transition);
          transform-origin: center;
        }
        .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .burger.open span:nth-child(2) { opacity: 0; }
        .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-drawer {
          position: fixed; top: var(--header-h); left: 0; right: 0; z-index: 998;
          background: var(--ink);
          border-bottom: 1px solid var(--border);
          padding: 1.5rem 2rem 2rem;
          transform: translateY(-110%); opacity: 0;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s;
          pointer-events: none;
        }
        .mobile-drawer.open { transform: translateY(0); opacity: 1; pointer-events: all; }
        .mobile-drawer ul { list-style: none; display: flex; flex-direction: column; gap: 0.25rem; }
        .mob-link {
          display: block; padding: 0.8rem 0;
          font-size: 1.1rem; font-weight: 500; color: var(--text-2);
          border-bottom: 1px solid var(--border);
          transition: color var(--transition);
        }
        .mob-link:hover, .mob-link.active { color: var(--saffron); }
        .mob-bottom { display: flex; align-items: center; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; }
        .mob-cta {
          display: inline-block; padding: 0.75rem 2rem;
          background: var(--saffron); border-radius: 7px;
          box-shadow: 0 4px 0 var(--saffron-dk);
          color: white; font-size: 1rem; font-weight: 700;
        }
        .mob-theme-btn {
          background: var(--surface-2); border: 1px solid var(--border-2);
          border-radius: 7px; padding: 0.7rem 1rem;
          color: var(--text-1); font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          transition: background var(--transition), border-color var(--transition);
        }
        .mob-theme-btn:hover { border-color: var(--saffron); background: rgba(255,107,0,0.08); }

        .overlay { position: fixed; inset: 0; z-index: 997; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .btn-nav   { display: none; }
          .burger    { display: flex; }
        }
      `}</style>
    </>
  );
}