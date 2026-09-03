import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

/**
 * Adapted from reactbits.dev's TextType. Always renders a <span> (this
 * project only ever needs inline usage, so the original's `as` polymorphic
 * tag was dropped) and skips the typing/deleting/cursor animation entirely
 * under prefers-reduced-motion, showing the final text right away instead.
 * Also fixed a gap in the original: with loop=false it never called
 * onSentenceComplete after the last item finished typing (only after a
 * delete cycle, which never happens without looping) — this version fires
 * it right before returning, which the two-tone headline handoff needs.
 */
interface TextTypeProps {
  text: string;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  color?: string;
  startOnVisible?: boolean;
  onSentenceComplete?: () => void;
}

export default function TextType({
  text,
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = false,
  showCursor = true,
  cursorCharacter = '|',
  cursorBlinkDuration = 0.5,
  color,
  startOnVisible = false,
  onSentenceComplete,
}: TextTypeProps) {
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const [displayedText, setDisplayedText] = useState(reducedMotion ? text : '');
  const [charIndex, setCharIndex] = useState(reducedMotion ? text.length : 0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(!startOnVisible || reducedMotion);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion || !startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setIsVisible(true)),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !showCursor || !cursorRef.current) return;
    gsap.set(cursorRef.current, { opacity: 1 });
    const tween = gsap.to(cursorRef.current, {
      opacity: 0, duration: cursorBlinkDuration, repeat: -1, yoyo: true, ease: 'power2.inOut',
    });
    return () => { tween.kill(); };
  }, [reducedMotion, showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (reducedMotion || !isVisible) return;
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          onSentenceComplete?.();
          setCharIndex(0);
        } else {
          timeout = setTimeout(() => setDisplayedText(prev => prev.slice(0, -1)), deletingSpeed);
        }
      } else if (charIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[charIndex]);
          setCharIndex(prev => prev + 1);
        }, typingSpeed);
      } else if (loop) {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      } else {
        onSentenceComplete?.();
      }
    };

    if (charIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(step, initialDelay);
    } else {
      step();
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, displayedText, isDeleting, isVisible, reducedMotion]);

  return (
    <span ref={containerRef} className="text-type">
      <span className="text-type__content" style={{ color }}>{displayedText}</span>
      {showCursor && !reducedMotion && (
        <span ref={cursorRef} className="text-type__cursor">{cursorCharacter}</span>
      )}
    </span>
  );
}
