"use client";

import { AnimatePresence, motion, useMotionValue, type MotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLang, useT } from "@/components/global/Providers";
import { CountUp } from "@/components/motion/CountUp";
import { Magnetic } from "@/components/motion/Magnetic";
import { useOnScreen, useReduced } from "@/components/motion/hooks";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Logo } from "@/components/ui/Logo";
import type { ReadingSlide, SlideId } from "@/lib/content";
import { colors, durations, easeOutExpo, spring, timings } from "@/lib/tokens";

const ACCENTS: Record<SlideId, string> = {
  summary: colors.summary,
  spiritual: colors.spiritual,
  emotional: colors.emotional,
  symbols: colors.symbols,
  reflection: colors.reflection,
};

const WIPE_SECONDS = 0.9;
const HOLD_MS = 280; // a press longer than this is a hold (pause), not a tap
const SWIPE_PX = 48;

const backdrop = (accent: string) =>
  `radial-gradient(120% 82% at 50% 46%, color-mix(in srgb, ${accent} var(--wash-1), var(--color-bg)) 0%, color-mix(in srgb, ${accent} var(--wash-2), var(--color-bg)) 55%, var(--color-bg) 100%)`;

type Wipe = { key: number; accent: string; x: number; y: number; radius: number };

/* ─────────── Slide content ─────────── */

function SlideContent({ slide, live }: { slide: ReadingSlide; live: boolean }) {
  const accent = ACCENTS[slide.id];
  const { sign } = useLang();
  const reduced = useReduced();

  const emoji = <span className="block text-4xl md:text-5xl">{slide.emoji}</span>;

  return (
    <div>
      {live ? (
        <motion.div
          initial={reduced ? { opacity: 0 } : { scale: 0, rotate: -24 * sign }}
          animate={reduced ? { opacity: 1 } : { scale: 1, rotate: 0 }}
          transition={{ ...spring, stiffness: 320, damping: 16 }}
          className="inline-block origin-center"
        >
          {emoji}
        </motion.div>
      ) : (
        emoji
      )}

      {live ? (
        <SplitText as="h3" text={slide.title} play delay={0.05} className="display mt-4 text-[clamp(1.75rem,4.4vw,3rem)]" />
      ) : (
        <h3 className="display mt-4 text-[clamp(1.75rem,4.4vw,3rem)]">{slide.title}</h3>
      )}

      {slide.quote && (
        <motion.blockquote
          initial={live ? { opacity: 0, y: 26 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.ui + 0.15, ease: easeOutExpo, delay: 0.16 }}
          className="relative mt-6 overflow-hidden rounded-2xl bg-white/[0.06] p-4 ps-6 text-base leading-relaxed font-medium text-white md:p-5 md:ps-7 md:text-xl"
        >
          <motion.span
            aria-hidden
            className="absolute inset-y-0 start-0 w-1 origin-top"
            style={{ background: accent }}
            initial={live ? { scaleY: 0 } : false}
            animate={{ scaleY: 1 }}
            transition={{ duration: durations.section, ease: easeOutExpo, delay: 0.3 }}
          />
          {slide.quote}
        </motion.blockquote>
      )}

      {slide.symbols && (
        <motion.ul
          className="mt-4 grid gap-2 md:mt-6 md:grid-cols-3 md:gap-2.5"
          initial={live ? "hidden" : false}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.11, delayChildren: 0.18 } } }}
        >
          {slide.symbols.map((s) => (
            <motion.li
              key={s.name}
              className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5 md:px-4 md:py-3"
              style={{ borderInlineStart: `3px solid ${accent}` }}
              variants={{
                hidden: { opacity: 0, x: reduced ? 0 : 24 * sign },
                show: { opacity: 1, x: 0, transition: { duration: durations.ui + 0.1, ease: easeOutExpo } },
              }}
            >
              <span className="block font-semibold text-white">{s.name}</span>
              <span className="block text-sm text-white/75">{s.meaning}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}

      <motion.p
        initial={live ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: durations.ui + 0.2, delay: 0.42 }}
        className="mt-4 max-w-[46ch] text-sm leading-relaxed text-white/80 md:text-base"
      >
        {slide.body}
      </motion.p>
    </div>
  );
}

