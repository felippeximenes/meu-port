import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';

export function useReveal<T extends HTMLElement>(threshold = 0.12, delay = 0) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(26px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
  };
  return { ref, style };
}

export function useCountUp<T extends HTMLElement>(target: number, duration = 1400) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { ref, value };
}

export function useTilt<T extends HTMLElement>(max = 5) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (ev: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const rx = ((ev.clientY - r.top) / r.height - 0.5) * -max;
      const ry = ((ev.clientX - r.left) / r.width - 0.5) * max;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const leave = () => { el.style.transform = 'none'; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [max]);
  return ref;
}

export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setP(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return p;
}

export function usePinnedProgress<T extends HTMLElement>(): [RefObject<T>, number] {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const h = el.offsetHeight - window.innerHeight;
      setP(Math.max(0, Math.min(1, (window.scrollY - el.offsetTop) / h)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return [ref, p];
}

export function useParallax<T extends HTMLElement>(factor = 0.25, baseTransform = '') {
  const ref = useRef<T>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `${baseTransform} translateY(${window.scrollY * factor}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [factor, baseTransform]);
  return ref;
}
