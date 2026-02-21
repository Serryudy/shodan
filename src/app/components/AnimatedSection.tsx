/**
 * AnimatedSection — backward-compatible scroll-reveal wrapper.
 * Now delegates to ScrollReveal + centralized variants.
 * Existing usages with just `delay` and `className` continue to work.
 */
import type { ReactNode } from 'react';
import { ScrollReveal } from './ScrollReveal';
import type { AnimationVariantName } from '../../lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Named variant (default: 'fadeUp') */
  variant?: AnimationVariantName;
  /** Custom threshold 0–1 (default: 0.12) */
  threshold?: number;
  /** Animate only once (default: true) */
  once?: boolean;
}

export function AnimatedSection({
  children,
  delay = 0,
  className = '',
  variant = 'fadeUp',
  threshold = 0.12,
  once = true,
}: AnimatedSectionProps) {
  return (
    <ScrollReveal
      variant={variant}
      delay={delay}
      threshold={threshold}
      once={once}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
}
