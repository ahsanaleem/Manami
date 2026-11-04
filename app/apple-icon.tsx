import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
      <svg width="120" height="134" viewBox="0 0 120 134">
        <path fill="#00FF8C" d="M10 62a50 50 0 0 1 100 0v70l-16.7-17-16.6 17L60 115l-16.7 17-16.6-17L10 132z" />
        <circle cx="42" cy="58" r="15" fill="#fff" />
        <circle cx="78" cy="58" r="15" fill="#fff" />
        <circle cx="42" cy="58" r="7" fill="#04140C" />
        <circle cx="78" cy="58" r="7" fill="#04140C" />
      </svg>
    </div>,
    size,
  );
}
