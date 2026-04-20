import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Prob Terminal — NIFTY 500 Probability Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07070e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(20,217,196,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,217,196,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          display: "flex",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: "linear-gradient(135deg, #14d9c4, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 900, color: "#07070e",
          }}>P</div>
          <span style={{ color: "#14d9c4", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>PROB</span>
          <span style={{ color: "#e8e8f2", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>TERMINAL</span>
          <span style={{ marginLeft: 8, color: "#555", fontSize: 14, fontWeight: 400 }}>β</span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div style={{ color: "#555", fontSize: 16, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
            NIFTY 500 · India Equity Markets
          </div>
          <div style={{
            fontSize: 58, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #14d9c4 0%, #a78bfa 60%, #e8e8f2 100%)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}>
            The Probability<br />Engine for Indian<br />Equity Markets
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex", gap: 40, marginTop: 48,
          paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)",
        }}>
          {[
            { label: "Observations", value: "845,220" },
            { label: "Data Period", value: "2018 – 2026" },
            { label: "Sectors", value: "17 NIFTY 500" },
            { label: "Updated", value: "Weekly" },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ color: "#444", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              <div style={{ color: "#14d9c4", fontSize: 20, fontWeight: 700, fontFamily: "monospace" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ position: "absolute", bottom: 40, right: 72, color: "#333", fontSize: 14 }}>
          prob-terminal.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
