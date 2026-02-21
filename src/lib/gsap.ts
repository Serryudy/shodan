/**
 * gsap.ts — Optional GSAP integration for advanced timeline sections
 *
 * Usage:
 *   import { createSectionTimeline, revealTimeline } from '@/lib/gsap';
 *
 * All helpers are tree-shaken if not imported.
 * ScrollTrigger is registered lazily on first use.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SectionTimelineOptions {
  /** The scroll container element or selector (default: the trigger itself) */
  trigger?: string | Element;
  /** Pin the section while animating? (default: false) */
  pin?: boolean;
  /** scrub: true = tied to scroll, number = lag in seconds */
  scrub?: boolean | number;
  /** start / end ScrollTrigger markers (default: "top 80%" / "bottom 20%") */
  start?: string;
  end?: string;
  /** Show debug markers in development */
  markers?: boolean;
}

export interface StaggerRevealOptions {
  /** CSS selector or NodeList of elements to stagger */
  targets: string | Element | Element[] | NodeListOf<Element>;
  /** Duration per item (default: 0.7) */
  duration?: number;
  /** Stagger delay between items (default: 0.1) */
  stagger?: number;
  /** y-offset to start from (default: 40) */
  yOffset?: number;
  /** ScrollTrigger trigger element (default: parent) */
  trigger?: string | Element;
  /** Delay before starting (default: 0) */
  delay?: number;
}

// ─── Easing Strings (matching animations.ts cubic-beziers) ───────────────────

export const gsapEasings = {
  easeOutExpo: 'power4.out',
  easeOutQuart: 'power3.out',
  easeInOutQuart: 'power3.inOut',
  easeOutBack: 'back.out(1.4)',
  smooth: 'power4.out',
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * createSectionTimeline
 * Creates a GSAP timeline bound to a ScrollTrigger section.
 * Returns the timeline — add your own `.from()`, `.to()`, etc.
 *
 * @example
 * const tl = createSectionTimeline({ trigger: '#hero', pin: true, scrub: 1 });
 * tl.from('.hero-title', { y: 80, opacity: 0 })
 *   .from('.hero-sub',   { y: 40, opacity: 0 }, '-=0.4');
 */
export function createSectionTimeline(
  options: SectionTimelineOptions = {},
): gsap.core.Timeline {
  const {
    trigger,
    pin = false,
    scrub = false,
    start = 'top 80%',
    end = 'bottom 20%',
    markers = false,
  } = options;

  return gsap.timeline({
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget | undefined,
      pin,
      scrub,
      start,
      end,
      markers: markers && import.meta.env.DEV,
    },
  });
}

/**
 * revealTimeline
 * Convenience helper: create a staggered fade-up reveal from a selector.
 *
 * @example
 * revealTimeline({ targets: '.feature-card', stagger: 0.12 });
 */
export function revealTimeline(options: StaggerRevealOptions): gsap.core.Tween {
  const {
    targets,
    duration = 0.75,
    stagger = 0.1,
    yOffset = 44,
    trigger,
    delay = 0,
  } = options;

  return gsap.from(targets, {
    y: yOffset,
    opacity: 0,
    duration,
    stagger,
    delay,
    ease: gsapEasings.easeOutExpo,
    scrollTrigger: trigger
      ? {
          trigger: trigger as gsap.DOMTarget,
          start: 'top 80%',
        }
      : undefined,
  });
}

/**
 * pinSection
 * Pins a section for a scrubbed timeline effect (cinematic scroll-jack).
 *
 * @example
 * pinSection('#timeline-section', tl, { duration: '200%' });
 */
export function pinSection(
  sectionSelector: string,
  timeline: gsap.core.Timeline,
  { duration = '150%' }: { duration?: string } = {},
): void {
  ScrollTrigger.create({
    trigger: sectionSelector,
    start: 'top top',
    end: duration,
    pin: true,
    animation: timeline,
    scrub: 1,
  });
}

/**
 * horizontalScroll
 * Enables horizontal scroll within a pinned section.
 * Useful for timeline / showcase strips.
 *
 * @example
 * horizontalScroll('#showcase-strip', '.showcase-item');
 */
export function horizontalScroll(
  containerSelector: string,
  itemsSelector: string,
): void {
  const container = document.querySelector<HTMLElement>(containerSelector);
  if (!container) return;

  const items = container.querySelectorAll<HTMLElement>(itemsSelector);
  const totalWidth = Array.from(items).reduce(
    (acc, el) => acc + el.offsetWidth,
    0,
  );

  gsap.to(items, {
    xPercent: -100 * (items.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => `+=${totalWidth}`,
    },
  });
}

/**
 * textReveal
 * Staggers the reveal of individual words or characters.
 *
 * @example
 * textReveal('.hero-heading', 'words');
 */
export function textReveal(
  selector: string,
  by: 'words' | 'chars' = 'words',
): void {
  // Split manually (avoids requiring SplitText plugin)
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const units =
      by === 'words'
        ? el.textContent?.split(' ') ?? []
        : (el.textContent?.split('') ?? []);

    el.innerHTML = units
      .map((u) => `<span class="gsap-text-unit" style="display:inline-block">${u}${by === 'words' ? '&nbsp;' : ''}</span>`)
      .join('');

    gsap.from(el.querySelectorAll('.gsap-text-unit'), {
      y: '110%',
      opacity: 0,
      duration: 0.65,
      stagger: by === 'words' ? 0.08 : 0.03,
      ease: gsapEasings.easeOutExpo,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });
}

/**
 * counterAnimation
 * Animates a number from 0 to its target value on scroll.
 *
 * @example
 * counterAnimation('.stat-number');
 */
export function counterAnimation(selector: string): void {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const target = parseFloat(el.getAttribute('data-target') ?? el.textContent ?? '0');
    const suffix = el.getAttribute('data-suffix') ?? '';
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: gsapEasings.easeOutQuart,
      onUpdate() {
        el.textContent = Math.round(obj.val).toLocaleString() + suffix;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

/**
 * cleanup
 * Kills all ScrollTrigger instances — call on route change.
 */
export function cleanupScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

export { gsap, ScrollTrigger };
