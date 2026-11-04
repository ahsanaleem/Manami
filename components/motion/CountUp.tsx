"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { easeOutExpo } from "@/lib/tokens";
import { useReduced } from "./hooks";

type CountUpProps = {
  to: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
};

const plain = (n: number) => Math.round(n).toLocaleString("en-US");

export function CountUp({ to, duration = 1.6, className, format = plain }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduced = useReduced();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduced) {
      el.textContent = format(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: easeOutExpo,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
    // format is treated as stable for the life of the counter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {format(0)}
    </span>
  );
}
