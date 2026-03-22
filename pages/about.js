// pages/about.js
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/layout/SEOHead';
import Link from 'next/link';

const VALUES = [
  { icon: '🎯', title: 'Results-First',  desc: 'Every decision we make is tied to your measurable growth — traffic, leads, revenue.' },
  { icon: '🔥', title: 'Relentless',     desc: 'We hustle hard, iterate fast, and never settle for "good enough".' },
  { icon: '🤝', title: 'Transparent',    desc: 'Clear pricing, honest timelines, weekly updates. No surprises, ever.' },
  { icon: '💡', title: 'Innovative',     desc: 'We stay 2 steps ahead of trends so your brand always looks forward-thinking.' },
];

const TEAM = [
  { name: 'Founder & CEO',          role: 'Strategy & Vision',     init: 'F', color: '#FF6B00' },
  { name: 'Lead Web Developer',     role: 'Full-Stack Engineering', init: 'D', color: '#C94D00' },
  { name: 'SEO Strategist',         role: 'Search & Content',      init: 'S', color: '#FFB347' },
  { name: 'Digital Marketing Head', role: 'Campaigns & Analytics', init: 'M', color: '#FF8C33' },
];

const MILESTONES = [
  { year: '2019', title: 'Founded',         desc: 'CodePromix started as a freelance web studio in Kolkata.' },
  { year: '2020', title: 'First 10 Clients',desc: 'Delivered 10 projects including e-commerce & branding.' },
  { year: '2021', title: 'SEO Practice',    desc: 'Launched SEO & digital marketing arm. First plugin released.' },
  { year: '2022', title: 'Team of 10',      desc: 'Scaled to a full-service agency with dedicated pods.' },
  { year: '2023', title: '100+ Projects',   desc: 'Crossed 100 delivered projects & 5-star reviews.' },
  { year: '2024', title: 'Pan-India + Global', desc: 'Serving clients across India, USA, UK, Canada, Australia & UAE.' },
];

