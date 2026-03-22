import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/layout/SEOHead';
import { getDB } from '../lib/db';

export async function getStaticProps() {
  try {
    const db = getDB();
    const [posts] = await db.execute(
      `SELECT id, title, slug, excerpt, feature_image, published_at
       FROM posts WHERE status='published'
       ORDER BY published_at DESC LIMIT 3`
    );
    return { props: { latestPosts: JSON.parse(JSON.stringify(posts)) }, revalidate: 60 };
  } catch {
    return { props: { latestPosts: [] }, revalidate: 60 };
  }
}

const SERVICES = [
  { icon: '🌐', title: 'Web Development',   desc: 'Custom, blazing-fast websites & web apps built with modern stacks — Next.js, React, WordPress & more.' },
  { icon: '📈', title: 'Digital Marketing', desc: 'Data-driven campaigns on Google, Meta & LinkedIn that convert browsers into paying customers.' },
  { icon: '🔍', title: 'SEO Optimization',  desc: 'Technical SEO, on-page audits, backlink strategy & content optimisation to dominate search.' },
  { icon: '🎨', title: 'UI/UX Design',      desc: 'Intuitive, beautiful interfaces that users love — Figma prototypes to pixel-perfect delivery.' },
  { icon: '🔌', title: 'WordPress Plugins', desc: 'Purpose-built premium plugins: performance, WooCommerce extensions, custom post types & APIs.' },
  { icon: '🛒', title: 'E-Commerce',        desc: 'WooCommerce & headless stores optimised for conversion, speed, and seamless customer journeys.' },
];

const STATS = [
  { num: '150+', label: 'Projects Delivered' },
  { num: '98%',  label: 'Client Satisfaction' },
  { num: '5+',   label: 'Years Experience' },
  { num: '30+',  label: 'WordPress Plugins' },
];

const PROCESS = [
  { step: '01', title: 'Discovery',     desc: 'We understand your goals, audience, and competition deeply before writing a single line of code.' },
  { step: '02', title: 'Strategy',      desc: 'A tailored growth roadmap covering design, development, content, and marketing timelines.' },
  { step: '03', title: 'Build',         desc: 'Agile sprints with weekly check-ins. Clean code, pixel-perfect design, and no shortcuts.' },
  { step: '04', title: 'Launch & Grow', desc: 'Go live, monitor KPIs, iterate fast. We stay with you long after the launch day champagne.' },
];

const TESTIMONIALS = [
  { name: 'Arjun Mehta',  role: 'Founder, TechStartup',    text: 'CodePromix rebuilt our entire platform in 6 weeks. Traffic doubled and leads tripled. Incredible team.', avatar: 'AM' },
  { name: 'Priya Sharma', role: 'CEO, E-commerce Brand',    text: 'Their SEO strategy took us from page 5 to the top 3 in 4 months. ROI is unbelievable.', avatar: 'PS' },
  { name: 'Rahul Gupta',  role: 'Director, Real Estate Co', text: 'The WordPress plugin they built saves us 10 hours a week. Premium quality, delivered on time.', avatar: 'RG' },
];

