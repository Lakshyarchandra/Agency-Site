// pages/blogs/[slug].js
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEOHead from '../../components/layout/SEOHead';
import Link from 'next/link';
import { getDB } from '../../lib/db';

export async function getStaticPaths() {
  try {
    const db = getDB();
    const [rows] = await db.execute("SELECT slug FROM posts WHERE status='published'");
    return {
      paths: rows.map(r => ({ params: { slug: r.slug } })),
      fallback: 'blocking',
    };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const db = getDB();
    const [rows] = await db.execute(
      `SELECT p.*, c.name AS category, a.name AS author_name
       FROM posts p
       LEFT JOIN categories c ON c.id = p.category_id
       LEFT JOIN admins a ON a.id = p.author_id
       WHERE p.slug = ? AND p.status = 'published'`,
      [params.slug]
    );
    if (!rows.length) return { notFound: true };

    const [related] = await db.execute(
      `SELECT id, title, slug, feature_image, published_at
       FROM posts
       WHERE status='published' AND slug != ? AND category_id = ?
       LIMIT 3`,
      [params.slug, rows[0].category_id || 0]
    );

    return {
      props: {
        post: JSON.parse(JSON.stringify(rows[0])),
        related: JSON.parse(JSON.stringify(related)),
      },
      revalidate: 60,
    };
  } catch {
    return { notFound: true };
  }
}

