// pages/about.js
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/layout/SEOHead';
import Link from 'next/link';
import { useScrollReveal } from '../lib/useGSAP';
import s from '../styles/about.module.css';

const VALUES = [
  { icon: '🎯', title: 'Results-First',  desc: 'Every decision we make is tied to your measurable growth — traffic, leads, revenue.' },
  { icon: '🔥', title: 'Relentless',     desc: 'We hustle hard, iterate fast, and never settle for "good enough".' },
  { icon: '🤝', title: 'Transparent',    desc: 'Clear pricing, honest timelines, weekly updates. No surprises, ever.' },
  { icon: '⚡', title: 'Speed-Obsessed', desc: 'First impressions matter. We build fast, deploy faster, and optimise relentlessly.' },
  { icon: '🔧', title: 'Craft',          desc: 'Clean code, semantic HTML, accessibility, and no shortcuts. We take pride in our craft.' },
  { icon: '🌍', title: 'Impact',         desc: 'We help businesses across industries and borders. From Kolkata to California.' },
];

const TIMELINE = [
  { year: '2020', title: 'The Spark',        desc: 'Founded with a simple mission: build digital experiences that actually drive revenue.' },
  { year: '2021', title: 'First 50 Clients',  desc: 'Word-of-mouth and results-driven growth led us to our first major milestone.' },
  { year: '2022', title: 'WordPress Plugins', desc: 'Launched our first suite of premium WordPress plugins, serving thousands of users.' },
  { year: '2023', title: 'Full-Stack Agency', desc: 'Expanded into SEO, digital marketing, and branding — a complete growth partner.' },
  { year: '2024', title: 'Scaling New Heights',desc: 'Global clients, 150+ projects, and a team that is passionate about every pixel.' },
];

const TEAM = [
  { name: 'Lakshya Roy',    role: 'Founder & Lead Developer', desc: 'Full-stack engineer obsessed with clean code and business impact.', initials: 'LR' },
  { name: 'Ananya Das',     role: 'Design Lead',               desc: 'Creates intuitive interfaces that users love and businesses benefit from.', initials: 'AD' },
  { name: 'Rohan Banerjee', role: 'SEO & Marketing',           desc: 'Data nerd who turns search traffic into paying, loyal customers.', initials: 'RB' },
  { name: 'Sneha Patel',    role: 'Content Strategist',        desc: 'Turns complex ideas into compelling brand narratives that convert.', initials: 'SP' },
];

export default function About() {
  const revealRef = useScrollReveal();

  return (
    <>
      <SEOHead title="About Us — CodePromix" description="Learn about the team, values, and journey behind CodePromix Agency." canonical="/about" />
      <Navbar />

      <main>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroBg} />
          <div className="container" ref={revealRef}>
            <span className="section-label">Our Story</span>
            <h1 className={s.heroTitle}>
              We're a team of builders<br />who <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, var(--saffron), var(--gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>ship results</em>, not excuses.
            </h1>
            <p className={s.heroSub}>
              CodePromix was born from one belief: every business deserves a digital
              presence that genuinely drives growth — not just looks pretty.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="section">
          <div className="container">
            <div className="section-head" ref={revealRef}>
              <span className="section-label">What Drives Us</span>
              <h2 className="section-title">Our Core <em>Values</em></h2>
            </div>
            <div className={s.valuesGrid} ref={revealRef} data-stagger-children={`.${s.valueCard}`} data-stagger="0.08">
              {VALUES.map(({ icon, title, desc }) => (
                <div key={title} className={s.valueCard}>
                  <div className={s.valueIcon}>{icon}</div>
                  <h3 className={s.valueTitle}>{title}</h3>
                  <p className={s.valueDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,107,0,0.03) 50%, transparent)' }}>
          <div className="container">
            <div className="section-head" ref={revealRef}>
              <span className="section-label">Our Journey</span>
              <h2 className="section-title">How We <em>Got Here</em></h2>
            </div>
            <div className={s.timeline}>
              <div className={s.timelineLine} />
              {TIMELINE.map(({ year, title, desc }) => (
                <div key={year} className={s.timelineItem} ref={revealRef} data-direction="left">
                  <div className={s.timelineDot} />
                  <div className={s.timelineCard}>
                    <div className={s.timelineYear}>{year}</div>
                    <h3 className={s.timelineTitle}>{title}</h3>
                    <p className={s.timelineDesc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container">
            <div className="section-head" ref={revealRef}>
              <span className="section-label">The Crew</span>
              <h2 className="section-title">Meet the <em>Team</em></h2>
            </div>
            <div className={s.teamGrid} ref={revealRef} data-stagger-children={`.${s.teamCard}`} data-stagger="0.1">
              {TEAM.map(({ name, role, desc, initials }) => (
                <div key={name} className={s.teamCard}>
                  <div className={s.teamAvatar}>{initials}</div>
                  <h3 className={s.teamName}>{name}</h3>
                  <div className={s.teamRole}>{role}</div>
                  <p className={s.teamDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container">
            <div className={s.ctaBanner} ref={revealRef}>
              <span className="section-label">Ready?</span>
              <h2 className={s.ctaTitle}>Let's Build <em>Your Vision</em></h2>
              <p className={s.ctaSub}>We'd love to hear about your project and show you what we can do.</p>
              <Link href="/contact" className="btn-primary" style={{ position: 'relative', zIndex: 1 }}>
                Get in Touch →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