export default function About() {
  return (
    <>
      <SEOHead
        title="About CodePromix Agency — Our Story, Values & Team"
        description="CodePromix Agency is a Kolkata-based full-service digital agency delivering web development, SEO, digital marketing and WordPress solutions since 2019."
        canonical="/about"
      />
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────── */}
        <section className="about-hero">
          <div className="hero-bg">
            <div className="hb-grid" />
            <div className="hb-orb" />
          </div>
          <div className="container">
            <div className="ah-content">
              <span className="section-label">Our Story</span>
              <h1 className="ah-title">
                We Are <em>CodePromix</em> —<br />
                Built on Passion,<br />
                Driven by Results
              </h1>
              <p className="ah-desc">
                Born in Kolkata, built for the world. Since 2019, CodePromix Agency has been the digital
                partner of choice for startups, SMEs, and enterprise brands looking to win online.
                We don't just build websites — we build growth engines.
              </p>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="section-label">What Drives Us</span>
              <h2 className="section-title">Our Core <em>Values</em></h2>
            </div>
            <div className="values-grid">
              {VALUES.map(({ icon, title, desc }) => (
                <div key={title} className="value-card">
                  <div className="vc-icon">{icon}</div>
                  <h3 className="vc-title">{title}</h3>
                  <p className="vc-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission strip ────────────────── */}
        <section className="mission-strip">
          <div className="container ms-inner">
            <div>
              <h2 className="ms-title">Our Mission</h2>
              <p className="ms-text">
                To democratise digital success — making enterprise-grade web, SEO, and marketing
                accessible and affordable for every business, regardless of size.
              </p>
            </div>
            <div>
              <h2 className="ms-title">Our Vision</h2>
              <p className="ms-text">
                To become India's most trusted digital agency, recognised for measurable impact,
                ethical practices, and products that genuinely solve real problems.
              </p>
            </div>
          </div>
        </section>

        {/* ── Timeline ─────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="section-label">Journey</span>
              <h2 className="section-title">Our <em>Milestones</em></h2>
            </div>
            <div className="timeline">
              {MILESTONES.map(({ year, title, desc }, i) => (
                <div key={year} className={`tl-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="tl-dot" />
                  <div className="tl-card">
                    <span className="tl-year">{year}</span>
                    <h3 className="tl-title">{title}</h3>
                    <p className="tl-desc">{desc}</p>
                  </div>
                </div>
              ))}
              <div className="tl-line" />
            </div>
          </div>
        </section>

        {/* ── Team ─────────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="section-label">The People</span>
              <h2 className="section-title">Meet the <em>Team</em></h2>
              <p className="section-sub">A small team of highly passionate specialists — no juniors working on your project unsupervised.</p>
            </div>
            <div className="team-grid">
              {TEAM.map(({ name, role, init, color }) => (
                <div key={name} className="team-card">
                  <div className="team-avatar" style={{ background: `${color}20`, borderColor: `${color}40`, color }}>
                    {init}
                  </div>
                  <h3 className="team-name">{name}</h3>
                  <p className="team-role">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────── */}
        <section className="about-cta">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="section-title">Ready to work<br /><em>with us?</em></h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '2rem', fontSize: '1rem' }}>
              Let's have a 30-minute call and map out your digital strategy — for free.
            </p>
            <Link href="/contact" className="btn-nav">Book Free Consultation →</Link>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .about-hero {
          min-height: 70vh; display: flex; align-items: center;
          padding: calc(var(--header-h) + 5rem) 0 6rem;
          position: relative; overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .hb-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,107,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,0.03) 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .hb-orb {
          position: absolute; top: -100px; right: -100px;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%);
          filter: blur(100px); animation: orbF 18s ease-in-out infinite alternate;
        }
        @keyframes orbF { from{transform:scale(1)} to{transform:scale(1.15) translate(20px,30px)} }
        .ah-content { max-width: 720px; position: relative; z-index: 1; }
        .ah-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 700; line-height: 1.1;
          color: var(--text-1); margin: 1.25rem 0 1.5rem;
          animation: fadeUp 0.8s ease both;
        }
        .ah-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ah-desc {
          font-size: 1.05rem; line-height: 1.8;
          color: var(--text-2); margin-bottom: 2rem;
          animation: fadeUp 0.8s 0.2s ease both;
        }
        .ah-mantra {
          display: inline-block;
          padding: 6px 16px;
          border: 1px solid var(--border-2);
          border-radius: 8px; background: rgba(255,107,0,0.04);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; color: var(--gold); letter-spacing: 0.12em;
          animation: fadeUp 0.8s 0.35s ease both, mantraGlow 3s ease-in-out infinite;
        }
        @keyframes mantraGlow {
          0%,100% { text-shadow: 0 0 8px rgba(255,179,71,0.2); }
          50%      { text-shadow: 0 0 22px rgba(255,179,71,0.6); }
        }

        .section { padding: 7rem 0; }
        .section-head { text-align: center; margin-bottom: 4rem; }
        .section-label {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--saffron); background: rgba(255,107,0,0.08);
          border: 1px solid var(--border-2);
          padding: 4px 12px; border-radius: 100px; margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 700; line-height: 1.15; color: var(--text-1); margin-bottom: 1rem;
        }
        .section-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-sub { font-size: 1rem; color: var(--text-2); max-width: 500px; margin: 0 auto; }

        /* Values */
        .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .value-card {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 2rem;
          transition: border-color var(--transition), transform var(--transition);
        }
        .value-card:hover { border-color: var(--border-2); transform: translateY(-3px); }
        .vc-icon { font-size: 2rem; margin-bottom: 0.85rem; }
        .vc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.5rem;
        }
        .vc-desc { font-size: 0.88rem; line-height: 1.7; color: var(--text-2); }

        /* Mission strip */
        .mission-strip {
          padding: 5rem 0;
          background: linear-gradient(135deg, rgba(255,107,0,0.05), rgba(255,179,71,0.02));
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .ms-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
        .ms-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 700; color: var(--saffron); margin-bottom: 0.75rem;
        }
        .ms-text { font-size: 0.96rem; line-height: 1.8; color: var(--text-2); }

        /* Timeline */
        .timeline {
          position: relative; max-width: 800px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 2.5rem;
        }
        .tl-line {
          position: absolute; left: 50%; top: 0; bottom: 0;
          width: 1px; background: var(--border); transform: translateX(-50%);
        }
        .tl-item {
          display: flex; align-items: flex-start;
          position: relative; z-index: 1;
        }
        .tl-item.left  { flex-direction: row-reverse; }
        .tl-item.right { flex-direction: row; }
        .tl-dot {
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--saffron); border: 3px solid var(--deep);
          flex-shrink: 0; margin: 0 auto;
          box-shadow: 0 0 12px rgba(255,107,0,0.5);
          position: absolute; left: 50%; transform: translateX(-50%);
          top: 0.6rem;
        }
        .tl-card {
          width: calc(50% - 2rem);
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 1.25rem 1.5rem;
          transition: border-color var(--transition);
        }
        .tl-item.left .tl-card  { margin-right: auto; }
        .tl-item.right .tl-card { margin-left: auto; }
        .tl-card:hover { border-color: var(--border-2); }
        .tl-year {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem; color: var(--saffron); letter-spacing: 0.15em;
          display: block; margin-bottom: 0.3rem;
        }
        .tl-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.3rem;
        }
        .tl-desc { font-size: 0.86rem; color: var(--text-2); line-height: 1.6; }

        /* Team */
        .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .team-card {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 2rem 1.5rem; text-align: center;
          transition: border-color var(--transition), transform var(--transition);
        }
        .team-card:hover { border-color: var(--border-2); transform: translateY(-3px); }
        .team-avatar {
          width: 72px; height: 72px; border-radius: 50%;
          border: 2px solid; margin: 0 auto 1.1rem;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 700;
        }
        .team-name {
          font-size: 0.92rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.25rem;
        }
        .team-role { font-size: 0.8rem; color: var(--text-3); }

        /* About CTA */
        .about-cta {
          padding: 7rem 0;
          background: linear-gradient(135deg, rgba(255,107,0,0.04), transparent);
          border-top: 1px solid var(--border);
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 1.75rem;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          border-radius: 100px; color: white;
          font-size: 0.95rem; font-weight: 600;
          box-shadow: 0 6px 30px rgba(255,107,0,0.35);
          transition: transform var(--transition), box-shadow var(--transition);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(255,107,0,0.5); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .values-grid { grid-template-columns: 1fr 1fr; }
          .team-grid   { grid-template-columns: 1fr 1fr; }
          .ms-inner    { grid-template-columns: 1fr; gap: 2rem; }
        }
        @media (max-width: 640px) {
          .values-grid { grid-template-columns: 1fr; }
          .team-grid   { grid-template-columns: 1fr 1fr; }
          .tl-item.left, .tl-item.right { flex-direction: column; align-items: flex-end; }
          .tl-card { width: 80%; }
          .tl-line { left: 10%; }
          .tl-dot  { left: 10%; }
        }
      `}</style>
    </>
  );
}
