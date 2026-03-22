import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/layout/SEOHead';
import { getDB } from '../lib/db';
import { useScrollReveal, useHeroAnimation, useCounterAnimation } from '../lib/useGSAP';
import s from '../styles/home.module.css';

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
  const heroRef = useHeroAnimation();
  const revealRef = useScrollReveal();
  const counterRef = useCounterAnimation();

  return (
    <>
      <SEOHead canonical="/" />
      <Navbar />

      <main>
        {/* ── HERO ──────────────────────────────── */}
        <section className={s.hero}>
          <div className={s.heroCanvas}>
            <div className={s.heroGrid} />
            <div className={`${s.heroOrb} ${s.heroOrb1}`} />
            <div className={`${s.heroOrb} ${s.heroOrb2}`} />
            <div className={`${s.heroOrb} ${s.heroOrb3}`} />
            <div className={s.heroStripe} />
          </div>

          <div className={s.heroBody} ref={heroRef}>
            <div className={s.heroEyebrow} data-hero-animate>
              <span className={s.eyebrowDot} />
              <span>Think · Trust · Traffic</span>
            </div>

            <h1 className={s.heroHeadline}>
              <span className={`${s.headlineRow} ${s.headlineRow1}`} data-hero-animate>We Build Brands</span>
              <span className={s.headlineRow} data-hero-animate>
                <em className={s.headlineAccent}>That Dominate</em>
              </span>
              <span className={`${s.headlineRow} ${s.headlineRow3}`} data-hero-animate>The Digital World</span>
            </h1>

            <p className={s.heroSub} data-hero-animate>
              CodePromix Agency crafts powerful websites, SEO strategies, and WordPress plugins
              that put your business permanently ahead of the competition.
            </p>

            <div className={s.heroCtaRow} data-hero-animate>
              <Link href="/contact" className="btn-primary">
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/blogs" className="btn-ghost">
                Explore Insights
              </Link>
            </div>

            <div className={s.heroStatsBar} ref={counterRef} data-hero-animate>
              {STATS.map(({ num, label }, i) => (
                <div key={label} className={s.statsItem}>
                  {i > 0 && <div className={s.statsDivider} />}
                  <span className={s.statsNumber} data-count-to={num}>{num}</span>
                  <span className={s.statsLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ──────────────────────────── */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-head" ref={revealRef}>
              <span className="section-label">What We Do</span>
              <h2 className="section-title">Services Engineered<br />for <em>Real Results</em></h2>
              <p className="section-sub">Every service we offer is designed to move the needle — traffic, leads, revenue.</p>
            </div>
            <div className={s.servicesGrid} ref={revealRef} data-stagger-children={`.${s.serviceCard}`} data-stagger="0.08">
              {SERVICES.map(({ icon, title, desc }) => (
                <div key={title} className={s.serviceCard}>
                  <div className={s.serviceIcon}>{icon}</div>
                  <h3 className={s.serviceTitle}>{title}</h3>
                  <p className={s.serviceDesc}>{desc}</p>
                  <Link href="/contact" className={s.serviceCta}>Enquire <span>→</span></Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ───────────────────────────── */}
        <section className={`section ${s.processSection}`}>
          <div className="container">
            <div className="section-head" ref={revealRef}>
              <span className="section-label">How We Work</span>
              <h2 className="section-title">Our 4-Step<br /><em>Growth Process</em></h2>
            </div>
            <div className={s.processGrid} ref={revealRef} data-stagger-children={`.${s.processCard}`} data-stagger="0.12">
              {PROCESS.map(({ step, title, desc }, i) => (
                <div key={step} className={s.processCard}>
                  <div className={s.processStep}>{step}</div>
                  {i < PROCESS.length - 1 && <div className={s.processConnector} />}
                  <h3 className={s.processTitle}>{title}</h3>
                  <p className={s.processDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-head" ref={revealRef}>
              <span className="section-label">Client Stories</span>
              <h2 className="section-title">Results That<br /><em>Speak Louder</em></h2>
            </div>
            <div className={s.testimonialsGrid} ref={revealRef} data-stagger-children={`.${s.testimonialCard}`} data-stagger="0.1">
              {TESTIMONIALS.map(({ name, role, text, avatar }) => (
                <div key={name} className={s.testimonialCard}>
                  <div className={s.testimonialStars}>★★★★★</div>
                  <p className={s.testimonialText}>"{text}"</p>
                  <div className={s.testimonialAuthor}>
                    <div className={s.testimonialAvatar}>{avatar}</div>
                    <div>
                      <div className={s.testimonialName}>{name}</div>
                      <div className={s.testimonialRole}>{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LATEST BLOGS ──────────────────────── */}
        {latestPosts.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-head" ref={revealRef}>
                <span className="section-label">Insights</span>
                <h2 className="section-title">Latest from<br /><em>Our Blog</em></h2>
              </div>
              <div className={s.blogsGrid} ref={revealRef} data-stagger-children={`.${s.blogCard}`} data-stagger="0.1">
                {latestPosts.map((post) => (
                  <Link key={post.id} href={`/blogs/${post.slug}`} className={s.blogCard}>
                    <div className={s.blogImage} style={{ backgroundImage: post.feature_image ? `url(${post.feature_image})` : 'none' }}>
                      {!post.feature_image && <span>✍️</span>}
                    </div>
                    <div className={s.blogBody}>
                      <div className={s.blogDate}>{new Date(post.published_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</div>
                      <h3 className={s.blogTitle}>{post.title}</h3>
                      {post.excerpt && <p className={s.blogExcerpt}>{post.excerpt.slice(0,100)}…</p>}
                      <span className={s.blogReadMore}>Read more →</span>
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

        {/* ── CTA BANNER ────────────────────────── */}
        <section className={s.ctaSection}>
          <div className={s.ctaBackground}>
            <div className={s.ctaOrb} />
          </div>
          <div className={`container ${s.ctaBody}`} ref={revealRef}>
            <span className="section-label">Ready to scale?</span>
            <h2 className={s.ctaTitle}>Let's Build Something<br /><em>Extraordinary Together</em></h2>
            <p className={s.ctaSub}>Free consultation. No commitments. Just results.</p>
            <div className={s.ctaActions}>
              <Link href="/contact" className="btn-primary">
                Get Free Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/about" className="btn-ghost">Learn About Us</Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}