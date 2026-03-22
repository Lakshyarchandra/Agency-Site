import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/layout/SEOHead';

const SERVICES = [
  {
    id: 'web-development',
    icon: '🌐',
    title: 'Web Development',
    tagline: 'Websites that work as hard as you do',
    hero: 'We build fast, scalable, conversion-optimised websites and web applications that become your best salesperson — working 24/7.',
    color: '#FF6B00',
    features: [
      'Next.js & React applications',
      'WordPress custom themes & plugins',
      'Headless CMS architecture',
      'Progressive Web Apps (PWA)',
      'API development & integrations',
      'Performance optimisation (90+ Lighthouse)',
    ],
    process: [
      { title: 'Discovery Call', desc: 'We map your goals, audience, and tech requirements in a free 30-min session.' },
      { title: 'Wireframes & Design', desc: 'Figma prototypes reviewed and approved before a single line of code is written.' },
      { title: 'Agile Development', desc: 'Weekly sprints with live staging previews so you see progress in real time.' },
      { title: 'Launch & Handover', desc: 'Full deployment, training, and 30-day post-launch support included.' },
    ],
    stats: [{ num: '120+', label: 'Sites Launched' }, { num: '99%', label: 'Uptime Delivered' }, { num: '2.1s', label: 'Avg Load Time' }],
    faqs: [
      { q: 'How long does a website project take?', a: 'Typical brochure sites take 3–4 weeks. Complex web apps or e-commerce projects take 6–12 weeks depending on scope.' },
      { q: 'Do you work with existing WordPress sites?', a: 'Yes. We audit, rebuild, or extend existing WordPress sites including custom theme development and plugin work.' },
      { q: 'Will my site be mobile-friendly?', a: 'Every site we build is mobile-first by design and tested across 15+ device/browser combinations before launch.' },
    ],
  },
  {
    id: 'digital-marketing',
    icon: '📈',
    title: 'Digital Marketing',
    tagline: 'Campaigns that fill your pipeline',
    hero: 'Data-driven paid and organic campaigns across Google, Meta, and LinkedIn that turn cold audiences into loyal customers — profitably.',
    color: '#FF8C33',
    features: [
      'Google Ads (Search, Display, Shopping)',
      'Meta Ads (Facebook & Instagram)',
      'LinkedIn B2B campaigns',
      'Email marketing automation',
      'Conversion rate optimisation',
      'Monthly performance reporting',
    ],
    process: [
      { title: 'Audit & Research', desc: 'Full audit of your existing channels, competitor analysis, and audience mapping.' },
      { title: 'Strategy & Budget Plan', desc: 'Channel mix recommendation with projected ROAS before any spend.' },
      { title: 'Launch & Optimise', desc: 'Campaigns go live with daily monitoring and weekly bid adjustments.' },
      { title: 'Scale & Report', desc: 'Monthly executive reports with clear attribution — what worked and what we\'re doing next.' },
    ],
    stats: [{ num: '3.8x', label: 'Average ROAS' }, { num: '40%', label: 'Lower CPA' }, { num: '₹50Cr+', label: 'Ad Spend Managed' }],
    faqs: [
      { q: 'What is the minimum ad budget you work with?', a: 'We recommend a minimum of ₹30,000/month in ad spend to generate meaningful data and results.' },
      { q: 'How quickly will I see results?', a: 'Paid campaigns typically show meaningful results within 2–4 weeks. Organic strategies take 3–6 months.' },
      { q: 'Do you manage social media posting too?', a: 'Yes — we offer social media management as an add-on to any digital marketing package.' },
    ],
  },
  {
    id: 'seo',
    icon: '🔍',
    title: 'SEO Optimization',
    tagline: 'Rank #1. Stay there.',
    hero: 'Technical excellence, content strategy, and authoritative backlinks working together to put you on page one — and keep you there permanently.',
    color: '#FFB347',
    features: [
      'Technical SEO audit & fix',
      'Keyword research & mapping',
      'On-page optimisation',
      'Content strategy & creation',
      'Link building & outreach',
      'Local SEO & Google Business',
    ],
    process: [
      { title: 'Full SEO Audit', desc: '200-point technical audit covering Core Web Vitals, crawlability, indexation, and on-page factors.' },
      { title: 'Keyword Strategy', desc: 'Identify high-intent, low-competition keywords your ideal customers are searching right now.' },
      { title: 'On-Page & Technical', desc: 'Fix all technical issues and optimise every page — titles, schema, internal links, speed.' },
      { title: 'Content & Links', desc: 'Publish authority content and earn quality backlinks that compound over time.' },
    ],
    stats: [{ num: '300%', label: 'Avg Traffic Growth' }, { num: '4.2mo', label: 'Avg Time to Page 1' }, { num: '85+', label: 'Keywords Ranked' }],
    faqs: [
      { q: 'How long before I see SEO results?', a: 'Typically 3–6 months for meaningful organic traffic growth. Technical fixes often show quicker wins within weeks.' },
      { q: 'Do you do black-hat SEO?', a: 'Never. We use only white-hat, Google-compliant techniques that build sustainable long-term rankings.' },
      { q: 'Can you help with local SEO?', a: 'Yes — we specialise in local SEO including Google Business Profile optimisation, citations, and local content.' },
    ],
  },
  {
    id: 'ui-ux-design',
    icon: '🎨',
    title: 'UI/UX Design',
    tagline: 'Interfaces users fall in love with',
    hero: 'Beautiful, intuitive designs grounded in user research and psychology — from Figma wireframes to pixel-perfect, developer-ready design systems.',
    color: '#FF6B00',
    features: [
      'User research & persona mapping',
      'Information architecture',
      'Wireframing & prototyping',
      'High-fidelity UI design',
      'Design system creation',
      'Usability testing & iteration',
    ],
    process: [
      { title: 'Research & Discover', desc: 'User interviews, heatmap analysis, and competitor UX benchmarking.' },
      { title: 'Wireframe & Flow', desc: 'Low-fidelity wireframes and user flow maps reviewed before visual design.' },
      { title: 'High-Fidelity Design', desc: 'Full Figma designs with interactive prototype for stakeholder sign-off.' },
      { title: 'Handoff & Support', desc: 'Developer-ready specs, component library, and design QA during build.' },
    ],
    stats: [{ num: '40%', label: 'Avg Conversion Lift' }, { num: '4.9★', label: 'Avg Client Rating' }, { num: '60+', label: 'Products Designed' }],
    faqs: [
      { q: 'Do you design for mobile and desktop?', a: 'Yes — we design responsive layouts for all screen sizes as standard in every project.' },
      { q: 'What tools do you use?', a: 'Figma is our primary design tool. We also use Hotjar, Maze, and Optimal Workshop for user research.' },
      { q: 'Can you redesign our existing product?', a: 'Absolutely. We specialise in redesigns — we audit your current UX, identify friction points, and systematically improve them.' },
    ],
  },
  {
    id: 'wordpress-plugins',
    icon: '🔌',
    title: 'WordPress Plugins',
    tagline: 'Custom plugins built for your exact needs',
    hero: 'Premium, purpose-built WordPress plugins that extend functionality, automate workflows, and integrate with any third-party system — zero bloat.',
    color: '#C94D00',
    features: [
      'Custom post types & taxonomies',
      'WooCommerce extensions',
      'Third-party API integrations',
      'Admin dashboard tools',
      'Subscription & licensing systems',
      'Plugin performance optimisation',
    ],
    process: [
      { title: 'Requirements Spec', desc: 'Detailed technical specification document before any development begins.' },
      { title: 'Architecture Design', desc: 'Database schema, hook architecture, and API contracts designed for scalability.' },
      { title: 'Build & Test', desc: 'TDD approach with unit tests, integration tests, and staging environment QA.' },
      { title: 'Deploy & Document', desc: 'Production deployment with full developer documentation and update system.' },
    ],
    stats: [{ num: '30+', label: 'Plugins Built' }, { num: '10k+', label: 'Active Installs' }, { num: '4.8★', label: 'Avg Plugin Rating' }],
    faqs: [
      { q: 'Will my plugin work with future WordPress updates?', a: 'Yes — we write forward-compatible code and offer maintenance plans to keep plugins updated with WordPress core.' },
      { q: 'Can you build a SaaS product on WordPress?', a: 'Yes — we build membership sites, SaaS platforms, and multi-tenant applications on WordPress.' },
      { q: 'Do you sell plugin licences?', a: 'Some of our plugins are available for purchase. Contact us for our plugin catalogue.' },
    ],
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    title: 'E-Commerce Solutions',
    tagline: 'Stores built to convert and scale',
    hero: 'WooCommerce and headless e-commerce solutions optimised for conversion, speed, and customer experience — from launch to ₹10Cr+ revenue.',
    color: '#FF8C33',
    features: [
      'WooCommerce store development',
      'Custom checkout flows',
      'Payment gateway integration',
      'Inventory & order management',
      'Product page CRO',
      'Abandoned cart recovery',
    ],
    process: [
      { title: 'Store Strategy', desc: 'Product catalogue structure, pricing strategy, and conversion funnel mapping.' },
      { title: 'Design & Build', desc: 'Custom WooCommerce theme with UX optimised specifically for your product type.' },
      { title: 'Integrations', desc: 'Payment gateways, shipping, CRM, ERP, and analytics all wired together.' },
      { title: 'Launch & Scale', desc: 'Performance testing under load, launch, and ongoing CRO to grow AOV and conversions.' },
    ],
    stats: [{ num: '₹10Cr+', label: 'GMV Processed' }, { num: '35%', label: 'Avg CRO Lift' }, { num: '25+', label: 'Stores Launched' }],
    faqs: [
      { q: 'WooCommerce or Shopify — which do you recommend?', a: 'For India-based businesses needing full customisation, WooCommerce. For simpler catalogues or global SaaS, Shopify. We\'ll recommend based on your specific needs.' },
      { q: 'Can you migrate my existing store?', a: 'Yes — we handle full migrations including products, orders, customers, and SEO URLs with zero data loss.' },
      { q: 'Do you integrate with Razorpay / PayU / Cashfree?', a: 'Yes — we integrate all major Indian payment gateways including Razorpay, PayU, Cashfree, and CCAvenue.' },
    ],
  },
];

