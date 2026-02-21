import { motion } from 'motion/react';
import { Section } from '../components/Section';
import { GlowCard } from '../components/Card';
import { Link, useParams } from 'react-router';
import { Calendar, Clock, ArrowLeft, User, MessageCircle, Share2, Bookmark, ArrowRight, Heart, FileQuestion, Bot, Globe, Zap, FlaskConical, Palette, Brain, Users } from 'lucide-react';
import { useState, type ReactNode } from 'react';

const articleContent: Record<string, {
  title: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: string;
  icon: ReactNode;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
  tags: string[];
  likes: number;
  comments: number;
}> = {
  'future-of-ai-development': {
    title: 'The Future of AI Development',
    author: 'Alex Chen',
    role: 'Founder & CEO',
    date: 'Feb 15, 2026',
    readTime: '8 min read',
    category: 'AI',
    icon: <Bot className="w-32 h-32 text-[#FF6A00]" />,
    intro: 'Artificial intelligence is no longer a future concept — it\'s the backbone of modern software development. In this piece, we explore what that means for the builders working on the next generation of products.',
    sections: [
      {
        heading: 'The Shift is Already Happening',
        body: 'Every major coding tool, design platform, and DevOps pipeline now has some form of AI embedded in it. GitHub Copilot, Vercel\'s v0, Figma\'s Make — these are not experiments anymore. They are how teams ship products. The question isn\'t whether to adopt AI tools; it\'s how fast you integrate them and how deeply you understand their limitations.',
      },
      {
        heading: 'What This Means for Developers',
        body: 'The role of the developer is evolving. Writing boilerplate code is increasingly automated. What remains irreplaceable is systems thinking, architectural decisions, and the ability to ask the right questions. Developers who treat AI as a collaborator — not a replacement — will thrive. Those who resist will fall behind.',
      },
      {
        heading: 'The Community Advantage',
        body: 'Open-source AI tooling is accelerating faster than anything closed source. Models like Llama, Mistral, and Phi are giving developers the ability to run powerful inference locally, tune models on proprietary data, and contribute back to the ecosystem. The community advantage is real: collective iteration beats siloed R&D.',
      },
      {
        heading: 'Where BUILD Fits In',
        body: 'At BUILD, we\'re focused on the intersection of AI and developer tooling. Our goal isn\'t to build the next LLM — it\'s to build the scaffolding that makes AI-powered applications reliable, auditable, and production-ready. Stay tuned.',
      },
    ],
    tags: ['AI', 'Developer Tools', 'Future', 'Open Source'],
    likes: 342,
    comments: 28,
  },
  'building-in-public': {
    title: 'Building in Public: Our Journey',
    author: 'Sam Rivera',
    role: 'Head of AI',
    date: 'Feb 10, 2026',
    readTime: '6 min read',
    category: 'Community',
    icon: <Globe className="w-32 h-32 text-[#00B3B3]" />,
    intro: 'We\'ve been building in public from day one. Here\'s everything we learned — the good, the brutal, and the surprisingly beautiful.',
    sections: [
      {
        heading: 'Why We Chose Radical Transparency',
        body: 'When we started BUILD, we had a choice: build in stealth and launch big, or build out in the open with the community watching. We chose transparency because we believe the best products come from the loudest feedback loops. If you\'re embarrassed by your v0.1, you launched too late.',
      },
      {
        heading: 'The Feedback That Changed Everything',
        body: 'Three months into building Workflow Engine, a single GitHub issue changed our architecture. A developer from Brazil commented that our API was too complex for small teams. That comment led to a complete redesign of the DSL. Today, it\'s our most praised feature. We wouldn\'t have built it without building in public.',
      },
      {
        heading: 'The Hard Parts Nobody Talks About',
        body: 'Building in public also means building through the dips publicly. We had a week where daily active users dropped 40% because of a bad update. We posted about it. We got roasted. Then 200 people showed up in our Discord to help debug. Community is not just for the wins.',
      },
      {
        heading: 'Our Recommendation',
        body: 'Share your roadmap. Post your metrics. Celebrate contributions. Acknowledge failures. The developers who trust you most are the ones who\'ve watched you work through hard things honestly.',
      },
    ],
    tags: ['Community', 'Open Source', 'Startups', 'Transparency'],
    likes: 198,
    comments: 43,
  },
  'automation-best-practices': {
    title: 'Automation Best Practices for 2026',
    author: 'Jordan Park',
    role: 'Lead Engineer',
    date: 'Feb 5, 2026',
    readTime: '12 min read',
    category: 'Automation',
    icon: <Zap className="w-32 h-32 text-[#FF6A00]" />,
    intro: 'Workflow automation that actually works isn\'t magic — it\'s disciplined engineering. Here\'s everything you need to get it right the first time.',
    sections: [
      {
        heading: 'Start With the Right Problem',
        body: 'The biggest mistake teams make with automation is automating the wrong things first. Rule of thumb: automate a process only after you\'ve run it manually at least 10 times and fully understood every edge case. Automating an unclear process just makes the mess faster.',
      },
      {
        heading: 'Design for Failure',
        body: 'Every automation pipeline will eventually fail. Design for it upfront. Build in dead-letter queues, retry logic with exponential backoff, alerting on failures, and easy manual overrides. If your automation can\'t be paused by a non-engineer in 30 seconds, it\'s too fragile.',
      },
      {
        heading: 'Observability is Non-Negotiable',
        body: 'You should be able to answer three questions about any running automation: What is it doing right now? When did it last succeed? What failed and why? If you can\'t answer those in under a minute, your observability is incomplete. Log everything. Trace everything.',
      },
      {
        heading: 'The 10x Rule',
        body: 'A good automation should save 10x the time it took to build, within 6 months. If it doesn\'t, you either automated the wrong thing or built it too expensively. Track ROI aggressively and kill automations that don\'t pay for themselves.',
      },
    ],
    tags: ['Automation', 'Engineering', 'Best Practices', 'DevOps'],
    likes: 521,
    comments: 67,
  },
  'why-open-source': {
    title: 'Why We Open Sourced Everything',
    author: 'Casey Taylor',
    role: 'Design Director',
    date: 'Jan 28, 2026',
    readTime: '5 min read',
    category: 'Open Source',
    icon: <Heart className="w-32 h-32 text-[#00B3B3]" />,
    intro: 'Opening our source code felt terrifying. Then it became the best business decision we ever made.',
    sections: [
      {
        heading: 'The Fear',
        body: 'When we first talked about open-sourcing our core tools, the fear was real: competitors will copy us, contributors will break things, and we\'ll lose our competitive advantage. All three things happened. None of them mattered as much as the benefits that followed.',
      },
      {
        heading: 'The Unexpected Benefits',
        body: 'Within 60 days of open-sourcing BUILD Core, we had 400+ GitHub stars and 12 external contributors. One of those contributors — a developer in Poland — submitted a PR that fixed a critical memory leak we hadn\'t noticed. The collective intelligence of the open-source community is a superpower.',
      },
      {
        heading: 'Trust as a Moat',
        body: 'Closed source asks users to trust a black box. Open source shows your work. When an enterprise evaluates our tools, they can read every line of code. That\'s our moat. Not secrecy — transparency. Trust is a more durable competitive advantage than any feature.',
      },
      {
        heading: 'How to Do It Right',
        body: 'Start with clear contribution guidelines. Invest in documentation before you launch. Respond to issues within 2 business days, minimum. Celebrate every contributor publicly. These aren\'t optional — they\'re the foundation of a healthy open-source project.',
      },
    ],
    tags: ['Open Source', 'Community', 'Strategy', 'Philosophy'],
    likes: 287,
    comments: 51,
  },
  'lab-to-production': {
    title: 'The Lab: Experiments That Became Products',
    author: 'Morgan Lee',
    role: 'Community Lead',
    date: 'Jan 20, 2026',
    readTime: '10 min read',
    category: 'Lab',
    icon: <FlaskConical className="w-32 h-32 text-[#FF6A00]" />,
    intro: 'Not every experiment survives. But the ones that do? They teach you everything about what builders actually need.',
    sections: [
      {
        heading: 'How Workflow Engine Was Born',
        body: 'Workflow Engine started as a weekend hack — a YAML-based config system for chaining API calls. No UI, no docs, barely tested. We threw it in The Lab with a "here be dragons" warning. 200 developers built real workflows with it in the first month. That was our signal to go all-in.',
      },
      {
        heading: 'The Graveyard',
        body: 'For every experiment that shipped, five went to the graveyard. Audio Code — a voice-to-code prototype — never got past its latency issues. Mesh — a P2P communication layer — died because the security model was unsolvable. We post these failures too. The graveyard is part of the culture.',
      },
      {
        heading: 'What Makes an Experiment Worth Productizing',
        body: 'Three signals tell us an experiment is ready to graduate: organic usage from strangers (not our team), repeated requests for stability, and at least one person building something we didn\'t anticipate. If those three line up, we fund the next phase.',
      },
      {
        heading: 'Come Experiment With Us',
        body: 'The Lab is open to everyone. You don\'t need to be a BUILD customer. You just need to be curious, willing to break things, and generous with feedback. Some of our best product ideas came from people who found The Lab accidentally.',
      },
    ],
    tags: ['Lab', 'Product', 'Experiments', 'Innovation'],
    likes: 413,
    comments: 35,
  },
  'designing-for-developers': {
    title: 'Designing for Developers',
    author: 'Riley Quinn',
    role: 'Design Director',
    date: 'Jan 12, 2026',
    readTime: '7 min read',
    category: 'Design',
    icon: <Palette className="w-32 h-32 text-[#00B3B3]" />,
    intro: 'Developer tools have a reputation for ugly. We think that\'s a choice, not an inevitability.',
    sections: [
      {
        heading: 'The False Dichotomy',
        body: 'There\'s a persistent myth that developer tools can be either functional or beautiful, but not both. This is an excuse. Linear, Vercel, Figma, and Loom have all proven that developer-focused products can be stunningly crafted and deeply functional at the same time.',
      },
      {
        heading: 'Speed is a Design Principle',
        body: 'For developers, performance is UX. An interface that loads slowly is broken, regardless of how pretty. Our design process starts with performance budgets. Every animation has a justification. Every interaction is questioned: "Does this add value or add delay?"',
      },
      {
        heading: 'Dark Mode by Default',
        body: 'We shipped dark mode as our primary design language from day one. Not as an afterthought, not as a setting — as the default. Developers work in dark environments. Meeting them where they are isn\'t a trend; it\'s respect.',
      },
      {
        heading: 'Design Systems as Open Source',
        body: 'Our entire design system is open source. Every token, every component, every animation primitive. We believe beautiful developer tooling should be democratized. If other companies build great tools with our design system, that\'s a win for everyone.',
      },
    ],
    tags: ['Design', 'Developer Experience', 'UI', 'Open Source'],
    likes: 309,
    comments: 22,
  },
  'neural-networks-beginners': {
    title: 'Neural Networks for Absolute Beginners',
    author: 'Alex Chen',
    role: 'Founder & CEO',
    date: 'Jan 5, 2026',
    readTime: '15 min read',
    category: 'AI',
    icon: <Brain className="w-32 h-32 text-[#FF6A00]" />,
    intro: 'Neural networks terrify most developers. We\'re going to fix that in the next 15 minutes.',
    sections: [
      {
        heading: 'Forget Everything You Think You Know',
        body: 'Most articles start with the biological neuron metaphor. Forget it. A neural network is just a mathematical function: you put numbers in, it does math, numbers come out. The "learning" is adjusting the math until the output numbers are what you want. That\'s truly it.',
      },
      {
        heading: 'A Concrete Example: Is This Email Spam?',
        body: 'Take spam detection. Your input is numbers representing word frequencies in an email. Your output is a single number: 0 (not spam) or 1 (spam). The neural network is a stack of matrix multiplications that transforms the word frequencies into that single number. Training is showing it 10,000 examples with the correct answers.',
      },
      {
        heading: 'What "Layers" Actually Are',
        body: 'Each layer in a neural network is asking a different question about the data. Early layers find simple patterns (this word appears often). Later layers find complex patterns (these words appearing together usually mean spam). Depth equals abstraction. Nothing more mystical than that.',
      },
      {
        heading: 'Where to Go From Here',
        body: 'If you want to go deeper, start with fast.ai — it\'s the most practical approach to learning neural networks we\'ve found. Then join our Discord where we have a dedicated #learning-ai channel with resources curated by our team and community.',
      },
    ],
    tags: ['AI', 'Machine Learning', 'Beginners', 'Education'],
    likes: 876,
    comments: 112,
  },
  'community-driven-development': {
    title: 'Community-Driven Development',
    author: 'Morgan Lee',
    role: 'Community Lead',
    date: 'Dec 28, 2025',
    readTime: '9 min read',
    category: 'Community',
    icon: <Users className="w-32 h-32 text-[#00B3B3]" />,
    intro: 'We have 50,000+ developers in our community. Here\'s exactly how that shapes every product decision we make.',
    sections: [
      {
        heading: 'Community First, Product Second',
        body: 'Every feature request goes into a public roadmap. The top-voted items get prioritized — not by internal intuition, but by actual developer demand. This is not easy. Sometimes the community wants things that conflict with our architectural principles. We show that tension publicly and explain our decisions.',
      },
      {
        heading: 'The Discord Strategy',
        body: 'Our Discord is not support — it\'s collaboration. We structured it around projects, not topics. Instead of #general and #help, we have #build-core, #workflow-engine, and #lab-experiments. Developers who care about a specific tool cluster there and form relationships that outlast any single feature release.',
      },
      {
        heading: 'Contributor Recognition',
        body: 'We ship a monthly contributor digest. Every merged PR, every meaningful issue, every community post that helped another developer gets featured. Recognition costs nothing and builds loyalty that money can\'t buy. Our top contributors have turned down job offers from larger companies because they\'re too invested in what we\'re building together.',
      },
      {
        heading: 'The Virtuous Cycle',
        body: 'When community drives product, product improves. When product improves, community grows. When community grows, there are more contributors. The flywheel is real. The only thing that breaks it is neglect.',
      },
    ],
    tags: ['Community', 'Product', 'Open Source', 'Culture'],
    likes: 445,
    comments: 89,
  },
};

