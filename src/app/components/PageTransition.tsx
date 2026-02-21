import { motion, useReducedMotion } from 'motion/react';
import { ReactNode } from 'react';
import { pageVariants, safeVariant } from '../../lib/animations';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? safeVariant(pageVariants) : pageVariants;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
