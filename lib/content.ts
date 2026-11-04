// All English copy lives here. Arabic and French mirror this shape in lib/i18n.ts.

export type SlideId = "summary" | "spiritual" | "emotional" | "symbols" | "reflection";

export type ReadingSlide = {
  id: SlideId;
  emoji: string;
  title: string;
  quote?: string;
  body: string;
  symbols?: { name: string; meaning: string }[];
};

export type PlanFeature = { label: string; included: boolean };

export const content = {
  meta: {
    title: "Manami: record, understand and share your dreams",
    description:
      "Capture your dreams by voice, video or text the moment you wake. Manami gives you a reflective reading rooted in Islamic tradition, and you decide who sees it.",
  },
  a11y: {
    skipToContent: "Skip to content",
    skipIntro: "Skip intro",
    phoneHome: "Manami app capture screen with video, voice and text tabs and a row of friends' stories",
    phoneHow: "Manami app moving from recording a dream, to an AI reading, to sharing it as a story",
    phoneSocial: "Manami app showing a shared dream reel",
    logo: "Manami logo",
    pauseStory: "Pause slideshow",
    playStory: "Play slideshow",
    prev: "Previous slide",
    next: "Next slide",
    slideOf: "Slide {n} of {total}",
  },
  loader: {
    wordmark: "manami",
    tagline: "dream · share · discover",
  },
  nav: {
    links: [
      { label: "How it works", href: "#how" },
      { label: "Readings", href: "#reading" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Get the app",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
    home: "Manami home",
  },
  stores: {
    appStoreTop: "Download on the",
    appStore: "App Store",
    googlePlayTop: "Get it on",
    googlePlay: "Google Play",
  },
  hero: {
    headline: "Your dreams are trying to tell you something.",
    sub: "Record a dream the moment you wake. Manami turns it into a reading you can reflect on, keep to yourself or share with friends.",
    trust: "Your dreams stay private unless you share them.",
  },
  screen: {
    tabs: ["Video", "Voice", "Text"],
    prompt: "What did you dream?",
    you: "You",
    recording: "Listening…",
    aiReading: "AI reading…",
    readingTitle: "Dark Room to Light",
    readingLine: "You moved from darkness into light.",
    posted: "Shared to your story",
    friendsSaw: "Aisha and Omar saw your dream",
    friendNames: { Aisha: "Aisha", Yusuf: "Yusuf", Fatima: "Fatima", Omar: "Omar", Sara: "Sara" },
  },
  how: {
    title: "From half-remembered to understood",
    steps: [
      {
        title: "Capture it before it fades",
        body: "Tap once and talk. Voice, video or text, whichever is easiest with your eyes half open.",
      },
      {
        title: "Read what it might mean",
        body: "Manami reads the symbols and feelings in your dream and writes you a reading in seconds.",
      },
      {
        title: "Share it, or don't",
        body: "Post your dream as a story for close friends, or keep it in your journal where only you can see it.",
      },
    ],
  },
  reading: {
    title: "One dream, five ways to read it",
    dreamLabel: "Sample dream",
    dreamTitle: "Dark Room to Light",
    disclaimer: "Interpretations are reflective insights, not absolute truth.",
    actions: { like: "Like", save: "Save", comments: "Comments", share: "Share" },
    slides: [
      {
        id: "summary",
        emoji: "🌙",
        title: "Dream Summary",
        quote: "You moved from darkness into light — a journey already begun in your waking life.",
        body: "You stood in a dark room, noticed a light, and walked toward an open door.",
      },
      {
        id: "spiritual",
        emoji: "✨",
        title: "Spiritual Insight",
        quote: "Seeing light in a dream is among the most blessed signs in Islamic tradition.",
        body: "Light is often read as guidance. Here it appears just as you begin to search.",
      },
      {
        id: "emotional",
        emoji: "❤️",
        title: "Emotional Layer",
        quote: "Your subconscious is ready. The feelings of peace confirm that.",
        body: "You felt calm rather than afraid. That calm is worth paying attention to.",
      },
      {
        id: "symbols",
        emoji: "💡",
        title: "Key Symbols",
        body: "Three images carried this dream.",
        symbols: [
          { name: "Dark Room", meaning: "uncertainty · searching · the unknown" },
          { name: "Light Source", meaning: "guidance · divine favor · clarity" },
          { name: "Open Door", meaning: "new opportunity · invitation · threshold" },
        ],
      },
      {
        id: "reflection",
        emoji: "♻️",
        title: "Reflection",
        quote: "The door is open — all that remains is stepping through.",
        body: "What is one small step you could take toward it this week?",
      },
    ] as ReadingSlide[],
  },
  features: {
    title: "Everything a dream needs, from first memory to last word",
    cards: {
      capture: { title: "Voice, video or text", body: "Capture a dream however you wake up." },
      journal: {
        title: "Memories journal",
        body: "Every dream, tagged by how it felt.",
        moods: ["Peaceful", "Strange", "Happy", "Emotional", "Confused"],
      },
      eyes: { title: "My Eyes Only", body: "A locked vault for the dreams you'll never post." },
      stories: { title: "Stories and reels", body: "Turn a dream into a short story your friends can watch." },
      tag: { title: "Tag friends", body: "Dreamed about someone? Let them know." },
      score: { title: "Dream Score and streak", body: "Build the habit of remembering.", scoreLabel: "Dream Score", streakLabel: "day streak" },
      reminder: { title: "Morning reminder", body: "A gentle nudge before the dream slips away." },
      dictionary: { title: "Islamic symbol dictionary", body: "Look up what water, light or a door can signify." },
      privacy: { title: "Privacy controls", body: "Choose who sees each dream.", options: ["Everyone", "Friends", "Only Me"] },
      rtl: { title: "Arabic, right to left", body: "A full Arabic experience, not a translation bolted on.", sample: "رأيت نوراً في منامي", sampleLtr: "I saw light in my dream" },
    },
  },
  social: {
    title: "Dream together",
    sub: "See what your friends dreamed, react to it and find out when you've dreamed the same thing.",
    reels: [
      { title: "The White Dove", emoji: "🕊️", quote: "Peace is coming — your soul already knows it.", by: "Aisha" },
      { title: "Ocean at Dawn", emoji: "🌊", quote: "What felt too deep yesterday is carrying you today.", by: "Omar" },
      { title: "The Garden Gate", emoji: "🌿", quote: "Something you planted long ago is ready to be seen.", by: "Fatima" },
      { title: "Stairs Without End", emoji: "🪜", quote: "You keep climbing. Maybe the view is already enough.", by: "Yusuf" },
      { title: "A Letter From Home", emoji: "✉️", quote: "Someone is thinking of you. Write to them first.", by: "Sara" },
      { title: "Above the City", emoji: "🏙️", quote: "From up here, the worry looks a lot smaller.", by: "Aisha" },
    ],
    bubbles: ["❤️", "💬", "✨", "❤️", "🌙", "💬"],
  },
  privacy: {
    title: "A dream is yours until you say otherwise",
    points: [
      { title: "Private by default", body: "Nothing you record is shared unless you choose to share it." },
      { title: "A locked vault", body: "Keep your most personal dreams in My Eyes Only." },
      { title: "Your data, your call", body: "Export or delete your data anytime." },
    ],
  },
  pricing: {
    title: "Start free. Upgrade when your dreams want more.",
    monthly: "Monthly",
    yearly: "Yearly",
    discount: "−30%",
    perMonth: "/month",
    forever: "forever",
    billedYearly: "Billed $83.88 a year",
    billedMonthly: "Billed monthly",
    popular: "Most Popular",
    free: {
      name: "Free",
      cta: "Start for free",
      features: [
        { label: "3 interpretations/month", included: true },
        { label: "Text input only", included: true },
        { label: "Journal up to 3 dreams", included: true },
        { label: "Voice & video capture", included: false },
        { label: "AI reels", included: false },
        { label: "Social sharing", included: false },
      ] as PlanFeature[],
    },
    premium: {
      name: "Premium",
      cta: "Unlock Premium Dreams",
      features: [
        { label: "Unlimited interpretations", included: true },
        { label: "Voice capture", included: true },
        { label: "Video capture", included: true },
        { label: "Full journal history", included: true },
        { label: "AI reels & stories", included: true },
        { label: "Share to WhatsApp, TikTok and IG", included: true },
        { label: "Advanced Islamic symbol dictionary", included: true },
        { label: "Priority AI processing", included: true },
      ] as PlanFeature[],
    },
    note: "Cancel anytime. No questions asked.",
  },
  faq: {
    title: "Questions, answered",
    items: [
      {
        q: "Who can see my dreams?",
        a: "Only you, unless you choose otherwise. Each dream can be set to Everyone, Friends or Only Me, and My Eyes Only keeps your most personal dreams in a locked vault. You can export or delete your data anytime.",
      },
      {
        q: "How does the AI interpret my dreams?",
        a: "Manami looks at the symbols, people and feelings you describe, then writes a reading with a summary, spiritual insight, emotional layer, key symbols and a reflection. Treat it as a prompt for your own thinking. Interpretations are reflective insights, not absolute truth.",
      },
      {
        q: "What Islamic sources does Manami draw on?",
        a: "Spiritual insights and the symbol dictionary are inspired by the tradition of dream interpretation in Islamic scholarship. They aren't religious rulings, so for questions of faith please speak with a scholar you trust.",
      },
      {
        q: "Does Manami work in Arabic?",
        a: "Yes. You can use the app in Arabic with a full right-to-left layout, and it's also available in English and French.",
      },
      {
        q: "What do I get for free?",
        a: "The Free plan includes 3 interpretations a month, text input and a journal of up to 3 dreams. Premium adds unlimited interpretations, voice and video capture, your full journal history, AI reels and stories, and sharing.",
      },
      {
        q: "How do I cancel Premium?",
        a: "Cancel anytime from your App Store or Google Play subscription settings. No questions asked, and Premium stays active until the end of the period you've paid for.",
      },
    ],
  },
  cta: {
    headline: "What did you dream last night?",
    sub: "Write it down before breakfast. It only takes a moment.",
  },
  footer: {
    tagline: "dream · share · discover",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
    ],
    socialLabel: "Manami on {name}",
    copyright: "© 2026 Manami · Made with 🌙",
  },
};

export type Content = typeof content;
