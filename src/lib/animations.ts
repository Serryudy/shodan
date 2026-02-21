/**
 * animations.ts — Centralised animation system
 *
 * All durations: 0.6–1 s  |  All easings: cubic-bezier
 * Snap prefers-reduced-motion: every variant has a "reduced" fallback
 * that collapses the animation to a 1-frame opacity fade.
 */

import type { Variants, Transition } from 'motion/react';

// ─── Cubic-Bezier Easing Catalogue ──────────────────────────────────────────

export const easings = {
  /** Decelerates sharply — great for elements flying in */
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  /** Smooth deceleration — general-purpose reveals */
  easeOutQuart: [0.25, 1, 0.5, 1] as const,
  /** Symmetric — page transitions and exits */
  easeInOutQuart: [0.76, 0, 0.24, 1] as const,
  /** Slight overshoot — icons, badges, scale-ins */
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
  /** Hard in, hard out — dramatic, purposeful moves */
  easeInOutCirc: [0.85, 0, 0.15, 1] as const,
  /** Anticipation curve — button presses */
  easeInBack: [0.36, 0, 0.66, -0.56] as const,
} as const;

// ─── Base Transitions ────────────────────────────────────────────────────────

export const transitions = {
  /** 0.7 s exponential — default for most reveals */
  smooth: {
    duration: 0.7,
    ease: easings.easeOutExpo,
  } satisfies Transition,
  /** 0.6 s quart — snappy but not cheap */
  medium: {
    duration: 0.6,
    ease: easings.easeOutQuart,
  } satisfies Transition,
  /** 1.0 s — hero headings, full-section reveals */
  slow: {
    duration: 1.0,
    ease: easings.easeOutExpo,
  } satisfies Transition,
  /** 0.4 s — exits, fast UI feedback */
  fast: {
    duration: 0.4,
    ease: easings.easeInOutQuart,
  } satisfies Transition,
  /** Natural spring — floating cards, hover lifts */
  spring: {
    type: 'spring',
    stiffness: 90,
    damping: 22,
    mass: 1.1,
  } satisfies Transition,
  /** Snappy spring — button presses, micro-interactions */
  springSnappy: {
    type: 'spring',
    stiffness: 350,
    damping: 30,
    mass: 0.75,
  } satisfies Transition,
  /** Bouncy spring — icons, badges */
  springBouncy: {
    type: 'spring',
    stiffness: 260,
    damping: 18,
    mass: 0.9,
  } satisfies Transition,
} as const;

// ─── prefers-reduced-motion Hook ────────────────────────────────────────────

/**
 * Returns true if the user has requested reduced motion.
 * Safe to call server-side (returns false).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns the full variant when motion is OK, or a
 * single-frame opacity variant that respects the user's
 * accessibility preference.
 */
export function safeVariant(variant: Variants): Variants {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
      exit: { opacity: 0, transition: { duration: 0.01 } },
    };
  }
  return variant;
}

// ─── Animation Variants ──────────────────────────────────────────────────────

/**
 * fadeUp — elements slide up while fading in.
 * Use for: cards, paragraphs, CTAs, most body content.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
      ease: easings.easeInOutQuart,
    },
  },
};

/**
 * fadeIn — pure opacity, no positional shift.
 * Use for: overlays, background layers, subtle imagery.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: easings.easeOutQuart,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: easings.easeInOutQuart,
    },
  },
};

/**
 * slideLeft — element enters from the right.
 * Use for: right-column content, "features" panels.
 */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 64 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    x: 32,
    transition: {
      duration: 0.4,
      ease: easings.easeInOutQuart,
    },
  },
};

/**
 * slideRight — element enters from the left.
 * Use for: left-column content, "about" sidebars.
 */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -64 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    x: -32,
    transition: {
      duration: 0.4,
      ease: easings.easeInOutQuart,
    },
  },
};

/**
 * scaleIn — element scales up from 88 % with fade.
 * Use for: modals, popovers, feature highlights, badges.
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: easings.easeOutBack,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: {
      duration: 0.3,
      ease: easings.easeInOutQuart,
    },
  },
};

/**
 * staggerChildren — parent container that orchestrates
 * staggered children. Pair with any child variant.
 *
 * @example
 * <motion.ul variants={staggerChildren} initial="hidden" animate="visible">
 *   {items.map(i => <motion.li variants={fadeUp} />)}
 * </motion.ul>
 */
export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

/**
 * staggerChildrenFast — tighter stagger for dense grids.
 */
export const staggerChildrenFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

/**
 * pageVariants — used as the root page transition wrapper.
 */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easings.easeOutExpo,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.45,
      ease: easings.easeInOutQuart,
    },
  },
};

// ─── Named Map (for dynamic lookups in MotionWrapper) ─────────────────────

export const animationVariants = {
  fadeUp,
  fadeIn,
  slideLeft,
  slideRight,
  scaleIn,
  staggerChildren,
  staggerChildrenFast,
  pageVariants,
} as const;

export type AnimationVariantName = keyof typeof animationVariants;
