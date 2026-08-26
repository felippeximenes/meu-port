import { useEffect, useRef } from 'react';

/**
 * Reveals descendant [data-reveal] elements (clip-path wipe, see index.css)
 * as they enter the viewport, staggered in DOM order. Attach the returned
 * ref to the element containing the group.
 */
export function useReveal<T extends HTMLElement>(staggerMs = 60) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !window.IntersectionObserver) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!items.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(el => el.setAttribute('data-revealed', ''));
      return;
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay = Math.min(items.indexOf(el) * staggerMs, staggerMs * 8);
        el.style.transitionDelay = delay + 'ms';
        el.setAttribute('data-revealed', '');
        io.unobserve(el);
      });
    }, { threshold: 0.15 });

    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [staggerMs]);

  return ref;
}
