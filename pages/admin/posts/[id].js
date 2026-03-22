// pages/admin/posts/[id].js  — Edit existing post
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import AdminLayout from '../../../components/layout/AdminLayout';
import { getAdminFromRequest } from '../../../lib/auth';
import { getDB } from '../../../lib/db';
import toast from 'react-hot-toast';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, loading: () => <div style={{ height: 200, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-3)' }}>Loading editor…</div>
});

export async function getServerSideProps({ req, params }) {
  const admin = getAdminFromRequest(req);
  if (!admin) return { redirect: { destination: '/admin', permanent: false } };

  const db = getDB();
  const [posts] = await db.execute('SELECT * FROM posts WHERE id = ?', [params.id]);
  if (!posts.length) return { notFound: true };

  const [categories] = await db.execute('SELECT * FROM categories ORDER BY name');
  return {
    props: {
      admin: JSON.parse(JSON.stringify(admin)),
      post: JSON.parse(JSON.stringify(posts[0])),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

const ROBOTS_OPTIONS = [
  { value: 'index,follow',    label: '✅ Index, Follow (Recommended)' },
  { value: 'noindex,nofollow',label: '❌ No Index, No Follow' },
  { value: 'index,nofollow',  label: '🔗 Index, No Follow' },
  { value: 'noindex,follow',  label: '🚫 No Index, Follow' },
];

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ align: [] }],
    ['clean'],
  ],
};

