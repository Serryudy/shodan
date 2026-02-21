import { motion, AnimatePresence } from 'motion/react';
import { Section } from '../components/Section';
import { GlowCard } from '../components/Card';
import { Link } from 'react-router';
import { Calendar, Clock, ArrowRight, User, Search, TrendingUp, MessageCircle, Bookmark } from 'lucide-react';
import { useState } from 'react';

const allArticles = [
  {
    title: 'The Future of AI Development',
    excerpt: 'How artificial intelligence is reshaping software development and what it means for builders who dare to push boundaries.',
    author: 'Alex Chen',
    date: 'Feb 15, 2026',
    readTime: '8 min read',
    category: 'AI',
    slug: 'future-of-ai-development',
    likes: 342,
    comments: 28,
  },
  {
    title: 'Building in Public: Our Journey',
    excerpt: 'Lessons learned from developing open-source tools with community feedback — the wins, the failures, and everything in between.',
    author: 'Sam Rivera',
    date: 'Feb 10, 2026',
    readTime: '6 min read',
    category: 'Community',
    slug: 'building-in-public',
    likes: 198,
    comments: 43,
  },
  {
    title: 'Automation Best Practices for 2026',
    excerpt: "A comprehensive guide to implementing workflow automation that actually works, scales, and doesn't break at 3am.",
    author: 'Jordan Park',
    date: 'Feb 5, 2026',
    readTime: '12 min read',
    category: 'Automation',
    slug: 'automation-best-practices',
    likes: 521,
    comments: 67,
  },
  {
    title: 'Why We Open Sourced Everything',
    excerpt: 'The philosophy and strategy behind our commitment to open source software — and why we think every company should.',
    author: 'Casey Taylor',
    date: 'Jan 28, 2026',
    readTime: '5 min read',
    category: 'Open Source',
    slug: 'why-open-source',
    likes: 287,
    comments: 51,
  },
  {
    title: 'The Lab: Experiments That Became Products',
    excerpt: 'Behind the scenes of our experimental lab — the prototypes that evolved into production-ready solutions used by thousands.',
    author: 'Morgan Lee',
    date: 'Jan 20, 2026',
    readTime: '10 min read',
    category: 'Lab',
    slug: 'lab-to-production',
    likes: 413,
    comments: 35,
  },
  {
    title: 'Designing for Developers',
    excerpt: 'How we create beautiful, functional experiences for technical audiences — aesthetics is not the enemy of utility.',
    author: 'Riley Quinn',
    date: 'Jan 12, 2026',
    readTime: '7 min read',
    category: 'Design',
    slug: 'designing-for-developers',
    likes: 309,
    comments: 22,
  },
  {
    title: 'Neural Networks for Absolute Beginners',
    excerpt: 'Demystifying deep learning: a hands-on introduction that skips the jargon and focuses on what actually matters.',
    author: 'Alex Chen',
    date: 'Jan 5, 2026',
    readTime: '15 min read',
    category: 'AI',
    slug: 'neural-networks-beginners',
    likes: 876,
    comments: 112,
  },
  {
    title: 'Community-Driven Development',
    excerpt: 'How we built a 50K+ developer community that contributes to every product decision we make.',
    author: 'Morgan Lee',
    date: 'Dec 28, 2025',
    readTime: '9 min read',
    category: 'Community',
    slug: 'community-driven-development',
    likes: 445,
    comments: 89,
  },
];

const categories = ['All', 'AI', 'Automation', 'Open Source', 'Community', 'Design', 'Lab'];

const categoryColors: Record<string, string> = {
  AI: 'bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/30',
  Automation: 'bg-[#00B3B3]/20 text-[#00B3B3] border-[#00B3B3]/30',
  'Open Source': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Community: 'bg-green-500/20 text-green-400 border-green-500/30',
  Design: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  Lab: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = allArticles[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <Section className="min-h-[50vh] flex items-center relative overflow-hidden" animate={false}>
        <motion.div
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,106,0,0.4) 0%, rgba(0,179,179,0.2) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10">
              <span className="text-sm text-[#FF6A00]">✍️ The BUILD Blog</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[#FF6A00] via-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent">
                Insights & Stories
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5]/60 leading-relaxed mb-8">
              Deep dives on AI, automation, open source, and the future of building software.
            </p>
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F5F5F5]/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:outline-none focus:border-[#00B3B3]/50 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Featured Article */}
      <Section>
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 mb-8">
            <TrendingUp className="w-4 h-4 text-[#FF6A00]" />
            <span className="text-sm text-[#FF6A00]">Featured Article</span>
          </div>
          <Link to={`/blog/${featuredArticle.slug}`}>
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-10 md:p-14 group cursor-pointer hover:shadow-[0_0_60px_rgba(255,106,0,0.15)] transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FF6A00]/5 via-transparent to-[#00B3B3]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <span className={`px-3 py-1 text-xs rounded-full border ${categoryColors[featuredArticle.category]} mb-6 inline-block`}>
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl mb-4 text-[#F5F5F5] group-hover:text-[#FF6A00] transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed text-lg">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#F5F5F5]/50 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> {featuredArticle.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {featuredArticle.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {featuredArticle.readTime}
                    </div>
                  </div>
                  <div className="text-[#FF6A00] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 text-lg">
                    Read Article <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF6A00]/20 via-[#00B3B3]/20 to-[#FF6A00]/20 blur-3xl" />
                    <div className="relative z-10 flex items-center justify-center h-full text-8xl">🤖</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border transition-colors ${
                activeCategory === category
                  ? 'bg-[#FF6A00] border-[#FF6A00] text-[#0D0D0D]'
                  : 'border-white/10 text-[#F5F5F5]/70 hover:border-[#00B3B3]/50 hover:text-[#F5F5F5]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div
              key={activeCategory + searchQuery}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/blog/${article.slug}`}>
                    <GlowCard className="h-full group cursor-pointer flex flex-col">
                      <div className="mb-4">
                        <span className={`px-3 py-1 text-xs rounded-full border ${categoryColors[article.category] ?? 'bg-white/10 text-[#F5F5F5]/70 border-white/10'}`}>
                          {article.category}
                        </span>
                      </div>

                      <h3 className="text-xl mb-3 text-[#F5F5F5] group-hover:text-[#FF6A00] transition-colors leading-snug flex-grow">
                        {article.title}
                      </h3>

                      <p className="text-[#F5F5F5]/60 mb-5 leading-relaxed text-sm">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-[#F5F5F5]/50 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {article.author}
                        </div>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                        <div className="flex items-center gap-4 text-xs text-[#F5F5F5]/40">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3.5 h-3.5" /> {article.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bookmark className="w-3.5 h-3.5" /> {article.likes}
                          </span>
                        </div>
                        <span className="text-[#FF6A00] text-xs group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </GlowCard>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl text-[#F5F5F5] mb-2">No articles found</h3>
              <p className="text-[#F5F5F5]/60">Try adjusting your search or category filter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* Newsletter Section */}
      <Section background="gradient">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4 text-[#F5F5F5]">Stay in the Loop</h2>
          <p className="text-lg text-[#F5F5F5]/60 mb-8">
            New articles, experiments, and community highlights — delivered weekly. No spam, ever.
          </p>
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-[#00B3B3] text-xl"
            >
              <span>🎉</span>
              <span>You're subscribed! Welcome to the community.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:outline-none focus:border-[#00B3B3]/50"
                required
              />
              <motion.button
                type="submit"
                className="px-8 py-3 bg-[#FF6A00] text-[#0D0D0D] rounded-lg hover:shadow-[0_0_25px_rgba(255,106,0,0.6)] transition-shadow whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
