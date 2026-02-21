import { motion } from 'motion/react';

export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(0,179,179,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,179,179,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }}>
        {/* Animated glow spots */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,106,0,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,179,179,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
}
