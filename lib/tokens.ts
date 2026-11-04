// Brand + motion tokens. Colours are mirrored as CSS variables in app/globals.css.
export const colors = {
  bg: "#000000",
  surface: "#111111",
  surface2: "#1A1A1A",
  border: "#2A2A2A",
  accent: "#00FF8C",
  text: "#FFFFFF",
  body: "#9CA3AF",
  muted: "#6B7280",
  summary: "#A855F7",
  spiritual: "#00FF8C",
  emotional: "#EC4899",
  symbols: "#3B82F6",
  reflection: "#10B981",
  visualizeFrom: "#FF6B6B",
  visualizeTo: "#FF9A5A",
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
  { name: "Yusuf", emoji: "🦁", ring: "#FF9A5A" },
  { name: "Fatima", emoji: "🌙", ring: "#A855F7" },
  { name: "Omar", emoji: "🌊", ring: "#3B82F6" },
  { name: "Sara", emoji: "🍃", ring: "#00FF8C" },
] as const;

export const storeLinks = {
  // Replace with the real listing URLs when the app is live.
  appStore: "#get-app",
  googlePlay: "#get-app",
} as const;
