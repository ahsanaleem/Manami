// Brand + motion tokens. Colours are mirrored as CSS variables in app/globals.css.
export const colors = {
  bg: "#0A0E24",
  surface: "#121836",
  surface2: "#1A2147",
  border: "#2A3260",
  accent: "#AEA8E9",
  text: "#FFFFFF",
  body: "#AAB0CC",
  muted: "#7B81A3",
  summary: "#6C63D9",
  spiritual: "#AEA8E9",
  emotional: "#EC4899",
  symbols: "#3B82F6",
  reflection: "#10B981",
} as const;

// Shared easing and spring. Tweak these to change the feel of the whole page.
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const spring = { type: "spring", stiffness: 260, damping: 24 } as const;

// Seconds. micro 150–250ms, UI 300–500ms, section 700–1000ms.
export const durations = {
  micro: 0.2,
  ui: 0.4,
  section: 0.85,
} as const;

export const timings = {
  /** Total intro length in ms. The CSS animation delays in globals.css (.loader-*) follow this. */
  loaderMs: 1800,
  /** Dream Reading slide length in ms. */
  storySlideMs: 6000,
  /** Language crossfade, one direction, in ms. */
  langFadeMs: 140,
} as const;

export const friends = [
  { name: "Aisha", emoji: "🌸", ring: "#EC4899" },
  { name: "Yusuf", emoji: "🦁", ring: "#7F8CFF" },
  { name: "Fatima", emoji: "🌙", ring: "#6C63D9" },
  { name: "Omar", emoji: "🌊", ring: "#3B82F6" },
  { name: "Sara", emoji: "🍃", ring: "#AEA8E9" },
] as const;

export const storeLinks = {
  // Replace with the real listing URLs when the app is live.
  appStore: "#get-app",
  googlePlay: "#get-app",
} as const;
