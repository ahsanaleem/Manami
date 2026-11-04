"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLang, useT } from "@/components/global/Providers";
import { CountUp } from "@/components/motion/CountUp";
import { useFinePointer, useOnScreen, useReduced } from "@/components/motion/hooks";
import { LoopGate } from "@/components/motion/LoopGate";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";
import { Avatar } from "@/components/ui/screens";
import { colors, durations, easeOutExpo, friends, spring } from "@/lib/tokens";

/** Steps 0 → count-1 on a timer, only while on-screen. Reduced motion holds the last step. */
function useLoopStep(count: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref);
  const reduced = useReduced();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!on || reduced) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % count), ms);
    return () => clearInterval(id);
  }, [on, reduced, count, ms]);
  return [ref, reduced ? count - 1 : step] as const;
}

/* ─────────── Micro-animations ─────────── */

function CaptureVisual() {
  return (
    <div dir="ltr" className="flex h-full items-center justify-center gap-[3px] md:gap-[5px]">
      {Array.from({ length: 34 }, (_, i) => (
        <span
          key={i}
          className="wave-bar max-w-[5px] flex-1 rounded-full bg-accent-ink"
          style={{ height: `${Math.round(26 + Math.abs(Math.sin(i * 0.9)) * 74)}%`, ["--i" as string]: i }}
        />
      ))}
    </div>
  );
}

function JournalVisual({ moods, accent }: { moods: string[]; accent: string }) {
  const [ref, step] = useLoopStep(moods.length, 1500);
  return (
    <div ref={ref} className="flex h-full flex-wrap content-center gap-2">
      {moods.map((m, i) => (
        <span key={m} className={`relative rounded-full border border-line px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${i === step ? "text-white" : "text-body"}`}>
          {i === step && <motion.span layoutId="mood-pill" className="absolute inset-0 rounded-full" style={{ background: accent }} transition={spring} />}
          <span className="relative">{m}</span>
        </span>
      ))}
    </div>
  );
}

function LockVisual({ accent }: { accent: string }) {
  const fine = useFinePointer();
  // Touch screens have no hover, so there the padlock opens and closes by itself.
  const [ref, step] = useLoopStep(2, 2200);
  const open = !fine && step === 1;
  return (
    <div ref={ref} className="grid h-full place-items-center">
      <svg viewBox="0 0 64 72" className="h-20 overflow-visible sm:h-24" fill="none" aria-hidden>
        {/* The shackle lifts and swings open when the card is hovered. */}
        <path
          d="M18 32V20a14 14 0 0 1 28 0v12"
          stroke={accent}
          strokeWidth="6"
          strokeLinecap="round"
          className={`origin-[46px_32px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-6px] group-hover:rotate-[28deg] group-focus-within:rotate-[28deg] ${open ? "translate-y-[-6px] rotate-[28deg]" : ""}`}
        />
        <rect x="8" y="32" width="48" height="36" rx="9" fill={accent} />
        <circle cx="32" cy="48" r="5" fill="var(--color-on-accent)" />
        <rect x="30" y="50" width="4" height="9" rx="2" fill="var(--color-on-accent)" />
      </svg>
    </div>
  );
}

