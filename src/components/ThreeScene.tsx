import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    cam.position.z = 8;

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const n = 350;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n * 3; i++) pos[i] = (Math.random() - 0.5) * 16;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xb8b0a0, size: 0.045, transparent: true, opacity: 0.8 }));
    scene.add(pts);

    const mat = new THREE.MeshBasicMaterial({ color: 0xd5cec1, wireframe: true, transparent: true, opacity: 0.55 });
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), mat);
    ico.position.set(-4.6, 0.6, -2);
    const tor = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.34, 12, 40), mat.clone());
    tor.position.set(4.8, -0.4, -2);
    scene.add(ico, tor);

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
    window.addEventListener('mousemove', onMouse);

    let raf = 0;
    const loop = (t: number) => {
      ico.rotation.x = t * 0.00012; ico.rotation.y = t * 0.00017;
      tor.rotation.x = t * 0.00015; tor.rotation.y = -t * 0.0001;
      pts.rotation.y = t * 0.00002;
      cam.position.x += (mx * 0.8 - cam.position.x) * 0.04;
      cam.position.y += (-my * 0.5 - cam.position.y) * 0.04;
      cam.lookAt(0, 0, 0);
      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
      geo.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
}
