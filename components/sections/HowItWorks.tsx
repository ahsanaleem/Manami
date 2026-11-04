"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useLang, useT } from "@/components/global/Providers";
import { GlowPulse } from "@/components/motion/GlowPulse";
import { useReduced } from "@/components/motion/hooks";
import { LoopGate } from "@/components/motion/LoopGate";
import { Reveal } from "@/components/motion/Reveal";
import { Logo } from "@/components/ui/Logo";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { StatusBar, StoryRow } from "@/components/ui/screens";
import { colors, spring } from "@/lib/tokens";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Scroll distance while pinned, as a share of the viewport. More means slower.
const PIN_LENGTH = "+=260%";
const BARS = 26;

const formatTimer = (s: number) => `00:${String(Math.floor(s)).padStart(2, "0")}`;

function Waveform({ playing }: { playing: boolean }) {
  return (
    <div className="flex h-16 items-center justify-center gap-[3px]" dir="ltr">
      {Array.from({ length: BARS }, (_, i) => (
        <span
          key={i}
          className={`w-[4px] rounded-full bg-accent ${playing ? "wave-bar" : ""}`}
          style={{
            height: `${Math.round(28 + Math.abs(Math.sin(i * 1.7)) * 72)}%`,
            ["--i" as string]: i,
            transform: playing ? undefined : "scaleY(0.5)",
          }}
        />
      ))}
    </div>
  );
}