export default function EditPost({ admin, post, categories }) {
  const router = useRouter();
  const fileRef = useRef();

  const [form, setForm] = useState({
    title:            post.title            || '',
    slug:             post.slug             || '',
    excerpt:          post.excerpt          || '',
    content:          post.content          || '',
    category_id:      post.category_id      || '',
    status:           post.status           || 'draft',
    meta_title:       post.meta_title       || '',
    meta_description: post.meta_description || '',
    meta_keywords:    post.meta_keywords    || '',
    robots:           post.robots           || 'index,follow',
  });
  const [newImage, setNewImage]         = useState(null);
  const [featurePreview, setFeaturePreview] = useState(post.feature_image || '');
  const [saving, setSaving]             = useState(false);
  const [activeTab, setActiveTab]       = useState('content');

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5MB'); return; }
    setNewImage(file);
    setFeaturePreview(URL.createObjectURL(file));
  };

  const charCount = (str, max) => {
    const n = str?.length || 0;
    const pct = Math.min(n / max, 1);
    return { n, max, color: pct > 0.9 ? '#ff6666' : pct > 0.7 ? '#FFB347' : '#22cc88' };
  };

  const save = async (statusOverride) => {
    const finalStatus = statusOverride || form.status;
    if (!form.title.trim())   { toast.error('Title is required'); return; }
    if (!form.slug.trim())    { toast.error('Slug is required');  return; }

    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries({ ...form, status: finalStatus }).forEach(([k, v]) => fd.append(k, v || ''));
      if (newImage) fd.append('feature_image', newImage);
      if (!newImage && featurePreview && featurePreview === post.feature_image) {
        fd.append('existing_feature_image', post.feature_image);
      }

      const res = await fetch(`/api/blogs/${post.id}`, { method: 'PUT', body: fd });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || 'Failed to save'); return; }
      toast.success(finalStatus === 'published' ? '🎉 Post published!' : '📋 Draft saved!');
      router.push('/admin/posts');
    } catch { toast.error('Network error.'); }
    finally { setSaving(false); }
  };

  const metaTitle = charCount(form.meta_title, 60);
  const metaDesc  = charCount(form.meta_description, 160);

  return (
    <AdminLayout title={`Edit: ${post.title.slice(0, 40)}…`} admin={admin}>
      <div className="editor-root">
        {/* Left */}
        <div className="editor-main">
          <input
            className="title-input"
            value={form.title} placeholder="Post title…"
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <div className="slug-field">
            <span className="slug-prefix">CodePromix.in/blogs/</span>
            <input className="slug-input" value={form.slug}
              onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'') })} />
          </div>

          <div className="editor-tabs">
            <button className={`etab ${activeTab==='content'?'active':''}`} onClick={()=>setActiveTab('content')}>✍️ Content</button>
            <button className={`etab ${activeTab==='seo'?'active':''}`} onClick={()=>setActiveTab('seo')}>🔍 SEO & Meta</button>
          </div>

          {activeTab === 'content' && (
            <div className="content-tab">
              <div className="field">
                <label>Excerpt</label>
                <textarea rows={3} value={form.excerpt}
                  onChange={e => setForm({...form,excerpt:e.target.value})}
                  placeholder="Short description…" />
              </div>
              <div className="field">
                <label>Post Content *</label>
                <div className="quill-wrap">
                  <ReactQuill value={form.content} onChange={v=>setForm(f=>({...f,content:v}))}
                    modules={QUILL_MODULES} theme="snow" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="seo-tab">
              <div className="seo-preview-box">
                <div className="seo-preview-url">CodePromix.in › blogs › {form.slug}</div>
                <div className="seo-preview-title">{form.meta_title || form.title}</div>
                <div className="seo-preview-desc">{form.meta_description || form.excerpt || '—'}</div>
              </div>
              <div className="field">
                <label className="label-flex">Meta Title <span style={{color:metaTitle.color}}>{metaTitle.n}/60</span></label>
                <input value={form.meta_title} onChange={e=>setForm({...form,meta_title:e.target.value})} maxLength={100} />
                <div className="char-bar"><div className="char-fill" style={{width:`${(metaTitle.n/60)*100}%`,background:metaTitle.color}}/></div>
              </div>
              <div className="field">
                <label className="label-flex">Meta Description <span style={{color:metaDesc.color}}>{metaDesc.n}/160</span></label>
                <textarea rows={3} value={form.meta_description} onChange={e=>setForm({...form,meta_description:e.target.value})} maxLength={200} />
                <div className="char-bar"><div className="char-fill" style={{width:`${(metaDesc.n/160)*100}%`,background:metaDesc.color}}/></div>
              </div>
              <div className="field">
                <label>Meta Keywords</label>
                <input value={form.meta_keywords} onChange={e=>setForm({...form,meta_keywords:e.target.value})} />
              </div>
              <div className="field">
                <label>Robots / Indexing</label>
                <div className="robots-options">
                  {ROBOTS_OPTIONS.map(opt => (
                    <label key={opt.value} className={`robot-opt ${form.robots===opt.value?'selected':''}`}>
                      <input type="radio" name="robots" value={opt.value}
                        checked={form.robots===opt.value}
                        onChange={()=>setForm({...form,robots:opt.value})} />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="editor-sidebar">
          <div className="sidebar-card">
            <h3 className="sc-title">Update Post</h3>
            <div className="sc-field">
              <label>Status</label>
              <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                <option value="draft">📋 Draft</option>
                <option value="published">🌐 Published</option>
              </select>
            </div>
            <div className="sc-field">
              <label>Category</label>
              <select value={form.category_id} onChange={e=>setForm({...form,category_id:e.target.value})}>
                <option value="">— Select —</option>
                {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="publish-actions">
              <button className="btn-draft" onClick={()=>save('draft')} disabled={saving}>
                {saving&&<span className="mini-spin"/>} Save Draft
              </button>
              <button className="btn-publish" onClick={()=>save('published')} disabled={saving}>
                {saving&&<span className="mini-spin"/>} 🚀 Update
              </button>
            </div>
          </div>

          <div className="sidebar-card">
            <h3 className="sc-title">Feature Image</h3>
            {featurePreview ? (
              <div className="img-preview">
                <img src={featurePreview} alt="Preview" />
                <button className="remove-img" onClick={()=>{setNewImage(null);setFeaturePreview('');}}>✕ Remove</button>
              </div>
            ) : (
              <div className="img-dropzone" onClick={()=>fileRef.current?.click()}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Click to upload</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{display:'none'}} />
            {featurePreview && <button className="change-img" onClick={()=>fileRef.current?.click()}>Change Image</button>}
          </div>

          <div className="sidebar-card seo-status-card">
            <h3 className="sc-title">SEO Status</h3>
            {[
              { label:'Title',       ok:!!form.title },
              { label:'Slug',        ok:!!form.slug },
              { label:'Excerpt',     ok:!!form.excerpt },
              { label:'Meta Title',  ok:!!form.meta_title },
              { label:'Meta Desc',   ok:!!form.meta_description },
              { label:'Feature Img', ok:!!featurePreview },
              { label:'Indexed',     ok:form.robots.startsWith('index') },
            ].map(({label,ok})=>(
              <div key={label} className="seo-check">
                <span className={`seo-dot ${ok?'good':'bad'}`}/>
                <span className={ok?'seo-good':'seo-bad'}>{label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Reuse same styles as new.js — injected globally via _app */}
      <style jsx global>{`
        .quill-wrap .ql-toolbar { background:var(--surface-2)!important; border:1px solid var(--border)!important; border-bottom:none!important; border-radius:var(--radius) var(--radius) 0 0; }
        .quill-wrap .ql-container { background:var(--surface-2)!important; border:1px solid var(--border)!important; border-radius:0 0 var(--radius) var(--radius); min-height:320px; font-family:'DM Sans',sans-serif!important; font-size:1rem!important; color:var(--text-1)!important; }
        .quill-wrap .ql-editor { min-height:320px; line-height:1.8; }
        .quill-wrap .ql-editor.ql-blank::before { color:var(--text-3)!important; font-style:normal!important; }
        .quill-wrap .ql-stroke { stroke:var(--text-2)!important; }
        .quill-wrap .ql-fill   { fill:var(--text-2)!important; }
        .quill-wrap .ql-picker-label { color:var(--text-2)!important; }
        .quill-wrap .ql-picker-options { background:var(--surface-2)!important; border:1px solid var(--border)!important; }
        .quill-wrap .ql-toolbar button:hover .ql-stroke { stroke:var(--saffron)!important; }
        .quill-wrap .ql-active .ql-stroke { stroke:var(--saffron)!important; }
        .quill-wrap .ql-active .ql-fill { fill:var(--saffron)!important; }
      `}</style>
      <style jsx>{`
        .editor-root { display:grid; grid-template-columns:1fr 300px; gap:1.75rem; align-items:start; }
        .editor-main { display:flex; flex-direction:column; gap:1.25rem; }
        .title-input { width:100%; background:transparent; border:none; border-bottom:2px solid var(--border); color:var(--text-1); font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:700; padding:0.5rem 0; }
        .title-input:focus { outline:none; border-bottom-color:var(--saffron); }
        .title-input::placeholder { color:var(--text-3); }
        .slug-field { display:flex; align-items:center; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; }
        .slug-prefix { padding:0.55rem 0.75rem; background:var(--surface-2); border-right:1px solid var(--border); font-family:'Space Mono',monospace; font-size:0.75rem; color:var(--text-3); }
        .slug-input { flex:1; background:transparent; border:none; padding:0.55rem 0.75rem; color:var(--saffron); font-family:'Space Mono',monospace; font-size:0.82rem; }
        .slug-input:focus { outline:none; }
        .editor-tabs { display:flex; gap:0.25rem; border-bottom:1px solid var(--border); }
        .etab { padding:0.65rem 1.25rem; background:none; border:none; border-bottom:2px solid transparent; margin-bottom:-1px; font-family:'DM Sans',sans-serif; font-size:0.9rem; font-weight:600; color:var(--text-2); cursor:pointer; transition:color var(--transition), border-color var(--transition); }
        .etab:hover { color:var(--text-1); }
        .etab.active { color:var(--saffron); border-bottom-color:var(--saffron); }
        .content-tab, .seo-tab { display:flex; flex-direction:column; gap:1.25rem; padding-top:1rem; }
        .field { display:flex; flex-direction:column; gap:0.4rem; }
        .field label,.label-flex { font-size:0.78rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-2); display:flex; align-items:center; justify-content:space-between; }
        .field input,.field textarea,.field select { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:0.75rem 1rem; color:var(--text-1); font-family:'DM Sans',sans-serif; font-size:0.92rem; transition:border-color var(--transition); resize:none; }
        .field input:focus,.field textarea:focus,.field select:focus { outline:none; border-color:var(--saffron); }
        .field select option { background:var(--surface-2); }
        .char-bar { height:3px; background:var(--border); border-radius:2px; margin-top:4px; }
        .char-fill { height:100%; border-radius:2px; transition:width 0.3s, background 0.3s; }
        .robots-options { display:flex; flex-direction:column; gap:0.5rem; }
        .robot-opt { display:flex; align-items:center; gap:0.6rem; padding:0.7rem 1rem; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); cursor:pointer; font-size:0.88rem; color:var(--text-2); transition:border-color var(--transition), color var(--transition); }
        .robot-opt.selected { border-color:var(--saffron); color:var(--text-1); background:rgba(255,107,0,0.05); }
        .robot-opt input { accent-color:var(--saffron); }
        .seo-preview-box { background:white; border:1px solid #ddd; border-radius:var(--radius); padding:1rem 1.25rem; }
        .seo-preview-url { font-size:0.78rem; color:#1a7a30; margin-bottom:2px; }
        .seo-preview-title { font-size:1.05rem; color:#1558d6; font-weight:500; margin-bottom:4px; }
        .seo-preview-desc { font-size:0.82rem; color:#444; line-height:1.5; }
        .editor-sidebar { display:flex; flex-direction:column; gap:1.25rem; position:sticky; top:80px; }
        .sidebar-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); padding:1.25rem; }
        .sc-title { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:700; color:var(--text-1); margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:1px solid var(--border); }
        .sc-field { display:flex; flex-direction:column; gap:0.3rem; margin-bottom:0.85rem; }
        .sc-field label { font-size:0.72rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-3); }
        .sc-field select { background:var(--surface-2); border:1px solid var(--border); border-radius:var(--radius); padding:0.55rem 0.8rem; color:var(--text-1); font-family:'DM Sans',sans-serif; font-size:0.88rem; }
        .sc-field select:focus { outline:none; border-color:var(--saffron); }
        .sc-field select option { background:var(--surface-2); }
        .publish-actions { display:flex; gap:0.5rem; }
        .btn-draft,.btn-publish { flex:1; padding:0.65rem; border-radius:var(--radius); font-family:'DM Sans',sans-serif; font-size:0.85rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:0.4rem; transition:all var(--transition); }
        .btn-draft { background:var(--surface-2); border:1px solid var(--border); color:var(--text-2); }
        .btn-draft:hover { border-color:var(--border-2); color:var(--text-1); }
        .btn-publish { background:linear-gradient(135deg,var(--saffron),var(--saffron-dk)); border:none; color:white; box-shadow:0 4px 16px rgba(255,107,0,0.3); }
        .btn-publish:hover { box-shadow:0 6px 24px rgba(255,107,0,0.5); }
        .btn-draft:disabled,.btn-publish:disabled { opacity:0.6; cursor:not-allowed; }
        .mini-spin { width:14px; height:14px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.7s linear infinite; display:inline-block; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .img-preview { position:relative; border-radius:var(--radius); overflow:hidden; }
        .img-preview img { width:100%; height:160px; object-fit:cover; display:block; }
        .remove-img { position:absolute; top:8px; right:8px; background:rgba(0,0,0,0.7); border:none; color:white; font-size:0.75rem; font-weight:600; padding:4px 10px; border-radius:6px; cursor:pointer; }
        .img-dropzone { border:2px dashed var(--border); border-radius:var(--radius); padding:2rem 1rem; text-align:center; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:0.5rem; color:var(--text-3); transition:border-color var(--transition), color var(--transition); }
        .img-dropzone:hover { border-color:var(--saffron); color:var(--saffron); }
        .img-dropzone span { font-size:0.88rem; font-weight:500; }
        .change-img { display:block; width:100%; margin-top:0.75rem; padding:0.5rem; background:none; border:1px solid var(--border); border-radius:var(--radius); color:var(--text-2); font-family:'DM Sans',sans-serif; font-size:0.82rem; cursor:pointer; transition:border-color var(--transition), color var(--transition); }
        .change-img:hover { border-color:var(--border-2); color:var(--text-1); }
        .seo-check { display:flex; align-items:center; gap:0.6rem; padding:0.4rem 0; border-bottom:1px solid rgba(255,107,0,0.06); font-size:0.84rem; }
        .seo-check:last-child { border-bottom:none; }
        .seo-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .seo-dot.good { background:#22cc88; }
        .seo-dot.bad  { background:var(--border-2); }
        .seo-good { color:var(--text-1); }
        .seo-bad  { color:var(--text-3); }
        @media (max-width:900px) { .editor-root { grid-template-columns:1fr; } .editor-sidebar { position:static; } }
      `}</style>
    </AdminLayout>
  );
}
