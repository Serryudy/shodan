import { motion, useReducedMotion, useAnimate } from 'motion/react';
import { ReactNode } from 'react';
import { easings, transitions } from '../../lib/animations';

// ─── Per-colour tokens ───────────────────────────────────────────────────────

const GLOW = {
  orange: {
    border:  'rgba(255,106,0,0.6)',
    shadow:  '0 8px 32px rgba(0,0,0,0.5), 0 0 48px rgba(255,106,0,0.32), 0 0 0 1px rgba(255,106,0,0.45)',
    inner:   'radial-gradient(ellipse at 50% -10%, rgba(255,106,0,0.2) 0%, transparent 68%)',
    ripple:  'radial-gradient(circle, rgba(255,106,0,0.5) 0%, transparent 72%)',
  },
  teal: {
    border:  'rgba(0,179,179,0.6)',
    shadow:  '0 8px 32px rgba(0,0,0,0.5), 0 0 48px rgba(0,179,179,0.32), 0 0 0 1px rgba(0,179,179,0.45)',
    inner:   'radial-gradient(ellipse at 50% -10%, rgba(0,179,179,0.2) 0%, transparent 68%)',
    ripple:  'radial-gradient(circle, rgba(0,179,179,0.5) 0%, transparent 72%)',
  },
  both: {
    border:  'rgba(255,106,0,0.45)',
    shadow:  '0 8px 32px rgba(0,0,0,0.5), 0 0 55px rgba(255,106,0,0.22), 0 0 80px rgba(0,179,179,0.18)',
    inner:   'radial-gradient(ellipse at 50% -10%, rgba(255,106,0,0.14) 0%, rgba(0,179,179,0.1) 55%, transparent 72%)',
    ripple:  'radial-gradient(circle, rgba(255,106,0,0.3) 0%, rgba(0,179,179,0.3) 55%, transparent 70%)',
  },
  none: {
    border:  'rgba(255,255,255,0.22)',
    shadow:  '0 8px 32px rgba(0,0,0,0.5)',
    inner:   '',
    ripple:  'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 72%)',
  },
} as const;

const BASE_SHADOW = '0 4px 20px rgba(0,0,0,0.35)';

// ─── Inner glow + shimmer variants ──────────────────────────────────────────

const innerGlowVariants = {
  rest:  { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] } },
};

interface GlowCardProps {
  children: ReactNode;
  glowColor?: 'orange' | 'teal' | 'both' | 'none';
  /** Lift distance in px on hover (default: 6) */
  liftPx?: number;
  /** Show animated gradient border shimmer on hover */
  borderShimmer?: boolean;
  className?: string;
  onClick?: () => void;
}

export function GlowCard({
  children,
  glowColor = 'both',
  liftPx = 6,
  borderShimmer = false,
  className = '',
  onClick,
}: GlowCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [rippleRef, animateRipple] = useAnimate();
  const glow = GLOW[glowColor];

  const handlePointerDown = () => {
    if (shouldReduceMotion) return;
    animateRipple(rippleRef.current, {
      scale: [0.15, 2.8],
      opacity: [0.7, 0],
    }, {
      duration: 0.52,
      ease: [0.2, 0, 0.38, 1],
    });
    onClick?.();
  };

  return (
    <motion.div
      onPointerDown={handlePointerDown}
      className={`relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-sm overflow-hidden ${className}`}
      style={{ willChange: 'transform', boxShadow: BASE_SHADOW }}
      initial="rest"
      whileHover={
        shouldReduceMotion
          ? 'rest'
          : 'hover'
      }
      animate="rest"
      variants={{
        rest:  { y: 0, borderColor: 'rgba(255,255,255,0.1)', boxShadow: BASE_SHADOW },
        hover: {
          y: -liftPx,
          borderColor: glow.border,
          boxShadow: glow.shadow,
          transition: transitions.spring,
        },
      }}
      whileTap={shouldReduceMotion ? {} : {
        scale: 0.972,
        transition: transitions.springSnappy,
      }}
    >
      {/* Inner light gradient — fades in on hover */}
      {glow.inner && (
        <motion.div
          variants={innerGlowVariants}
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: glow.inner }}
        />
      )}

      {/* Ripple glow — triggered on click */}
      <motion.div
        ref={rippleRef}
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: glow.ripple, scale: 0, opacity: 0 }}
      />

      {/* Border shimmer sweep */}
      {borderShimmer && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)',
          }}
          variants={{
            rest:  { x: '-100%' },
            hover: { x: '200%', transition: { duration: 0.65, ease: easings.easeOutQuart } },
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className = '' }: FeatureCardProps) {
  return (
    <GlowCard className={className}>
      <div className="flex flex-col items-start gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF6A00]/20 to-[#00B3B3]/20 border border-[#FF6A00]/30">
          {icon}
        </div>
        <h3 className="text-xl text-[#F5F5F5]">{title}</h3>
        <p className="text-[#F5F5F5]/60 leading-relaxed">{description}</p>
      </div>
    </GlowCard>
  );
}

interface LabModuleCardProps {
  title: string;
  description: string;
  status?: string;
  onClick?: () => void;
  className?: string;
}

export function LabModuleCard({ 
  title, 
  description, 
  status = 'Experimental', 
  onClick, 
  className = '' 
}: LabModuleCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [rippleRef, animateRipple] = useAnimate();
  const glow = GLOW.teal;

  const handlePointerDown = () => {
    if (shouldReduceMotion) return;
    animateRipple(rippleRef.current, {
      scale: [0.15, 2.8],
      opacity: [0.7, 0],
    }, {
      duration: 0.52,
      ease: [0.2, 0, 0.38, 1],
    });
    onClick?.();
  };

  return (
    <motion.div
      onPointerDown={handlePointerDown}
      className={`relative bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-[#00B3B3]/30 rounded-xl p-6 cursor-pointer overflow-hidden ${className}`}
      style={{ willChange: 'transform', boxShadow: BASE_SHADOW }}
      initial="rest"
      whileHover={shouldReduceMotion ? 'rest' : 'hover'}
      animate="rest"
      variants={{
        rest:  { y: 0, borderColor: 'rgba(0,179,179,0.3)', boxShadow: BASE_SHADOW },
        hover: {
          y: -6,
          borderColor: glow.border,
          boxShadow: glow.shadow,
          transition: transitions.spring,
        },
      }}
      whileTap={shouldReduceMotion ? {} : {
        scale: 0.972,
        transition: transitions.springSnappy,
      }}
    >
      {/* Inner light gradient */}
      <motion.div
        variants={innerGlowVariants}
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{ background: glow.inner }}
      />

      {/* Ripple glow */}
      <motion.div
        ref={rippleRef}
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{ background: glow.ripple, scale: 0, opacity: 0 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg text-[#F5F5F5]">{title}</h3>
          <span className="px-2 py-1 text-xs rounded-md bg-[#00B3B3]/20 text-[#00B3B3] border border-[#00B3B3]/30">
            {status}
          </span>
        </div>
        <p className="text-sm text-[#F5F5F5]/60 mb-4">{description}</p>
        <motion.div
          className="text-sm text-[#00B3B3]"
          variants={{ rest: { color: 'rgb(0,179,179)' }, hover: { color: 'rgb(255,106,0)', transition: { duration: 0.2 } } }}
        >
          Try Experiment →
        </motion.div>
      </div>
    </motion.div>
  );
}

interface ContentCardProps {
  children: ReactNode;
  className?: string;
}

export function ContentCard({ children, className = '' }: ContentCardProps) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}
