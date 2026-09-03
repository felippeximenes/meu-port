import { useEffect, useRef } from 'react';

/**
 * Drifts the attached element horizontally as it crosses the viewport,
 * tying decorative display type to scroll instead of leaving it static.
 * `direction` sets which edge it leans toward as it passes through.
 */
export function useGhostParallax<T extends HTMLElement>(direction: 'left' | 'right', strength = 110) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const sign = direction === 'left' ? -1 : 1;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const progress = Math.max(-1, Math.min(1, centerOffset / (window.innerHeight * 0.9)));
      el.style.transform = `translate3d(${(sign * -progress * strength).toFixed(1)}px,0,0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [direction, strength]);

  return ref;
}
