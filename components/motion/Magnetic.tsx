"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { spring } from "@/lib/tokens";
import { useFinePointer, useReduced } from "./hooks";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Pull starts this many px outside the element. */
  radius?: number;
  /** Share of the cursor distance the element follows. */
  strength?: number;
};

export function Magnetic({ children, className, radius = 70, strength = 0.32 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReduced();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  useEffect(() => {
    if (!fine || reduced) return;
    const el = ref.current;
    if (!el) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      // The rect includes the current offset, so remove it to measure from the rest position.
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - x.get();
      const cy = r.top + r.height / 2 - y.get();
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const inside = Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius;
      mx.set(inside ? dx * strength : 0);
      my.set(inside ? dy * strength : 0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [fine, reduced, radius, strength, mx, my, x, y]);

  return (
    <motion.div ref={ref} className={className ?? "inline-block"} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