export default function BlogPost({ post, related }) {
  const pubDate = new Date(post.published_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        keywords={post.meta_keywords}
        robots={post.robots}
        ogImage={post.feature_image || '/og-default.jpg'}
        canonical={`/blogs/${post.slug}`}
      />
      <Navbar />
      <main>
        {/* ── Article header ─────────────── */}
        <header className="post-header">
          <div className="ph-bg" />
          <div className="container">
            <Link href="/blogs" className="back-link">← All Articles</Link>
            {post.category && <span className="post-cat">{post.category}</span>}
            <h1 className="post-title">{post.title}</h1>
            {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
            <div className="post-meta">
              <span className="meta-author">
                <span className="meta-avatar">{post.author_name?.[0] || 'I'}</span>
                {post.author_name || 'CodePromix Team'}
              </span>
              <span className="meta-dot">·</span>
              <span>{pubDate}</span>
            </div>
          </div>
        </header>

        {/* Feature image */}
        {post.feature_image && (
          <div className="feature-img-wrap">
            <div className="container">
              <div className="feature-img" style={{ backgroundImage: `url(${post.feature_image})` }} />
            </div>
          </div>
        )}

        {/* ── Article content ─────────────── */}
        <article className="post-body">
          <div className="container">
            <div className="post-layout">
              <div className="post-content">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: post.content || '<p>No content yet.</p>' }}
                />
              </div>
              {/* Sidebar */}
              <aside className="post-sidebar">
                <div className="sidebar-card">
                  <h3>About CodePromix</h3>
                  <p>We build web, SEO & digital marketing solutions that drive real growth.</p>
                  <Link href="/contact" className="sidebar-cta">Get Free Consultation →</Link>
                </div>
                {related.length > 0 && (
                  <div className="sidebar-card">
                    <h3>Related Articles</h3>
                    <div className="related-list">
                      {related.map(r => (
                        <Link key={r.id} href={`/blogs/${r.slug}`} className="related-item">
                          {r.feature_image && (
                            <div className="ri-img" style={{ backgroundImage: `url(${r.feature_image})` }} />
                          )}
                          <span className="ri-title">{r.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />

      <style jsx>{`
        .post-header {
          padding: calc(var(--header-h) + 3rem) 0 3rem;
          position: relative; overflow: hidden;
        }
        .ph-bg {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,107,0,0.06) 0%, transparent 70%);
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.85rem; color: var(--text-3);
          transition: color var(--transition); margin-bottom: 1.25rem; display: block;
        }
        .back-link:hover { color: var(--saffron); }
        .post-cat {
          display: inline-block;
          padding: 4px 14px; background: rgba(255,107,0,0.1);
          border: 1px solid rgba(255,107,0,0.3);
          border-radius: 100px; color: var(--saffron);
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em;
          margin-bottom: 1.25rem;
        }
        .post-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.8rem);
          font-weight: 700; line-height: 1.15;
          color: var(--text-1); max-width: 820px;
          margin-bottom: 1rem;
        }
        .post-excerpt {
          font-size: 1.1rem; line-height: 1.7; color: var(--text-2);
          max-width: 680px; margin-bottom: 1.5rem;
        }
        .post-meta {
          display: flex; align-items: center; gap: 0.75rem;
          font-size: 0.85rem; color: var(--text-3);
        }
        .meta-author { display: flex; align-items: center; gap: 0.5rem; color: var(--text-2); font-weight: 600; }
        .meta-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--saffron); color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700;
        }
        .meta-dot { color: var(--border-2); }

        /* Feature img */
        .feature-img-wrap { padding: 2rem 0; }
        .feature-img {
          height: 480px; border-radius: var(--radius-xl);
          background-size: cover; background-position: center;
          border: 1px solid var(--border);
        }

        /* Article body */
        .post-body { padding: 3rem 0 7rem; }
        .post-layout {
          display: grid; grid-template-columns: 1fr 300px; gap: 4rem;
          align-items: start;
        }
        /* Prose styles */
        :global(.prose) { color: var(--text-2); font-size: 1.02rem; line-height: 1.85; }
        :global(.prose h1), :global(.prose h2), :global(.prose h3) {
          font-family: 'Cormorant Garamond', serif;
          color: var(--text-1); margin: 2rem 0 1rem; line-height: 1.25;
        }
        :global(.prose h2) { font-size: 2rem; }
        :global(.prose h3) { font-size: 1.5rem; }
        :global(.prose p)  { margin-bottom: 1.25rem; }
        :global(.prose a)  { color: var(--saffron); text-decoration: underline; }
        :global(.prose ul), :global(.prose ol) { padding-left: 1.5rem; margin-bottom: 1.25rem; }
        :global(.prose li) { margin-bottom: 0.4rem; }
        :global(.prose img) { border-radius: var(--radius-lg); margin: 2rem 0; width: 100%; }
        :global(.prose blockquote) {
          border-left: 3px solid var(--saffron);
          padding: 0.75rem 1.5rem; margin: 1.5rem 0;
          background: rgba(255,107,0,0.04);
          border-radius: 0 var(--radius) var(--radius) 0;
          font-style: italic; color: var(--text-1);
        }
        :global(.prose code) {
          background: var(--surface-2); padding: 2px 6px;
          border-radius: 4px; font-size: 0.88em;
          color: var(--saffron-lt);
        }
        :global(.prose pre) {
          background: var(--surface-2); border: 1px solid var(--border);
          padding: 1.25rem; border-radius: var(--radius-lg);
          overflow-x: auto; margin: 1.5rem 0;
        }

        /* Sidebar */
        .post-sidebar { display: flex; flex-direction: column; gap: 1.5rem; position: sticky; top: 90px; }
        .sidebar-card {
          background: var(--surface-2); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 1.5rem;
        }
        .sidebar-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.6rem;
        }
        .sidebar-card p { font-size: 0.87rem; color: var(--text-2); line-height: 1.65; }
        .sidebar-cta {
          display: block; margin-top: 1rem;
          padding: 0.65rem 1rem; text-align: center;
          background: linear-gradient(135deg, var(--saffron), var(--saffron-dk));
          border-radius: var(--radius); color: white;
          font-size: 0.86rem; font-weight: 700;
          transition: transform var(--transition);
        }
        .sidebar-cta:hover { transform: translateY(-1px); }
        .related-list { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.75rem; }
        .related-item {
          display: flex; gap: 0.75rem; align-items: center;
          font-size: 0.84rem; color: var(--text-2); text-decoration: none;
          transition: color var(--transition);
        }
        .related-item:hover { color: var(--saffron); }
        .ri-img {
          width: 52px; height: 40px; flex-shrink: 0;
          border-radius: 6px; background-size: cover; background-position: center;
          background-color: var(--surface-3);
        }
        .ri-title { line-height: 1.4; }

        @media (max-width: 900px) {
          .post-layout { grid-template-columns: 1fr; }
          .post-sidebar { position: static; }
          .feature-img { height: 300px; }
        }
      `}</style>
    </>
  );
}
