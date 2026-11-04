type GlowPulseProps = {
  color?: string;
  className?: string;
};

/** Soft breathing radial glow. Position and size it with className. */
export function GlowPulse({ color = "#00FF8C", className = "" }: GlowPulseProps) {
  return (
    <div
      aria-hidden
      className={`breathe pointer-events-none absolute rounded-full ${className}`}
      style={{ background: `radial-gradient(circle, ${color}55 0%, ${color}14 42%, transparent 70%)` }}
    />
  );
}
