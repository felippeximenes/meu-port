import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import logoPath from '../data/logoPath.json';

// The exact silhouette of /brand/fx-mono-ember.png, traced once offline from
// its alpha channel (see logoPath.json) so the extruded 3D mesh matches the
// real mark instead of an approximation. contours[0] is the outer boundary
// (largest area); everything after it is a hole inside that boundary.
function buildGeometry(depth: number) {
  const [outer, ...holes] = logoPath.contours;
  const shape = new THREE.Shape(outer.points.map(([x, y]) => new THREE.Vector2(x, y)));
  for (const hole of holes) {
    shape.holes.push(new THREE.Path(hole.points.map(([x, y]) => new THREE.Vector2(x, y))));
  }
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: true, bevelThickness: 0.024, bevelSize: 0.02, bevelSegments: 3,
  });
  geometry.center();
  return geometry;
}

interface LogoGLProps {
  src: string;
  size?: number;
  alt: string;
}

/** The FX mark as a real extruded 3D model — same flat brand color on every
 * face (no lighting, so it never shades/tints), tilting toward the cursor
 * and growing slightly on hover. Falls back to the flat PNG when reduced
 * motion is requested or WebGL isn't available. */
export default function LogoGL({ src, size = 40, alt }: LogoGLProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (fallback) return;
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setFallback(true);
      return;
    }
    // The canvas is a good deal bigger than the mark's own resting size (set
    // via camera distance below) so the bigger hover grow-up and tilt below
    // have room to fill outward without clipping against the canvas edge.
    const canvasSize = size * 1.9;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(canvasSize, canvasSize);
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 10);
    camera.position.set(0, 0, 3.6);

    const geometry = buildGeometry(0.24);
    // Flat, unlit color sampled straight from the source PNG's own pixels —
    // MeshBasicMaterial ignores lighting entirely, so this exact RGB is what
    // renders on every face at every angle, never shaded lighter or darker.
    const material = new THREE.MeshBasicMaterial({ color: 0xfd5429 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetScale = 1;
    let targetRotX = 0;
    let targetRotY = 0;
    let raf = 0;
    const tick = () => {
      // Scale eases in slower than rotation — gives the grow-up a bit of
      // weight, while the tilt still tracks the cursor closely.
      const s = mesh.scale.x + (targetScale - mesh.scale.x) * 0.1;
      mesh.scale.setScalar(s);
      mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.18;
      mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.18;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = nx * 0.45;
      targetRotX = ny * -0.45;
    };
    const onEnter = () => { targetScale = 1.55; };
    const onLeave = () => { targetScale = 1; targetRotX = 0; targetRotY = 0; };
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerenter', onEnter);
      container.removeEventListener('pointerleave', onLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [size, fallback]);

  if (fallback) {
    return <img src={src} alt={alt} width={size} height={size} style={{ display: 'block' }} />;
  }
  const canvasSize = size * 1.9;
  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      style={{ width: canvasSize, height: canvasSize, margin: `-${(canvasSize - size) / 2}px` }}
    />
  );
}
