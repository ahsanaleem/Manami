"use client";

import { useEffect, useRef } from "react";
import { fx } from "@/lib/fx";

// Tweak the sky here.
const DRIFT = 0.05; // px per frame for the nearest stars
const STREAK = 0.9; // streak length per unit of scroll velocity
const SCROLL_PUSH = 0.12; // how far stars travel per unit of scroll velocity
const AREA_PER_STAR = 7000; // lower means more stars
const LIGHT_THEME_ALPHA = 0.32; // how visible the specks are in light mode

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    type Star = { x: number; y: number; z: number; r: number; p: number; s: number };
    let stars: Star[] = [];

    const seed = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(Math.round((w * h) / AREA_PER_STAR), 240);
      stars = Array.from({ length: n }, () => {
        const z = 0.25 + Math.random() * 0.75;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.4 + z * 1.0,
          p: Math.random() * Math.PI * 2,
          s: 0.4 + Math.random() * 1.4,
        };
      });
    };

    let boost = 1;
    let vel = 0;
    let raf = 0;
    let running = false;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const ink = fx.lightTheme ? "#1e2a5c" : "#fff";
      const dim = fx.lightTheme ? LIGHT_THEME_ALPHA : 1;
      ctx.fillStyle = ink;
      ctx.strokeStyle = ink;
      ctx.lineCap = "round";
      const time = t / 1000;
      for (const s of stars) {
        if (!reduced) {
          s.y -= DRIFT * s.z + vel * s.z * SCROLL_PUSH;
          s.x += DRIFT * 0.35 * s.z;
          if (s.y < -20) s.y += h + 40;
          else if (s.y > h + 20) s.y -= h + 40;
          if (s.x > w + 4) s.x = -4;
        }
        const twinkle = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(time * s.s + s.p);
        ctx.globalAlpha = Math.min(1, s.z * twinkle * boost * 0.85) * dim;
        const len = vel * STREAK * s.z;
        if (Math.abs(len) > 1.5) {
          ctx.lineWidth = s.r;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x, s.y + len);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * (boost > 1 ? 1 + (boost - 1) * 0.4 : 1), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      boost += (fx.starBoost - boost) * 0.04;
      vel += (Math.max(-50, Math.min(50, fx.velocity)) - vel) * 0.15;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    let lastW = 0;
    const onResize = () => {
      // Ignore mobile URL-bar height changes, which would reshuffle the sky mid-scroll.
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      seed();
      if (reduced) draw(0);
    };

    const init = () => {
      lastW = window.innerWidth;
      seed();
      draw(0);
      start();
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const idleId = idle(init);

    // With reduced motion nothing is looping, so a theme change has to redraw by itself.
    const onTheme = () => {
      if (reduced && w) draw(0);
    };
    window.addEventListener("manami:theme", onTheme);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelIdle(idleId as number);
      stop();
      window.removeEventListener("manami:theme", onTheme);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-lvh w-full" />;
}