function CaptureLayer({ playing, timer = "00:00" }: { playing: boolean; timer?: string }) {
  const { screen } = useT();
  return (
    <div className="flex h-full flex-col items-center bg-gradient-to-b from-[#1a2147] to-bg">
      <StatusBar />
      <p className="mt-16 text-sm font-medium text-white/70">{screen.recording}</p>
      <p dir="ltr" className="how-timer mt-2 text-5xl font-extrabold tabular-nums">
        {timer}
      </p>
      <div className="mt-14 w-full px-6">
        <Waveform playing={playing} />
      </div>
      <div className="mt-auto mb-16">
        <span className="relative grid size-20 place-items-center rounded-full bg-accent">
          {playing && (
            <>
              <span className="pulse-ring absolute inset-0 rounded-full border-2 border-accent" />
              <span className="pulse-ring absolute inset-0 rounded-full border-2 border-accent [animation-delay:0.5s]" />
            </>
          )}
          <svg viewBox="0 0 24 24" className="size-8" fill="var(--color-on-accent)" aria-hidden>
            <rect x="9" y="3" width="6" height="12" rx="3" />
            <path d="M6 11a6 6 0 0 0 12 0M12 17v4" fill="none" stroke="var(--color-on-accent)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function SkeletonLayer() {
  const { screen } = useT();
  return (
    <div className="flex h-full flex-col bg-bg px-5 pt-[120px]">
      <p className="mb-5 text-center text-sm font-medium text-accent">{screen.aiReading}</p>
      <div className="rounded-3xl border border-white/10 p-5">
        <div className="skeleton mb-4 size-10 rounded-xl" />
        <div className="skeleton mb-3 h-4 w-3/4 rounded-full" />
        <div className="skeleton mb-2 h-3 w-full rounded-full" />
        <div className="skeleton mb-2 h-3 w-11/12 rounded-full" />
        <div className="skeleton h-3 w-2/3 rounded-full" />
      </div>
    </div>
  );
}

function ReadingCard() {
  const { screen, reading } = useT();
  const dots = [colors.summary, colors.spiritual, colors.emotional, colors.symbols, colors.reflection];
  return (
    <div className="relative w-[240px] rounded-3xl border border-white/15 bg-[#1a2147] p-5 shadow-[0_0_50px_rgb(174_168_233/0.3)]">
      <span className="text-3xl">🌙</span>
      <p className="mt-3 text-lg leading-tight font-bold text-white">{screen.readingTitle}</p>
      <p className="mt-2 text-[13px] leading-snug text-white/75">{screen.readingLine}</p>
      <div className="mt-4 flex gap-1.5">
        {dots.map((c) => (
          <span key={c} className="h-1 flex-1 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <p className="mt-3 text-[11px] text-white/60">{reading.slides[0].title}</p>
      {[
        { top: -12, insetInlineStart: -6 },
        { top: 40, insetInlineEnd: -10 },
        { bottom: -10, insetInlineEnd: 30 },
      ].map((s, i) => (
        <span key={i} className="how-spark absolute text-lg" style={s}>
          ✨
        </span>
      ))}
    </div>
  );
}

function ShareBubble() {
  return (
    <span className="how-bubble grid size-11 place-items-center rounded-full bg-[#1a2147] text-xl shadow-[0_0_0_2px_#0a0e24,0_0_0_4px_#AEA8E9,0_0_22px_rgb(174_168_233/0.6)]">
      🌙
    </span>
  );
}

function ShareLayer() {
  const { screen } = useT();
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1a2147] to-bg">
      <StatusBar />
      <StoryRow lead={<ShareBubble />} />
      <div className="how-toast mt-auto mb-20 px-6 text-center">
        <p className="text-lg font-bold text-white">{screen.posted}</p>
        <p className="mt-1.5 text-[13px] text-white/70">{screen.friendsSaw}</p>
        <p className="mt-3 text-2xl">❤️ 🌙 ✨</p>
      </div>
    </div>
  );
}

/** Without pinning: the three states side by side, read in order. */
function ReducedLayout() {
  const { how, a11y } = useT();
  return (
    <section id="how" className="section">
      <div className="container-page">
        <h2 className="display h2 max-w-[20ch]">{how.title}</h2>
        <ol className="mt-14 grid gap-14 md:grid-cols-3 md:gap-6">
          {how.steps.map((step, i) => (
            <li key={step.title} className="flex flex-col items-center md:items-start">
              <PhoneFrame label={a11y.phoneHow} size="sm">
                {i === 0 && <CaptureLayer playing={false} timer="00:12" />}
                {i === 1 && (
                  <div className="grid h-full place-items-center bg-bg">
                    <ReadingCard />
                  </div>
                )}
                {i === 2 && <ShareLayer />}
              </PhoneFrame>
              <h3 className="mt-6 text-xl font-semibold">
                {i + 1}. {step.title}
              </h3>
              <p className="mt-2 text-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const reduced = useReduced();
  return reduced ? <ReducedLayout /> : <PinnedLayout />;
}

function PinnedLayout() {
  const { how, a11y } = useT();
  const { sign, lang } = useLang();
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  useGSAP(
    () => {
      // The URL bar showing or hiding on a phone must not re-measure the pin mid-scroll.
      ScrollTrigger.config({ ignoreMobileResize: true });
      const timer = root.current!.querySelector(".how-timer") as HTMLElement;
      const clock = { t: 0 };
      // The timeline runs 0 → 3, one unit per step.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: PIN_LENGTH,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const step = Math.min(2, Math.floor(self.progress * 3));
            if (step !== activeRef.current) {
              activeRef.current = step;
              setActive(step);
            }
          },
        },
      });

      // Step 1: capture
      tl.to(clock, { t: 12, duration: 0.9, onUpdate: () => (timer.textContent = formatTimer(clock.t)) }, 0);
      tl.fromTo(".how-seg-0", { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);

      // Step 2: interpret
      tl.to(".how-capture", { opacity: 0, x: -36 * sign, duration: 0.2, ease: "power2.in" }, 0.9);
      tl.fromTo(".how-skeleton", { opacity: 0, x: 36 * sign }, { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }, 1);
      tl.to(".how-skeleton", { opacity: 0, duration: 0.15 }, 1.45);
      tl.fromTo(".how-card", { opacity: 0, y: 24, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "back.out(1.6)" }, 1.5);
      tl.fromTo(".how-spark", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.04, duration: 0.12, ease: "back.out(3)" }, 1.62);
      tl.fromTo(".how-seg-1", { scaleY: 0 }, { scaleY: 1, duration: 1 }, 1);

      // Step 3: the card shrinks into the first story bubble
      tl.to(".how-spark", { opacity: 0, duration: 0.08 }, 2);
      tl.fromTo(".how-share", { opacity: 0 }, { opacity: 1, duration: 0.15 }, 2);
      tl.to(".how-card", { x: -100 * sign, y: -202, scale: 0.18, duration: 0.35, ease: "power2.inOut" }, 2.05);
      tl.to(".how-card", { opacity: 0, duration: 0.04 }, 2.38);
      tl.fromTo(".how-bubble", { scale: 0 }, { scale: 1, duration: 0.14, ease: "back.out(3.5)" }, 2.38);
      tl.fromTo(".how-toast", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.16 }, 2.5);
      tl.to({}, { duration: 0.34 }, 2.66);

      // A language switch changes text heights above this section, so re-measure after layout.
      const id = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(id);
    },
    { scope: root, dependencies: [sign, lang], revertOnUpdate: true },
  );

  return (
    <section id="how" className="relative">
      {/* Phones: text anchored under the nav, the phone centred in whatever height is left. */}
      <div
        ref={root}
        className="relative flex h-svh items-stretch overflow-hidden px-[var(--gutter)] pt-[72px] pb-3 md:items-center md:pt-16 md:pb-0 [@media(orientation:landscape)_and_(max-height:520px)]:items-center"
      >
        <LoopGate className="container-page grid h-full grid-rows-[auto_minmax(0,1fr)] gap-3 md:h-auto md:grid-cols-[minmax(0,1fr)_auto] md:grid-rows-none md:items-center md:gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.3fr)] [@media(orientation:landscape)_and_(max-height:520px)]:h-auto [@media(orientation:landscape)_and_(max-height:520px)]:grid-cols-[minmax(0,1fr)_auto] [@media(orientation:landscape)_and_(max-height:520px)]:grid-rows-none [@media(orientation:landscape)_and_(max-height:520px)]:items-center">
          <div>
            <motion.div
              className="mb-2 w-14 md:mb-5 md:w-20 [@media(max-height:720px)]:hidden"
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={spring}
            >
              <Logo />
            </motion.div>
            <Reveal>
              <h2 className="display text-[clamp(1.4rem,6.6vw,3.25rem)] md:max-w-[16ch] md:text-[clamp(1.6rem,4.2vw,3.25rem)]">{how.title}</h2>
            </Reveal>

            {/* Tablet and up: all three steps with a line drawing between them */}
            <ol className="mt-10 hidden [@media(min-width:768px)_and_(min-height:600px)]:block">
              {how.steps.map((step, i) => (
                <li key={step.title} className="relative ps-14 pb-8 last:pb-0">
                  <span
                    className={`absolute start-0 top-0 grid size-9 place-items-center rounded-full border text-sm font-semibold transition-colors duration-300 ${
                      i <= active ? "border-accent bg-accent text-on-accent" : "border-border text-body"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {i < how.steps.length - 1 && (
                    <span aria-hidden className="absolute start-[17px] top-9 bottom-0 w-0.5 overflow-hidden bg-border">
                      <span className={`how-seg-${i} block h-full w-full origin-top bg-accent-ink`} />
                    </span>
                  )}
                  <div className={`transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-75 [html[data-theme=light]_&]:opacity-90"}`}>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1 max-w-[38ch] text-sm leading-relaxed text-body">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Phone: only the active step, so the phone keeps its place */}
            <div className="mt-2 grid [@media(min-width:768px)_and_(min-height:600px)]:hidden">
              {how.steps.map((step, i) => (
                <div
                  key={step.title}
                  aria-hidden={i !== active}
                  className={`[grid-area:1/1] transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
                >
                  <h3 className="font-semibold">
                    {i + 1}/3 · {step.title}
                  </h3>
                  <p className="mt-0.5 text-[13px] leading-snug text-body">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-0 items-center justify-center">
            <GlowPulse className="top-1/2 left-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2" />
            <PhoneFrame label={a11y.phoneHow} size="pinned">
              <div className="how-capture absolute inset-0">
                <CaptureLayer playing={active === 0} />
              </div>
              <div className="how-skeleton absolute inset-0 opacity-0">
                <SkeletonLayer />
              </div>
              <div className="how-share absolute inset-0 opacity-0">
                <ShareLayer />
              </div>
              {/* Centre sits at x 140, y 280, which the fly-to-bubble tween above relies on. */}
              <div className="how-card absolute top-[170px] left-[20px] opacity-0">
                <ReadingCard />
              </div>
            </PhoneFrame>
          </div>
        </LoopGate>
      </div>
    </section>
  );
}
