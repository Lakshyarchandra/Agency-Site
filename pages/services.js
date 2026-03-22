// pages/services.js
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/layout/SEOHead';
import { useScrollReveal, useCounterAnimation } from '../lib/useGSAP';
import s from '../styles/services.module.css';

const SERVICES = [
  {
    id: 'web', icon: '🌐', label: 'Web Dev',
    title: 'Web Development', tagline: 'Custom code, blazing speed, zero compromises',
    desc: 'We build high-performance websites and web applications using the latest technologies. From landing pages to full-stack platforms, every project is crafted for speed, SEO, and conversion.',
    features: ['Responsive Design', 'Next.js / React', 'WordPress (Custom Themes)', 'API Integrations', 'E-Commerce Ready', 'Performance Optimised', 'SEO-Friendly Markup', 'Cross-Browser Tested'],
    tech: ['React', 'Next.js', 'Node.js', 'WordPress', 'Tailwind CSS', 'MySQL', 'REST APIs', 'Vercel'],
    price: '₹25,000+',
  },
  {
    id: 'marketing', icon: '📈', label: 'Marketing',
    title: 'Digital Marketing', tagline: 'Data-driven campaigns that actually convert',
    desc: 'We plan and execute multi-channel campaigns on Google, Meta, LinkedIn and more — driving qualified traffic and leads that convert into paying customers.',
    features: ['Google Ads (Search + Display)', 'Meta Ads (FB + IG)', 'LinkedIn Campaigns', 'Retargeting Funnels', 'Analytics & Tracking', 'A/B Testing', 'Landing Page Strategy', 'Monthly Reporting'],
    tech: ['Google Ads', 'Meta Business Suite', 'GA4', 'GTM', 'Hotjar', 'Mailchimp'],
    price: '₹15,000/mo+',
  },
  {
    id: 'seo', icon: '🔍', label: 'SEO',
    title: 'SEO Optimization', tagline: 'Rank higher, get found, dominate search',
    desc: 'Comprehensive SEO — technical audits, on-page optimisation, link building, and content strategy. We get you ranking where it matters.',
    features: ['Technical SEO Audit', 'On-Page Optimisation', 'Keyword Research', 'Link Building', 'Content Strategy', 'Local SEO (GMB)', 'Schema Markup', 'Competitor Analysis'],
    tech: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'Search Console', 'GA4', 'Surfer SEO'],
    price: '₹12,000/mo+',
  },
  {
    id: 'design', icon: '🎨', label: 'Design',
    title: 'UI/UX Design', tagline: 'Interfaces that users love, businesses profit from',
    desc: 'From wireframes to pixel-perfect delivery, we design intuitive, beautiful digital experiences. Every interaction is thoughtful, every screen is purposeful.',
    features: ['User Research', 'Wireframing', 'High-Fidelity Mockups', 'Prototyping (Figma)', 'Design System', 'Responsive Layouts', 'Accessibility (WCAG)', 'Handoff to Dev'],
    tech: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Framer', 'Miro'],
    price: '₹18,000+',
  },
  {
    id: 'plugins', icon: '🔌', label: 'Plugins',
    title: 'WordPress Plugins', tagline: 'Purpose-built plugins for serious WordPress users',
    desc: 'Custom WordPress plugins designed for performance and reliability. From WooCommerce integrations to custom post types — clean, tested, production-ready code.',
    features: ['Custom Plugin Dev', 'WooCommerce Extensions', 'CPT & Taxonomies', 'REST API Endpoints', 'Admin Panels', 'Gutenberg Blocks', 'Security Hardened', 'Auto-Updates'],
    tech: ['PHP', 'WordPress', 'WooCommerce', 'REST API', 'jQuery', 'MySQL', 'Gutenberg'],
    price: '₹20,000+',
  },
  {
    id: 'ecommerce', icon: '🛒', label: 'E-Com',
    title: 'E-Commerce Solutions', tagline: 'Sell more, stress less, scale infinitely',
    desc: 'End-to-end e-commerce setups — WooCommerce stores, headless commerce, inventory management, payment gateways, and conversion optimisation.',
    features: ['WooCommerce Setup', 'Headless Commerce', 'Payment Gateway', 'Inventory Management', 'Product Filters', 'Checkout Optimisation', 'Shipping Integration', 'Analytics Dashboard'],
    tech: ['WooCommerce', 'Shopify', 'Razorpay', 'Stripe', 'Next.js', 'REST APIs'],
    price: '₹30,000+',
  },
];

