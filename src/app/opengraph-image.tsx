import { ImageResponse } from "next/og";
import { personal } from "@/data/personal";

export const runtime = "edge";
export const alt = `${personal.name} — ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#e3e0da",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(29,78,216,0.1), transparent 55%), radial-gradient(circle at 80% 80%, rgba(3,105,161,0.07), transparent 55%)",
          color: "#1a1814",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "#6b6560",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: "#22c55e" }} />
          {personal.availability}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -2, lineHeight: 1, color: "#1a1814" }}>
            {personal.name}
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, color: "#1d4ed8", letterSpacing: -1 }}>
            {personal.title}
          </div>
          <div style={{ fontSize: 28, color: "#44403c", maxWidth: 900, lineHeight: 1.4 }}>
            {personal.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#6b6560",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>{personal.location}</span>
          <span>asad-ur-rehman.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
