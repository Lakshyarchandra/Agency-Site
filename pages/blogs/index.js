// pages/blogs/index.js
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEOHead from '../../components/layout/SEOHead';
import { getDB } from '../../lib/db';

export async function getStaticProps() {
  try {
    const db = getDB();
    const [posts] = await db.execute(
      `SELECT p.id, p.title, p.slug, p.excerpt, p.feature_image,
              p.published_at, c.name AS category
       FROM posts p
       LEFT JOIN categories c ON c.id = p.category_id
       WHERE p.status = 'published'
       ORDER BY p.published_at DESC`
    );
    const [cats] = await db.execute('SELECT * FROM categories ORDER BY name');
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        categories: JSON.parse(JSON.stringify(cats)),
      },
      revalidate: 60,
    };
  } catch {
    return { props: { posts: [], categories: [] }, revalidate: 60 };
  }
}

export default function BlogsPage({ posts, categories }) {
  const [search, setSearch]   = useState('');
  const [active, setActive]   = useState('All');

  const filtered = posts.filter(p => {
    const matchCat  = active === 'All' || p.category === active;
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  return (
    <>
      <SEOHead
        title="Blog — CodePromix Agency | Web, SEO & Digital Marketing Insights"
        description="Read expert articles on web development, SEO, digital marketing, and WordPress. Published by CodePromix Agency."
        canonical="/blogs"
      />
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────── */}
        <section className="blogs-hero">
          <div className="bh-bg" />
          <div className="container">
            <span className="section-label">Our Blog</span>
            <h1 className="bh-title">Insights That<br /><em>Move The Needle</em></h1>
            <p className="bh-sub">Expert perspectives on web, SEO, marketing & WordPress — straight from our team.</p>

            {/* Search */}
            <div className="search-wrap">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text" placeholder="Search articles…"
                value={search} onChange={e => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Category filter */}
            <div className="cat-filter">
              {['All', ...categories.map(c => c.name)].map(cat => (
                <button
                  key={cat}
                  className={`cat-btn ${active === cat ? 'active' : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Content ──────────────────────── */}
        <section className="blogs-content">
          <div className="container">
            {filtered.length === 0 ? (
              <div className="no-results">
                <span>🔍</span>
                <h3>No articles found</h3>
                <p>Try a different search term or category</p>
              </div>
            ) : (
              <>
                {/* Featured post */}
                {featured && (
                  <Link href={`/blogs/${featured.slug}`} className="featured-card">
                    <div className="fc-img"
                      style={{ backgroundImage: featured.feature_image ? `url(${featured.feature_image})` : 'none' }}>
                      {!featured.feature_image && <span className="fc-ph">✍️</span>}
                      {featured.category && <span className="fc-cat">{featured.category}</span>}
                    </div>
                    <div className="fc-body">
                      <div className="fc-featured-badge">Featured Article</div>
                      <h2 className="fc-title">{featured.title}</h2>
                      {featured.excerpt && <p className="fc-excerpt">{featured.excerpt}</p>}
                      <div className="fc-meta">
                        <span>{new Date(featured.published_at).toLocaleDateString('en-IN', { day:'numeric',month:'long',year:'numeric' })}</span>
                        <span className="fc-read-btn">Read Article →</span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Grid */}
                {rest.length > 0 && (
                  <div className="posts-grid">
                    {rest.map(post => (
                      <Link key={post.id} href={`/blogs/${post.slug}`} className="post-card">
                        <div className="pc-img"
                          style={{ backgroundImage: post.feature_image ? `url(${post.feature_image})` : 'none' }}>
                          {!post.feature_image && <span className="pc-ph">✍️</span>}
                          {post.category && <span className="pc-cat">{post.category}</span>}
                        </div>
                        <div className="pc-body">
                          <h3 className="pc-title">{post.title}</h3>
                          {post.excerpt && <p className="pc-excerpt">{post.excerpt.slice(0,110)}…</p>}
                          <div className="pc-meta">
                            <span>{new Date(post.published_at).toLocaleDateString('en-IN', { month:'short', day:'numeric', year:'numeric' })}</span>
                            <span className="pc-read">Read →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        /* Hero */
        .blogs-hero {
          padding: calc(var(--header-h) + 4rem) 0 4rem;
          text-align: center; position: relative; overflow: hidden;
        }
        .bh-bg {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,107,0,0.07) 0%, transparent 70%);
        }
        .bh-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 700; line-height: 1.1; color: var(--text-1);
          margin: 1rem 0 0.75rem;
        }
        .bh-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bh-sub { font-size: 1rem; color: var(--text-2); margin-bottom: 2.5rem; }
        .section-label {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--saffron); background: rgba(255,107,0,0.08);
          border: 1px solid rgba(255,107,0,0.28);
          padding: 4px 12px; border-radius: 100px; margin-bottom: 1rem;
        }

        /* Search */
        .search-wrap {
          position: relative; max-width: 520px; margin: 0 auto 1.75rem;
        }
        .search-icon {
          position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
          color: var(--text-3); pointer-events: none;
        }
        .search-input {
          width: 100%; padding: 0.85rem 1.25rem 0.85rem 3rem;
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: 100px; color: var(--text-1);
          font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
          transition: border-color var(--transition), box-shadow var(--transition);
        }
        .search-input::placeholder { color: var(--text-3); }
        .search-input:focus {
          outline: none; border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(255,107,0,0.1);
        }

        /* Filters */
        .cat-filter {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem;
        }
        .cat-btn {
          padding: 0.4rem 1rem;
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: 100px; color: var(--text-2);
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 500;
          cursor: pointer;
          transition: all var(--transition);
        }
        .cat-btn:hover { border-color: var(--border-2); color: var(--text-1); }
        .cat-btn.active {
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          border-color: transparent; color: white;
        }

        /* Content */
        .blogs-content { padding: 3rem 0 7rem; }

        /* Featured */
        .featured-card {
          display: grid; grid-template-columns: 1.2fr 1fr;
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); overflow: hidden;
          margin-bottom: 3rem;
          transition: border-color var(--transition), transform var(--transition);
          text-decoration: none;
        }
        .featured-card:hover { border-color: var(--border-2); transform: translateY(-3px); }
        .fc-img {
          min-height: 340px; background: var(--surface-3);
          background-size: cover; background-position: center;
          display: flex; align-items: flex-end; padding: 1.25rem;
          position: relative;
        }
        .fc-ph { font-size: 3rem; margin: auto; }
        .fc-cat {
          position: absolute; top: 1.25rem; left: 1.25rem;
          padding: 4px 12px; background: var(--saffron);
          border-radius: 100px; font-size: 0.72rem; font-weight: 700; color: white;
        }
        .fc-body {
          padding: 2.5rem; display: flex; flex-direction: column;
          justify-content: center;
        }
        .fc-featured-badge {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--saffron); margin-bottom: 1rem;
        }
        .fc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; line-height: 1.2;
          color: var(--text-1); margin-bottom: 1rem;
        }
        .fc-excerpt { font-size: 0.92rem; line-height: 1.75; color: var(--text-2); flex: 1; }
        .fc-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 1.5rem; font-size: 0.82rem; color: var(--text-3);
        }
        .fc-read-btn { color: var(--saffron); font-weight: 700; }

        /* Grid */
        .posts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .post-card {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); overflow: hidden;
          display: flex; flex-direction: column; text-decoration: none;
          transition: border-color var(--transition), transform var(--transition);
        }
        .post-card:hover { border-color: var(--border-2); transform: translateY(-3px); }
        .pc-img {
          height: 200px; background: var(--surface-3);
          background-size: cover; background-position: center;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .pc-ph { font-size: 2rem; }
        .pc-cat {
          position: absolute; top: 1rem; left: 1rem;
          padding: 3px 10px; background: var(--saffron);
          border-radius: 100px; font-size: 0.68rem; font-weight: 700; color: white;
        }
        .pc-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .pc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700; line-height: 1.3;
          color: var(--text-1); margin-bottom: 0.5rem;
        }
        .pc-excerpt { font-size: 0.85rem; color: var(--text-2); line-height: 1.6; flex: 1; }
        .pc-meta {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 1rem; font-size: 0.78rem; color: var(--text-3);
        }
        .pc-read { color: var(--saffron); font-weight: 700; }

        /* No results */
        .no-results {
          text-align: center; padding: 6rem 2rem;
          color: var(--text-2);
        }
        .no-results span { font-size: 3rem; display: block; margin-bottom: 1rem; }
        .no-results h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; color: var(--text-1); margin-bottom: 0.5rem;
        }

        @media (max-width: 900px) {
          .featured-card { grid-template-columns: 1fr; }
          .fc-img { min-height: 220px; }
          .posts-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .posts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
