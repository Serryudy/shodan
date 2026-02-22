/**
 * seedFirebase.mjs — One-time migration script
 *
 * Seeds all existing blog posts into Firestore.
 * Run AFTER filling in scripts/firebaseConfig.mjs.
 *
 * Usage:
 *   node scripts/seedFirebase.mjs
 *
 * Requirements: Node.js 18+, firebase installed (npm install firebase)
 */
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig.mjs';

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ─── Article data — merged from Blog.tsx + BlogPost.tsx ───────────────────────

const articles = [
  {
    title: 'The Future of AI Development',
    excerpt: 'How artificial intelligence is reshaping software development and what it means for builders who dare to push boundaries.',
    author: 'Alex Chen',
    role: 'Founder & CEO',
    date: 'Feb 15, 2026',
    readTime: '8 min read',
    category: 'AI',
    slug: 'future-of-ai-development',
    likes: 342,
    comments: 28,
    tags: ['AI', 'Developer Tools', 'Future', 'Open Source'],
    intro: "Artificial intelligence is no longer a future concept — it's the backbone of modern software development. In this piece, we explore what that means for the builders working on the next generation of products.",
    sections: [
      {
        heading: 'The Shift is Already Happening',
        body: "Every major coding tool, design platform, and DevOps pipeline now has some form of AI embedded in it. GitHub Copilot, Vercel's v0, Figma's Make — these are not experiments anymore. They are how teams ship products. The question isn't whether to adopt AI tools; it's how fast you integrate them and how deeply you understand their limitations.",
      },
      {
        heading: 'What This Means for Developers',
        body: "The role of the developer is evolving. Writing boilerplate code is increasingly automated. What remains irreplaceable is systems thinking, architectural decisions, and the ability to ask the right questions. Developers who treat AI as a collaborator — not a replacement — will thrive. Those who resist will fall behind.",
      },
      {
        heading: 'The Community Advantage',
        body: "Open-source AI tooling is accelerating faster than anything closed source. Models like Llama, Mistral, and Phi are giving developers the ability to run powerful inference locally, tune models on proprietary data, and contribute back to the ecosystem. The community advantage is real: collective iteration beats siloed R&D.",
      },
      {
        heading: 'Where BUILD Fits In',
        body: "At BUILD, we're focused on the intersection of AI and developer tooling. Our goal isn't to build the next LLM — it's to build the scaffolding that makes AI-powered applications reliable, auditable, and production-ready. Stay tuned.",
      },
    ],
    createdAt: Timestamp.fromDate(new Date('2026-02-15')),
  },
  {
    title: 'Building in Public: Our Journey',
    excerpt: "Lessons learned from developing open-source tools with community feedback — the wins, the failures, and everything in between.",
    author: 'Sam Rivera',
    role: 'Head of AI',
    date: 'Feb 10, 2026',
    readTime: '6 min read',
    category: 'Community',
    slug: 'building-in-public',
    likes: 198,
    comments: 43,
    tags: ['Community', 'Open Source', 'Startups', 'Transparency'],
    intro: "We've been building in public from day one. Here's everything we learned — the good, the brutal, and the surprisingly beautiful.",
    sections: [
      {
        heading: 'Why We Chose Radical Transparency',
        body: "When we started BUILD, we had a choice: build in stealth and launch big, or build out in the open with the community watching. We chose transparency because we believe the best products come from the loudest feedback loops. If you're embarrassed by your v0.1, you launched too late.",
      },
      {
        heading: 'The Feedback That Changed Everything',
        body: "Three months into building Workflow Engine, a single GitHub issue changed our architecture. A developer from Brazil commented that our API was too complex for small teams. That comment led to a complete redesign of the DSL. Today, it's our most praised feature. We wouldn't have built it without building in public.",
      },
      {
        heading: "The Hard Parts Nobody Talks About",
        body: "Building in public also means building through the dips publicly. We had a week where daily active users dropped 40% because of a bad update. We posted about it. We got roasted. Then 200 people showed up in our Discord to help debug. Community is not just for the wins.",
      },
      {
        heading: 'Our Recommendation',
        body: "Share your roadmap. Post your metrics. Celebrate contributions. Acknowledge failures. The developers who trust you most are the ones who've watched you work through hard things honestly.",
      },
    ],
    createdAt: Timestamp.fromDate(new Date('2026-02-10')),
  },
  {
    title: 'Automation Best Practices for 2026',
    excerpt: "A comprehensive guide to implementing workflow automation that actually works, scales, and doesn't break at 3am.",
    author: 'Jordan Park',
    role: 'Lead Engineer',
    date: 'Feb 5, 2026',
    readTime: '12 min read',
    category: 'Automation',
    slug: 'automation-best-practices',
    likes: 521,
    comments: 67,
    tags: ['Automation', 'Engineering', 'Best Practices', 'DevOps'],
    intro: "Workflow automation that actually works isn't magic — it's disciplined engineering. Here's everything you need to get it right the first time.",
    sections: [
      {
        heading: 'Start With the Right Problem',
        body: "The biggest mistake teams make with automation is automating the wrong things first. Rule of thumb: automate a process only after you've run it manually at least 10 times and fully understood every edge case. Automating an unclear process just makes the mess faster.",
      },
      {
        heading: 'Design for Failure',
        body: "Every automation pipeline will eventually fail. Design for it upfront. Build in dead-letter queues, retry logic with exponential backoff, alerting on failures, and easy manual overrides. If your automation can't be paused by a non-engineer in 30 seconds, it's too fragile.",
      },
      {
        heading: 'Observability is Non-Negotiable',
        body: "You should be able to answer three questions about any running automation: What is it doing right now? When did it last succeed? What failed and why? If you can't answer those in under a minute, your observability is incomplete. Log everything. Trace everything.",
      },
      {
        heading: 'The 10x Rule',
        body: "A good automation should save 10x the time it took to build, within 6 months. If it doesn't, you either automated the wrong thing or built it too expensively. Track ROI aggressively and kill automations that don't pay for themselves.",
      },
    ],
    createdAt: Timestamp.fromDate(new Date('2026-02-05')),
  },
  {
    title: 'Why We Open Sourced Everything',
    excerpt: "The philosophy and strategy behind our commitment to open source software — and why we think every company should.",
    author: 'Casey Taylor',
    role: 'Design Director',
    date: 'Jan 28, 2026',
    readTime: '5 min read',
    category: 'Open Source',
    slug: 'why-open-source',
    likes: 287,
    comments: 51,
    tags: ['Open Source', 'Community', 'Strategy', 'Philosophy'],
    intro: "Opening our source code felt terrifying. Then it became the best business decision we ever made.",
    sections: [
      {
        heading: 'The Fear',
        body: "When we first talked about open-sourcing our core tools, the fear was real: competitors will copy us, contributors will break things, and we'll lose our competitive advantage. All three things happened. None of them mattered as much as the benefits that followed.",
      },
      {
        heading: 'The Unexpected Benefits',
        body: "Within 60 days of open-sourcing BUILD Core, we had 400+ GitHub stars and 12 external contributors. One of those contributors — a developer in Poland — submitted a PR that fixed a critical memory leak we hadn't noticed. The collective intelligence of the open-source community is a superpower.",
      },
      {
        heading: 'Trust as a Moat',
        body: "Closed source asks users to trust a black box. Open source shows your work. When an enterprise evaluates our tools, they can read every line of code. That's our moat. Not secrecy — transparency. Trust is a more durable competitive advantage than any feature.",
      },
      {
        heading: 'How to Do It Right',
        body: "Start with clear contribution guidelines. Invest in documentation before you launch. Respond to issues within 2 business days, minimum. Celebrate every contributor publicly. These aren't optional — they're the foundation of a healthy open-source project.",
      },
    ],
    createdAt: Timestamp.fromDate(new Date('2026-01-28')),
  },
  {
    title: 'The Lab: Experiments That Became Products',
    excerpt: "Behind the scenes of our experimental lab — the prototypes that evolved into production-ready solutions used by thousands.",
    author: 'Morgan Lee',
    role: 'Community Lead',
    date: 'Jan 20, 2026',
    readTime: '10 min read',
    category: 'Lab',
    slug: 'lab-to-production',
    likes: 413,
    comments: 35,
    tags: ['Lab', 'Product', 'Experiments', 'Innovation'],
    intro: "Not every experiment survives. But the ones that do? They teach you everything about what builders actually need.",
    sections: [
      {
        heading: 'How Workflow Engine Was Born',
        body: "Workflow Engine started as a weekend hack — a YAML-based config system for chaining API calls. No UI, no docs, barely tested. We threw it in The Lab with a 'here be dragons' warning. 200 developers built real workflows with it in the first month. That was our signal to go all-in.",
      },
      {
        heading: 'The Graveyard',
        body: "For every experiment that shipped, five went to the graveyard. Audio Code — a voice-to-code prototype — never got past its latency issues. Mesh — a P2P communication layer — died because the security model was unsolvable. We post these failures too. The graveyard is part of the culture.",
      },
      {
        heading: 'What Makes an Experiment Worth Productizing',
        body: "Three signals tell us an experiment is ready to graduate: organic usage from strangers (not our team), repeated requests for stability, and at least one person building something we didn't anticipate. If those three line up, we fund the next phase.",
      },
      {
        heading: 'Come Experiment With Us',
        body: "The Lab is open to everyone. You don't need to be a BUILD customer. You just need to be curious, willing to break things, and generous with feedback. Some of our best product ideas came from people who found The Lab accidentally.",
      },
    ],
    createdAt: Timestamp.fromDate(new Date('2026-01-20')),
  },
  {
    title: 'Designing for Developers',
    excerpt: "How we create beautiful, functional experiences for technical audiences — aesthetics is not the enemy of utility.",
    author: 'Riley Quinn',
    role: 'Design Director',
    date: 'Jan 12, 2026',
    readTime: '7 min read',
    category: 'Design',
    slug: 'designing-for-developers',
    likes: 309,
    comments: 22,
    tags: ['Design', 'Developer Experience', 'UI', 'Open Source'],
    intro: "Developer tools have a reputation for ugly. We think that's a choice, not an inevitability.",
    sections: [
      {
        heading: 'The False Dichotomy',
        body: "There's a persistent myth that developer tools can be either functional or beautiful, but not both. This is an excuse. Linear, Vercel, Figma, and Loom have all proven that developer-focused products can be stunningly crafted and deeply functional at the same time.",
      },
      {
        heading: 'Speed is a Design Principle',
        body: "For developers, performance is UX. An interface that loads slowly is broken, regardless of how pretty. Our design process starts with performance budgets. Every animation has a justification. Every interaction is questioned: 'Does this add value or add delay?'",
      },
      {
        heading: 'Dark Mode by Default',
        body: "We shipped dark mode as our primary design language from day one. Not as an afterthought, not as a setting — as the default. Developers work in dark environments. Meeting them where they are isn't a trend; it's respect.",
      },
      {
        heading: 'Design Systems as Open Source',
        body: "Our entire design system is open source. Every token, every component, every animation primitive. We believe beautiful developer tooling should be democratized. If other companies build great tools with our design system, that's a win for everyone.",
      },
    ],
    createdAt: Timestamp.fromDate(new Date('2026-01-12')),
  },
  {
    title: 'Neural Networks for Absolute Beginners',
    excerpt: "Demystifying deep learning: a hands-on introduction that skips the jargon and focuses on what actually matters.",
    author: 'Alex Chen',
    role: 'Founder & CEO',
    date: 'Jan 5, 2026',
    readTime: '15 min read',
    category: 'AI',
    slug: 'neural-networks-beginners',
    likes: 876,
    comments: 112,
    tags: ['AI', 'Machine Learning', 'Beginners', 'Education'],
    intro: "Neural networks terrify most developers. We're going to fix that in the next 15 minutes.",
    sections: [
      {
        heading: 'Forget Everything You Think You Know',
        body: "Most articles start with the biological neuron metaphor. Forget it. A neural network is just a mathematical function: you put numbers in, it does math, numbers come out. The 'learning' is adjusting the math until the output numbers are what you want. That's truly it.",
      },
      {
        heading: 'A Concrete Example: Is This Email Spam?',
        body: "Take spam detection. Your input is numbers representing word frequencies in an email. Your output is a single number: 0 (not spam) or 1 (spam). The neural network is a stack of matrix multiplications that transforms the word frequencies into that single number. Training is showing it 10,000 examples with the correct answers.",
      },
      {
        heading: "What 'Layers' Actually Are",
        body: "Each layer in a neural network is asking a different question about the data. Early layers find simple patterns (this word appears often). Later layers find complex patterns (these words appearing together usually mean spam). Depth equals abstraction. Nothing more mystical than that.",
      },
      {
        heading: 'Where to Go From Here',
        body: "If you want to go deeper, start with fast.ai — it's the most practical approach to learning neural networks we've found. Then join our Discord where we have a dedicated #learning-ai channel with resources curated by our team and community.",
      },
    ],
    createdAt: Timestamp.fromDate(new Date('2026-01-05')),
  },
  {
    title: 'Community-Driven Development',
    excerpt: "How we built a 50K+ developer community that contributes to every product decision we make.",
    author: 'Morgan Lee',
    role: 'Community Lead',
    date: 'Dec 28, 2025',
    readTime: '9 min read',
    category: 'Community',
    slug: 'community-driven-development',
    likes: 445,
    comments: 89,
    tags: ['Community', 'Product', 'Open Source', 'Culture'],
    intro: "We have 50,000+ developers in our community. Here's exactly how that shapes every product decision we make.",
    sections: [
      {
        heading: 'Community First, Product Second',
        body: "Every feature request goes into a public roadmap. The top-voted items get prioritized — not by internal intuition, but by actual developer demand. This is not easy. Sometimes the community wants things that conflict with our architectural principles. We show that tension publicly and explain our decisions.",
      },
      {
        heading: 'The Discord Strategy',
        body: "Our Discord is not support — it's collaboration. We structured it around projects, not topics. Instead of #general and #help, we have #build-core, #workflow-engine, and #lab-experiments. Developers who care about a specific tool cluster there and form relationships that outlast any single feature release.",
      },
      {
        heading: 'Contributor Recognition',
        body: "We ship a monthly contributor digest. Every merged PR, every meaningful issue, every community post that helped another developer gets featured. Recognition costs nothing and builds loyalty that money can't buy. Our top contributors have turned down job offers from larger companies because they're too invested in what we're building together.",
      },
      {
        heading: 'The Virtuous Cycle',
        body: "When community drives product, product improves. When product improves, community grows. When community grows, there are more contributors. The flywheel is real. The only thing that breaks it is neglect.",
      },
    ],
    createdAt: Timestamp.fromDate(new Date('2025-12-28')),
  },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

console.log('🔥 Connecting to Firebase project:', firebaseConfig.projectId);
console.log(`📝 Seeding ${articles.length} articles...\n`);

let seeded = 0;
let skipped = 0;

for (const article of articles) {
  // Check if slug already exists to make the script idempotent
  const existing = await getDocs(
    query(collection(db, 'articles'), where('slug', '==', article.slug))
  );

  if (!existing.empty) {
    console.log(`  ⏭  Skipped  "${article.title}" (already exists)`);
    skipped++;
    continue;
  }

  await addDoc(collection(db, 'articles'), article);
  console.log(`  ✅ Seeded   "${article.title}"`);
  seeded++;
}

console.log(`\n✨ Done — ${seeded} seeded, ${skipped} skipped.`);
process.exit(0);
