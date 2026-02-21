/**
 * MotionWrapper — Generic animated wrapper driven by the central variant library.
 *
 * Supports:
 * - All named variants from src/lib/animations.ts
 * - Custom override variants via `variants` prop
 * - Per-instance delay and duration overrides
 * - Viewport (whileInView) or immediate (animate) trigger modes
 * - prefers-reduced-motion auto-collapse
 *
 * @example
 * <MotionWrapper variant="fadeUp" delay={0.2}>
 *   <p>Hello</p>
 * </MotionWrapper>
 *
 * @example
 * <MotionWrapper variant="staggerChildren" trigger="immediate">
 *   <MotionWrapper variant="fadeUp"><p>Item 1</p></MotionWrapper>
 *   <MotionWrapper variant="fadeUp"><p>Item 2</p></MotionWrapper>
 * </MotionWrapper>
 */

import { motion, useReducedMotion } from 'motion/react';
import type { Variants, HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';
import { animationVariants, safeVariant } from '../../lib/animations';
import type { AnimationVariantName } from '../../lib/animations';

export interface MotionWrapperProps
  extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'animate' | 'exit' | 'whileInView'> {
  children: ReactNode;
  /** Named variant from animations.ts, or pass a custom Variants object via `customVariants` */
  variant?: AnimationVariantName;
  /** Override with a fully custom Variants object */
  customVariants?: Variants;
  /** When to trigger: 'viewport' uses whileInView, 'immediate' uses animate (default: 'viewport') */
  trigger?: 'viewport' | 'immediate';
  /** Delay in seconds added on top of the variant's own transition delay */
  delay?: number;
  /** Override the variant's duration (seconds) */
  duration?: number;
  /** Viewport margin before trigger fires (default: '-80px') */
  viewportMargin?: string;
  /** Only animate once when scrolling into view (default: true) */
  once?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function MotionWrapper({
  children,
  variant = 'fadeUp',
  customVariants,
  trigger = 'viewport',
  delay,
  duration,
  viewportMargin = '-80px',
  once = true,
  className,
  ...rest
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  // Resolve variant (custom → named → fallback)
  let resolvedVariants: Variants =
    customVariants ?? animationVariants[variant] ?? animationVariants.fadeUp;

  // Respect prefers-reduced-motion
  if (shouldReduceMotion) {
    resolvedVariants = safeVariant(resolvedVariants);
  }

  // Apply delay/duration overrides by patching visible.transition
  if ((delay !== undefined || duration !== undefined) && !shouldReduceMotion) {
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

  if (trigger === 'viewport') {
    return (
      <motion.div
        className={className}
        variants={resolvedVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once, margin: viewportMargin }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...rest}
    >
      {children}
    </motion.div>
  );
}
