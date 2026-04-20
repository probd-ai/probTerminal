"use client";

interface Props {
  value: number; // 0–100 internal value, not shown
  size?: "sm" | "md";
}

// Maps a 0-100 value to a color and label without revealing the number
function getStrengthLabel(v: number): { label: string; color: string; bg: string } {
  if (v >= 85) return { label: "Very High", color: "#14d9c4", bg: "rgba(20,217,196,0.15)" };
  if (v >= 65) return { label: "High", color: "#4ade80", bg: "rgba(74,222,128,0.12)" };
  if (v >= 45) return { label: "Mid", color: "#fbbf24", bg: "rgba(251,191,36,0.12)" };
  if (v >= 25) return { label: "Low", color: "#f97316", bg: "rgba(249,115,22,0.12)" };
  return { label: "Very Low", color: "#f43f5e", bg: "rgba(244,63,94,0.12)" };
}

export default function SignalBar({ value, size = "md" }: Props) {
  const { label, color, bg } = getStrengthLabel(value);
  const barWidth = `${Math.max(4, value)}%`;
  const height = size === "sm" ? 4 : 5;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: size === "sm" ? 6 : 8, minWidth: size === "sm" ? 80 : 100 }}>
      <div
        style={{
          flex: 1,
          height,
          borderRadius: height,
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: barWidth,
            height: "100%",
            background: color,
            borderRadius: height,
            opacity: 0.8,
          }}
        />
      </div>
      <span
        style={{
          fontSize: size === "sm" ? 10 : 11,
          fontFamily: "'JetBrains Mono', monospace",
          color,
          background: bg,
          padding: "1px 6px",
          borderRadius: 4,
          flexShrink: 0,
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
}
