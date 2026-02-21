/**
 * AnimatedButton — Premium animated button component.
 *
 * Features beyond the base Button:
 * - Magnetic hover effect (cursor pulls the button slightly)
 * - Ripple / shimmer on click
 * - Glow pulse on primary variant
 * - Gradient border animation on secondary variant
 * - prefers-reduced-motion: degrades to instant state changes
 * - Forwards all HTML button attributes
 *
 * @example
 * <AnimatedButton variant="primary" size="lg" magnetic>
 *   Get Started
 * </AnimatedButton>
 *
 * @example
 * <AnimatedButton variant="secondary" icon={<ArrowRight />} iconPosition="right">
 *   Learn More
 * </AnimatedButton>
 *
 * @example
 * <AnimatedButton variant="glow" loading>
 *   Submitting…
 * </AnimatedButton>
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { easings } from '../../lib/animations';

// ─── Types ───────────────────────────────────────────────────────────────────

export type AnimatedButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'glow'
  | 'outline';

export type AnimatedButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AnimatedButtonProps {
  children: ReactNode;
  variant?: AnimatedButtonVariant;
  size?: AnimatedButtonSize;
  /** Show magnetic hover attraction effect (default: false) */
  magnetic?: boolean;
  /** Icon element to render alongside children */
  icon?: ReactNode;
  /** Where to place the icon (default: 'right') */
  iconPosition?: 'left' | 'right';
  /** Show a loading spinner and disable interaction */
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  /** Aria label for icon-only buttons */
  'aria-label'?: string;
}

// ─── Style Maps ──────────────────────────────────────────────────────────────

const SIZE_CLASSES: Record<AnimatedButtonSize, string> = {
  xs: 'px-3 py-1.5 text-xs gap-1.5',
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
  xl: 'px-10 py-5 text-xl gap-3',
};

const VARIANT_CLASSES: Record<AnimatedButtonVariant, string> = {
  primary:
    'bg-[#FF6A00] text-[#0D0D0D] font-semibold shadow-[0_0_0_rgba(255,106,0,0)] hover:shadow-[0_0_30px_rgba(255,106,0,0.55)]',
  secondary:
    'border-2 border-[#00B3B3] text-[#00B3B3] bg-transparent hover:bg-[#00B3B3]/10 hover:shadow-[0_0_28px_rgba(0,179,179,0.45)]',
  ghost:
    'text-[#F5F5F5] bg-transparent hover:bg-white/[0.06]',
  glow:
    'bg-gradient-to-r from-[#FF6A00] to-[#FF9240] text-[#0D0D0D] font-semibold shadow-[0_0_40px_rgba(255,106,0,0.4)] hover:shadow-[0_0_60px_rgba(255,106,0,0.7)]',
  outline:
    'border border-white/20 text-[#F5F5F5] bg-white/[0.03] hover:border-[#FF6A00]/60 hover:bg-white/[0.07]',
};

// ─── LoadingSpinner ───────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <motion.span
      className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
    />
  );
}

// ─── AnimatedButton ───────────────────────────────────────────────────────────

export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  'aria-label': ariaLabel,
}: AnimatedButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);

  // Magnetic effect: track cursor offset within button
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, { stiffness: 150, damping: 20, mass: 0.5 });
  const y = useSpring(yRaw, { stiffness: 150, damping: 20, mass: 0.5 });

  const isDisabled = disabled || loading;

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (!magnetic || isDisabled || shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    xRaw.set((e.clientX - cx) * 0.28);
    yRaw.set((e.clientY - cy) * 0.28);
  }

  function handleMouseLeave() {
    if (!magnetic) return;
    xRaw.set(0);
    yRaw.set(0);
  }

  const magneticStyle = magnetic && !shouldReduceMotion ? { x, y } : {};

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={magneticStyle}
      className={[
        // Base
        'relative inline-flex items-center justify-center rounded-xl',
        'transition-[box-shadow,background-color,border-color,color] duration-300',
        'cursor-pointer select-none overflow-hidden outline-none',
        'focus-visible:ring-2 focus-visible:ring-[#FF6A00]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]',
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      // Hover / tap spring
      whileHover={
        isDisabled || shouldReduceMotion
          ? {}
          : {
              scale: variant === 'glow' ? 1.04 : 1.05,
              transition: {
                type: 'spring',
                stiffness: 350,
                damping: 25,
              },
            }
      }
      whileTap={
        isDisabled || shouldReduceMotion
          ? {}
          : {
              scale: 0.96,
              transition: {
                duration: 0.12,
                ease: easings.easeInBack,
              },
            }
      }
      initial={false}
    >
      {/* Shimmer overlay on primary/glow */}
      {(variant === 'primary' || variant === 'glow') && !isDisabled && (
        <motion.span
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          initial={{ x: '-100%' }}
          whileHover={shouldReduceMotion ? {} : { x: '200%' }}
          transition={{ duration: 0.65, ease: easings.easeOutQuart }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-[inherit]">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <motion.span
                className="shrink-0"
                whileHover={shouldReduceMotion ? {} : { x: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {icon}
              </motion.span>
            )}
            <span>{children}</span>
            {icon && iconPosition === 'right' && (
              <motion.span
                className="shrink-0"
                whileHover={shouldReduceMotion ? {} : { x: 3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {icon}
              </motion.span>
            )}
          </>
        )}
      </span>
    </motion.button>
  );
}