export default function Home({ latestPosts }) {
  return (
    <>
      <SEOHead canonical="/" />

      {/* Navbar floats independently above everything */}
      <Navbar />

      <main>

        {/* ══════════════════════════════════════════════
            HERO — completely self-contained section
            Has its own background, own layout, own world.
            The navbar simply floats on top of it via
            position:fixed — they never share a container.
        ══════════════════════════════════════════════ */}
        <section className="hero">

          {/* Hero's own background universe */}
          <div className="hero-canvas">
            <div className="hc-grid" />
            <div className="hc-orb hc-orb-1" />
            <div className="hc-orb hc-orb-2" />
            <div className="hc-orb hc-orb-3" />
            {/* Decorative diagonal stripe */}
            <div className="hc-stripe" />
          </div>

          {/* Hero content — centred, self-contained */}
          <div className="hero-body">
            <div className="hero-eyebrow">
              <span className="eb-dot" />
              <span className="eb-text">Think · Trust · Traffic</span>
            </div>

            <h1 className="hero-headline">
              <span className="hl-row hl-row-1">We Build Brands</span>
              <span className="hl-row hl-row-2">
                <em className="hl-accent">That Dominate</em>
              </span>
              <span className="hl-row hl-row-3">The Digital World</span>
            </h1>

            <p className="hero-sub">
              CodePromix Agency crafts powerful websites, SEO strategies, and WordPress plugins
              that put your business permanently ahead of the competition.
            </p>

            <div className="hero-cta-row">
              <Link href="/contact" className="btn-nav">
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/blogs" className="btn-nav">
                Explore Insights
              </Link>
            </div>

            {/* Stats bar — sits at bottom of hero body */}
            <div className="hero-stats-bar">
              {STATS.map(({ num, label }, i) => (
                <div key={label} className="hsb-item">
                  {i > 0 && <div className="hsb-divider" />}
                  <span className="hsb-num">{num}</span>
                  <span className="hsb-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator anchored to bottom of section */}
        </section>

        {/* ── SERVICES ──────────────────────────────── */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-head">
              <span className="section-label">What We Do</span>
              <h2 className="section-title">Services Engineered<br />for <em>Real Results</em></h2>
              <p className="section-sub">Every service we offer is designed to move the needle — traffic, leads, revenue.</p>
            </div>
            <div className="services-grid">
              {SERVICES.map(({ icon, title, desc }, i) => (
                <div key={title} className="service-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="sc-icon">{icon}</div>
                  <h3 className="sc-title">{title}</h3>
                  <p className="sc-desc">{desc}</p>
                  <Link href="/contact" className="sc-cta">Enquire <span>→</span></Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ───────────────────────────────── */}
        <section className="section process-section">
          <div className="container">
            <div className="section-head">
              <span className="section-label">How We Work</span>
              <h2 className="section-title">Our 4-Step<br /><em>Growth Process</em></h2>
            </div>
            <div className="process-grid">
              {PROCESS.map(({ step, title, desc }, i) => (
                <div key={step} className="process-card">
                  <div className="pc-step">{step}</div>
                  {i < PROCESS.length - 1 && <div className="pc-connector" />}
                  <h3 className="pc-title">{title}</h3>
                  <p className="pc-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="section-label">Client Stories</span>
              <h2 className="section-title">Results That<br /><em>Speak Louder</em></h2>
            </div>
            <div className="testimonials-grid">
              {TESTIMONIALS.map(({ name, role, text, avatar }) => (
                <div key={name} className="testimonial-card">
                  <div className="tc-stars">★★★★★</div>
                  <p className="tc-text">"{text}"</p>
                  <div className="tc-author">
                    <div className="tc-avatar">{avatar}</div>
                    <div>
                      <div className="tc-name">{name}</div>
                      <div className="tc-role">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LATEST BLOGS ──────────────────────────── */}
        {latestPosts.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-head">
                <span className="section-label">Insights</span>
                <h2 className="section-title">Latest from<br /><em>Our Blog</em></h2>
              </div>
              <div className="blogs-grid">
                {latestPosts.map((post) => (
                  <Link key={post.id} href={`/blogs/${post.slug}`} className="blog-card">
                    <div className="bc-img" style={{ backgroundImage: post.feature_image ? `url(${post.feature_image})` : 'none' }}>
                      {!post.feature_image && <span>✍️</span>}
                    </div>
                    <div className="bc-body">
                      <div className="bc-date">{new Date(post.published_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</div>
                      <h3 className="bc-title">{post.title}</h3>
                      {post.excerpt && <p className="bc-excerpt">{post.excerpt.slice(0,100)}…</p>}
                      <span className="bc-read">Read more →</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ textAlign:'center', marginTop:'3rem' }}>
                <Link href="/blogs" className="btn-outline">View All Posts →</Link>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA BANNER ────────────────────────────── */}
        <section className="cta-section">
          <div className="cta-bg">
            <div className="cta-orb" />
          </div>
          <div className="container cta-body">
            <span className="section-label">Ready to scale?</span>
            <h2 className="cta-title">Let's Build Something<br /><em>Extraordinary Together</em></h2>
            <p className="cta-sub">Free consultation. No commitments. Just results.</p>
            <div className="cta-actions">
              <Link href="/contact" className="btn-hero-primary">
                Get Free Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/about" className="btn-hero-ghost">Learn About Us</Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style jsx>{`

        /* ════════════════════════════════════════
           HERO — its own isolated visual world
        ════════════════════════════════════════ */
        .hero {
          /* Full viewport height, completely isolated */
          min-height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          /* NO padding-top here — the fixed navbar floats above it */
          /* We add padding-top only to push content below the navbar */
          padding-top: var(--header-h);
        }

        /* Hero's own background — completely separate from navbar */
        .hero-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          /* Hero has a distinct background that is NOT the site bg */
          background: var(--bg);
        }
        .hc-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 80px 80px;
          opacity: 0.6;
        }
        .hc-orb {
          position: absolute; border-radius: 50%;
          filter: blur(120px); pointer-events: none;
        }
        .hc-orb-1 {
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(255,107,0,0.13) 0%, transparent 65%);
          top: -300px; right: -200px;
          animation: orbDrift 20s ease-in-out infinite alternate;
        }
        .hc-orb-2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,179,71,0.08) 0%, transparent 65%);
          bottom: -150px; left: -100px;
          animation: orbDrift 26s ease-in-out infinite alternate-reverse;
        }
        .hc-orb-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 65%);
          top: 35%; left: 55%;
          animation: orbDrift 16s ease-in-out infinite alternate;
        }
        /* Decorative diagonal stripe that gives hero a unique identity */
        .hc-stripe {
          position: absolute;
          top: 0; right: 0;
          width: 3px; height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            var(--saffron) 30%,
            var(--gold) 60%,
            transparent 100%
          );
          opacity: 0.25;
        }
        @keyframes orbDrift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 50px) scale(1.12); }
        }

        /* Hero body — centred column, strictly limited width */
        .hero-body {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 900px;        /* hero content has its own max-width */
          margin: 0 auto;
          padding: 4rem 1.5rem 6rem; /* minimal side padding for premium look */
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }

        /* Eyebrow pill */
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--saffron);
          background: rgba(255,107,0,0.07);
          border: 1px solid var(--border-2);
          padding: 7px 16px; border-radius: 100px;
          margin-bottom: 2.25rem;
          animation: slideIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        .eb-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--saffron); flex-shrink: 0;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.3; transform:scale(0.6); }
        }
        .eb-text { line-height: 1; }

        /* Headline — hero has its own type scale, separate from body copy */
        .hero-headline {
          display: flex; flex-direction: column;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 6.5vw, 6.5rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 1.75rem;
        }
        .hl-row { display: block; }
        .hl-row-1 {
          color: var(--text-1);
          animation: slideIn 0.8s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hl-row-2 {
          animation: slideIn 0.8s 0.22s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hl-row-3 {
          color: var(--text-2);
          animation: slideIn 0.8s 0.34s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hl-accent {
          font-style: regular !important;
          background: linear-gradient(135deg, var(--saffron) 0%, var(--gold) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(32px) skewY(2deg); }
          to   { opacity: 1; transform: translateY(0)   skewY(0deg); }
        }

        /* Sub copy */
        .hero-sub {
          font-size: 1.08rem; line-height: 1.78;
          color: var(--text-2);
          max-width: 560px;
          margin-bottom: 2.5rem;
          animation: slideIn 0.8s 0.46s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* CTA row */
        .hero-cta-row {
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
          margin-bottom: 3.5rem;
          animation: slideIn 0.8s 0.58s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Hero-specific buttons (slightly larger than section buttons) */
        .btn-hero-primary {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.9rem 2rem;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          border-radius: 8px; color: white;
          font-size: 0.96rem; font-weight: 700; letter-spacing: 0.03em;
          box-shadow: 0 6px 0 var(--saffron-dk), 0 8px 24px rgba(255,107,0,0.4);
          position: relative; top: 0;
          transition: top 0.1s ease, box-shadow 0.1s ease;
        }
        .btn-hero-primary:hover {
          top: -2px;
          box-shadow: 0 8px 0 var(--saffron-dk), 0 14px 32px rgba(255,107,0,0.5);
        }
        .btn-hero-primary:active {
          top: 6px;
          box-shadow: 0 0 0 var(--saffron-dk), 0 2px 8px rgba(255,107,0,0.3);
        }
        .btn-hero-ghost {
          display: inline-flex; align-items: center;
          padding: 0.9rem 1.75rem;
          border: 1.5px solid var(--border-2);
          border-radius: 8px; color: var(--text-2);
          font-size: 0.96rem; font-weight: 500;
          background: transparent;
          transition: color var(--transition), border-color var(--transition), background var(--transition);
        }
        .btn-hero-ghost:hover {
          color: var(--text-1); border-color: var(--saffron);
          background: rgba(255,107,0,0.05);
        }

        /* Stats bar — hero-exclusive design with vertical dividers */
        .hero-stats-bar {
          display: flex; align-items: stretch; gap: 0;
          padding: 1.5rem 2rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          width: fit-content;
          animation: slideIn 0.8s 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hsb-item {
          display: flex; align-items: center; gap: 1.25rem;
          padding: 0 1.75rem;
        }
        .hsb-item:first-child { padding-left: 0; }
        .hsb-item:last-child  { padding-right: 0; }
        .hsb-divider {
          width: 1px; height: 36px; flex-shrink: 0;
          background: var(--border-2);
          margin-right: 1.75rem;
        }
        .hsb-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700;
          color: var(--saffron); line-height: 1;
        }
        .hsb-label {
          font-size: 0.74rem; color: var(--text-3);
          letter-spacing: 0.06em; font-weight: 500;
          line-height: 1.4; max-width: 70px;
        }

        /* ════════════════════════════════════════
           SECTIONS — shared page content below hero
        ════════════════════════════════════════ */
        .section { padding: 7rem 0; }
        .section-head { text-align: center; margin-bottom: 4rem; }
        .section-label {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--saffron);
          background: rgba(255,107,0,0.08);
          border: 1px solid var(--border-2);
          padding: 4px 12px; border-radius: 100px;
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 700; line-height: 1.15;
          color: var(--text-1); margin-bottom: 1rem;
        }
        .section-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-sub { font-size: 1rem; color: var(--text-2); max-width: 500px; margin: 0 auto; }

        /* Services */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .service-card {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 2rem;
          position: relative; overflow: hidden;
          transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
        }
        .service-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--saffron), transparent);
          opacity: 0; transition: opacity var(--transition);
        }
        .service-card:hover {
          border-color: var(--border-2); transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .service-card:hover::before { opacity: 1; }
        .sc-icon { font-size: 2rem; margin-bottom: 1rem; }
        .sc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem; font-weight: 700;
          color: var(--text-1); margin-bottom: 0.65rem;
        }
        .sc-desc { font-size: 0.9rem; line-height: 1.7; color: var(--text-2); margin-bottom: 1.25rem; }
        .sc-cta {
          font-size: 0.85rem; font-weight: 600; color: var(--saffron);
          display: inline-flex; gap: 0.3rem; transition: color var(--transition);
        }
        .sc-cta:hover { color: var(--gold); }
        .sc-cta span { transition: transform var(--transition); }
        .sc-cta:hover span { transform: translateX(3px); }

        /* Process */
        .process-section {
          background: linear-gradient(180deg, transparent, rgba(255,107,0,0.03) 50%, transparent);
        }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); position: relative; }
        .process-card { position: relative; padding: 2rem 1.5rem; text-align: center; }
        .pc-step {
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,107,0,0.05));
          border: 1px solid var(--border-2);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Mono', monospace;
          font-size: 0.85rem; font-weight: 700; color: var(--saffron);
          margin: 0 auto 1.25rem; position: relative; z-index: 1;
        }
        .pc-connector {
          position: absolute; top: 3.45rem;
          left: calc(50% + 28px); right: calc(-50% + 28px);
          height: 1px; background: linear-gradient(90deg, var(--border-2), var(--border));
        }
        .pc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.6rem;
        }
        .pc-desc { font-size: 0.88rem; line-height: 1.7; color: var(--text-2); }

        /* Testimonials */
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .testimonial-card {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 2rem;
          transition: border-color var(--transition), transform var(--transition);
        }
        .testimonial-card:hover { border-color: var(--border-2); transform: translateY(-3px); }
        .tc-stars { color: var(--gold); font-size: 1rem; margin-bottom: 1rem; letter-spacing: 0.1em; }
        .tc-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-style: italic; line-height: 1.65;
          color: var(--text-1); margin-bottom: 1.5rem;
        }
        .tc-author { display: flex; align-items: center; gap: 0.75rem; }
        .tc-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 700; color: white; flex-shrink: 0;
        }
        .tc-name { font-size: 0.92rem; font-weight: 700; color: var(--text-1); }
        .tc-role { font-size: 0.78rem; color: var(--text-3); }

        /* Blogs */
        .blogs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .blog-card {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); overflow: hidden;
          display: flex; flex-direction: column;
          transition: border-color var(--transition), transform var(--transition);
        }
        .blog-card:hover { border-color: var(--border-2); transform: translateY(-4px); }
        .bc-img {
          height: 200px; background: var(--surface-3);
          background-size: cover; background-position: center;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
        }
        .bc-body { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; }
        .bc-date { font-size: 0.75rem; color: var(--text-3); margin-bottom: 0.5rem; }
        .bc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700;
          color: var(--text-1); margin-bottom: 0.5rem; line-height: 1.3;
        }
        .bc-excerpt { font-size: 0.86rem; color: var(--text-2); line-height: 1.6; flex: 1; }
        .bc-read { font-size: 0.84rem; font-weight: 600; color: var(--saffron); margin-top: 1rem; }
        .btn-outline {
          display: inline-flex; align-items: center;
          padding: 0.8rem 1.75rem;
          border: 1.5px solid var(--border-2); border-radius: 8px;
          color: var(--text-2); font-size: 0.95rem; font-weight: 500;
          transition: color var(--transition), border-color var(--transition), background var(--transition);
        }
        .btn-outline:hover {
          color: var(--text-1); border-color: var(--saffron);
          background: rgba(255,107,0,0.05);
        }

        /* CTA section */
        .cta-section {
          position: relative; overflow: hidden;
          padding: 7rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .cta-bg {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(135deg, rgba(255,107,0,0.05) 0%, transparent 60%);
        }
        .cta-orb {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%);
          filter: blur(60px);
        }
        .cta-body { text-align: center; position: relative; z-index: 1; }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700; line-height: 1.15;
          color: var(--text-1); margin: 1rem 0;
        }
        .cta-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta-sub { font-size: 1rem; color: var(--text-2); margin-bottom: 2.5rem; }
        .cta-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }

        /* Responsive */
        @media (max-width: 1024px) {
          .process-grid      { grid-template-columns: repeat(2, 1fr); }
          .pc-connector      { display: none; }
          .testimonials-grid { grid-template-columns: 1fr 1fr; }
          .blogs-grid        { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 900px) {
          .hero-body    { padding: 3rem 2rem 5rem; }
          .hero-stats-bar { flex-wrap: wrap; gap: 1rem; padding: 1.25rem 1.5rem; }
          .hsb-item     { padding: 0 1rem; }
          .hsb-divider  { display: none; }
        }
        @media (max-width: 640px) {
          .hero-headline { font-size: clamp(2.6rem, 10vw, 4rem); }
          .testimonials-grid,
          .blogs-grid    { grid-template-columns: 1fr; }
          .process-grid  { grid-template-columns: 1fr; }
          .services-grid { grid-template-columns: 1fr; }
          .hero-body     { padding: 2rem 1.5rem 5rem; }
        }
      `}</style>
    </>
  );
}