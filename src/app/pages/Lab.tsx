import { motion } from 'motion/react';
import { Section, SectionHeader } from '../components/Section';
import { LabModuleCard } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router';
import { Beaker, Sparkles, Zap, Users, Star } from 'lucide-react';
import { StaggerGrid } from '../components/StaggerContainer';

export function Lab() {
  const experiments = [
    {
      title: 'Helios Camera',
      description: 'Professional Android camera with manual controls and RAW capture',
      status: 'Beta'
    },
    {
      title: 'Helios Studio',
      description: 'Color grading and video encoding suite for creators',
      status: 'Alpha'
    },
    {
      title: 'AI Note App',
      description: 'Knowledge-based AI note-taking with smart linking and graphs',
      status: 'Beta'
    },
    {
      title: 'Archon Agent',
      description: 'OS-level AI voice control agent built for Arch Linux',
      status: 'Experimental'
    },
    {
      title: 'CryptoAlgo',
      description: 'Open-source algorithmic crypto trading with Binance API',
      status: 'Alpha'
    },
    {
      title: 'Helios RAW Engine',
      description: 'Custom RAW image processing pipeline with GPU acceleration',
      status: 'Experimental'
    },
    {
      title: 'Voice2System',
      description: 'Natural language to systemd service management bridge',
      status: 'Experimental'
    },
    {
      title: 'LUT Forge',
      description: 'AI-assisted LUT generation tool for Helios Studio',
      status: 'Preview'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="min-h-[60vh] flex items-center relative overflow-hidden" animate={false}>
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0,179,179,0.4) 0%, rgba(255,106,0,0.2) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Beaker className="w-8 h-8 text-[#00B3B3]" /> {/* Changed Flask to Beaker */}
              <span className="text-sm text-[#00B3B3] uppercase tracking-wider">The Lab</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[#00B3B3] via-[#FF6A00] to-[#00B3B3] bg-clip-text text-transparent">
                Experiment.
              </span>
              <span className="block text-[#F5F5F5]">Innovate. Create.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5]/60 leading-relaxed">
              Welcome to our creative playground. Try cutting-edge prototypes and experimental tools before they launch.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Experiments Grid */}
      <Section>
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B3B3]/10 border border-[#00B3B3]/30 mb-4">
            <Sparkles className="w-4 h-4 text-[#00B3B3]" />
            <span className="text-sm text-[#00B3B3]">Active Experiments</span>
          </div>
        </div>

        <StaggerGrid cols={4} gap="gap-6">
          {experiments.map((experiment) => (
            <LabModuleCard
              key={experiment.title}
              title={experiment.title}
              description={experiment.description}
              status={experiment.status}
            />
          ))}
        </StaggerGrid>
      </Section>

      {/* Info Section */}
      <Section background="gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-[#F5F5F5]">
            Why We Experiment
          </h2>
          <p className="text-lg text-[#F5F5F5]/60 mb-8 leading-relaxed">
            The Lab is where we push boundaries, test wild ideas, and build the tools of tomorrow. 
            Some experiments become products. Others teach us valuable lessons. All of them move us forward.
          </p>
          <StaggerGrid cols={3} className="mt-12">
            <div>
              <div className="text-3xl mb-2 text-[#00B3B3]">100%</div>
              <div className="text-sm text-[#F5F5F5]/60">Open to Feedback</div>
            </div>
            <div>
              <div className="text-3xl mb-2 text-[#FF6A00]">0</div>
              <div className="text-sm text-[#F5F5F5]/60">Fear of Failure</div>
            </div>
            <div>
              <div className="text-3xl mb-2 text-[#00B3B3]">∞</div>
              <div className="text-sm text-[#F5F5F5]/60">Possibilities</div>
            </div>
          </StaggerGrid>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">
            Have an experiment idea?
          </h2>
          <p className="text-xl text-[#F5F5F5]/60 mb-8">
            We're always looking for new challenges. Share your idea with us.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              Submit Your Idea
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}