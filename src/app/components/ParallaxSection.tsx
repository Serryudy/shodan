/**
 * ParallaxSection — Smooth parallax depth effects backed by Framer Motion's
 * useScroll + useTransform. Zero scroll listeners — driven by the browser's
 * Intersection Observer and requestAnimationFrame.
 *
 * Exports:
 * - ParallaxSection - full section with a parallaxing background layer
 * - ParallaxElement - wraps any child element with an offset scroll translation
 * - useParallax     - raw hook for custom parallax transforms
 *
 * All effects are disabled automatically when prefers-reduced-motion is set.
 *
 * @example – section with parallax background
 * <ParallaxSection
 *   backgroundContent={<div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/10 to-transparent" />}
 *   speed={0.4}
 * >
 *   <h1>Content stays fixed, background drifts</h1>
 * </ParallaxSection>
 *
 * @example – floating element
 * <ParallaxElement speed={0.25} direction="up">
 *   <img src="..." />
 * </ParallaxElement>
 */

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { useRef, type ReactNode, type CSSProperties } from 'react';

// ─── useParallax Hook ─────────────────────────────────────────────────────────

/**
 * Low-level parallax hook.
 * @param speed - 0 = no movement, 1 = moves 1:1 with scroll (default: 0.3)
 * @param direction - 'up' moves opposite scroll, 'down' moves with scroll
 */
export function useParallax(
  speed: number = 0.3,
  direction: 'up' | 'down' = 'up',
) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -speed * 200 : speed * 200;

  // Raw y, spring-smoothed for 60 fps feel
  const yRaw = useTransform(scrollYProgress, [0, 1], [multiplier, -multiplier]);
  const y = useSpring(yRaw, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
    restDelta: 0.001,
  });

  return {
    ref,
    y: shouldReduceMotion ? 0 : y,
  };
}

// ─── ParallaxElement ──────────────────────────────────────────────────────────

export interface ParallaxElementProps {
  children: ReactNode;
  /** Parallax intensity 0–1 (default: 0.25) */
  speed?: number;
  /** Movement direction relative to scroll (default: 'up') */
  direction?: 'up' | 'down';
  className?: string;
  style?: CSSProperties;
}

export function ParallaxElement({
  children,
  speed = 0.25,
  direction = 'up',
  className,
  style,
}: ParallaxElementProps) {
  const { ref, y } = useParallax(speed, direction);

  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── ParallaxSection ─────────────────────────────────────────────────────────

export interface ParallaxSectionProps {
  children: ReactNode;
  /** Element rendered as the parallax background (position: absolute, overflow clipped) */
  backgroundContent?: ReactNode;
  /** How fast the background moves — 0 = none, 1 = full (default: 0.35) */
  speed?: number;
  /** Class applied to the section wrapper */
  className?: string;
  /** Class applied to the foreground content layer (default: 'relative z-10') */
  contentClassName?: string;
  /** Min height of the section (default: 'min-h-[60vh]') */
  minHeight?: string;
}

export function ParallaxSection({
  children,
  backgroundContent,
  speed = 0.35,
  className,
  contentClassName = 'relative z-10',
  minHeight = 'min-h-[60vh]',
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgMultiplier = speed * 150;
  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [bgMultiplier, -bgMultiplier],
  );
  const y = useSpring(yRaw, {
    stiffness: 55,
    damping: 22,
    mass: 0.9,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${minHeight} ${className ?? ''}`}
    >
      {/* Parallax background layer */}
      {backgroundContent && (
        <motion.div
          className="absolute inset-[-15%] will-change-transform"
          style={{ y: shouldReduceMotion ? 0 : y }}
          aria-hidden="true"
        >
          {backgroundContent}
        </motion.div>
      )}

      {/* Foreground — no parallax, stays with the document flow */}
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

// ─── ParallaxBackground ──────────────────────────────────────────────────────

/**
 * Lightweight version — no section layout, just wraps a background element.
 * Useful inside existing Section wrappers.
 *
 * @example
 * <Section className="relative">
 *   <ParallaxBackground speed={0.4}>
 *     <AnimatedGrid />
 *   </ParallaxBackground>
 *   <YourContent />
 * </Section>
 */
export interface ParallaxBackgroundProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxBackground({
  children,
  speed = 0.3,
  className = 'absolute inset-0 pointer-events-none',
}: ParallaxBackgroundProps) {
  const { ref, y } = useParallax(speed, 'up');

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
