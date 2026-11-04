"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { spring } from "@/lib/tokens";
import { useFinePointer, useReduced } from "./hooks";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Spotlight colour. */
  accent?: string;
  /** Maximum tilt in degrees. */
  max?: number;
};

export function TiltCard({ children, className, accent = "#00FF8C", max = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReduced();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const lift = useMotionValue(0);
  const rotateX = useSpring(rx, spring);
  const rotateY = useSpring(ry, spring);
  const y = useSpring(lift, spring);
  const active = fine && !reduced;

  return (
    <motion.div
      ref={ref}
      className={`group relative isolate overflow-hidden rounded-[var(--radius-card)] glass transition-[border-color] duration-300 ${className ?? ""}`}
      style={
        {
          rotateX,
          rotateY,
          y,
          transformPerspective: 900,
          "--tilt-accent": accent,
        } as unknown as CSSProperties
      }
      onPointerMove={(e) => {
        if (!active) return;
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 2 * max);
        rx.set((0.5 - py) * 2 * max);
        spot.current?.style.setProperty("--mx", `${px * 100}%`);
        spot.current?.style.setProperty("--my", `${py * 100}%`);
      }}
      onPointerEnter={() => {
        if (active) lift.set(-4);
        if (ref.current) ref.current.style.borderColor = `${accent}66`;
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        lift.set(0);
        if (ref.current) ref.current.style.borderColor = "";
      }}
    >
      <div
        ref={spot}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), ${accent}38, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
