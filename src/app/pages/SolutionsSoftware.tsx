import { motion } from 'motion/react';
import { Section, SectionHeader } from '../components/Section';
import { GlowCard, FeatureCard } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router';
import { Code2, Smartphone, Globe, Cloud, Database, Lock, Camera, Palette, Film, Video, Aperture, MonitorPlay } from 'lucide-react';
import { StaggerGrid, StaggerContainer, StaggerItem } from '../components/StaggerContainer';

export function SolutionsSoftware() {
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
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#00B3B3]/30 bg-[#00B3B3]/10">
              <Camera className="w-4 h-4 text-[#00B3B3]" />
              <span className="text-sm text-[#00B3B3]">Creative Software</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent">
                Helios Ecosystem
              </span>
              <span className="block text-[#F5F5F5]">Camera. Studio. Create.</span>
            </h1>
            <p className="text-xl text-[#F5F5F5]/60 mb-8 leading-relaxed">
              Professional-grade camera and video tools — from capture to color grade to final export.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.heliosprocamera.studio/" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  Visit Website
                </Button>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.helioscam.app&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Get on Google Play
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00B3B3]/20 via-[#FF6A00]/20 to-[#00B3B3]/20 rounded-3xl blur-3xl" />
            <GlowCard glowColor="teal" className="relative z-10 h-full flex items-center justify-center bg-[#0D1230]">
              <img src="/helios-logo.png" alt="Helios Logo" className="w-full max-w-[320px] aspect-square object-contain rounded-3xl" />
            </GlowCard>
          </motion.div>
        </div>
      </Section>

      {/* What We Build */}
      <Section background="gradient">
        <SectionHeader
          title="What We Build"
          subtitle="A complete creative workflow from capture to export."
          centered
        />

        <StaggerGrid cols={3}>
          <FeatureCard
            icon={<Camera className="w-8 h-8 text-[#00B3B3]" />}
            title="Helios Camera"
            description="Our flagship Android camera app with manual controls, RAW capture, and pro video modes."
          />
          <FeatureCard
            icon={<Palette className="w-8 h-8 text-[#FF6A00]" />}
            title="Helios Studio"
            description="Professional color grading and video encoding tool for filmmakers and content creators."
          />
          <FeatureCard
            icon={<Film className="w-8 h-8 text-[#00B3B3]" />}
            title="RAW Processing"
            description="Full RAW image pipeline with non-destructive editing and professional export options."
          />
          <FeatureCard
            icon={<Video className="w-8 h-8 text-[#FF6A00]" />}
            title="Video Encoding"
            description="Hardware-accelerated video encoding with support for H.265, ProRes, and more."
          />
          <FeatureCard
            icon={<Aperture className="w-8 h-8 text-[#00B3B3]" />}
            title="Manual Controls"
            description="Full manual exposure, focus peaking, histogram, zebra stripes, and waveform monitors."
          />
          <FeatureCard
            icon={<MonitorPlay className="w-8 h-8 text-[#FF6A00]" />}
            title="LUT Support"
            description="Import and apply custom LUTs for consistent color grading across your projects."
          />
        </StaggerGrid>
      </Section>

      {/* Tech Stack */}
      <Section>
        <SectionHeader title="Tech Stack" centered />
        
        <StaggerGrid cols={4} gap="gap-6" className="max-w-5xl mx-auto">
          {[
            'Kotlin', 'Android SDK', 'Camera2 API', 'FFmpeg',
            'OpenGL ES', 'Jetpack Compose', 'MediaCodec', 'ExoPlayer',
            'React', 'TypeScript', 'Electron', 'Rust'
          ].map((tech) => (
            <div key={tech} className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:border-[#00B3B3]/50 transition-colors">
              <span className="text-[#F5F5F5]">{tech}</span>
            </div>
          ))}
        </StaggerGrid>
      </Section>

      {/* Development Process */}
      <Section background="gradient">
        <SectionHeader title="Development Workflow" centered />
        
        <StaggerGrid cols={3} className="max-w-5xl mx-auto">
          {[
            { title: 'Capture', description: 'Shoot with Helios Camera using full manual controls and RAW' },
            { title: 'Grade', description: 'Import into Helios Studio for professional color grading' },
            { title: 'Export', description: 'Encode and export in any format with hardware acceleration' },
          ].map((phase, index) => (
            <GlowCard key={phase.title} glowColor="teal" className="text-center h-full">
              <div className="text-5xl mb-4 bg-gradient-to-r from-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl mb-3 text-[#F5F5F5]">{phase.title}</h3>
              <p className="text-[#F5F5F5]/60">{phase.description}</p>
            </GlowCard>
          ))}
        </StaggerGrid>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">
            Ready to level up your creative workflow?
          </h2>
          <p className="text-xl text-[#F5F5F5]/60 mb-8">
            Try Helios Camera and Helios Studio — open source and free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.heliosprocamera.studio/" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                Visit Website
              </Button>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.helioscam.app&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                Get on Google Play
              </Button>
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
