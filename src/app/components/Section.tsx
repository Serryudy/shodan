import { ReactNode } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'gradient' | 'darker';
  id?: string;
  /**
   * Set to false to disable the scroll-reveal entrance animation.
   * Use on hero sections that already have their own entrance animations.
   */
  animate?: boolean;
}

export function Section({ children, className = '', background = 'default', id, animate = true }: SectionProps) {
  const backgroundClasses = {
    default: '',
    gradient: 'bg-gradient-to-b from-transparent via-white/[0.02] to-transparent',
    darker: 'bg-black/20',
  };

  return (
    <section id={id} className={`py-24 md:py-32 ${backgroundClasses[background]} ${className}`}>
      <div className="max-w-[1400px] mx-auto px-8">
        {animate ? (
          <ScrollReveal variant="fadeUp" threshold={0.06} rootMargin="-30px">
            {children}
          </ScrollReveal>
        ) : children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, centered = false, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#F5F5F5] via-[#F5F5F5] to-[#F5F5F5]/50 bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-[#F5F5F5]/60 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
