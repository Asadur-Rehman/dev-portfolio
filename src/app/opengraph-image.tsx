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
          backgroundColor: "#07070b",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,212,255,0.20), transparent 55%), radial-gradient(circle at 80% 80%, rgba(167,139,250,0.18), transparent 55%)",
          color: "#f4f4f7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "#8a8a99",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#34d399",
            }}
          />
          {personal.availability}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
              color: "#f4f4f7",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {personal.name}
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: "#00d4ff",
              letterSpacing: -1,
            }}
          >
            {personal.title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#b6b6c2",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {personal.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#8a8a99",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>{personal.location}</span>
          <span>{personal.university}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
