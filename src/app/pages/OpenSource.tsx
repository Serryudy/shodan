import { motion } from 'motion/react';
import { Section, SectionHeader } from '../components/Section';
import { GlowCard } from '../components/Card';
import { Button } from '../components/Button';
import { Github, Star, GitFork, Download, Users, MessageCircle, Trophy, Heart } from 'lucide-react';
import { StaggerGrid } from '../components/StaggerContainer';

export function OpenSource() {
  const projects = [
    {
      name: 'Helios Camera',
      description: 'Professional Android camera app with manual controls, RAW capture, and pro video modes',
      stars: '—',
      forks: '—',
      language: 'Kotlin',
      tags: ['Android', 'Camera', 'Photography'],
      url: 'https://www.heliosprocamera.studio/'
    },
    {
      name: 'Helios Studio',
      description: 'Color grading and video encoding tool for filmmakers and content creators',
      stars: '—',
      forks: '—',
      language: 'TypeScript',
      tags: ['Video', 'Color Grading', 'Encoding'],
      url: 'https://github.com/Serryudy/heliosstudio'
    },
    {
      name: 'AI Note App',
      description: 'Knowledge-based AI note-taking with smart linking and contextual suggestions',
      stars: '—',
      forks: '—',
      language: 'TypeScript',
      tags: ['AI', 'Notes', 'Knowledge Graph'],
      url: 'https://github.com/Serryudy/note-app'
    },
    {
      name: 'Archon Agent',
      description: 'OS-level AI voice agent for Arch Linux with local inference and system control',
      stars: '—',
      forks: '—',
      language: 'Python',
      tags: ['AI', 'Voice', 'Linux'],
      url: '#'
    },
    {
      name: 'CryptoAlgo',
      description: 'Open-source algorithmic crypto trading platform with Binance API integration',
      stars: '—',
      forks: '—',
      language: 'Python',
      tags: ['Trading', 'Crypto', 'Binance'],
      url: 'https://github.com/Serryudy/note-app'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="min-h-[60vh] flex items-center" animate={false}>
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Github className="w-8 h-8 text-[#00B3B3]" />
              <span className="text-sm text-[#00B3B3] uppercase tracking-wider">Open Source</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              <span className="block text-[#F5F5F5]">Built by the</span>
              <span className="block bg-gradient-to-r from-[#00B3B3] via-[#FF6A00] to-[#00B3B3] bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5]/60 leading-relaxed mb-8">
              All our core tools are free, open source, and built with love by developers around the world.
            </p>
            <a href="https://github.com/Serryudy" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </a>
          </motion.div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section background="gradient">
        <StaggerGrid cols={4} className="max-w-5xl mx-auto">
          {[
            { label: 'GitHub Stars', value: '1.5M+' },
            { label: 'Contributors', value: '5,000+' },
            { label: 'Projects', value: '100+' },
            { label: 'Downloads', value: '10M+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl mb-2 bg-gradient-to-r from-[#FF6A00] to-[#00B3B3] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-[#F5F5F5]/60">{stat.label}</div>
            </div>
          ))}
        </StaggerGrid>
      </Section>

      {/* Projects Section */}
      <Section>
        <SectionHeader
          title="Popular Projects"
          subtitle="Explore our most loved open-source tools and libraries."
          centered
        />

        <StaggerGrid cols={3} gap="gap-6">
          {projects.map((project) => (
            <a key={project.name} href={project.url} target="_blank" rel="noopener noreferrer">
            <GlowCard className="h-full group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl text-[#F5F5F5] group-hover:text-[#00B3B3] transition-colors">
                    {project.name}
                  </h3>
                  <Github className="w-5 h-5 text-[#F5F5F5]/40" />
                </div>

                <p className="text-[#F5F5F5]/60 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-[#F5F5F5]/50 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {project.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {project.forks}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#00B3B3]" />
                    {project.language}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlowCard>
              </a>
          ))}
        </StaggerGrid>
      </Section>

      {/* Contributing Section */}
      <Section background="darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-[#F5F5F5]">
            How to Contribute
          </h2>
          <p className="text-lg text-[#F5F5F5]/60 mb-12 leading-relaxed">
            We welcome contributions from developers of all skill levels. Here's how you can get involved.
          </p>

          <StaggerGrid cols={3} className="text-left">
            {[
              {
                icon: <Star className="w-6 h-6" />,
                title: 'Star & Share',
                description: 'Show your support by starring our repos and sharing with your network.'
              },
              {
                icon: <Github className="w-6 h-6" />,
                title: 'Submit PRs',
                description: 'Fix bugs, add features, or improve documentation with pull requests.'
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: 'Report Issues',
                description: 'Help us improve by reporting bugs and suggesting enhancements.'
              },
            ].map((item) => (
              <div key={item.title}>
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#00B3B3]/20 to-[#FF6A00]/20 inline-block mb-4 text-[#00B3B3]">
                  {item.icon}
                </div>
                <h3 className="text-xl mb-3 text-[#F5F5F5]">{item.title}</h3>
                <p className="text-[#F5F5F5]/60">{item.description}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </Section>

      {/* Community Hub */}
      <Section>
        <SectionHeader
          title="The Community Hub"
          subtitle="50,000+ developers building together. This isn't just open source — it's a movement."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Discord Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlowCard glowColor="teal" className="h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5865F2]/20 to-[#00B3B3]/20 border border-[#5865F2]/30">
                  <MessageCircle className="w-8 h-8 text-[#5865F2]" />
                </div>
                <div>
                  <h3 className="text-2xl text-[#F5F5F5]">Discord Community</h3>
                  <p className="text-[#F5F5F5]/60 text-sm">18,000+ members online</p>
                </div>
              </div>
              <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed">
                The most active developer community outside of GitHub. Real-time help, weekly office hours with the team, and channels for every project we build.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Daily messages', value: '2,400+' },
                  { label: 'Active channels', value: '40+' },
                  { label: 'Weekly events', value: '5+' },
                  { label: 'Nations represented', value: '90+' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg text-[#00B3B3]">{stat.value}</div>
                    <div className="text-xs text-[#F5F5F5]/50">{stat.label}</div>
                  </div>
                ))}
              </div>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#5865F2]/40 text-[#5865F2] hover:bg-[#5865F2]/10 transition-colors">
                <MessageCircle className="w-4 h-4" /> Join Discord
              </a>
            </GlowCard>
          </motion.div>

          {/* GitHub Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlowCard glowColor="orange" className="h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FF6A00]/20 to-[#00B3B3]/20 border border-[#FF6A00]/30">
                  <Github className="w-8 h-8 text-[#F5F5F5]" />
                </div>
                <div>
                  <h3 className="text-2xl text-[#F5F5F5]">GitHub Organization</h3>
                  <p className="text-[#F5F5F5]/60 text-sm">5,000+ contributors worldwide</p>
                </div>
              </div>
              <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed">
                All 100+ of our projects live here. From beginner-friendly issues labeled "good first issue" to deep architectural challenges — there's something for every skill level.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Total repos', value: '100+' },
                  { label: 'PRs merged this month', value: '340+' },
                  { label: 'Issues closed', value: '12K+' },
                  { label: 'Stars earned', value: '1.5M+' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg text-[#FF6A00]">{stat.value}</div>
                    <div className="text-xs text-[#F5F5F5]/50">{stat.label}</div>
                  </div>
                ))}
              </div>
              <a href="https://github.com/Serryudy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#FF6A00]/40 text-[#FF6A00] hover:bg-[#FF6A00]/10 transition-colors">
                <Github className="w-4 h-4" /> View on GitHub
              </a>
            </GlowCard>
          </motion.div>
        </div>

        {/* Top Contributors */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-6 h-6 text-[#FF6A00]" />
            <h3 className="text-2xl text-[#F5F5F5]">Top Contributors This Month</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'dev_lena', prs: 23, country: '🇩🇪', color: 'from-[#FF6A00] to-[#00B3B3]' },
              { name: 'marco_builds', prs: 19, country: '🇧🇷', color: 'from-[#00B3B3] to-purple-500' },
              { name: 'yuki_codes', prs: 17, country: '🇯🇵', color: 'from-purple-500 to-[#FF6A00]' },
              { name: 'aisha_dev', prs: 15, country: '🇳🇬', color: 'from-green-500 to-[#00B3B3]' },
              { name: 'thomas_w', prs: 14, country: '🇬🇧', color: 'from-[#FF6A00] to-pink-500' },
            ].map((contrib, index) => (
              <motion.div
                key={contrib.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-[#00B3B3]/40 transition-colors"
              >
                {index === 0 && <Trophy className="w-5 h-5 mb-2 mx-auto text-yellow-400" />}
                {index === 1 && <Trophy className="w-5 h-5 mb-2 mx-auto text-slate-400" />}
                {index === 2 && <Trophy className="w-5 h-5 mb-2 mx-auto text-amber-700" />}
                {index > 2 && <div className="text-lg mb-2 text-[#F5F5F5]/30">#{index + 1}</div>}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contrib.color} flex items-center justify-center text-[#0D0D0D] mx-auto mb-3 text-sm`}>
                  {contrib.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm text-[#F5F5F5]">{contrib.name}</div>
                <div className="text-xs text-[#F5F5F5]/40 mt-1">{contrib.prs} PRs {contrib.country}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">
            Join the community
          </h2>
          <p className="text-xl text-[#F5F5F5]/60 mb-8">
            50,000 developers and counting. Come build something great together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://github.com/Serryudy" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </a>
            <Button variant="primary" size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Discord
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
