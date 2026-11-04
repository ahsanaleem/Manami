"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReduced } from "@/components/motion/hooks";

type GhostProps = {
  className?: string;
  /** Pupils track the cursor. */
  follow?: boolean;
  /** Blink at random every 3–5s. */
  blink?: boolean;
  /** Blink once whenever this value changes. */
  blinkKey?: unknown;
  /** Eyes start closed and open when this turns true. */
  eyesOpen?: boolean;
  /** Ripple the hem. */
  hemWave?: boolean;
  title?: string;
};

const BODY = "M10 62a50 50 0 0 1 100 0v48H10z";
const HEM = "M10 108v24l16.7-17 16.6 17L60 115l16.7 17 16.6-17 16.7 17v-24z";

export function Ghost({ className, follow, blink, blinkKey, eyesOpen = true, hemWave, title }: GhostProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const fine = useFinePointer();
  const reduced = useReduced();
  const [blinking, setBlinking] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const pupilX = useSpring(px, { stiffness: 300, damping: 26 });
  const pupilY = useSpring(py, { stiffness: 300, damping: 26 });

  useEffect(() => {
    if (!follow || !fine || reduced) return;
    const onMove = (e: PointerEvent) => {
      const r = svgRef.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.45);
      const len = Math.hypot(dx, dy) || 1;
      const reach = Math.min(len / 60, 1) * 6;
      px.set((dx / len) * reach);
      py.set((dy / len) * reach);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [follow, fine, reduced, px, py]);

  useEffect(() => {
    if (!blink || reduced) return;
    let timer: number;
    const schedule = () => {
      timer = window.setTimeout(() => {
        setBlinking(true);
        window.setTimeout(() => setBlinking(false), 140);
        schedule();
      }, 3000 + Math.random() * 2000);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [blink, reduced]);

  const firstKey = useRef(true);
  useEffect(() => {
    if (firstKey.current) {
      firstKey.current = false;
      return;
    }
    if (reduced) return;
    setBlinking(true);
    const t = window.setTimeout(() => setBlinking(false), 160);
    return () => clearTimeout(t);
  }, [blinkKey, reduced]);

  const open = eyesOpen && !blinking;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 134"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      <path data-part="body" d={BODY} fill="#00FF8C" />
      {/* SVG children repaint every frame when animated, so the hem only ripples on desktop. */}
      <path data-part="hem" d={HEM} fill="#00FF8C" className={hemWave && fine && !reduced ? "ghost-hem" : undefined} />
      <motion.g
        data-part="eyes"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={false}
        animate={{ scaleY: open ? 1 : 0.08 }}
        transition={{ duration: 0.09 }}
      >
        <circle cx="42" cy="58" r="15" fill="#fff" />
        <circle cx="78" cy="58" r="15" fill="#fff" />
        <motion.g data-part="pupils" style={{ x: pupilX, y: pupilY }}>
          <circle cx="42" cy="58" r="7" fill="#04140C" />
          <circle cx="78" cy="58" r="7" fill="#04140C" />
        </motion.g>
      </motion.g>
    </svg>
  );
}
