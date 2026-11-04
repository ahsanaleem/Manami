"use client";

import { useT } from "@/components/global/Providers";
import { friends } from "@/lib/tokens";

export function StatusBar() {
  return (
    <div dir="ltr" className="flex h-11 w-full shrink-0 items-end justify-between px-6 pb-1 text-[11px] font-semibold text-white">
      <span>6:30</span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-3.5 rounded-[2px] bg-white" />
      </span>
    </div>
  );
}

export function Avatar({ emoji, ring, size = 44 }: { emoji: string; ring: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full bg-surface-2"
      style={{ width: size, height: size, boxShadow: `0 0 0 2px var(--color-bg), 0 0 0 4px ${ring}`, fontSize: size * 0.46 }}
    >
      {emoji}
    </span>
  );
}

/** Friends' story bubbles. `lead` replaces the "You" bubble, used by the How it works share step. */
export function StoryRow({ lead }: { lead?: React.ReactNode }) {
  const { screen } = useT();
  return (
    <div className="flex gap-3 overflow-hidden px-4 py-3">
      <div className="flex w-12 shrink-0 flex-col items-center gap-1.5">
        {lead ?? (
          <span className="grid size-11 place-items-center rounded-full border border-dashed border-white/30 text-lg text-white/70">
            +
          </span>
        )}
        <span className="text-[10px] text-white/70">{screen.you}</span>
      </div>
      {friends.slice(0, 4).map((f) => (
        <div key={f.name} className="flex w-12 shrink-0 flex-col items-center gap-1.5">
          <Avatar emoji={f.emoji} ring={f.ring} />
          <span className="text-[10px] text-white/70">{screen.friendNames[f.name]}</span>
        </div>
      ))}
    </div>
  );
}

/** Home / capture screen. */
export function HomeScreen() {
  const { screen } = useT();
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#07130d] to-black">
      <StatusBar />
      <StoryRow />
      <div className="relative mx-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_38%,rgb(0_255_140/0.16),transparent_62%)]">
        <p className="px-6 text-center text-xl leading-snug font-bold text-white">{screen.prompt}</p>
        {[
          { top: "14%", left: "18%" },
          { top: "26%", left: "78%" },
          { top: "72%", left: "24%" },
          { top: "80%", left: "70%" },
        ].map((p, i) => (
          <span key={i} className="twinkle absolute size-1 rounded-full bg-white" style={{ ...p, ["--i" as string]: i }} />
        ))}
      </div>
      <div className="mx-auto mt-4 flex rounded-full bg-white/8 p-1 text-xs font-semibold">
        {screen.tabs.map((tab, i) => (
          <span key={tab} className={`rounded-full px-4 py-1.5 ${i === 1 ? "bg-accent text-black" : "text-white/70"}`}>
            {tab}
          </span>
        ))}
      </div>
      <div className="flex justify-center pt-4 pb-7">
        <span className="relative grid size-[68px] place-items-center rounded-full border-[3px] border-white">
          <span className="pulse-ring absolute inset-0 rounded-full border-2 border-accent" />
          <span className="size-[52px] rounded-full bg-accent" />
        </span>
      </div>
    </div>
  );
}
