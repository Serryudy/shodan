/**
 * ScrollReveal — Scroll-triggered reveal using Intersection Observer.
 *
 * Uses motion/react's useInView (backed by IntersectionObserver) for
 * efficient, 60 fps scroll-entry animations. Supports all variants
 * from animations.ts and fully respects prefers-reduced-motion.
 *
 * @example
 * <ScrollReveal>
 *   <p>Animates in when this scrolls into view.</p>
 * </ScrollReveal>
 *
 * @example
 * <ScrollReveal variant="slideRight" delay={0.3} threshold={0.2}>
 *   <img src="..." />
 * </ScrollReveal>
 */

import { motion, useInView, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { animationVariants, safeVariant } from '../../lib/animations';
import type { AnimationVariantName } from '../../lib/animations';

export interface ScrollRevealProps {
  children: ReactNode;
  /** Named variant from animations.ts (default: 'fadeUp') */
  variant?: AnimationVariantName;
  /** Custom Variants override */
  customVariants?: Variants;
  /** Delay before the visible transition begins (seconds) */
  delay?: number;
  /** Duration override (seconds) */
  duration?: number;
  /** Intersection threshold 0–1 (default: 0.15) */
  threshold?: number;
  /** Root margin for IntersectionObserver (default: '-60px') */
  rootMargin?: string;
  /** Animate only the first time (default: true) */
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  customVariants,
  delay,
  duration,
  threshold = 0.15,
  rootMargin = '-60px',
  once = true,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // useInView wraps IntersectionObserver — no scroll listener, 60 fps safe
  const isInView = useInView(ref, {
    once,
    margin: rootMargin as `${number}px`,
    amount: threshold,
  });

  // Resolve and optionally patch variants
  let resolvedVariants: Variants =
    customVariants ?? animationVariants[variant] ?? animationVariants.fadeUp;

  if (shouldReduceMotion) {
    resolvedVariants = safeVariant(resolvedVariants);
  } else if (delay !== undefined || duration !== undefined) {
    const visible = resolvedVariants.visible;
    if (visible && typeof visible === 'object' && !Array.isArray(visible)) {
      const existingTransition =
        (visible as Record<string, unknown>).transition as Record<string, unknown> | undefined;
      resolvedVariants = {
        ...resolvedVariants,
        visible: {
          ...visible,
          transition: {
            ...existingTransition,
            ...(delay !== undefined && { delay }),
            ...(duration !== undefined && { duration }),
          },
        },
      };
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

/**
 * useScrollReveal — raw hook for custom scroll-reveal logic.
 * Returns { ref, isInView } — attach ref to your element.
 *
 * @example
 * const { ref, isInView } = useScrollReveal({ threshold: 0.2 });
 * return <div ref={ref} style={{ opacity: isInView ? 1 : 0 }}>...</div>
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '-60px',
  once = true,
}: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: rootMargin as `${number}px`,
    amount: threshold,
  });
  return { ref, isInView };
}
