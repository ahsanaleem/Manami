import type { HTMLAttributes } from "react";

/** Glassy dark card. For a tilting one use <TiltCard>. */
export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`glass rounded-[var(--radius-card)] ${className}`} {...props} />;
}
