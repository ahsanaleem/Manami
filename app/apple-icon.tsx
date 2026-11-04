import { ImageResponse } from "next/og";
import { LOGO_BODY, LOGO_LAVENDER, LOGO_PILLOW, LOGO_VIEWBOX } from "@/lib/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0E24" }}>
      <svg width="146" height="67" viewBox={LOGO_VIEWBOX}>
        <path fill={LOGO_LAVENDER} fillRule="evenodd" d={LOGO_PILLOW} />
        <path fill="#EBE9FB" fillRule="evenodd" d={LOGO_BODY} />
      </svg>
    </div>,
    size,
  );
}
