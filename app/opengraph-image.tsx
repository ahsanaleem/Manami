import { ImageResponse } from "next/og";

export const alt = "Manami: record, understand and share your dreams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 72,
        padding: "0 96px",
        background: "radial-gradient(circle at 24% 50%, #05402a 0%, #000 58%)",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <svg width="280" height="312" viewBox="0 0 120 134">
        <path fill="#00FF8C" d="M10 62a50 50 0 0 1 100 0v70l-16.7-17-16.6 17L60 115l-16.7 17-16.6-17L10 132z" />
        <circle cx="42" cy="58" r="15" fill="#fff" />
        <circle cx="78" cy="58" r="15" fill="#fff" />
        <circle cx="42" cy="58" r="7" fill="#04140C" />
        <circle cx="78" cy="58" r="7" fill="#04140C" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: "#00FF8C" }}>manami</div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, marginTop: 20 }}>Your dreams are trying to tell you something.</div>
      </div>
    </div>,
    size,
  );
}