function StoriesVisual() {
  const r = 44;
  const items = friends.slice(0, 5);
  return (
    <div className="grid h-full place-items-center">
      <div className="orbit relative size-1" style={{ ["--orbit-time" as string]: "14s" }}>
        {items.map((f, i) => {
          const a = (i / items.length) * Math.PI * 2;
          return (
            <span key={f.name} className="absolute" style={{ left: Math.round(Math.cos(a) * r) - 16, top: Math.round(Math.sin(a) * r) - 16 }}>
              <span className="orbit-counter block" style={{ ["--orbit-time" as string]: "14s" }}>
                <Avatar emoji={f.emoji} ring={f.ring} size={30} />
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function TagVisual() {
  const { sign } = useLang();
  const shown = friends.slice(0, 4);
  // One extra step holds the full row before it restarts.
  const [ref, step] = useLoopStep(shown.length + 2, 1000);
  return (
    <div ref={ref} className="flex h-full items-center justify-center gap-1.5">
      {shown.map((f, i) => (
        <motion.span
          key={f.name}
          className="relative"
          initial={false}
          animate={{ x: i < step ? 0 : 26 * sign, opacity: i < step ? 1 : 0 }}
          transition={spring}
        >
          <Avatar emoji={f.emoji} ring={f.ring} size={40} />
          <motion.span
            className="absolute -end-1 -bottom-1 grid size-4 place-items-center rounded-full bg-accent"
            initial={false}
            animate={{ scale: i < step ? 1 : 0 }}
            transition={{ ...spring, delay: 0.15 }}
          >
            <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="var(--color-on-accent)" strokeWidth="2.200" aria-hidden>
              <path d="m2.500 6.200 2.400 2.400 4.600-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
}

function ScoreVisual({ scoreLabel, streakLabel }: { scoreLabel: string; streakLabel: string }) {
  return (
    <div className="flex h-full items-center justify-around gap-4">
      <div>
        <CountUp to={3847} className="block text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-extrabold tabular-nums" />
        <span className="mt-2 block text-sm text-body">{scoreLabel}</span>
      </div>
      <div className="text-center">
        <span className="flex items-center justify-center gap-1 text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold">
          <span className="flicker inline-block">🔥</span>
          <CountUp to={12} className="tabular-nums" />
        </span>
        <span className="mt-2 block text-sm text-body">{streakLabel}</span>
      </div>
    </div>
  );
}

function FlipDigit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1.3em] w-[0.72em] overflow-hidden rounded-lg bg-fill text-center [perspective:300px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="block origin-bottom leading-[1.3em]"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: durations.ui, ease: easeOutExpo }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const CLOCK = ["06:27", "06:28", "06:29", "06:30", "06:30", "06:30"];

function ClockVisual() {
  const [ref, step] = useLoopStep(CLOCK.length, 900);
  // Reduced motion lands on the last entry, which is also 06:30.
  const time = CLOCK[step];
  return (
    <div ref={ref} dir="ltr" className="flex h-full items-center justify-center gap-0.5 text-[clamp(1.4rem,7.4vw,1.9rem)] font-extrabold tabular-nums sm:gap-1 sm:text-5xl">
      <FlipDigit value={time[0]} />
      <FlipDigit value={time[1]} />
      <span className="px-0.5 text-body">:</span>
      <FlipDigit value={time[3]} />
      <FlipDigit value={time[4]} />
    </div>
  );
}

const SYMBOLS = ["🌙", "💧", "🚪", "🕊️", "🔑", "🌿", "⭐", "🐎", "🔥"];

function DictionaryVisual() {
  return (
    <div className="grid h-full grid-cols-3 place-items-center gap-1 text-xl sm:text-2xl">
      {SYMBOLS.map((s, i) => (
        <span key={s} className="symbol-fade" style={{ ["--i" as string]: (i * 4) % 9 }}>
          {s}
        </span>
      ))}
    </div>
  );
}

function PrivacyVisual({ options }: { options: string[] }) {
  const [ref, step] = useLoopStep(options.length, 1600);
  return (
    <div ref={ref} className="flex h-full items-center justify-center">
      <div className="flex rounded-full border border-line bg-fill p-1 text-xs font-semibold lg:text-[11px]">
        {options.map((o, i) => (
          <span key={o} className={`relative rounded-full px-2.5 py-1.5 whitespace-nowrap transition-colors duration-200 ${i === step ? "text-on-accent" : "text-body"}`}>
            {i === step && <motion.span layoutId="privacy-pill" className="absolute inset-0 rounded-full bg-accent" transition={spring} />}
            <span className="relative">{o}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function RtlVisual({ ltr, rtl, hovered }: { ltr: string; rtl: string; hovered: boolean }) {
  const fine = useFinePointer();
  const [ref, step] = useLoopStep(2, 2400);
  // Hover drives it on desktop. Touch screens have no hover, so it alternates on its own.
  const flipped = fine ? hovered : step === 1;
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-3">
      <div className="relative h-9 overflow-hidden rounded-xl bg-fill px-3 leading-9">
        <AnimatePresence initial={false} mode="wait">
          <motion.p
            key={flipped ? "rtl" : "ltr"}
            lang={flipped ? "ar" : undefined}
            dir={flipped ? "rtl" : "ltr"}
            className="truncate text-sm leading-9 font-medium"
            style={{ fontFamily: flipped ? "var(--font-arabic)" : undefined }}
            initial={{ opacity: 0, x: flipped ? 28 : -28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: flipped ? 28 : -28 }}
            transition={{ duration: durations.ui - 0.1, ease: easeOutExpo }}
          >
            {flipped ? rtl : ltr}
          </motion.p>
        </AnimatePresence>
      </div>
      <motion.svg
        viewBox="0 0 48 12"
        className="h-3 self-center text-accent-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        animate={{ scaleX: flipped ? -1 : 1 }}
        transition={spring}
        aria-hidden
      >
        <path d="M2 6h44M40 1l6 5-6 5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </div>
  );
}

/* ─────────── Card ─────────── */

function Feature({
  title,
  body,
  accent,
  className = "",
  index,
  visualClass = "h-24 sm:h-32",
  render,
}: {
  title: string;
  body: string;
  accent: string;
  className?: string;
  index: number;
  visualClass?: string;
  render: (hovered: boolean) => ReactNode;
}) {
  const reduced = useReduced();
  const [hovered, setHovered] = useState(false);
  return (
    <motion.li
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: durations.section - 0.15, ease: easeOutExpo, delay: (index % 4) * 0.07 }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <TiltCard accent={accent} className="flex h-full flex-col p-4 sm:p-5">
        <div className={visualClass}>{render(hovered)}</div>
        <h3 className="mt-3 text-[15px] leading-snug font-semibold [overflow-wrap:anywhere] sm:mt-4 sm:text-base">{title}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-body sm:text-sm">{body}</p>
      </TiltCard>
    </motion.li>
  );
}

export function Features() {
  const { features } = useT();
  const c = features.cards;
  return (
    <section id="features" className="section">
      <div className="container-page">
        <SplitText text={features.title} className="display h2 max-w-[22ch]" />
        <LoopGate>
          {/* Phones get a real two-column bento: wide cards for what needs the width, pairs for the rest. */}
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-12 lg:grid-cols-4">
            <Feature index={0} className="col-span-2" accent={colors.accent} title={c.capture.title} body={c.capture.body} render={() => <CaptureVisual />} />
            <Feature index={1} className="col-span-2 sm:col-span-1" visualClass="h-[88px] sm:h-32" accent={colors.summary} title={c.journal.title} body={c.journal.body} render={() => <JournalVisual moods={c.journal.moods} accent={colors.summary} />} />
            <Feature index={2} visualClass="h-[120px] sm:h-32" accent={colors.accent} title={c.eyes.title} body={c.eyes.body} render={() => <LockVisual accent="var(--color-accent)" />} />
            <Feature index={3} visualClass="h-[120px] sm:h-32" accent={colors.emotional} title={c.stories.title} body={c.stories.body} render={() => <StoriesVisual />} />
            <Feature index={4} className="col-span-2 sm:col-span-1" visualClass="h-16 sm:h-32" accent={colors.symbols} title={c.tag.title} body={c.tag.body} render={() => <TagVisual />} />
            <Feature index={5} className="col-span-2" accent={colors.summary} title={c.score.title} body={c.score.body} render={() => <ScoreVisual scoreLabel={c.score.scoreLabel} streakLabel={c.score.streakLabel} />} />
            <Feature index={6} visualClass="h-[120px] sm:h-32" accent={colors.symbols} title={c.reminder.title} body={c.reminder.body} render={() => <ClockVisual />} />
            <Feature index={7} visualClass="h-[120px] sm:h-32" accent={colors.reflection} title={c.dictionary.title} body={c.dictionary.body} render={() => <DictionaryVisual />} />
            <Feature index={8} className="col-span-2 sm:col-span-1" visualClass="h-16 sm:h-32" accent={colors.accent} title={c.privacy.title} body={c.privacy.body} render={() => <PrivacyVisual options={c.privacy.options} />} />
            <Feature index={9} className="col-span-2 sm:col-span-1" accent={colors.summary} title={c.rtl.title} body={c.rtl.body} render={(h) => <RtlVisual ltr={c.rtl.sampleLtr} rtl={c.rtl.sample} hovered={h} />} />
          </ul>
        </LoopGate>
      </div>
    </section>
  );
}
