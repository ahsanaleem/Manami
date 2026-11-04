import { ImageResponse } from "next/og";
import { LOGO_BODY, LOGO_LAVENDER, LOGO_PILLOW, LOGO_VIEWBOX } from "@/lib/logo";

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
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: "radial-gradient(circle at 80% 20%, #2d2f78 0%, #0A0E24 62%)",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <svg width="220" height="100" viewBox={LOGO_VIEWBOX}>
          <path fill={LOGO_LAVENDER} fillRule="evenodd" d={LOGO_PILLOW} />
          <path fill="#EBE9FB" fillRule="evenodd" d={LOGO_BODY} />
        </svg>
        <div style={{ fontSize: 56, fontWeight: 700, color: "#EBE9FB" }}>manami</div>
      </div>
      <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1, marginTop: 44, maxWidth: 960 }}>Your dreams are trying to tell you something.</div>
    </div>,
    size,
  );
}
