import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useScroll } from 'motion/react';
import { Button } from '../components/Button';
import { Section, SectionHeader } from '../components/Section';
import { FeatureCard, GlowCard, LabModuleCard } from '../components/Card';
import { StaggerGrid } from '../components/StaggerContainer';
import { Link } from 'react-router';
import { useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Code2, 
  Zap, 
  Users, 
  Layers, 
  Rocket,
  Brain,
  Cpu,
  Workflow,
  Camera,
  Palette,
  Mic,
  TrendingUp,
  Heart
} from 'lucide-react';

// ─── Cinematic easing (matches animations.ts catalogue) ──────────────────────
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const QUART_OUT = [0.25, 1, 0.5, 1] as const;

// ─── Headline word-by-word stagger ───────────────────────────────────────────
const HEADLINE_LINE: { text: string; gradient?: boolean }[] = [
  { text: 'Build What' },
  { text: 'Matters.', gradient: true },
];

function HeroWord({
  text,
  gradient,
  index,
}: {
  text: string;
  gradient?: boolean;
  index: number;
}) {
  return (
    <motion.span
      className={`block ${
        gradient
          ? 'bg-gradient-to-r from-[#FF6A00] via-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent'
          : 'text-[#F5F5F5]'
      }`}
      // Clip-reveal: overflow hidden on parent, span slides up from below
      initial={{ y: '108%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.35 + index * 0.18,
        ease: EXPO_OUT,
      }}
    >
      {text}
    </motion.span>
  );
}

// ─── Layered Scroll Parallax Background ─────────────────────────────────────
//
// Three independent depth planes driven by global scrollYProgress.
// Rendered as a fixed overlay (z-index -1) so they sit behind all page content.
// Each plane has a different spring stiffness so they "peel" at different rates.
//
//  Background  → slowest (far depth)  → max 40 px drift
//  Mid         → medium               → max 24 px drift
//  Foreground  → fastest (near depth) → max 12 px drift

function HomeParallaxLayers() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Raw transforms — full-page scroll range mapped to pixel offsets
  const bgY  = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), { stiffness: 35, damping: 28, mass: 1.2 });
  const midY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -24]), { stiffness: 50, damping: 24, mass: 1.0 });
  const fgY  = useSpring(useTransform(scrollYProgress, [0, 1], [0, -12]), { stiffness: 70, damping: 20, mass: 0.8 });

  if (shouldReduceMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* ── Background layer: wide ambient hazes (slow, far away) ─────── */}
      <motion.div className="absolute inset-0" style={{ y: bgY, willChange: 'transform' }}>
        {/* Top-left orange haze */}
        <div className="absolute opacity-[0.08]" style={{
          top: '5%', left: '-10%', width: 900, height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FF6A00 0%, transparent 70%)',
          filter: 'blur(130px)',
        }} />
        {/* Centre-right teal haze */}
        <div className="absolute opacity-[0.07]" style={{
          top: '48%', right: '-12%', width: 800, height: 650,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #00B3B3 0%, transparent 70%)',
          filter: 'blur(140px)',
        }} />
        {/* Lower-page orange haze */}
        <div className="absolute opacity-[0.06]" style={{
          top: '80%', left: '25%', width: 700, height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FF6A00 0%, transparent 70%)',
          filter: 'blur(120px)',
        }} />
      </motion.div>

      {/* ── Mid layer: atmospheric lines + scattered mid-glow dots ───────── */}
      <motion.div className="absolute inset-0" style={{ y: midY, willChange: 'transform' }}>
        {/* Gradient separator lines at third-page intervals */}
        <div className="absolute left-0 right-0 opacity-[0.05]" style={{
          top: '33%', height: 1,
          background: 'linear-gradient(90deg, transparent 0%, #00B3B3 30%, #FF6A00 70%, transparent 100%)',
        }} />
        <div className="absolute left-0 right-0 opacity-[0.04]" style={{
          top: '66%', height: 1,
          background: 'linear-gradient(90deg, transparent 0%, #FF6A00 40%, #00B3B3 60%, transparent 100%)',
        }} />
        {/* Atmospheric glow dots */}
        {([
          { top: '18%', left: '15%', w: 80,  color: 'rgba(0,179,179,0.22)',  blur: 18 },
          { top: '32%', left: '82%', w: 60,  color: 'rgba(255,106,0,0.18)', blur: 14 },
          { top: '53%', left: '44%', w: 100, color: 'rgba(0,179,179,0.14)', blur: 22 },
          { top: '72%', left: '22%', w: 70,  color: 'rgba(255,106,0,0.16)', blur: 16 },
          { top: '88%', left: '70%', w: 80,  color: 'rgba(0,179,179,0.18)', blur: 18 },
        ] as const).map((d, i) => (
          <div key={i} className="absolute rounded-full" style={{
            top: d.top, left: d.left, width: d.w, height: d.w,
            transform: 'translate(-50%, -50%)',
            background: d.color,
            filter: `blur(${d.blur}px)`,
          }} />
        ))}
      </motion.div>

      {/* ── Foreground layer: crisp glint dots (fast, nearest depth) ──────── */}
      <motion.div className="absolute inset-0" style={{ y: fgY, willChange: 'transform' }}>
        {([
          { top: '28%', left: '93%', r: 4, color: 'rgba(255,106,0,0.55)' },
          { top: '42%', left:  '6%', r: 3, color: 'rgba(0,179,179,0.5)'  },
          { top: '61%', left: '79%', r: 5, color: 'rgba(255,106,0,0.4)'  },
          { top: '77%', left: '33%', r: 3, color: 'rgba(0,179,179,0.45)' },
          { top: '14%', left: '57%', r: 4, color: 'rgba(255,106,0,0.35)' },
        ] as const).map((d, i) => (
          <div key={i} className="absolute rounded-full" style={{
            top: d.top, left: d.left,
            width: d.r * 2, height: d.r * 2,
            transform: 'translate(-50%, -50%)',
            background: d.color,
            filter: `blur(${d.r}px)`,
            boxShadow: `0 0 ${d.r * 6}px ${d.color}`,
          }} />
        ))}
      </motion.div>
    </div>
  );
}

