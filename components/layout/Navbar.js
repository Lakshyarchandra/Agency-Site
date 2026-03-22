// components/layout/Navbar.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../../context/ThemeContext';
import s from '../../styles/navbar.module.css';

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
      <nav className={`${s.navbar} ${scrolled ? s.navbarScrolled : ''}`}>
        <div className={`${s.navInner} container`}>

          {/* Logo */}
          <Link href="/" className={s.logo}>
            <img src="/logo.png" alt="CodePromix" className={s.logoImage} />
          </Link>

          {/* Desktop nav links */}
          <ul className={s.navLinks}>
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${s.navLink} ${isActive(href) ? s.navLinkActive : ''}`}
                >
                  {label}
                  <span className={s.navUnderline} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className={s.navCta}>
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

            <Link href="/contact" className={s.ctaButton}>
              Get Started
            </Link>

            <button
              className={`${s.burger} ${open ? s.burgerOpen : ''}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span className={s.burgerLine} />
              <span className={s.burgerLine} />
              <span className={s.burgerLine} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`${s.mobileDrawer} ${open ? s.mobileDrawerOpen : ''}`}>
        <ul>
          {NAV.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${s.mobileLink} ${isActive(href) ? s.mobileLinkActive : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={s.mobileBottom}>
          <Link href="/contact" className={s.mobileCta}>Get Started</Link>
          {mounted && (
            <button className={s.mobileThemeButton} onClick={toggleTheme}>
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          )}
        </div>
      </div>
      {open && <div className={s.overlay} onClick={() => setOpen(false)} />}
    </>
  );
}