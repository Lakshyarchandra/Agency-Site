// pages/blogs/[slug].js
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEOHead from '../../components/layout/SEOHead';
import Link from 'next/link';
import { getDB } from '../../lib/db';
import s from '../../styles/blogs.module.css';

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
        {/* Article header */}
        <header className={s.postHeader}>
          <div className={s.postHeaderBg} />
          <div className="container">
            <Link href="/blogs" className={s.backLink}>← All Articles</Link>
            {post.category && <span className={s.postCategoryBadge}>{post.category}</span>}
            <h1 className={s.postDetailTitle}>{post.title}</h1>
            {post.excerpt && <p className={s.postDetailExcerpt}>{post.excerpt}</p>}
            <div className={s.postDetailMeta}>
              <span className={s.metaAuthor}>
                <span className={s.metaAvatar}>{post.author_name?.[0] || 'C'}</span>
                {post.author_name || 'CodePromix Team'}
              </span>
              <span>·</span>
              <span>{pubDate}</span>
            </div>
          </div>
        </header>

        {/* Feature image */}
        {post.feature_image && (
          <div className={s.featureImgWrap}>
            <div className="container">
              <div className={s.featureImg} style={{ backgroundImage: `url(${post.feature_image})` }} />
            </div>
          </div>
        )}

        {/* Article content */}
        <article className={s.articleBody}>
          <div className="container">
            <div className={s.articleLayout}>
              <div>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: post.content || '<p>No content yet.</p>' }}
                />
              </div>
              {/* Sidebar */}
              <aside className={s.sidebar}>
                <div className={s.sidebarCard}>
                  <h3>About CodePromix</h3>
                  <p>We build web, SEO & digital marketing solutions that drive real growth.</p>
                  <Link href="/contact" className={s.sidebarCta}>Get Free Consultation →</Link>
                </div>
                {related.length > 0 && (
                  <div className={s.sidebarCard}>
                    <h3>Related Articles</h3>
                    <div className={s.relatedList}>
                      {related.map(r => (
                        <Link key={r.id} href={`/blogs/${r.slug}`} className={s.relatedItem}>
                          {r.feature_image && (
                            <div className={s.relatedImg} style={{ backgroundImage: `url(${r.feature_image})` }} />
                          )}
                          <span className={s.relatedTitle}>{r.title}</span>
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
    </>
  );
}