/* ─────────── Action rail ─────────── */

function RailButton({ label, onClick, children, count, pressed }: { label: string; onClick: () => void; children: ReactNode; count?: ReactNode; pressed?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.button
        type="button"
        aria-label={label}
        aria-pressed={pressed}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.88 }}
        transition={spring}
        className="relative grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        {children}
      </motion.button>
      {count !== undefined && <span className="text-xs font-semibold text-white tabular-nums">{count}</span>}
    </div>
  );
}

function Tick({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={spring}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const BURST = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return {
    x: Math.round(Math.cos(a) * (34 + (i % 3) * 12)),
    y: Math.round(Math.sin(a) * (34 + (i % 3) * 12)),
    color: i % 2 ? colors.emotional : "#FF9A5A",
  };
});

function ActionRail({ accent }: { accent: string }) {
  const { reading } = useT();
  const reduced = useReduced();
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);
  const [saved, setSaved] = useState(false);
  const [commented, setCommented] = useState(false);
  const [shared, setShared] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: "Manami", url });
      else await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 1500);
    } catch {
      // The share sheet was dismissed, so there's nothing to confirm.
    }
  };

  return (
    <div className="flex items-start justify-around gap-3 sm:flex-col sm:justify-start sm:gap-4">
      <RailButton
        label={reading.actions.like}
        pressed={liked}
        onClick={() => {
          if (!liked) setBurst((b) => b + 1);
          setLiked((v) => !v);
        }}
        count={liked ? <Tick value="2,101" /> : burst ? <Tick value="2.1k" /> : <CountUp to={2100} format={(n) => `${(n / 1000).toFixed(1)}k`} />}
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="size-5"
          fill={liked ? colors.emotional : "none"}
          stroke={liked ? colors.emotional : "currentColor"}
          strokeWidth="2"
          animate={liked && !reduced ? { scale: [1, 1.45, 1] } : { scale: 1 }}
          transition={{ duration: 0.35 }}
          aria-hidden
        >
          <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.7 4.5c2.2 0 3.9 1.2 5.3 3 1.4-1.8 3.1-3 5.3-3 3.7 0 5.800 3.800 4.300 7.300C19.500 16.400 12 21 12 21z" />
        </motion.svg>
        {!reduced && burst > 0 && (
          <span key={burst} aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
            {BURST.map((p, i) => (
              <motion.span
                key={i}
                className="absolute size-1.5 rounded-full"
                style={{ background: p.color }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.2 }}
                transition={{ duration: 0.7, ease: easeOutExpo }}
              />
            ))}
          </span>
        )}
      </RailButton>

      <RailButton label={reading.actions.save} pressed={saved} onClick={() => setSaved((v) => !v)}>
        <svg viewBox="0 0 24 24" className="size-5" fill={saved ? accent : "none"} stroke={saved ? accent : "currentColor"} strokeWidth="2" aria-hidden>
          <path d="M6 3h12v18l-6-4.500L6 21z" strokeLinejoin="round" />
        </svg>
      </RailButton>

      <RailButton label={reading.actions.comments} onClick={() => setCommented(true)} count={<Tick value={commented ? "49" : "48"} />}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 12a8 8 0 0 1-11.800 7L4 20.500 5.500 16A8 8 0 1 1 21 12z" strokeLinejoin="round" />
        </svg>
      </RailButton>

      <RailButton label={reading.actions.share} onClick={share}>
        {shared ? (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke={colors.accent} strokeWidth="2.500" aria-hidden>
            <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" strokeLinejoin="round" />
          </svg>
        )}
      </RailButton>
    </div>
  );
}

/* ─────────── Progress bar ─────────── */

