import { useEffect, useRef, useState } from 'react';

interface SplitHeadingProps {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  as?: 'h2' | 'h3';
}

/** Word-by-word clip reveal, triggered once the heading enters the viewport. */
export default function SplitHeading({ text, style, className, as = 'h2' }: SplitHeadingProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.IntersectionObserver) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setAnimated(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', marginRight: '0.22em' }}>
          <span style={{
            display: 'inline-block',
            transform: animated ? 'translateY(0)' : 'translateY(105%)',
            transition: animated ? `transform 620ms var(--ease-out) ${Math.min(i * 38, 380)}ms` : 'none',
          }}>{word}</span>
        </span>
      ))}
    </Tag>
  );
}
