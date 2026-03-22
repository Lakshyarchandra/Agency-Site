import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import AdminLayout from '../../../components/layout/AdminLayout';
import { isLoggedIn, getAdminInfo } from '../../../lib/auth';
import { apiGet, apiUpload, uploadUrl } from '../../../lib/api';
import toast from 'react-hot-toast';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p style={{ color: '#888', padding: '1rem' }}>Loading editor...</p>,
});

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const ROBOTS_OPTIONS = [
  { value: 'index,follow',     label: '✅ Index, Follow (Recommended)' },
  { value: 'noindex,nofollow', label: '❌ No Index, No Follow' },
  { value: 'index,nofollow',   label: '🔗 Index, No Follow' },
  { value: 'noindex,follow',   label: '🚫 No Index, Follow' },
];

export default function NewPost() {
  const router  = useRouter();
  const fileRef = useRef(null);

  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title,          setTitle]          = useState('');
  const [slug,           setSlug]           = useState('');
  const [excerpt,        setExcerpt]        = useState('');
  const [content,        setContent]        = useState('');
  const [categoryId,     setCategoryId]     = useState('');
  const [status,         setStatus]         = useState('draft');
  const [metaTitle,      setMetaTitle]      = useState('');
  const [metaDesc,       setMetaDesc]       = useState('');
  const [metaKeywords,   setMetaKeywords]   = useState('');
  const [robots,         setRobots]         = useState('index,follow');
  const [featureImage,   setFeatureImage]   = useState(null);
  const [featurePreview, setFeaturePreview] = useState('');
  const [saving,         setSaving]         = useState(false);
  const [activeTab,      setActiveTab]      = useState('content');

  useEffect(() => {
    if (!isLoggedIn()) { router.replace('/admin'); return; }
    setAdmin(getAdminInfo());
    apiGet('/api/categories')
      .then(data => { if (data) setCategories(data.categories); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Auto slug from title
  useEffect(() => {
    if (!title) { setSlug(''); return; }
    const s = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 100);
    setSlug(s);
  }, [title]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
    setFeatureImage(file);
    setFeaturePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFeatureImage(null);
    setFeaturePreview('');
  };

  const handleSave = async (saveStatus) => {
    if (!title.trim())                            { toast.error('Title is required');   return; }
    if (!slug.trim())                             { toast.error('Slug is required');    return; }
    if (!content.replace(/<[^>]+>/g, '').trim()) { toast.error('Content is required'); return; }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title',            title);
      fd.append('slug',             slug);
      fd.append('excerpt',          excerpt);
      fd.append('content',          content);
      fd.append('category_id',      categoryId);
      fd.append('status',           saveStatus);
      fd.append('meta_title',       metaTitle || title);
      fd.append('meta_description', metaDesc);
      fd.append('meta_keywords',    metaKeywords);
      fd.append('robots',           robots);
      if (featureImage) fd.append('feature_image', featureImage);

      const data = await apiUpload('/api/blogs', fd);
      if (!data) return;

      toast.success(saveStatus === 'published' ? '🎉 Post published!' : '📋 Draft saved!');
      router.push('/admin/posts');
    } catch (err) {
      toast.error(err?.error || 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const titleLen   = metaTitle.length;
  const descLen    = metaDesc.length;
  const titleColor = titleLen > 54 ? '#ff6666' : titleLen > 40 ? '#FFB347' : '#22cc88';
  const descColor  = descLen  > 145 ? '#ff6666' : descLen > 120 ? '#FFB347' : '#22cc88';

  const seoChecks = [
    { label: 'Title set',       ok: !!title },
    { label: 'Slug set',        ok: !!slug },
    { label: 'Excerpt set',     ok: !!excerpt },
    { label: 'Meta title',      ok: !!metaTitle },
    { label: 'Meta description',ok: !!metaDesc },
    { label: 'Feature image',   ok: !!featurePreview },
    { label: 'Indexed',         ok: robots.startsWith('index') },
  ];

  if (loading) {
    return (
      <AdminLayout title="New Post" admin={admin || {}}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <span className="spinner" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="New Post" admin={admin || {}}>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/react-quill@2.0.0/dist/quill.snow.css" />
      </Head>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 290px', gap: '1.5rem', alignItems: 'start' }}>

        {/* ── LEFT COLUMN ───────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Post title..."
            style={{
              width: '100%', background: 'transparent', border: 'none',
              borderBottom: '2px solid #1E1E30', color: '#EDE8DF',
              fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700,
              padding: '0.5rem 0', outline: 'none',
            }}
            onFocus={e => e.target.style.borderBottomColor = '#FF6B00'}
            onBlur={e  => e.target.style.borderBottomColor = '#1E1E30'}
          />

          {/* Slug row */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#111120', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '10px', overflow: 'hidden' }}>
            <span style={{ padding: '0.55rem 0.75rem', background: '#181828', borderRight: '1px solid rgba(255,107,0,0.14)', fontFamily: 'Space Mono, monospace', fontSize: '0.72rem', color: '#6B6357', whiteSpace: 'nowrap' }}>
              yourdomain.com/blogs/
            </span>
            <input
              type="text"
              value={slug}
              onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="post-slug"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '0.55rem 0.75rem', color: '#FF6B00', fontFamily: 'Space Mono, monospace', fontSize: '0.82rem' }}
            />
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,107,0,0.14)', gap: '0.25rem' }}>
            {['content', 'seo'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.65rem 1.25rem', background: 'none', border: 'none',
                  borderBottom: activeTab === tab ? '2px solid #FF6B00' : '2px solid transparent',
                  marginBottom: '-1px', cursor: 'pointer',
                  color: activeTab === tab ? '#FF6B00' : '#A09880',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 600,
                }}
              >
                {tab === 'content' ? '✍️ Content' : '🔍 SEO & Meta'}
              </button>
            ))}
          </div>

          {/* ── CONTENT TAB ── */}
          {activeTab === 'content' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Excerpt */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A09880' }}>
                  Excerpt <span style={{ color: '#6B6357', textTransform: 'none', fontWeight: 400, letterSpacing: 0 }}>— short preview description</span>
                </label>
                <textarea
                  rows={3}
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  placeholder="A compelling 1–2 sentence summary of the post..."
                  style={{ background: '#111120', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '10px', padding: '0.75rem 1rem', color: '#EDE8DF', fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', resize: 'none', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#FF6B00'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,107,0,0.14)'}
                />
              </div>

              {/* Rich editor */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A09880' }}>
                  Post Content *
                </label>
                <div className="quill-wrap">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={QUILL_MODULES}
                    placeholder="Write your post content here..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── SEO TAB ── */}
          {activeTab === 'seo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '0.5rem' }}>

              {/* Google preview */}
              <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '10px', padding: '1rem 1.25rem' }}>
                <div style={{ fontSize: '0.68rem', color: '#888', marginBottom: '4px' }}>Google Search Preview</div>
                <div style={{ fontSize: '0.78rem', color: '#1a7a30', marginBottom: '2px' }}>yourdomain.com › blogs › {slug || 'post-slug'}</div>
                <div style={{ fontSize: '1.05rem', color: '#1558d6', fontWeight: 500, marginBottom: '4px', lineHeight: 1.3 }}>{metaTitle || title || 'Post Title'}</div>
                <div style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.5 }}>{metaDesc || excerpt || 'Post description will appear here...'}</div>
              </div>

              {/* Meta title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A09880' }}>Meta Title</label>
                  <span style={{ fontSize: '0.75rem', color: titleColor }}>{titleLen}/60</span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={e => setMetaTitle(e.target.value)}
                  placeholder="SEO title (60 chars ideal)"
                  maxLength={100}
                  style={{ background: '#111120', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '10px', padding: '0.75rem 1rem', color: '#EDE8DF', fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#FF6B00'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,107,0,0.14)'}
                />
                <div style={{ height: '3px', background: '#1E1E30', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${Math.min((titleLen/60)*100, 100)}%`, background: titleColor, borderRadius: '2px', transition: 'width 0.3s' }} />
                </div>
              </div>

              {/* Meta description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A09880' }}>Meta Description</label>
                  <span style={{ fontSize: '0.75rem', color: descColor }}>{descLen}/160</span>
                </div>
                <textarea
                  rows={3}
                  value={metaDesc}
                  onChange={e => setMetaDesc(e.target.value)}
                  placeholder="Meta description (160 chars ideal)"
                  maxLength={200}
                  style={{ background: '#111120', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '10px', padding: '0.75rem 1rem', color: '#EDE8DF', fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', resize: 'none', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#FF6B00'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,107,0,0.14)'}
                />
                <div style={{ height: '3px', background: '#1E1E30', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${Math.min((descLen/160)*100, 100)}%`, background: descColor, borderRadius: '2px', transition: 'width 0.3s' }} />
                </div>
              </div>

              {/* Meta keywords */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A09880' }}>
                  Meta Keywords <span style={{ color: '#6B6357', textTransform: 'none', fontWeight: 400, letterSpacing: 0 }}>— comma separated</span>
                </label>
                <input
                  type="text"
                  value={metaKeywords}
                  onChange={e => setMetaKeywords(e.target.value)}
                  placeholder="web design, SEO, digital marketing"
                  style={{ background: '#111120', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '10px', padding: '0.75rem 1rem', color: '#EDE8DF', fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#FF6B00'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,107,0,0.14)'}
                />
              </div>

              {/* Robots */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A09880' }}>Robots / Indexing</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {ROBOTS_OPTIONS.map(opt => (
                    <label
                      key={opt.value}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.7rem 1rem', cursor: 'pointer',
                        background: robots === opt.value ? 'rgba(255,107,0,0.06)' : '#111120',
                        border: `1px solid ${robots === opt.value ? '#FF6B00' : 'rgba(255,107,0,0.14)'}`,
                        borderRadius: '10px', color: robots === opt.value ? '#EDE8DF' : '#A09880',
                        fontSize: '0.88rem', transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="robots"
                        value={opt.value}
                        checked={robots === opt.value}
                        onChange={() => setRobots(opt.value)}
                        style={{ accentColor: '#FF6B00' }}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ─────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '80px' }}>

          {/* Publish card */}
          <div style={{ background: '#111120', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '18px', padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 700, color: '#EDE8DF', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,107,0,0.14)' }}>
              Publish
            </h3>

            {/* Status */}
            <div style={{ marginBottom: '0.85rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6357', marginBottom: '0.3rem' }}>Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                style={{ width: '100%', background: '#181828', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '10px', padding: '0.55rem 0.8rem', color: '#EDE8DF', fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', outline: 'none' }}
              >
                <option value="draft">📋 Draft</option>
                <option value="published">🌐 Published</option>
              </select>
            </div>

            {/* Category */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6357', marginBottom: '0.3rem' }}>Category</label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                style={{ width: '100%', background: '#181828', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '10px', padding: '0.55rem 0.8rem', color: '#EDE8DF', fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', outline: 'none' }}
              >
                <option value="">— Select Category —</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleSave('draft')}
                disabled={saving}
                style={{ flex: 1, padding: '0.65rem', background: '#181828', border: '1px solid rgba(255,107,0,0.28)', borderRadius: '10px', color: '#A09880', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSave('published')}
                disabled={saving}
                style={{ flex: 1, padding: '0.65rem', background: 'linear-gradient(135deg, #FF6B00, #C94D00)', border: 'none', borderRadius: '10px', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1, boxShadow: '0 4px 16px rgba(255,107,0,0.35)' }}
              >
                {saving ? 'Saving...' : '🚀 Publish'}
              </button>
            </div>
          </div>

          {/* Feature Image card */}
          <div style={{ background: '#111120', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '18px', padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 700, color: '#EDE8DF', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,107,0,0.14)' }}>
              Feature Image
            </h3>

            {featurePreview ? (
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                <img src={featurePreview} alt="Preview" style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
                <button
                  onClick={removeImage}
                  style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.75)', border: 'none', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  ✕ Remove
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                style={{ border: '2px dashed rgba(255,107,0,0.28)', borderRadius: '10px', padding: '2rem 1rem', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#6B6357' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.color = '#FF6B00'; }}
                onMouseOut={e  => { e.currentTarget.style.borderColor = 'rgba(255,107,0,0.28)'; e.currentTarget.style.color = '#6B6357'; }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>Click to upload</span>
                <span style={{ fontSize: '0.72rem' }}>PNG, JPG, WebP · Max 5MB</span>
              </div>
            )}

            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />

            {featurePreview && (
              <button
                onClick={() => fileRef.current?.click()}
                style={{ display: 'block', width: '100%', marginTop: '0.75rem', padding: '0.5rem', background: 'none', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '10px', color: '#A09880', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Change Image
              </button>
            )}
          </div>

          {/* SEO status card */}
          <div style={{ background: '#111120', border: '1px solid rgba(255,107,0,0.14)', borderRadius: '18px', padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 700, color: '#EDE8DF', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,107,0,0.14)' }}>
              SEO Status
            </h3>
            {seoChecks.map(({ label, ok }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,107,0,0.05)', fontSize: '0.84rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: ok ? '#22cc88' : 'rgba(255,107,0,0.28)' }} />
                <span style={{ color: ok ? '#EDE8DF' : '#6B6357' }}>{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Quill dark theme */}
      <style jsx global>{`
        .quill-wrap .ql-toolbar {
          background: #181828 !important;
          border: 1px solid rgba(255,107,0,0.14) !important;
          border-bottom: none !important;
          border-radius: 10px 10px 0 0;
        }
        .quill-wrap .ql-container {
          background: #181828 !important;
          border: 1px solid rgba(255,107,0,0.14) !important;
          border-radius: 0 0 10px 10px;
          min-height: 380px;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 1rem !important;
          color: #EDE8DF !important;
        }
        .quill-wrap .ql-editor { min-height: 380px; line-height: 1.8; color: #EDE8DF; }
        .quill-wrap .ql-editor.ql-blank::before { color: #6B6357 !important; font-style: normal !important; }
        .quill-wrap .ql-stroke { stroke: #A09880 !important; }
        .quill-wrap .ql-fill   { fill:   #A09880 !important; }
        .quill-wrap .ql-picker-label { color: #A09880 !important; }
        .quill-wrap .ql-picker-options {
          background: #181828 !important;
          border: 1px solid rgba(255,107,0,0.28) !important;
        }
        .quill-wrap .ql-toolbar button:hover .ql-stroke { stroke: #FF6B00 !important; }
        .quill-wrap .ql-active .ql-stroke { stroke: #FF6B00 !important; }
        .quill-wrap .ql-active .ql-fill   { fill:   #FF6B00 !important; }
      `}</style>

    </AdminLayout>
  );
}