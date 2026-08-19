import { useEffect, useState } from 'react';

const FADE = 'linear-gradient(180deg, #000000, #6e6c70 25%, #b9b7bb 50%, #dcd6d6 75%, #f1f1f1)';

export default function Preloader() {
  const [show, setShow] = useState(() => !sessionStorage.getItem('fx-preloader-done'));

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('fx-preloader-done', '1');
    }, 2600);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 120, background: '#161616',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22,
      animation: 'preloadOut 2.6s cubic-bezier(0.19,1,0.22,1) forwards',
    }}>
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          fontFamily: 'var(--disp)', fontSize: 'clamp(52px,9vw,132px)', lineHeight: 0.84,
          letterSpacing: '0.005em', textTransform: 'uppercase', color: '#f1f1f1',
          animation: 'preloadIn 0.9s cubic-bezier(0.32,0.72,0,1) both',
        }}>Feito para mover</div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          fontFamily: 'var(--disp)', fontSize: 'clamp(52px,9vw,132px)', lineHeight: 0.84,
          letterSpacing: '0.005em', textTransform: 'uppercase',
          backgroundImage: FADE, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
          animation: 'preloadIn 0.9s 0.12s cubic-bezier(0.32,0.72,0,1) both',
        }}>Guiado pelo design</div>
      </div>
      <div style={{ width: 'min(280px,46vw)', height: 1, background: 'rgba(255,255,255,0.16)', marginTop: 10 }}>
        <div style={{
          height: 1, background: 'var(--ember)', transformOrigin: '0 50%',
          animation: 'preloadBar 1.6s cubic-bezier(0.32,0.72,0,1) both',
        }} />
      </div>
    </div>
  );
}