function Segments({ count, index, progress, origin }: { count: number; index: number; progress: MotionValue<number>; origin: string }) {
  return (
    <div aria-hidden className="flex gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
          {i === index ? (
            <motion.div className="h-full w-full rounded-full bg-white" style={{ scaleX: progress, transformOrigin: origin }} />
          ) : (
            <div className="h-full w-full rounded-full bg-white" style={{ transform: `scaleX(${i < index ? 1 : 0})`, transformOrigin: origin }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────── Section ─────────── */

export function ReadingShowcase() {
  const { reading, a11y } = useT();
  const { sign, dir } = useLang();
  const reduced = useReduced();
  const slides = reading.slides;
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [wipes, setWipes] = useState<Wipe[]>([]);
  const [base, setBase] = useState<string>(ACCENTS[slides[0].id]);

  const sectionRef = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(sectionRef, "-15% 0px");
  const hovering = useRef(false);
  const holding = useRef(false);
  const elapsed = useRef(0);
  const wipeKey = useRef(0);
  const progress = useMotionValue(0);
  const press = useRef<{ x: number; t: number } | null>(null);
  const indexRef = useRef(0);

  const goTo = useCallback(
    (next: number, origin?: { clientX: number; clientY: number }, direction: 1 | -1 = 1) => {
      const target = (next + count) % count;
      const section = sectionRef.current;
      if (section && !reduced) {
        const r = section.getBoundingClientRect();
        // Without a click, the wipe enters from the edge the reader is heading toward.
        const edge = direction * sign === 1 ? r.width : 0;
        const x = origin ? origin.clientX - r.left : edge;
        const y = origin ? origin.clientY - r.top : r.height / 2;
        const radius = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
        wipeKey.current += 1;
        setWipes((w) => [...w.slice(-1), { key: wipeKey.current, accent: ACCENTS[slides[target].id], x, y, radius }]);
      } else {
        setBase(ACCENTS[slides[target].id]);
      }
      indexRef.current = target;
      setIndex(target);
      elapsed.current = 0;
      progress.set(0);
    },
    [count, sign, reduced, slides, progress],
  );

  // Story timer. Pauses on hover, hold, the pause button and when off-screen.
  const playing = onScreen && !userPaused && !reduced;
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      if (!hovering.current && !holding.current) {
        elapsed.current += dt;
        progress.set(Math.min(1, elapsed.current / timings.storySlideMs));
        if (elapsed.current >= timings.storySlideMs) goTo(indexRef.current + 1);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, goTo, progress]);

  // Arrow keys follow reading direction.
  useEffect(() => {
    if (!onScreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const forward = e.key === "ArrowRight" ? sign === 1 : sign === -1;
      goTo(indexRef.current + (forward ? 1 : -1), undefined, forward ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onScreen, sign, goTo]);

  const isControl = (t: EventTarget) => (t as Element).closest?.("button, a");

  const onPointerDown = (e: React.PointerEvent) => {
    if (isControl(e.target)) return;
    press.current = { x: e.clientX, t: performance.now() };
    holding.current = true;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    holding.current = false;
    const p = press.current;
    press.current = null;
    if (!p || isControl(e.target)) return;
    const dx = e.clientX - p.x;
    // Swiping toward the reading start moves forward.
    if (Math.abs(dx) > SWIPE_PX) {
      const forward = dx * sign < 0;
      goTo(indexRef.current + (forward ? 1 : -1), e, forward ? 1 : -1);
      return;
    }
    if (performance.now() - p.t > HOLD_MS) return;
    const r = e.currentTarget.getBoundingClientRect();
    const inEndHalf = (e.clientX - r.left) / r.width > 0.5 === (sign === 1);
    goTo(indexRef.current + (inEndHalf ? 1 : -1), e, inEndHalf ? 1 : -1);
  };

  const slide = slides[index];
  const accent = ACCENTS[slide.id];
  const prevNext = (direction: 1 | -1) => goTo(index + direction, undefined, direction);

  return (
    <section id="reading" ref={sectionRef} className="section relative isolate overflow-hidden">
      {/* Background: the base colour plus any wipes still growing on top of it */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{ background: backdrop(base) }}
          key={reduced ? base : "base"}
          initial={reduced ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: durations.ui }}
        />
        {wipes.map((w) => (
          <motion.div
            key={w.key}
            className="absolute inset-0"
            style={{ background: backdrop(w.accent) }}
            initial={{ clipPath: `circle(0px at ${w.x}px ${w.y}px)` }}
            animate={{ clipPath: `circle(${w.radius}px at ${w.x}px ${w.y}px)` }}
            transition={{ duration: WIPE_SECONDS, ease: easeOutExpo }}
            onAnimationComplete={() => {
              setBase(w.accent);
              setWipes((all) => all.filter((o) => o.key >= w.key));
            }}
          />
        ))}
        {/* Blend into the black sections above and below */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="container-page flex flex-col items-center">
        <SplitText text={reading.title} className="display h2 max-w-[18ch] text-center" />

        <Reveal className="mt-6 w-full max-w-[860px] md:mt-10">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={reading.title}
            className="stay-dark relative cursor-pointer touch-pan-y rounded-[var(--radius-card-lg)] border border-white/15 bg-[var(--story-card)] p-4 backdrop-blur-xl select-none md:p-7"
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") hovering.current = true;
            }}
            onPointerLeave={() => {
              hovering.current = false;
              holding.current = false;
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              holding.current = false;
              press.current = null;
            }}
          >
            <Segments count={count} index={index} progress={progress} origin={dir === "rtl" ? "right center" : "left center"} />

            <div className="mt-4 flex items-center gap-3">
              <Logo className="w-12 shrink-0" />
              <div className="min-w-0 text-sm leading-tight">
                <p className="font-semibold text-white">{reading.dreamTitle}</p>
                <p className="text-white/70">{reading.dreamLabel}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:gap-8">
              {/* The invisible copies hold the tallest slide's height, so nothing jumps. */}
              <div className="grid min-w-0 flex-1" aria-live={playing ? "off" : "polite"}>
                {slides.map((s) => (
                  <div key={s.id} aria-hidden className="invisible [grid-area:1/1]">
                    <SlideContent slide={s} live={false} />
                  </div>
                ))}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${slide.id}-${dir}`}
                    className="flex flex-col justify-center [grid-area:1/1] sm:block"
                    exit={{ opacity: 0, x: reduced ? 0 : -18 * sign }}
                    transition={{ duration: durations.micro }}
                  >
                    <SlideContent slide={slide} live />
                  </motion.div>
                </AnimatePresence>
              </div>
              <ActionRail accent={accent} />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 sm:mt-6">
              <p className="text-xs font-medium text-white/75 tabular-nums">
                {a11y.slideOf.replace("{n}", String(index + 1)).replace("{total}", String(count))}
              </p>
              <div className="flex items-center gap-2">
                <NavButton label={a11y.prev} onClick={() => prevNext(-1)}>
                  <path d="m15 5-7 7 7 7" />
                </NavButton>
                {!reduced && (
                  <NavButton label={userPaused ? a11y.playStory : a11y.pauseStory} flip={false} onClick={() => setUserPaused((v) => !v)}>
                    {userPaused ? <path d="M8 5v14l11-7z" fill="currentColor" /> : <path d="M9 5v14M15 5v14" />}
                  </NavButton>
                )}
                <NavButton label={a11y.next} onClick={() => prevNext(1)}>
                  <path d="m9 5 7 7-7 7" />
                </NavButton>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-sm text-text/80">{reading.disclaimer}</p>
      </div>
    </section>
  );
}

function NavButton({ label, onClick, children, flip = true }: { label: string; onClick: () => void; children: ReactNode; flip?: boolean }) {
  return (
    <Magnetic radius={24} strength={0.25}>
      <motion.button
        type="button"
        aria-label={label}
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={spring}
        className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:border-white/50"
      >
        <svg
          viewBox="0 0 24 24"
          className={`size-5 ${flip ? "rtl:-scale-x-100" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.200"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {children}
        </svg>
      </motion.button>
    </Magnetic>
  );
}
