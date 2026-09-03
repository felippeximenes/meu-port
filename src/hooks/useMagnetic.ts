import { useEffect, useRef, type MouseEvent } from 'react';

/** Pulls the element a few px toward the cursor on hover; no-op on touch or reduced-motion. */
export function useMagnetic<T extends HTMLElement>(strengthX = 0.22, strengthY = 0.4) {
  const ref = useRef<T>(null);
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const onMouseMove = (e: MouseEvent<T>) => {
    if (!enabled.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * strengthX;
    const dy = (e.clientY - rect.top - rect.height / 2) * strengthY;
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return { ref, onMouseMove, onMouseLeave };
}
