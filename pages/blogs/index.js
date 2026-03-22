// pages/blogs/index.js
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEOHead from '../../components/layout/SEOHead';
import { useScrollReveal } from '../../lib/useGSAP';
import { uploadUrl } from '../../lib/api';
import s from '../../styles/blogs.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getStaticProps() {
  try {
    const [postsRes, catsRes] = await Promise.all([
      fetch(`${API_URL}/api/blogs/published`),
      fetch(`${API_URL}/api/categories`),
    ]);
    const { posts } = await postsRes.json();
    const { categories } = await catsRes.json();
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        categories: JSON.parse(JSON.stringify(categories)),
      },
      revalidate: 60,
    };
  } catch {
    return { props: { posts: [], categories: [] }, revalidate: 60 };
  }
}

export default function BlogsPage({ posts, categories }) {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('All');
  const revealRef = useScrollReveal();

  const filtered = posts.filter(p => {
    const matchCat = active === 'All' || p.category === active;
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <SEOHead
        title="Blog — CodePromix Agency | Web, SEO & Digital Marketing Insights"
        description="Read expert articles on web development, SEO, digital marketing, and WordPress."
        canonical="/blogs"
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroBg} />
          <div className="container">
            <span className="section-label">Our Blog</span>
            <h1 className={s.heroTitle}>Insights That<br /><em>Move The Needle</em></h1>
            <p className={s.heroSub}>Expert perspectives on web, SEO, marketing & WordPress — straight from our team.</p>

            {/* Search */}
            <div className={s.searchWrap}>
              <svg className={s.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text" placeholder="Search articles…"
                value={search} onChange={e => setSearch(e.target.value)}
                className={s.searchInput}
              />
            </div>

            {/* Category filter */}
            <div className={s.catFilter}>
              {['All', ...categories.map(c => c.name)].map(cat => (
                <button
                  key={cat}
                  className={`${s.catBtn} ${active === cat ? s.catBtnActive : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className={s.content}>
          <div className="container">
            {filtered.length === 0 ? (
              <div className={s.noResults}>
                <span>🔍</span>
                <h3>No articles found</h3>
                <p>Try a different search term or category</p>
              </div>
            ) : (
              <>
                {/* Featured post */}
                {featured && (
                  <Link href={`/blogs/${featured.slug}`} className={s.featuredCard} ref={revealRef}>
                    <div className={s.featuredImage}
                      style={{ backgroundImage: featured.feature_image ? `url(${uploadUrl(featured.feature_image)})` : 'none' }}>
                      {!featured.feature_image && <span className={s.featuredPlaceholder}>✍️</span>}
                      {featured.category && <span className={s.featuredCategory}>{featured.category}</span>}
                    </div>
                    <div className={s.featuredBody}>
                      <div className={s.featuredBadge}>Featured Article</div>
                      <h2 className={s.featuredTitle}>{featured.title}</h2>
                      {featured.excerpt && <p className={s.featuredExcerpt}>{featured.excerpt}</p>}
                      <div className={s.featuredMeta}>
                        <span>{new Date(featured.published_at).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</span>
                        <span className={s.featuredReadBtn}>Read Article →</span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Grid */}
                {rest.length > 0 && (
                  <div className={s.postsGrid} ref={revealRef} data-stagger-children={`.${s.postCard}`} data-stagger="0.08">
                    {rest.map(post => (
                      <Link key={post.id} href={`/blogs/${post.slug}`} className={s.postCard}>
                        <div className={s.postImage}
                          style={{ backgroundImage: post.feature_image ? `url(${uploadUrl(post.feature_image)})` : 'none' }}>
                          {!post.feature_image && <span className={s.postPlaceholder}>✍️</span>}
                          {post.category && <span className={s.postCategory}>{post.category}</span>}
                        </div>
                        <div className={s.postBody}>
                          <h3 className={s.postTitle}>{post.title}</h3>
                          {post.excerpt && <p className={s.postExcerpt}>{post.excerpt.slice(0,110)}…</p>}
                          <div className={s.postMeta}>
                            <span>{new Date(post.published_at).toLocaleDateString('en-IN', { month:'short', day:'numeric', year:'numeric' })}</span>
                            <span className={s.postReadBtn}>Read →</span>
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
    </>
  );
}