export function Home() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  // ── Mouse parallax ───────────────────────────────────────────────────────
  // Raw mouse position [–0.5 … 0.5] relative to viewport centre
  const rawMX = useMotionValue(0);
  const rawMY = useMotionValue(0);

  // Spring-smoothed — loose feel, 60 fps safe
  const mx = useSpring(rawMX, { stiffness: 60, damping: 20, mass: 0.8 });
  const my = useSpring(rawMY, { stiffness: 60, damping: 20, mass: 0.8 });

  // Map [–0.5 … 0.5] → pixel offsets  (max ±10 px for content, ±18 px for orb)
  const contentX = useTransform(mx, [-0.5, 0.5], [-10, 10]);
  const contentY = useTransform(my, [-0.5, 0.5], [-10, 10]);
  const orbX     = useTransform(mx, [-0.5, 0.5], [-18, 18]);
  const orbY     = useTransform(my, [-0.5, 0.5], [-18, 18]);
  // Counter-move the bg orb for depth
  const bgOrbX   = useTransform(mx, [-0.5, 0.5], [14, -14]);
  const bgOrbY   = useTransform(my, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = heroRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      rawMX.set((e.clientX / window.innerWidth)  - 0.5);
      rawMY.set((e.clientY / window.innerHeight) - 0.5);
    };
    const onLeave = () => {
      rawMX.set(0);
      rawMY.set(0);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [rawMX, rawMY, shouldReduceMotion]);

  return (
    <div className="relative">
      {/* Layered scroll parallax — fixed behind all content */}
      <HomeParallaxLayers />

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <Section className="min-h-[90vh] flex items-center relative overflow-hidden" animate={false}>
        <div ref={heroRef} className="contents">

        {/* ── Background: two drifting gradient orbs ───────────────────── */}
        {/* Primary orb — orange/teal, slow breathe + parallax */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[680px] h-[680px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255,106,0,0.22) 0%, rgba(0,179,179,0.13) 45%, transparent 70%)',
            filter: 'blur(90px)',
            x: bgOrbX,
            y: bgOrbY,
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale:   [1, 1.18, 1],
                  opacity: [0.18, 0.28, 0.18],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Secondary orb — teal, mirror movement, slower */}
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(0,179,179,0.18) 0%, rgba(255,106,0,0.08) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale:   [1, 1.14, 1],
                  opacity: [0.14, 0.24, 0.14],
                  x:       [0, 40, 0],
                  y:       [0, -30, 0],
                }
          }
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* ── Grid content ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* ── Left: Text content — each element has its own entrance ── */}
          <motion.div style={shouldReduceMotion ? {} : { x: contentX, y: contentY }}>

            {/* Badge pill */}
            <motion.div
              className="inline-block mb-6 px-4 py-2 rounded-full border border-[#00B3B3]/30 bg-[#00B3B3]/10"
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: QUART_OUT }}
            >
              <span className="inline-flex items-center gap-2 text-sm text-[#00B3B3]"><Rocket className="w-4 h-4" /> Building the Future</span>
            </motion.div>

            {/* Headline — each line clips up from below */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-6 leading-tight overflow-hidden">
              {HEADLINE_LINE.map((line, i) => (
                <div key={i} className="overflow-hidden leading-[1.08]">
                  <HeroWord text={line.text} gradient={line.gradient} index={i} />
                </div>
              ))}
            </h1>

            {/* Subheading */}
            <motion.p
              className="text-xl md:text-2xl text-[#F5F5F5]/60 mb-8 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.72, ease: EXPO_OUT }}
            >
              We create cutting-edge camera technology, AI-powered tools, and open-source platforms for creators who dare to innovate.
            </motion.p>

            {/* CTA buttons — staggered scale-in with bounce */}
            <div className="flex flex-wrap gap-4">
              {[
                { to: '/solutions', label: 'Explore Solutions', variant: 'primary'  as const },
                { to: '/lab',       label: 'Visit the Lab',     variant: 'secondary' as const },
              ].map(({ to, label, variant }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, scale: 0.82, y: 12 }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.92 + i * 0.13,
                    ease: [0.34, 1.56, 0.64, 1], // easeOutBack — slight bounce
                  }}
                >
                  <Link to={to}>
                    <Button variant={variant} size="lg">{label}</Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: 3D orb placeholder ─────────────────────────────── */}
          <motion.div
            className="relative h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EXPO_OUT }}
            style={shouldReduceMotion ? {} : { x: orbX, y: orbY }}
          >
            {/* Outer faint glow shell */}
            <motion.div
              className="absolute w-[440px] h-[440px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,106,0,0.12) 0%, rgba(0,179,179,0.08) 50%, transparent 70%)',
                filter: 'blur(48px)',
              }}
              animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating wrapper: vertical bob (independent of parallax) */}
            <motion.div
              className="relative w-[380px] h-[380px]"
              animate={
                shouldReduceMotion
                  ? {}
                  : { y: [0, -18, 0] }
              }
              transition={{ duration: 5.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            >
              {/* Slow-spin outer dashed ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 rounded-full border border-dashed border-[#FF6A00]/25" />
              </motion.div>

              {/* Counter-spin middle ring */}
              <motion.div
                className="absolute inset-[36px] rounded-full"
                animate={shouldReduceMotion ? {} : { rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 rounded-full border border-[#00B3B3]/30" />
                {/* Teal travelling dot on the ring */}
                <motion.div
                  className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-[#00B3B3]"
                  style={{
                    boxShadow: '0 0 8px 3px rgba(0,179,179,0.8)',
                  }}
                />
              </motion.div>

              {/* Inner core */}
              <div className="absolute inset-[72px] rounded-full bg-gradient-to-br from-[#FF6A00]/18 to-[#00B3B3]/18 backdrop-blur-2xl border border-white/10">
                {/* Pulsing core glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(0,179,179,0.35) 0%, rgba(255,106,0,0.2) 60%, transparent 80%)',
                  }}
                  animate={shouldReduceMotion ? {} : { opacity: [0.5, 1, 0.5], scale: [0.9, 1.06, 0.9] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Orange travelling dot — outer ring, opposite direction */}
              <motion.div
                className="absolute top-[calc(50%-5px)] -left-[5px] w-[10px] h-[10px] rounded-full bg-[#FF6A00]"
                style={{
                  boxShadow: '0 0 8px 3px rgba(255,106,0,0.8)',
                  originX: '195px',
                  originY: '5px',
                }}
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>

        </div>
        </div>{/* end heroRef wrapper */}
      </Section>

      <Section background="gradient">
        <SectionHeader
          title="Our Philosophy"
          subtitle="We believe technology should amplify human potential, not complicate it."
          centered
        />

        <StaggerGrid cols={3}>
          <FeatureCard
            icon={<Users className="w-8 h-8 text-[#FF6A00]" />}
            title="Empower People"
            description="We build tools that put power back in the hands of creators and innovators."
          />
          <FeatureCard
            icon={<Layers className="w-8 h-8 text-[#00B3B3]" />}
            title="Simplify Complexity"
            description="Complex problems deserve elegant solutions. We strip away the noise."
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-[#FF6A00]" />}
            title="Open Innovation"
            description="The best ideas come from collaboration. We build in the open, for everyone."
          />
        </StaggerGrid>
      </Section>

      {/* What We Build Section */}
      <Section>
        <SectionHeader
          title="What We Build"
          subtitle="Cutting-edge solutions for the modern builder."
          centered
        />

        <StaggerGrid cols={3}>
          <Link to="/solutions/software">
            <GlowCard glowColor="orange" className="h-full cursor-pointer group">
              <div className="mb-6 rounded-2xl bg-[#0D1230] inline-block overflow-hidden">
                <img src="/helios-logo.png" alt="Helios Logo" className="w-16 h-16 object-cover" />
              </div>
              <h3 className="text-2xl mb-4 text-[#F5F5F5]">Helios Camera</h3>
              <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed">
                Our flagship Android camera app — professional-grade photography and videography in your pocket.
              </p>
              <div className="text-[#FF6A00] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Learn More <Rocket className="w-4 h-4" />
              </div>
            </GlowCard>
          </Link>

          <Link to="/solutions/ai">
            <GlowCard glowColor="teal" className="h-full cursor-pointer group">
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#00B3B3]/20 to-[#00B3B3]/5 inline-block">
                <Brain className="w-12 h-12 text-[#00B3B3]" />
              </div>
              <h3 className="text-2xl mb-4 text-[#F5F5F5]">AI-Powered Tools</h3>
              <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed">
                From intelligent note-taking to OS-level voice agents — AI that works the way you think.
              </p>
              <div className="text-[#00B3B3] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Learn More <Rocket className="w-4 h-4" />
              </div>
            </GlowCard>
          </Link>

          <Link to="/solutions/automation">
            <GlowCard glowColor="both" className="h-full cursor-pointer group">
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#FF6A00]/20 via-[#00B3B3]/20 to-[#FF6A00]/5 inline-block">
                <TrendingUp className="w-12 h-12 text-[#FF6A00]" />
              </div>
              <h3 className="text-2xl mb-4 text-[#F5F5F5]">Open Source Platforms</h3>
              <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed">
                Algorithmic crypto trading, creative tools, and more — built openly for the community.
              </p>
              <div className="text-[#FF6A00] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Learn More <Rocket className="w-4 h-4" />
              </div>
            </GlowCard>
          </Link>
        </StaggerGrid>
      </Section>

      {/* Lab Preview Section */}
      <Section background="darker">
        <SectionHeader
          title="The Lab"
          subtitle="Where we experiment with the future. Try our latest prototypes and experiments."
          centered
        />

        <StaggerGrid cols={4} gap="gap-6">
          <LabModuleCard
            title="Helios Camera"
            description="Pro Android camera app with RAW support"
            status="Beta"
          />
          <LabModuleCard
            title="Helios Studio"
            description="Color grading & video encoding suite"
            status="Alpha"
          />
          <LabModuleCard
            title="AI Note App"
            description="Knowledge-based intelligent note-taking"
            status="Beta"
          />
          <LabModuleCard
            title="Archon Agent"
            description="OS-level AI voice control for Arch Linux"
            status="Experimental"
          />
        </StaggerGrid>

        <div className="text-center mt-12">
          <Link to="/lab">
            <Button variant="secondary" size="lg">
              Explore All Experiments
            </Button>
          </Link>
        </div>
      </Section>

      {/* Open Source Highlight */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-[#00B3B3]/30 bg-[#00B3B3]/10">
              <Heart className="w-4 h-4 text-[#00B3B3]" />
              <span className="text-sm text-[#00B3B3]">Open Source</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">
              Built by the community,
              <span className="block bg-gradient-to-r from-[#FF6A00] to-[#00B3B3] bg-clip-text text-transparent">
                for the community.
              </span>
            </h2>
            <p className="text-lg text-[#F5F5F5]/60 mb-8 leading-relaxed">
              We believe in the power of open collaboration. All our core tools and frameworks are open source, 
              free to use, and built with the developer community.
            </p>
            <Link to="/open-source">
              <Button variant="secondary" size="lg">
                View Our Projects
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#1a1a1a] border border-[#00B3B3]/30 rounded-xl p-8 font-mono text-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#FF6A00]" />
                <div className="w-3 h-3 rounded-full bg-[#00B3B3]" />
                <div className="w-3 h-3 rounded-full bg-[#F5F5F5]/30" />
              </div>
              <div className="space-y-2 text-[#F5F5F5]/70">
                <div><span className="text-[#FF6A00]">import</span> {'{ BUILD }'} <span className="text-[#00B3B3]">from</span> <span className="text-[#00B3B3]">'@build/core'</span>;</div>
                <div className="pl-4 mt-4">
                  <div><span className="text-[#FF6A00]">const</span> app = <span className="text-[#00B3B3]">BUILD</span>.create({'{'}</div>
                  <div className="pl-4"><span className="text-[#F5F5F5]/50">ai:</span> <span className="text-[#00B3B3]">true</span>,</div>
                  <div className="pl-4"><span className="text-[#F5F5F5]/50">automation:</span> <span className="text-[#00B3B3]">true</span>,</div>
                  <div className="pl-4"><span className="text-[#F5F5F5]/50">scale:</span> <span className="text-[#00B3B3]">'infinite'</span></div>
                  <div>{'}'});</div>
                </div>
                <div className="mt-4">
                  <span className="text-[#F5F5F5]/50">// Ship with confidence</span>
                </div>
                <div><span className="text-[#00B3B3]">app</span>.launch();</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">
            Ready to build something amazing?
          </h2>
          <p className="text-xl text-[#F5F5F5]/60 mb-8">
            Let's create the future together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Start a Project
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" size="lg">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
