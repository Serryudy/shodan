import { motion } from 'motion/react';
import { Section, SectionHeader } from '../components/Section';
import { GlowCard, FeatureCard } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router';
import { Brain, Zap, Shield, TrendingUp, Network, Cpu, Mic, BookOpen, Terminal, Layers } from 'lucide-react';
import { StaggerGrid } from '../components/StaggerContainer';

export function SolutionsAI() {
  return (
    <div>
      {/* Hero Section */}
      <Section className="min-h-[60vh] flex items-center" animate={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10">
              <span className="text-sm text-[#FF6A00]">🧠 AI-Powered Tools</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[#FF6A00] to-[#00B3B3] bg-clip-text text-transparent">
                Think Smarter.
              </span>
              <span className="block text-[#F5F5F5]">Control Everything.</span>
            </h1>
            <p className="text-xl text-[#F5F5F5]/60 mb-8 leading-relaxed">
              AI that understands your knowledge and an OS-level agent that puts your voice in control of your entire system.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://github.com/Serryudy/note-app" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  AI Note App on GitHub
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Learn About Archon
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 via-[#00B3B3]/20 to-[#FF6A00]/20 rounded-3xl blur-3xl" />
            <GlowCard className="relative z-10 h-full flex items-center justify-center">
              <Brain className="w-32 h-32 text-[#FF6A00]" />
            </GlowCard>
          </motion.div>
        </div>
      </Section>

      {/* Features Section */}
      <Section background="gradient">
        <SectionHeader
          title="Our AI Products"
          subtitle="Two products that redefine how you interact with knowledge and your operating system."
          centered
        />

        <StaggerGrid cols={2}>
          <GlowCard glowColor="orange" className="h-full">
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#FF6A00]/20 to-[#FF6A00]/5 inline-block">
              <BookOpen className="w-12 h-12 text-[#FF6A00]" />
            </div>
            <h3 className="text-2xl mb-4 text-[#F5F5F5]">AI Note App</h3>
            <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed">
              A knowledge-based AI note-taking app that understands context, links ideas, and helps you think deeper. Your notes become a living knowledge graph powered by AI.
            </p>
            <div className="space-y-2 mb-6">
              {['Knowledge graph visualization', 'AI-powered search & linking', 'Context-aware suggestions', 'Markdown with smart formatting'].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-[#F5F5F5]/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                  {f}
                </div>
              ))}
            </div>
            <a href="https://github.com/Serryudy/note-app" target="_blank" rel="noopener noreferrer" className="text-[#FF6A00] hover:underline inline-flex items-center gap-2">
              View on GitHub →
            </a>
          </GlowCard>

          <GlowCard glowColor="teal" className="h-full">
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#00B3B3]/20 to-[#00B3B3]/5 inline-block">
              <Mic className="w-12 h-12 text-[#00B3B3]" />
            </div>
            <h3 className="text-2xl mb-4 text-[#F5F5F5]">Archon — OS-Level AI Agent</h3>
            <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed">
              A local-first AI voice agent built for Arch Linux that gives you full OS-level control through natural speech. No cloud dependency — runs entirely on your machine.
            </p>
            <div className="space-y-2 mb-6">
              {['Voice-activated OS control', 'Local AI inference (no cloud)', 'System context awareness', 'Arch Linux native integration'].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-[#F5F5F5]/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00B3B3]" />
                  {f}
                </div>
              ))}
            </div>
            <span className="text-[#00B3B3] inline-flex items-center gap-2">
              Coming Soon — Experimental
            </span>
          </GlowCard>
        </StaggerGrid>
      </Section>

      {/* Core Technology */}
      <Section>
        <SectionHeader title="Core AI Technology" centered />
        
        <StaggerGrid cols={3}>
          <FeatureCard
            icon={<Network className="w-8 h-8 text-[#FF6A00]" />}
            title="Knowledge Graphs"
            description="Notes are structured as interconnected knowledge nodes, enabling AI-powered discovery."
          />
          <FeatureCard
            icon={<Cpu className="w-8 h-8 text-[#00B3B3]" />}
            title="Local LLM Inference"
            description="Run AI models locally on your hardware for privacy-first, offline-capable intelligence."
          />
          <FeatureCard
            icon={<Terminal className="w-8 h-8 text-[#FF6A00]" />}
            title="OS-Level Hooks"
            description="Archon integrates deeply with systemd, PipeWire, and Wayland for native Linux control."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-[#00B3B3]" />}
            title="Privacy First"
            description="No data leaves your machine. All processing happens locally with zero telemetry."
          />
          <FeatureCard
            icon={<Layers className="w-8 h-8 text-[#FF6A00]" />}
            title="Contextual Understanding"
            description="AI that understands your note history, system state, and current workflow context."
          />
          <FeatureCard
            icon={<Mic className="w-8 h-8 text-[#00B3B3]" />}
            title="Natural Voice Control"
            description="Speak naturally to open apps, manage files, search notes, and control your system."
          />
        </StaggerGrid>
      </Section>

      {/* CTA */}
      <Section background="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">
            Ready to think smarter?
          </h2>
          <p className="text-xl text-[#F5F5F5]/60 mb-8">
            Try our AI Note App today or follow Archon's development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://github.com/Serryudy/note-app" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                Get AI Note App
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
