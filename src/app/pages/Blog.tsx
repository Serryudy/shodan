import { motion, AnimatePresence } from 'motion/react';
import { Section } from '../components/Section';
import { GlowCard } from '../components/Card';
import { Link } from 'react-router';
import {
  Calendar, Clock, ArrowRight, User, Search, TrendingUp, MessageCircle,
  Bookmark, PenLine, Bot, CheckCircle2, X, Send, Tag, AlertCircle, Loader2, ImagePlus,
} from 'lucide-react';
import { useState, useEffect, type ReactNode } from 'react';
import { fetchPosts, createPost, compressImageToDataUrl, type BlogPost } from '../../lib/blogService';

const CATEGORIES = ['All', 'AI', 'Automation', 'Open Source', 'Community', 'Design', 'Lab'];
const CATEGORY_COLORS: Record<string, string> = {
  AI:            'bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/30',
  Automation:    'bg-[#00B3B3]/20 text-[#00B3B3] border-[#00B3B3]/30',
  'Open Source': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Community:     'bg-green-500/20 text-green-400 border-green-500/30',
  Design:        'bg-pink-500/20 text-pink-400 border-pink-500/30',
  Lab:           'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};
const PIN_B64 = 'NDU2ODM0';
function slugify(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function estimateReadTime(text: string) {
  return `${Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200))} min read`;
}

const inputCls = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder:text-[#F5F5F5]/25 focus:outline-none focus:border-[#FF6A00]/50 transition-colors text-sm';

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-xs text-[#F5F5F5]/50 mb-2 uppercase tracking-widest">
        {label}{required && <span className="text-[#FF6A00]">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[#F5F5F5]/30 mt-1">{hint}</p>}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4 min-h-[260px]">
      <div className="w-16 h-5 bg-white/10 rounded-full" />
      <div className="w-full h-6 bg-white/10 rounded" />
      <div className="w-4/5 h-6 bg-white/10 rounded" />
      <div className="w-full h-3 bg-white/10 rounded" />
      <div className="w-5/6 h-3 bg-white/10 rounded" />
      <div className="mt-auto w-full h-px bg-white/5" />
      <div className="flex justify-between">
        <div className="w-20 h-3 bg-white/10 rounded" />
        <div className="w-12 h-3 bg-white/10 rounded" />
      </div>
    </div>
  );
}

interface WritePostModalProps {
  onClose: () => void;
  onPublished: (post: BlogPost) => void;
}

function WritePostModal({ onClose, onPublished }: WritePostModalProps) {
  type Phase = 'pin' | 'write' | 'publishing' | 'done';
  const [phase, setPhase]       = useState<Phase>('pin');
  const [pin, setPin]           = useState('');
  const [pinError, setPinError] = useState('');
  const [form, setForm]         = useState({ title: '', excerpt: '', author: '', category: 'AI', tags: '', content: '' });
  const [publishError, setPublishError] = useState('');
  const [coverDataUrl, setCoverDataUrl] = useState('');

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (btoa(pin) === PIN_B64) { setPinError(''); setPhase('write'); }
    else { setPinError('Incorrect PIN  try again.'); setPin(''); }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.author || !form.content) { setPublishError('Please fill in all required fields.'); return; }
    setPhase('publishing');
    try {
      const now  = new Date();
      const post: Omit<BlogPost, 'id' | 'createdAt'> = {
        title: form.title, excerpt: form.excerpt, author: form.author,
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: estimateReadTime(form.content), category: form.category,
        slug: slugify(form.title), likes: 0, comments: 0,
        tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
        intro: form.excerpt, content: form.content,
        ...(coverDataUrl ? { coverUrl: coverDataUrl } : {}),
      };
      const id = await createPost(post);
      onPublished({ ...post, id });
      setPhase('done');
      setTimeout(onClose, 1800);
    } catch (err) { setPublishError(`Failed to publish: ${(err as Error)?.message ?? 'unknown error'}`); setPhase('write'); }
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-[#0D0D0D]/90 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={phase !== 'publishing' ? onClose : undefined} />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm"
        style={{ boxShadow: '0 8px 48px rgba(0,0,0,0.6), 0 0 80px rgba(0,179,179,0.12)' }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 90, damping: 22 }}
      >
        {phase !== 'publishing' && (
          <button onClick={onClose} className="absolute top-5 right-5 z-20 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="p-8 lg:p-10">
          <AnimatePresence mode="wait">
            {phase === 'pin' && (
              <motion.div key="pin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br from-[#00B3B3]/20 to-[#FF6A00]/20 border border-white/10">
                    <PenLine className="w-7 h-7 text-[#00B3B3]" />
                  </div>
                  <h2 className="text-2xl text-[#F5F5F5] mb-1">Writer Access</h2>
                  <p className="text-sm text-[#F5F5F5]/40">Enter your PIN to unlock the editor</p>
                </div>
                <form onSubmit={handlePinSubmit} className="space-y-4 max-w-xs mx-auto">
                  <input type="password" inputMode="numeric" placeholder="" value={pin} onChange={e => setPin(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] text-center text-2xl tracking-[0.5em] placeholder:tracking-widest placeholder:text-[#F5F5F5]/20 focus:outline-none focus:border-[#00B3B3]/50 transition-colors" autoFocus />
                  {pinError && (
                    <motion.p className="flex items-center justify-center gap-2 text-red-400 text-sm" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                      <AlertCircle className="w-4 h-4 shrink-0" /> {pinError}
                    </motion.p>
                  )}
                  <motion.button type="submit" className="w-full py-4 bg-[#00B3B3] text-[#0D0D0D] rounded-xl font-semibold text-sm hover:bg-[#00B3B3]/90 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    Unlock Editor
                  </motion.button>
                </form>
              </motion.div>
            )}
            {(phase === 'write' || phase === 'publishing') && (
              <motion.div key="write" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-3 mb-7">
                  <span className="w-2 h-2 rounded-full bg-[#00B3B3] animate-pulse" />
                  <h2 className="text-2xl text-[#F5F5F5]">New Post</h2>
                </div>
                <form onSubmit={handlePublish} className="space-y-5">
                  <Field label="Title" required>
                    <input className={inputCls} placeholder="Post title..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Author" required>
                      <input className={inputCls} placeholder="Your name" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
                    </Field>
                    <Field label="Category">
                      <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={`${inputCls} appearance-none cursor-pointer`}>
                        {['AI', 'Automation', 'Open Source', 'Community', 'Design', 'Lab'].map(c => (
                          <option key={c} value={c} className="bg-[#1a1a1a]">{c}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Excerpt" required hint="Shown on the listing card.">
                    <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Short description (2-3 sentences)..." value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} />
                  </Field>
                  <Field label="Content" required>
                    <textarea className={`${inputCls} resize-none font-mono leading-relaxed`} rows={10} placeholder={"Full article body...\n\nSeparate paragraphs with a blank line."} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
                  </Field>
                  <Field label="Cover Image" hint="Recommended: 1200×630px, JPG or PNG. Auto-compressed before saving.">
                    {coverDataUrl ? (
                      <div className="relative">
                        <img src={coverDataUrl} alt="Cover preview" className="w-full h-44 object-cover rounded-xl" />
                        <button type="button" onClick={() => setCoverDataUrl('')}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center gap-2 py-8 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-[#FF6A00]/40 hover:bg-white/[0.02] transition-colors">
                        <ImagePlus className="w-8 h-8 text-[#F5F5F5]/25" />
                        <span className="text-sm text-[#F5F5F5]/40">Click to upload a cover image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) setCoverDataUrl(await compressImageToDataUrl(f));
                        }} />
                      </label>
                    )}
                  </Field>
                  <div>
                    <label className="flex items-center gap-1 text-xs text-[#F5F5F5]/50 mb-2 uppercase tracking-widest"><Tag className="w-3 h-3" />Tags</label>
                    <input className={inputCls} placeholder="AI, Engineering, Tutorial..." value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
                  </div>
                  {publishError && (
                    <motion.p className="flex items-center gap-2 text-red-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <AlertCircle className="w-4 h-4 shrink-0" /> {publishError}
                    </motion.p>
                  )}
                  <motion.button type="submit" disabled={phase === 'publishing'}
                    className="w-full py-4 bg-gradient-to-r from-[#FF6A00] to-[#00B3B3] text-[#0D0D0D] font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                    whileHover={{ scale: phase === 'write' ? 1.02 : 1 }} whileTap={{ scale: phase === 'write' ? 0.97 : 1 }}>
                    {phase === 'publishing' ? <><Loader2 className="w-5 h-5 animate-spin" /> Publishing...</> : <><Send className="w-5 h-5" /> Publish Post</>}
                  </motion.button>
                </form>
              </motion.div>
            )}
            {phase === 'done' && (
              <motion.div key="done" className="py-20 text-center" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}>
                  <CheckCircle2 className="w-20 h-20 text-[#00B3B3] mx-auto mb-5" />
                </motion.div>
                <h3 className="text-2xl text-[#F5F5F5] mb-2">Published!</h3>
                <p className="text-[#F5F5F5]/50">Your post is now live in the blog.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Blog() {
  const [posts, setPosts]           = useState<BlogPost[]>([]);
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery]       = useState('');
  const [email, setEmail]                   = useState('');
  const [subscribed, setSubscribed]         = useState(false);
  const [writerOpen, setWriterOpen]         = useState(false);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setFetchError('Could not load articles. Check Firebase config.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter((p) => {
    const matchCat    = activeCategory === 'All' || p.category === activeCategory;
    const q           = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featuredPost = posts[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div>
      <motion.button onClick={() => setWriterOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2.5 px-5 py-3 bg-[#FF6A00] text-[#0D0D0D] rounded-full font-semibold text-sm shadow-[0_0_32px_rgba(255,106,0,0.45)] hover:shadow-[0_0_50px_rgba(255,106,0,0.6)] transition-shadow"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.94 }} title="Write a new post">
        <PenLine className="w-4 h-4" /> Write Post
      </motion.button>
      <AnimatePresence>
        {writerOpen && <WritePostModal onClose={() => setWriterOpen(false)} onPublished={(post) => setPosts(prev => [post, ...prev])} />}
      </AnimatePresence>

      <Section className="min-h-[50vh] flex items-center relative overflow-hidden" animate={false}>
        <motion.div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.4) 0%, rgba(0,179,179,0.2) 50%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10">
              <PenLine className="w-4 h-4 text-[#FF6A00]" /><span className="text-sm text-[#FF6A00]">The BUILD Blog</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[#FF6A00] via-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent">Insights & Stories</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5]/60 leading-relaxed mb-8">Deep dives on AI, automation, open source, and the future of building software.</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F5F5F5]/40" />
              <input type="text" placeholder="Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:outline-none focus:border-[#00B3B3]/50 transition-colors" />
            </div>
          </motion.div>
        </div>
      </Section>



      <Section>
        {loading ? (
          <div className="animate-pulse h-64 bg-white/5 border border-white/10 rounded-3xl mb-16" />
        ) : featuredPost ? (
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 mb-8">
              <TrendingUp className="w-4 h-4 text-[#FF6A00]" /><span className="text-sm text-[#FF6A00]">Featured Article</span>
            </div>
            <Link to={`/blog/${featuredPost.slug}`}>
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-10 md:p-14 group cursor-pointer hover:shadow-[0_0_60px_rgba(255,106,0,0.15)] transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FF6A00]/5 via-transparent to-[#00B3B3]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <span className={`px-3 py-1 text-xs rounded-full border ${CATEGORY_COLORS[featuredPost.category] ?? 'bg-white/10 text-[#F5F5F5]/70 border-white/10'} mb-6 inline-block`}>{featuredPost.category}</span>
                    <h2 className="text-3xl md:text-4xl mb-4 text-[#F5F5F5] group-hover:text-[#FF6A00] transition-colors leading-tight">{featuredPost.title}</h2>
                    <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed text-lg">{featuredPost.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#F5F5F5]/50 mb-6">
                      <div className="flex items-center gap-2"><User className="w-4 h-4" /> {featuredPost.author}</div>
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {featuredPost.date}</div>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {featuredPost.readTime}</div>
                    </div>
                    <div className="text-[#FF6A00] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 text-lg">Read Article <ArrowRight className="w-5 h-5" /></div>
                  </div>
                  <div className="hidden lg:block relative overflow-hidden -mt-10 -mb-10 -mr-10 md:-mt-14 md:-mb-14 md:-mr-14 rounded-r-3xl">
                    {featuredPost.coverUrl ? (
                      <>
                        <img src={featuredPost.coverUrl} alt={featuredPost.title} className="w-full h-full object-cover min-h-[320px]" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0D0D0D 0%, rgba(13,13,13,0.75) 30%, rgba(13,13,13,0.2) 60%, transparent 100%)' }} />
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full min-h-[320px]">
                        <div className="relative w-64 h-64">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF6A00]/20 via-[#00B3B3]/20 to-[#FF6A00]/20 blur-3xl" />
                          <div className="relative z-10 flex items-center justify-center h-full"><Bot className="w-24 h-24 text-[#FF6A00]" /></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ) : null}

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <motion.button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border transition-colors ${activeCategory === cat ? 'bg-[#FF6A00] border-[#FF6A00] text-[#0D0D0D]' : 'border-white/10 text-[#F5F5F5]/70 hover:border-[#00B3B3]/50 hover:text-[#F5F5F5]'}`}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{cat}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : fetchError ? (
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-[#F5F5F5]/60">{fetchError}</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div key={activeCategory + searchQuery} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {filteredPosts.map((post, index) => (
                  <motion.div key={post.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                    <Link to={`/blog/${post.slug}`}>
                      <GlowCard className="h-full group cursor-pointer flex flex-col !p-6">
                        <div className="mb-4">
                          <span className={`px-3 py-1 text-xs rounded-full border ${CATEGORY_COLORS[post.category] ?? 'bg-white/10 text-[#F5F5F5]/70 border-white/10'}`}>{post.category}</span>
                        </div>
                        <h3 className="text-xl mb-3 text-[#F5F5F5] group-hover:text-[#FF6A00] transition-colors leading-snug flex-grow">{post.title}</h3>
                        <p className="text-[#F5F5F5]/60 mb-5 leading-relaxed text-sm">{post.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-[#F5F5F5]/50 mb-4">
                          <div className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author}</div>
                          <span></span>
                          <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</div>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                          <div className="flex items-center gap-4 text-xs text-[#F5F5F5]/40">
                            <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {post.comments}</span>
                            <span className="flex items-center gap-1"><Bookmark className="w-3.5 h-3.5" /> {post.likes}</span>
                          </div>
                          <span className="text-[#FF6A00] text-xs group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Read <ArrowRight className="w-3.5 h-3.5" /></span>
                        </div>
                      </GlowCard>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" className="text-center py-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Search className="w-16 h-16 mb-4 mx-auto text-[#F5F5F5]/40" />
                <h3 className="text-2xl text-[#F5F5F5] mb-2">No articles found</h3>
                <p className="text-[#F5F5F5]/60">Try adjusting your search or category filter.</p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Section>

      <Section background="gradient">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4 text-[#F5F5F5]">Stay in the Loop</h2>
          <p className="text-lg text-[#F5F5F5]/60 mb-8">New articles, experiments, and community highlights  delivered weekly. No spam, ever.</p>
          {subscribed ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center gap-3 text-[#00B3B3] text-xl">
              <CheckCircle2 className="w-6 h-6" /><span>You're subscribed! Welcome to the community.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:outline-none focus:border-[#00B3B3]/50" required />
              <motion.button type="submit" className="px-8 py-3 bg-[#FF6A00] text-[#0D0D0D] rounded-lg hover:shadow-[0_0_25px_rgba(255,106,0,0.6)] transition-shadow whitespace-nowrap" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Subscribe
              </motion.button>
            </form>
          )}
          <p className="text-sm text-[#F5F5F5]/30 mt-4">Join 12,000+ builders already subscribed.</p>
        </div>
      </Section>
    </div>
  );
}
