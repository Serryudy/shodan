/**
 * CursorGlow — Teal glowing cursor follower.
 *
 * Layers:
 *   1. Small teal dot  (10 px, tight spring — tracks cursor closely)
 *   2. Halo ring       (28 px, medium spring — slight lag behind dot)
 *   3. Ambient blob    (400 px, loose spring — slow, atmospheric glow)
 *
 * Motion values instead of React state = zero re-renders on mousemove.
 * prefers-reduced-motion: all layers hidden, zero CPU cost.
 */

import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react';

export function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();

  // Raw pointer position — set directly, no React re-render on every frame
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot: tight spring — sticks close to cursor
  const dotX = useSpring(rawX, { stiffness: 650, damping: 38, mass: 0.3 });
  const dotY = useSpring(rawY, { stiffness: 650, damping: 38, mass: 0.3 });

  // Halo: medium spring — lags a frame or two behind the dot
  const haloX = useSpring(rawX, { stiffness: 220, damping: 28, mass: 0.6 });
  const haloY = useSpring(rawY, { stiffness: 220, damping: 28, mass: 0.6 });

  // Blob: loose spring — slow atmospheric drift
  const blobX = useSpring(rawX, { stiffness: 55, damping: 22, mass: 1.2 });
  const blobY = useSpring(rawY, { stiffness: 55, damping: 22, mass: 1.2 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onLeave = () => {
      rawX.set(-200);
      rawY.set(-200);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [rawX, rawY, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">

      {/* 1. Teal dot — hard edge, crisp glow */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: '#00B3B3',
          boxShadow:
            '0 0 8px 2px rgba(0,179,179,0.95), 0 0 22px 5px rgba(0,179,179,0.45)',
          willChange: 'transform',
        }}
      />

      {/* 2. Halo ring — 1.5 px teal border, lags slightly */}
      <motion.div
        style={{
          x: haloX,
          y: haloY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,179,179,0.5)',
          boxShadow: '0 0 14px 3px rgba(0,179,179,0.18)',
          willChange: 'transform',
        }}
      />

      {/* 3. Ambient blob — large, soft, slow */}
      <motion.div
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 420,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,179,179,0.07) 0%, rgba(255,106,0,0.04) 40%, transparent 70%)',
          filter: 'blur(52px)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
