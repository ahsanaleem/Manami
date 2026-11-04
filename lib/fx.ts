import type Lenis from "lenis";

// Small shared state read inside animation frames, so scroll updates never re-render React.
export const fx = {
  /** Lenis instance, once smooth scroll has started. */
  lenis: null as Lenis | null,
  /** Scroll velocity in px per frame. The starfield streaks from this. */
  velocity: 0,
  /** Target star brightness. The final CTA raises it while in view. */
  starBoost: 1,
  /** Light mode draws the sky as faint dark specks rather than white stars. */
  lightTheme: false,
};