const ENGAGEMENT_CARDS = [
  { icon: '💬', title: 'Free Consultation', desc: 'Book a 30-min strategy call. No sales pitch — just honest advice about what will actually work for your business.', cta: 'Book a Call', href: '/contact' },
  { icon: '📋', title: 'Get a Free Quote', desc: 'Tell us about your project and we\'ll send a detailed, transparent proposal within 24 hours.', cta: 'Request Quote', href: '/contact' },
  { icon: '📚', title: 'Read Our Blog', desc: 'Free insights on web, SEO, and digital marketing from our team of practitioners.', cta: 'Explore Blog', href: '/blogs' },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(SERVICES[0].id);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('features');
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  const current = SERVICES.find(s => s.id === activeService);

  // Reset tab and FAQ when switching services
  useEffect(() => {
    setActiveTab('features');
    setOpenFaq(null);
  }, [activeService]);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    if (el) { el.dataset.id = id; sectionRefs.current[id] = el; }
  };

  return (
    <>
      <SEOHead
        title="Services — CodePromix Agency | Web, SEO, Marketing & WordPress"
        description="Explore CodePromix Agency's full range of services: web development, digital marketing, SEO, UI/UX design, WordPress plugins, and e-commerce solutions."
        canonical="/services"
      />
      <Navbar />

      <main>

        {/* ── HERO ──────────────────────────────────── */}
        <section className="svc-hero">
          <div className="sh-canvas">
            <div className="sh-grid" />
            <div className="sh-orb sh-orb-1" />
            <div className="sh-orb sh-orb-2" />
          </div>
          <div className="container sh-body">
            <div className="sh-inner">
              <span className="eyebrow-pill">What We Offer</span>
              <h1 className="sh-title">
                Every Service You Need<br />
                to <em>Win Online</em>
              </h1>
              <p className="sh-desc">
                Six battle-tested disciplines. One focused team. Measurable results every time.
                Pick one service or combine them for maximum impact.
              </p>
              <div className="sh-pills">
                {SERVICES.map(s => (
                  <button
                    key={s.id}
                    className={`sh-pill ${activeService === s.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveService(s.id);
                      document.getElementById('service-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span>{s.icon}</span> {s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICE DETAIL ────────────────────────── */}
        <section id="service-detail" className="svc-detail">
          <div className="container">
            <div className="sd-layout">

              {/* Left sticky nav */}
              <nav className="sd-sidenav">
                {SERVICES.map(s => (
                  <button
                    key={s.id}
                    className={`sdn-item ${activeService === s.id ? 'active' : ''}`}
                    onClick={() => setActiveService(s.id)}
                  >
                    <span className="sdn-icon">{s.icon}</span>
                    <span className="sdn-label">{s.title}</span>
                    <span className="sdn-arrow">→</span>
                  </button>
                ))}
                <div className="sdn-cta-box">
                  <p>Not sure which service you need?</p>
                  <Link href="/contact" className="sdn-cta-btn">Talk to Us →</Link>
                </div>
              </nav>

              {/* Right content panel */}
              <div className="sd-panel">

                {/* Service header */}
                <div className="sdp-header" key={current.id}>
                  <div className="sdp-icon">{current.icon}</div>
                  <div>
                    <div className="sdp-tagline">{current.tagline}</div>
                    <h2 className="sdp-title">{current.title}</h2>
                  </div>
                </div>
                <p className="sdp-hero">{current.hero}</p>

                {/* Stats row */}
                <div className="sdp-stats">
                  {current.stats.map(({ num, label }) => (
                    <div key={label} className="sdp-stat">
                      <span className="sdp-stat-num">{num}</span>
                      <span className="sdp-stat-label">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Tabs */}
                <div className="sdp-tabs">
                  {['features', 'process', 'faq'].map(tab => (
                    <button
                      key={tab}
                      className={`sdp-tab ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === 'features' ? '✦ What\'s Included' : tab === 'process' ? '⚙ Our Process' : '❓ FAQ'}
                    </button>
                  ))}
                </div>

                {/* Features tab */}
                {activeTab === 'features' && (
                  <div className="sdp-features">
                    {current.features.map((f, i) => (
                      <div key={i} className="feat-item" style={{ animationDelay: `${i * 0.06}s` }}>
                        <div className="feat-check">✓</div>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Process tab */}
                {activeTab === 'process' && (
                  <div className="sdp-process">
                    {current.process.map((step, i) => (
                      <div key={i} className="proc-step" style={{ animationDelay: `${i * 0.08}s` }}>
                        <div className="proc-num">{String(i + 1).padStart(2, '0')}</div>
                        <div className="proc-content">
                          <h4 className="proc-title">{step.title}</h4>
                          <p className="proc-desc">{step.desc}</p>
                        </div>
                        {i < current.process.length - 1 && <div className="proc-line" />}
                      </div>
                    ))}
                  </div>
                )}

                {/* FAQ tab */}
                {activeTab === 'faq' && (
                  <div className="sdp-faq">
                    {current.faqs.map((faq, i) => (
                      <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                        <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                          <span>{faq.q}</span>
                          <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                        </button>
                        {openFaq === i && (
                          <div className="faq-a">{faq.a}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA inside panel */}
                <div className="sdp-inline-cta">
                  <div>
                    <div className="sic-title">Interested in {current.title}?</div>
                    <div className="sic-sub">Get a free quote — we respond within 24 hours.</div>
                  </div>
                  <Link href="/contact" className="sic-btn">
                    Get Free Quote →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CodePromix ──────────────────────────── */}
        <section
          className={`why-section reveal ${isVisible['why'] ? 'visible' : ''}`}
          ref={setRef('why')}
        >
          <div className="container">
            <div className="section-head">
              <span className="eyebrow-pill">Why Us</span>
              <h2 className="section-title">Why Clients Choose<br /><em>CodePromix</em></h2>
            </div>
            <div className="why-grid">
              {[
                { icon: '🎯', title: 'Results, Not Just Reports', desc: 'We tie every deliverable to a business outcome — traffic, leads, or revenue. If it doesn\'t move the needle, we don\'t do it.' },
                { icon: '🔬', title: 'Deep Specialists', desc: 'No generalists here. Each service is handled by a dedicated expert — a developer doesn\'t do your SEO.' },
                { icon: '💬', title: 'Radically Transparent', desc: 'Weekly updates, shared dashboards, and honest conversation when things need to change. No smoke and mirrors.' },
                { icon: '🚀', title: 'Built to Scale', desc: 'We design everything to grow with you — from 100 visitors to 100,000, from ₹10L to ₹10Cr revenue.' },
                { icon: '🇮🇳', title: 'India-First Thinking', desc: 'We understand Indian markets, payment ecosystems, and consumer behaviour — and how to win globally from here.' },
                { icon: '🔄', title: 'Long-term Partners', desc: 'Most clients stay 2+ years. We don\'t chase projects — we build relationships that compound.' },
              ].map(({ icon, title, desc }, i) => (
                <div key={title} className="why-card" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="why-icon">{icon}</div>
                  <h3 className="why-title">{title}</h3>
                  <p className="why-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT SECTION ────────────────────── */}
        <section
          className={`engage-section reveal ${isVisible['engage'] ? 'visible' : ''}`}
          ref={setRef('engage')}
        >
          <div className="container">
            <div className="section-head">
              <span className="eyebrow-pill">Get Started</span>
              <h2 className="section-title">Ready to Talk?<br /><em>We're Listening</em></h2>
              <p className="section-sub">No long forms, no commitments. Just a conversation about your goals.</p>
            </div>
            <div className="engage-grid">
              {ENGAGEMENT_CARDS.map(({ icon, title, desc, cta, href }, i) => (
                <div key={title} className="engage-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="ec-icon">{icon}</div>
                  <h3 className="ec-title">{title}</h3>
                  <p className="ec-desc">{desc}</p>
                  <Link href={href} className="ec-cta">{cta} →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING SECTION ───────────────────────── */}
        <section
          className={`pricing-section reveal ${isVisible['pricing'] ? 'visible' : ''}`}
          ref={setRef('pricing')}
        >
          <div className="container">
            <div className="section-head">
              <span className="eyebrow-pill">Transparent Pricing</span>
              <h2 className="section-title">Simple, Honest<br /><em>Pricing Approach</em></h2>
              <p className="section-sub">We don't do hidden fees or surprise invoices. Here's how we work.</p>
            </div>
            <div className="pricing-grid">
              {[
                {
                  name: 'Project',
                  icon: '📦',
                  desc: 'Best for defined scope projects — websites, plugins, campaigns.',
                  points: ['Fixed price agreed upfront', 'Milestone-based payments', 'Scope change process', 'Project completion guarantee'],
                  cta: 'Get Project Quote',
                  highlight: false,
                },
                {
                  name: 'Retainer',
                  icon: '🔄',
                  desc: 'Best for ongoing growth — SEO, digital marketing, maintenance.',
                  points: ['Monthly hours bank', 'Priority response SLA', 'Monthly strategy call', 'Cancel anytime'],
                  cta: 'Discuss Retainer',
                  highlight: true,
                },
                {
                  name: 'Consulting',
                  icon: '🧠',
                  desc: 'Best for strategy, audits, and independent expert advice.',
                  points: ['Hourly or day-rate', 'No minimum commitment', 'Written recommendations', 'Follow-up Q&A session'],
                  cta: 'Book Consultant',
                  highlight: false,
                },
              ].map(({ name, icon, desc, points, cta, highlight }) => (
                <div key={name} className={`price-card ${highlight ? 'featured' : ''}`}>
                  {highlight && <div className="price-badge">Most Popular</div>}
                  <div className="pc-icon">{icon}</div>
                  <h3 className="pc-name">{name}</h3>
                  <p className="pc-desc">{desc}</p>
                  <ul className="pc-points">
                    {points.map(p => (
                      <li key={p}><span className="pc-tick">✓</span>{p}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`pc-cta ${highlight ? 'primary' : 'ghost'}`}>{cta}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL STRIP ─────────────────────── */}
        <section className="testimonial-strip">
          <div className="container ts-inner">
            <div className="ts-quote">
              <div className="ts-stars">★★★★★</div>
              <p className="ts-text">"CodePromix didn't just build our website — they rebuilt our entire digital strategy. Revenue from organic traffic grew 340% in 8 months. They're the only agency we'll ever need."</p>
              <div className="ts-author">
                <div className="ts-avatar">SB</div>
                <div>
                  <div className="ts-name">Siddharth Bansal</div>
                  <div className="ts-role">CEO, Bansal Retail Group</div>
                </div>
              </div>
            </div>
            <div className="ts-cta-panel">
              <h3 className="tcp-title">Join 150+ businesses that chose CodePromix</h3>
              <p className="tcp-sub">Free consultation. Real strategy. Actual results.</p>
              <Link href="/contact" className="tcp-btn">Start the Conversation →</Link>
              <div className="tcp-trust">
                <span>✓ No lock-in contracts</span>
                <span>✓ 24hr response</span>
                <span>✓ Free initial audit</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style jsx>{`

        /* ── HERO ──────────────────────────────────── */
        .svc-hero {
          min-height: 65vh;
          position: relative; overflow: hidden;
          display: flex; align-items: center;
          padding-top: var(--header-h);
        }
        .sh-canvas { position: absolute; inset: 0; pointer-events: none; }
        .sh-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 80px 80px; opacity: 0.5;
        }
        .sh-orb {
          position: absolute; border-radius: 50%; filter: blur(110px);
        }
        .sh-orb-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%);
          top: -200px; right: -100px;
          animation: orbDrift 20s ease-in-out infinite alternate;
        }
        .sh-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,179,71,0.07) 0%, transparent 70%);
          bottom: 0; left: 5%;
          animation: orbDrift 25s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbDrift {
          from { transform: translate(0,0); }
          to   { transform: translate(30px,40px); }
        }
        .sh-body { position: relative; z-index: 1; padding: 4rem 2rem 5rem; }
        .sh-inner { max-width: 820px; }
        .eyebrow-pill {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--saffron); background: rgba(255,107,0,0.08);
          border: 1px solid var(--border-2);
          padding: 5px 14px; border-radius: 100px; margin-bottom: 1.25rem;
        }
        .sh-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5.5vw, 5rem);
          font-weight: 700; line-height: 1.1; color: var(--text-1);
          margin-bottom: 1.25rem;
          animation: slideUp 0.8s ease both;
        }
        .sh-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sh-desc {
          font-size: 1.05rem; line-height: 1.78; color: var(--text-2);
          max-width: 580px; margin-bottom: 2.5rem;
          animation: slideUp 0.8s 0.15s ease both;
        }
        .sh-pills {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
          animation: slideUp 0.8s 0.25s ease both;
        }
        .sh-pill {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.5rem 1.1rem;
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: 100px; color: var(--text-2);
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 500;
          cursor: pointer;
          transition: all var(--transition);
        }
        .sh-pill:hover { border-color: var(--border-2); color: var(--text-1); }
        .sh-pill.active {
          background: var(--saffron); border-color: var(--saffron);
          color: white; box-shadow: 0 4px 16px rgba(255,107,0,0.35);
        }

        /* ── SERVICE DETAIL ───────────────────────── */
        .svc-detail { padding: 5rem 0 7rem; }
        .sd-layout {
          display: grid; grid-template-columns: 260px 1fr; gap: 3rem;
          align-items: start;
        }

        /* Side nav */
        .sd-sidenav {
          position: sticky; top: calc(var(--header-h) + 1.5rem);
          display: flex; flex-direction: column; gap: 0.25rem;
        }
        .sdn-item {
          display: flex; align-items: center; gap: 0.7rem;
          padding: 0.7rem 1rem; border-radius: var(--radius);
          background: none; border: none; text-align: left;
          cursor: pointer; color: var(--text-2);
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 500;
          transition: all var(--transition);
          position: relative;
        }
        .sdn-item:hover { background: var(--surface-2); color: var(--text-1); }
        .sdn-item.active {
          background: rgba(255,107,0,0.08); color: var(--saffron);
          border-right: 2px solid var(--saffron);
        }
        .sdn-icon { font-size: 1.1rem; flex-shrink: 0; }
        .sdn-label { flex: 1; }
        .sdn-arrow { opacity: 0; font-size: 0.75rem; transition: opacity var(--transition); }
        .sdn-item.active .sdn-arrow,
        .sdn-item:hover .sdn-arrow { opacity: 1; }
        .sdn-cta-box {
          margin-top: 1.5rem;
          padding: 1.25rem;
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          text-align: center;
        }
        .sdn-cta-box p { font-size: 0.82rem; color: var(--text-2); margin-bottom: 0.75rem; line-height: 1.5; }
        .sdn-cta-btn {
          display: inline-block;
          padding: 0.55rem 1.1rem;
          background: var(--saffron); border-radius: 6px;
          color: white; font-size: 0.82rem; font-weight: 700;
          box-shadow: 0 3px 0 var(--saffron-dk);
          transition: all 0.1s ease;
          position: relative; top: 0;
        }
        .sdn-cta-btn:hover { top: -2px; box-shadow: 0 5px 0 var(--saffron-dk); }

        /* Detail panel */
        .sd-panel { min-width: 0; }
        .sdp-header {
          display: flex; align-items: flex-start; gap: 1.25rem;
          margin-bottom: 1rem;
          animation: slideUp 0.5s ease both;
        }
        .sdp-icon {
          font-size: 2.5rem;
          width: 64px; height: 64px; border-radius: 16px;
          background: rgba(255,107,0,0.08); border: 1px solid var(--border-2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sdp-tagline {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--saffron); margin-bottom: 0.3rem;
        }
        .sdp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem; font-weight: 700; color: var(--text-1); line-height: 1.1;
        }
        .sdp-hero {
          font-size: 1.05rem; line-height: 1.78; color: var(--text-2);
          margin-bottom: 2rem;
          padding-bottom: 2rem; border-bottom: 1px solid var(--border);
          animation: slideUp 0.5s 0.05s ease both;
        }

        /* Stats */
        .sdp-stats {
          display: flex; gap: 0; margin-bottom: 2rem;
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-lg); overflow: hidden;
          animation: slideUp 0.5s 0.1s ease both;
        }
        .sdp-stat {
          flex: 1; padding: 1.25rem 1.5rem;
          border-right: 1px solid var(--border);
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .sdp-stat:last-child { border-right: none; }
        .sdp-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: var(--saffron); line-height: 1;
        }
        .sdp-stat-label { font-size: 0.75rem; color: var(--text-3); font-weight: 500; }

        /* Tabs */
        .sdp-tabs {
          display: flex; gap: 0.25rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1.75rem;
          animation: slideUp 0.5s 0.15s ease both;
        }
        .sdp-tab {
          padding: 0.65rem 1.25rem;
          background: none; border: none;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600;
          color: var(--text-2); cursor: pointer;
          transition: color var(--transition), border-color var(--transition);
        }
        .sdp-tab:hover { color: var(--text-1); }
        .sdp-tab.active { color: var(--saffron); border-bottom-color: var(--saffron); }

        /* Features */
        .sdp-features {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .feat-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.9rem 1.1rem;
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius);
          font-size: 0.9rem; color: var(--text-1); font-weight: 500;
          animation: fadeIn 0.4s ease both;
          transition: border-color var(--transition), transform var(--transition);
        }
        .feat-item:hover { border-color: var(--border-2); transform: translateX(4px); }
        .feat-check {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          background: rgba(255,107,0,0.12); color: var(--saffron);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem; font-weight: 700;
        }

        /* Process */
        .sdp-process {
          display: flex; flex-direction: column; gap: 0;
          margin-bottom: 2rem;
        }
        .proc-step {
          display: flex; gap: 1.25rem; align-items: flex-start;
          position: relative;
          padding-bottom: 1.75rem;
          animation: fadeIn 0.4s ease both;
        }
        .proc-step:last-child { padding-bottom: 0; }
        .proc-num {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          background: rgba(255,107,0,0.1); border: 1px solid var(--border-2);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700;
          color: var(--saffron); position: relative; z-index: 1;
        }
        .proc-line {
          position: absolute; left: 21px; top: 44px; bottom: 0;
          width: 2px; background: linear-gradient(to bottom, var(--border-2), transparent);
        }
        .proc-content { flex: 1; padding-top: 0.4rem; }
        .proc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.3rem;
        }
        .proc-desc { font-size: 0.9rem; color: var(--text-2); line-height: 1.7; }

        /* FAQ */
        .sdp-faq { display: flex; flex-direction: column; gap: 0; margin-bottom: 2rem; }
        .faq-item {
          border-bottom: 1px solid var(--border);
          animation: fadeIn 0.4s ease both;
        }
        .faq-q {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          padding: 1.1rem 0; background: none; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 0.96rem; font-weight: 600;
          color: var(--text-1); text-align: left; cursor: pointer; gap: 1rem;
          transition: color var(--transition);
        }
        .faq-q:hover { color: var(--saffron); }
        .faq-icon {
          font-size: 1.3rem; font-weight: 400; color: var(--saffron); flex-shrink: 0;
          line-height: 1;
        }
        .faq-a {
          padding: 0 0 1.1rem;
          font-size: 0.92rem; color: var(--text-2); line-height: 1.75;
          animation: fadeIn 0.3s ease both;
        }

        /* Inline CTA */
        .sdp-inline-cta {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1.25rem;
          padding: 1.75rem 2rem;
          background: linear-gradient(135deg, rgba(255,107,0,0.08), rgba(255,107,0,0.03));
          border: 1px solid var(--border-2);
          border-radius: var(--radius-lg);
          animation: slideUp 0.5s 0.2s ease both;
        }
        .sic-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.2rem;
        }
        .sic-sub { font-size: 0.88rem; color: var(--text-2); }
        .sic-btn {
          display: inline-block; padding: 0.75rem 1.75rem;
          background: var(--saffron); border-radius: 8px; color: white;
          font-size: 0.92rem; font-weight: 700; white-space: nowrap;
          box-shadow: 0 4px 0 var(--saffron-dk);
          position: relative; top: 0;
          transition: top 0.1s ease, box-shadow 0.1s ease;
        }
        .sic-btn:hover { top: -2px; box-shadow: 0 6px 0 var(--saffron-dk); }
        .sic-btn:active { top: 4px; box-shadow: 0 0 0 var(--saffron-dk); }

        /* ── SECTIONS BASE ─────────────────────────── */
        .section-head { text-align: center; margin-bottom: 4rem; }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 700; line-height: 1.15;
          color: var(--text-1); margin-bottom: 1rem; margin-top: 0.75rem;
        }
        .section-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-sub { font-size: 1rem; color: var(--text-2); max-width: 500px; margin: 0 auto; }

        /* ── WHY SECTION ───────────────────────────── */
        .why-section {
          padding: 7rem 0;
          background: linear-gradient(180deg, transparent, rgba(255,107,0,0.025) 50%, transparent);
        }
        .why-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
        }
        .why-card {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 2rem;
          transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
        }
        .why-card:hover {
          border-color: var(--border-2); transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .why-icon { font-size: 2rem; margin-bottom: 1rem; }
        .why-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.6rem;
        }
        .why-desc { font-size: 0.9rem; line-height: 1.72; color: var(--text-2); }

        /* ── ENGAGE SECTION ────────────────────────── */
        .engage-section { padding: 7rem 0; }
        .engage-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
        }
        .engage-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 2.25rem;
          display: flex; flex-direction: column;
          transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
          position: relative; overflow: hidden;
        }
        .engage-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,107,0,0.04) 0%, transparent 60%);
          opacity: 0; transition: opacity var(--transition);
        }
        .engage-card:hover {
          border-color: var(--border-2); transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        .engage-card:hover::before { opacity: 1; }
        .ec-icon { font-size: 2.5rem; margin-bottom: 1.25rem; }
        .ec-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.75rem;
        }
        .ec-desc { font-size: 0.92rem; line-height: 1.75; color: var(--text-2); flex: 1; margin-bottom: 1.5rem; }
        .ec-cta {
          display: inline-flex; align-items: center;
          font-size: 0.9rem; font-weight: 700; color: var(--saffron);
          transition: gap var(--transition), color var(--transition);
          gap: 0.25rem;
        }
        .ec-cta:hover { color: var(--gold); gap: 0.5rem; }

        /* ── PRICING SECTION ───────────────────────── */
        .pricing-section { padding: 7rem 0; }
        .pricing-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
          align-items: start;
        }
        .price-card {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 2.25rem;
          position: relative;
          transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
        }
        .price-card:hover { border-color: var(--border-2); transform: translateY(-3px); }
        .price-card.featured {
          border-color: var(--saffron);
          background: linear-gradient(135deg, rgba(255,107,0,0.06), var(--surface-2));
          box-shadow: 0 0 0 1px rgba(255,107,0,0.15), var(--shadow-md);
        }
        .price-badge {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          background: var(--saffron); color: white;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 100px;
          box-shadow: 0 2px 8px rgba(255,107,0,0.4);
        }
        .pc-icon { font-size: 2rem; margin-bottom: 1rem; }
        .pc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.5rem;
        }
        .pc-desc { font-size: 0.88rem; color: var(--text-2); line-height: 1.65; margin-bottom: 1.5rem; }
        .pc-points {
          list-style: none; display: flex; flex-direction: column; gap: 0.6rem;
          margin-bottom: 2rem;
        }
        .pc-points li {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.88rem; color: var(--text-1);
        }
        .pc-tick { color: var(--saffron); font-weight: 700; flex-shrink: 0; }
        .pc-cta {
          display: block; text-align: center;
          padding: 0.8rem 1.5rem; border-radius: 8px;
          font-size: 0.9rem; font-weight: 700;
          transition: all var(--transition);
        }
        .pc-cta.primary {
          background: var(--saffron); color: white;
          box-shadow: 0 4px 0 var(--saffron-dk);
          position: relative; top: 0;
          transition: top 0.1s, box-shadow 0.1s;
        }
        .pc-cta.primary:hover { top: -2px; box-shadow: 0 6px 0 var(--saffron-dk); }
        .pc-cta.ghost {
          border: 1.5px solid var(--border-2); color: var(--text-2);
          background: transparent;
        }
        .pc-cta.ghost:hover { border-color: var(--saffron); color: var(--text-1); }

        /* ── TESTIMONIAL STRIP ─────────────────────── */
        .testimonial-strip {
          padding: 5rem 0;
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .ts-inner {
          display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
        }
        .ts-stars { color: var(--gold); font-size: 1.1rem; margin-bottom: 1rem; }
        .ts-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-style: italic; line-height: 1.65;
          color: var(--text-1); margin-bottom: 1.5rem;
        }
        .ts-author { display: flex; align-items: center; gap: 0.75rem; }
        .ts-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700; color: white; flex-shrink: 0;
        }
        .ts-name { font-size: 0.95rem; font-weight: 700; color: var(--text-1); }
        .ts-role { font-size: 0.78rem; color: var(--text-3); }
        .tcp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.75rem;
        }
        .tcp-sub { font-size: 1rem; color: var(--text-2); margin-bottom: 1.75rem; }
        .tcp-btn {
          display: inline-block; padding: 0.9rem 2rem;
          background: var(--saffron); border-radius: 8px; color: white;
          font-size: 1rem; font-weight: 700; margin-bottom: 1.25rem;
          box-shadow: 0 5px 0 var(--saffron-dk);
          position: relative; top: 0;
          transition: top 0.1s ease, box-shadow 0.1s ease;
        }
        .tcp-btn:hover { top: -2px; box-shadow: 0 7px 0 var(--saffron-dk); }
        .tcp-btn:active { top: 5px; box-shadow: none; }
        .tcp-trust { display: flex; flex-wrap: wrap; gap: 1rem; }
        .tcp-trust span { font-size: 0.82rem; color: var(--text-3); font-weight: 500; }

        /* ── REVEAL ANIMATIONS ─────────────────────── */
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── RESPONSIVE ───────────────────────────── */
        @media (max-width: 1024px) {
          .why-grid    { grid-template-columns: 1fr 1fr; }
          .ts-inner    { grid-template-columns: 1fr; gap: 3rem; }
        }
        @media (max-width: 900px) {
          .sd-layout        { grid-template-columns: 1fr; }
          .sd-sidenav       { position: static; flex-direction: row; flex-wrap: wrap; gap: 0.5rem; }
          .sdn-item         { flex: none; padding: 0.5rem 0.9rem; border-radius: 100px; border: 1px solid var(--border); }
          .sdn-item.active  { border-right: none; }
          .sdn-arrow        { display: none; }
          .sdn-cta-box      { display: none; }
          .sdp-features     { grid-template-columns: 1fr; }
          .sdp-stats        { flex-wrap: wrap; }
          .sdp-stat         { min-width: 33%; border-bottom: 1px solid var(--border); }
          .engage-grid      { grid-template-columns: 1fr 1fr; }
          .pricing-grid     { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
          .why-grid         { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .sh-pills         { gap: 0.4rem; }
          .sh-pill          { font-size: 0.78rem; padding: 0.4rem 0.8rem; }
          .engage-grid      { grid-template-columns: 1fr; }
          .why-grid         { grid-template-columns: 1fr; }
          .sdp-inline-cta   { flex-direction: column; }
          .sdp-stats        { flex-direction: column; }
          .sdp-stat         { border-right: none; }
          .sdp-features     { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
