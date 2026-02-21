/**
 * StaggerContainer — Orchestrates staggered child animations.
 *
 * The container holds a `staggerChildren` variant that tells motion/react
 * to delay each immediate child's "visible" state by `staggerDelay` seconds.
 * Children should carry their own variant (fadeUp, scaleIn, etc.).
 *
 * Convenience wrappers `StaggerItem` and `StaggerGrid` are exported for
 * the most common patterns.
 *
 * @example – basic list
 * <StaggerContainer>
 *   {items.map(item => (
 *     <StaggerItem key={item.id}>
 *       <Card>{item.content}</Card>
 *     </StaggerItem>
 *   ))}
 * </StaggerContainer>
 *
 * @example – 3-column grid
 * <StaggerGrid cols={3}>
 *   {cards.map(c => <FeatureCard key={c.id} {...c} />)}
 * </StaggerGrid>
 */

import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import type { ReactNode, ElementType } from 'react';
import {
  animationVariants,
  safeVariant,
  easings,
} from '../../lib/animations';
import type { AnimationVariantName } from '../../lib/animations';

// ─── StaggerContainer ────────────────────────────────────────────────────────

export interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child entering (default: 0.11) */
  staggerDelay?: number;
  /** Delay before the first child starts (default: 0.08) */
  delayChildren?: number;
  /** Viewport margin before trigger fires (default: '-60px') */
  viewportMargin?: string;
  /** Animate once (default: true) */
  once?: boolean;
  /** Whether to trigger on scroll or immediately (default: 'viewport') */
  trigger?: 'viewport' | 'immediate';
  /** Custom tag / element type (default: 'div') */
  as?: ElementType;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.11,
  delayChildren = 0.08,
  viewportMargin = '-60px',
  once = true,
  trigger = 'viewport',
  as: Tag = 'div',
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = shouldReduceMotion
    ? { hidden: {}, visible: {}, exit: {} }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
        exit: {
          transition: {
            staggerChildren: staggerDelay * 0.5,
            staggerDirection: -1,
          },
        },
      };

  const MotionTag = motion(Tag as 'div');

  const commonProps = {
    className,
    variants: containerVariants,
    initial: 'hidden' as const,
    exit: 'exit' as const,
  };

  if (trigger === 'viewport') {
    return (
      <MotionTag
        {...commonProps}
        whileInView="visible"
        viewport={{ once, margin: viewportMargin }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag {...commonProps} animate="visible">
      {children}
    </MotionTag>
  );
}

// ─── StaggerItem ─────────────────────────────────────────────────────────────

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Animation variant for each item (default: 'fadeUp') */
  variant?: AnimationVariantName;
  /** Custom override variant */
  customVariants?: Variants;
}

export function StaggerItem({
  children,
  className,
  variant = 'fadeUp',
  customVariants,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  let resolvedVariants: Variants =
    customVariants ?? animationVariants[variant] ?? animationVariants.fadeUp;

  if (shouldReduceMotion) {
    resolvedVariants = safeVariant(resolvedVariants);
  }

  return (
    <motion.div className={className} variants={resolvedVariants}>
      {children}
    </motion.div>
  );
}

// ─── StaggerGrid ─────────────────────────────────────────────────────────────

export interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  /** Number of columns (generates Tailwind grid class, default: 3) */
  cols?: 1 | 2 | 3 | 4;
  /** Gap between cells (default: 'gap-8') */
  gap?: string;
  staggerDelay?: number;
  viewportMargin?: string;
  once?: boolean;
  itemVariant?: AnimationVariantName;
}

const COLS_CLASS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

export function StaggerGrid({
  children,
  className,
  cols = 3,
  gap = 'gap-8',
  staggerDelay = 0.09,
  viewportMargin = '-60px',
  once = true,
  itemVariant = 'fadeUp',
}: StaggerGridProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.06,
          },
        },
      };

  const itemVariants: Variants = shouldReduceMotion
    ? safeVariant(animationVariants[itemVariant])
    : animationVariants[itemVariant];

  // Wrap direct children in StaggerItem wrappers
  const wrappedChildren = Array.isArray(children)
    ? (children as ReactNode[]).map((child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))
    : <motion.div variants={itemVariants}>{children}</motion.div>;

  return (
    <motion.div
      className={`grid ${COLS_CLASS[cols]} ${gap} ${className ?? ''}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
    >
      {wrappedChildren}
    </motion.div>
  );
}

// ─── StaggerList ─────────────────────────────────────────────────────────────

export interface StaggerListProps {
  children: ReactNode;
  className?: string;
  as?: 'ul' | 'ol';
  staggerDelay?: number;
  itemVariant?: AnimationVariantName;
}

export function StaggerList({
  children,
  className,
  as: Tag = 'ul',
  staggerDelay = 0.1,
  itemVariant = 'fadeUp',
}: StaggerListProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.05 },
        },
      };

  const itemVariants: Variants = shouldReduceMotion
    ? safeVariant(animationVariants[itemVariant])
    : {
        ...animationVariants[itemVariant],
        visible: {
          ...(animationVariants[itemVariant].visible as object),
          transition: {
            duration: 0.55,
            ease: easings.easeOutExpo,
          },
        },
      };

  const MotionTag = Tag === 'ul' ? motion.ul : motion.ol;

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {Array.isArray(children)
        ? (children as ReactNode[]).map((child, i) => (
            <motion.li key={i} variants={itemVariants}>
              {child}
            </motion.li>
          ))
        : children}
    </MotionTag>
  );
}