const TRUST = [
  { icon: '🚀', val: '150+', label: 'Projects Delivered' },
  { icon: '⭐', val: '98%',  label: 'Client Satisfaction' },
  { icon: '🏆', val: '5+',   label: 'Years Experience' },
  { icon: '🔌', val: '30+',  label: 'WordPress Plugins' },
];

export default function ServicesPage() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];
  const revealRef = useScrollReveal();
  const counterRef = useCounterAnimation();

  return (
    <>
      <SEOHead
        title="Our Services — CodePromix Agency"
        description="Web development, digital marketing, SEO, UI/UX design, WordPress plugins, and e-commerce solutions."
        canonical="/services"
      />
      <Navbar />

      <main>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroBg} />
          <div className="container" ref={revealRef}>
            <span className="section-label">What We Offer</span>
            <h1 className={s.heroTitle}>Services Built to<br /><em>Scale Your Business</em></h1>
            <p className={s.heroSub}>
              From pixel-perfect design to powerful backends — everything you need
              to dominate online, under one roof.
            </p>
          </div>
        </section>

        {/* Tab navigation + Detail */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className={s.tabNav} ref={revealRef}>
              {SERVICES.map((sv, i) => (
                <button
                  key={sv.id}
                  className={`${s.tabButton} ${i === active ? s.tabButtonActive : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span>{sv.icon}</span> {sv.label}
                </button>
              ))}
            </div>

            {/* Detail card */}
            <div className={s.detailCard} key={svc.id}>
              <div className={s.detailHeader}>
                <div className={s.detailHeaderLeft}>
                  <div className={s.detailMeta}>
                    <span className={s.detailIcon}>{svc.icon}</span>
                    <span className={s.detailLabel}>{svc.tagline}</span>
                  </div>
                  <h2 className={s.detailTitle}>{svc.title}</h2>
                  <p className={s.detailDesc}>{svc.desc}</p>
                </div>
                <div className={s.detailPriceTag}>
                  <div className={s.priceBadge}>Starting At</div>
                  <div className={s.priceValue}>{svc.price}</div>
                </div>
              </div>
              <div className={s.detailBody}>
                <h4 className={s.detailSectionTitle}>What's Included</h4>
                <div className={s.featuresGrid}>
                  {svc.features.map(f => (
                    <div key={f} className={s.featureItem}>
                      <span className={s.featureCheck}>✓</span> {f}
                    </div>
                  ))}
                </div>

                <h4 className={s.detailSectionTitle}>Tech Stack</h4>
                <div className={s.techRow}>
                  {svc.tech.map(t => <span key={t} className={s.techPill}>{t}</span>)}
                </div>

                <div className={s.detailCta}>
                  <Link href="/contact" className="btn-primary">
                    Get a Quote →
                  </Link>
                  <a href={`https://wa.me/919999999999?text=Hi! I'm interested in ${svc.title}`}
                    target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>
            </div>

            {/* Trust bar */}
            <div className={s.trustBar} ref={counterRef}>
              {TRUST.map(({ icon, val, label }) => (
                <div key={label} className={s.trustCard}>
                  <div className={s.trustIcon}>{icon}</div>
                  <div className={s.trustValue} data-count-to={val}>{val}</div>
                  <div className={s.trustLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