const categoryColors: Record<string, string> = {
  AI: 'bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/30',
  Automation: 'bg-[#00B3B3]/20 text-[#00B3B3] border-[#00B3B3]/30',
  'Open Source': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Community: 'bg-green-500/20 text-green-400 border-green-500/30',
  Design: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  Lab: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

const otherArticles = [
  { slug: 'future-of-ai-development', title: 'The Future of AI Development', category: 'AI' },
  { slug: 'building-in-public', title: 'Building in Public: Our Journey', category: 'Community' },
  { slug: 'automation-best-practices', title: 'Automation Best Practices for 2026', category: 'Automation' },
  { slug: 'why-open-source', title: 'Why We Open Sourced Everything', category: 'Open Source' },
  { slug: 'lab-to-production', title: 'The Lab: Experiments That Became Products', category: 'Lab' },
  { slug: 'designing-for-developers', title: 'Designing for Developers', category: 'Design' },
  { slug: 'neural-networks-beginners', title: 'Neural Networks for Absolute Beginners', category: 'AI' },
  { slug: 'community-driven-development', title: 'Community-Driven Development', category: 'Community' },
];

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const article = slug ? articleContent[slug] : undefined;
  const related = otherArticles.filter((a) => a.slug !== slug).slice(0, 3);

  if (!article) {
    return (
      <Section className="min-h-[80vh] flex items-center">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FileQuestion className="w-24 h-24 text-[#FF6A00] mb-6 mx-auto" />
            <h1 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">Article Not Found</h1>
            <p className="text-xl text-[#F5F5F5]/60 mb-8">
              This article doesn't exist yet — but we're writing it.
            </p>
            <Link to="/blog">
              <motion.div
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6A00] text-[#0D0D0D] rounded-lg text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" /> Back to Blog
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </Section>
    );
  }

  return (
    <div>
      {/* Hero */}
      <Section className="min-h-[50vh] flex items-end pb-0 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,106,0,0.5) 0%, rgba(0,179,179,0.3) 40%, transparent 70%)',
          }}
        />
        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-[#F5F5F5]/60 hover:text-[#00B3B3] transition-colors mb-8 text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <div className="max-w-4xl">
              <span className={`px-3 py-1 text-xs rounded-full border ${categoryColors[article.category]} mb-6 inline-block`}>
                {article.category}
              </span>

              <h1 className="text-4xl md:text-6xl mb-6 leading-tight text-[#F5F5F5]">
                {article.title}
              </h1>

              <p className="text-xl text-[#F5F5F5]/60 mb-8 leading-relaxed max-w-2xl">
                {article.intro}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-[#F5F5F5]/50 pb-8 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#00B3B3] flex items-center justify-center text-xs text-[#0D0D0D]">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[#F5F5F5]">{article.author}</div>
                    <div className="text-[#F5F5F5]/40 text-xs">{article.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {article.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {article.readTime}
                </div>
                <div className="flex items-center gap-4 ml-auto">
                  <motion.button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${liked ? 'bg-[#FF6A00]/20 border-[#FF6A00]/50 text-[#FF6A00]' : 'border-white/10 text-[#F5F5F5]/50 hover:border-[#FF6A00]/30'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className="w-4 h-4" /> {article.likes + (liked ? 1 : 0)}
                  </motion.button>
                  <motion.button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-1.5 rounded-lg border transition-colors ${bookmarked ? 'border-[#00B3B3]/50 text-[#00B3B3]' : 'border-white/10 text-[#F5F5F5]/50 hover:border-[#00B3B3]/30'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bookmark className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-1.5 rounded-lg border border-white/10 text-[#F5F5F5]/50 hover:border-white/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Article Content */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 max-w-6xl mx-auto">
          {/* Main Content */}
          <div>
            {/* Featured Emoji */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden mb-12 p-16 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/10 via-[#00B3B3]/5 to-[#FF6A00]/10" />
              <div className="relative z-10">{article.icon}</div>
            </motion.div>

            {article.sections.map((section, index) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="mb-10"
              >
                <h2 className="text-2xl md:text-3xl mb-4 text-[#F5F5F5] leading-tight">
                  <span className="bg-gradient-to-r from-[#FF6A00] to-[#00B3B3] bg-clip-text text-transparent mr-2">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  {section.heading}
                </h2>
                <p className="text-[#F5F5F5]/70 leading-relaxed text-lg">
                  {section.body}
                </p>
              </motion.div>
            ))}

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/70 hover:border-[#00B3B3]/40 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Card */}
            <div className="mt-12">
              <GlowCard>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#00B3B3] flex items-center justify-center text-2xl text-[#0D0D0D] flex-shrink-0">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl mb-1 text-[#F5F5F5]">{article.author}</h3>
                    <p className="text-[#FF6A00] text-sm mb-3">{article.role} at BUILD</p>
                    <p className="text-[#F5F5F5]/60 text-sm leading-relaxed">
                      Builder, thinker, and occasional breaker of things. Part of the team that believes great software should be both beautiful and open.
                    </p>
                  </div>
                </div>
              </GlowCard>
            </div>

            {/* Comments placeholder */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-8">
                <MessageCircle className="w-5 h-5 text-[#00B3B3]" />
                <h3 className="text-xl text-[#F5F5F5]">{article.comments} Comments</h3>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-[#F5F5F5]/60 mb-4">Join the conversation in our Discord community.</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#00B3B3]/40 text-[#00B3B3] hover:bg-[#00B3B3]/10 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Join Discord to Comment
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Table of Contents */}
            <div className="sticky top-32">
              <GlowCard>
                <h3 className="text-lg mb-4 text-[#F5F5F5]">In This Article</h3>
                <nav className="space-y-2">
                  {article.sections.map((section, index) => (
                    <div
                      key={section.heading}
                      className="flex items-start gap-3 text-sm text-[#F5F5F5]/60 hover:text-[#00B3B3] cursor-pointer transition-colors py-1"
                    >
                      <span className="text-[#FF6A00]/60 flex-shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="leading-snug">{section.heading}</span>
                    </div>
                  ))}
                </nav>
              </GlowCard>

              {/* Related Posts */}
              <div className="mt-8">
                <h3 className="text-lg mb-4 text-[#F5F5F5]">More Articles</h3>
                <div className="space-y-4">
                  {related.map((rel) => (
                    <Link key={rel.slug} to={`/blog/${rel.slug}`}>
                      <div className="group flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00B3B3]/30 transition-colors">
                        <span className={`px-2 py-0.5 text-xs rounded-full border flex-shrink-0 ${categoryColors[rel.category] ?? 'bg-white/10 text-[#F5F5F5]/70 border-white/10'}`}>
                          {rel.category}
                        </span>
                        <span className="text-sm text-[#F5F5F5]/70 group-hover:text-[#F5F5F5] transition-colors leading-snug">
                          {rel.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#F5F5F5]/30 group-hover:text-[#FF6A00] flex-shrink-0 mt-0.5 ml-auto transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}
