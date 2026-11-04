"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { useReduced } from "@/components/motion/hooks";

const W = 320;
const H = 360;
const STEP = 4; // sampling grid in px. Lower means more particles.
const SCATTER = 260; // how far particles start from the shield
const PAD = 120; // extra canvas around the shield, so scattered particles aren't cut off

const SHIELD = "M160 18 292 66v104c0 92-66 150-132 176C94 320 28 262 28 170V66z";
const SHACKLE = "M128 170v-32a32 32 0 0 1 64 0v32";

/** Static version of the assembled shield. Used for reduced motion and as the crisp final state. */
function ShieldSvg({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} fill="none" aria-hidden>
      <path d={SHIELD} stroke="var(--color-accent-ink)" strokeWidth="13" strokeLinejoin="round" />
      <path d={SHACKLE} stroke="var(--color-accent-ink)" strokeWidth="13" />
      <rect x="112" y="168" width="96" height="78" rx="14" fill="var(--color-accent-ink)" />
      <circle cx="160" cy="202" r="10" fill="var(--color-bg)" />
      <rect x="155" y="204" width="10" height="24" rx="5" fill="var(--color-bg)" />
    </svg>
  );
}

type Particle = { x: number; y: number; sx: number; sy: number; delay: number; size: number };

function samplePoints(): Particle[] {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.strokeStyle = ctx.fillStyle = "#fff";
  ctx.lineWidth = 13;
  ctx.lineJoin = "round";
  ctx.stroke(new Path2D(SHIELD));
  ctx.stroke(new Path2D(SHACKLE));
  ctx.beginPath();
  ctx.roundRect(112, 168, 96, 78, 14);
  ctx.fill();
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(160, 202, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(155, 204, 10, 24);

  const { data } = ctx.getImageData(0, 0, W, H);
  const out: Particle[] = [];
  for (let y = 0; y < H; y += STEP) {
    for (let x = 0; x < W; x += STEP) {
      if (data[(y * W + x) * 4 + 3] < 128) continue;
      const a = Math.random() * Math.PI * 2;
      const d = SCATTER * (0.5 + Math.random() * 0.7);
      out.push({
        x,
        y,
        sx: x + Math.cos(a) * d,
        sy: y + Math.sin(a) * d,
        delay: Math.random() * 0.45,
        size: 1.6 + Math.random() * 1.2,
      });
    }
  }
  return out;
}

const easeOut = (t: number) => 1 - (1 - t) ** 3;

export function ShieldParticles({ className = "" }: { className?: string }) {
  const reduced = useReduced();
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const crisp = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const target = useRef(0);
  const shown = useRef(-1);
  const raf = useRef(0);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 95%", "center 55%"] });

  const draw = () => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    // Slow chase, so the shield settles calmly even after a fast scroll.
    shown.current += (target.current - shown.current) * 0.08;
    const p = shown.current;
    ctx.clearRect(-PAD, -PAD, W + PAD * 2, H + PAD * 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-accent-ink").trim();
    for (const pt of particles.current) {
      const t = easeOut(Math.max(0, Math.min(1, (p - pt.delay) / 0.55)));
      ctx.globalAlpha = 0.15 + t * 0.85;
      ctx.fillRect(pt.sx + (pt.x - pt.sx) * t, pt.sy + (pt.y - pt.sy) * t, pt.size, pt.size);
    }
    if (crisp.current) crisp.current.style.opacity = String(Math.max(0, (p - 0.92) / 0.08));
    raf.current = Math.abs(target.current - shown.current) > 0.002 ? requestAnimationFrame(draw) : 0;
  };

  useEffect(() => {
    if (reduced) return;
    const c = canvas.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = (W + PAD * 2) * dpr;
    c.height = (H + PAD * 2) * dpr;
    c.getContext("2d")?.setTransform(dpr, 0, 0, dpr, PAD * dpr, PAD * dpr);
    particles.current = samplePoints();
    shown.current = 0;
    target.current = scrollYProgress.get();
    raf.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
    // draw only reads refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, scrollYProgress]);

  // The canvas holds pixels rather than tokens, so it has to repaint in the new colour.
  useEffect(() => {
    const onTheme = () => {
      if (!raf.current && !reduced) raf.current = requestAnimationFrame(draw);
    };
    window.addEventListener("manami:theme", onTheme);
    return () => window.removeEventListener("manami:theme", onTheme);
    // draw only reads refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    target.current = v;
    if (!raf.current && !reduced) raf.current = requestAnimationFrame(draw);
  });

  return (
    <div ref={wrap} className={`relative aspect-[320/360] ${className}`}>
      {reduced ? (
        <ShieldSvg className="absolute inset-0 h-full w-full" />
      ) : (
        <>
          <canvas
            ref={canvas}
            aria-hidden
            className="absolute max-w-none"
            style={{
              left: `${(-PAD / W) * 100}%`,
              top: `${(-PAD / H) * 100}%`,
              width: `${((W + PAD * 2) / W) * 100}%`,
              height: `${((H + PAD * 2) / H) * 100}%`,
            }}
          />
          <div ref={crisp} className="absolute inset-0 opacity-0">
            <ShieldSvg className="h-full w-full drop-shadow-[0_0_30px_rgb(0_255_140/0.4)]" />
          </div>
        </>
      )}
    </div>
  );
}
