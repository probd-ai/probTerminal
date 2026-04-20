"use client";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell,
  ReferenceLine,
} from "recharts";
import type { Sector } from "@/lib/types";

const STATE_COLORS: Record<string, string> = {
  HOT: "#14d9c4",
  WARM: "#4ade80",
  COOLING: "#fbbf24",
  COLD: "#f43f5e",
};

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload as Sector;
  return (
    <div
      style={{
        background: "#121226",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 8,
        padding: "10px 14px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        minWidth: 200,
      }}
    >
      <div style={{ fontWeight: 600, color: "#e8e8f2", marginBottom: 6, fontFamily: "Inter, sans-serif" }}>
        {d.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "var(--text-2)" }}>Signal Strength</span>
          <span style={{ color: STATE_COLORS[d.state] }}>{d.state}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "var(--text-2)" }}>Breadth</span>
          <span style={{ color: "#e8e8f2" }}>{(d.breadth_pct * 100).toFixed(0)}%</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "var(--text-2)" }}>7d Momentum</span>
          <span style={{ color: d.momentum_7d >= 0 ? "#14d9c4" : "#f43f5e" }}>
            {d.momentum_7d >= 0 ? "+" : ""}{d.momentum_7d.toFixed(1)}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "var(--text-2)" }}>Stocks</span>
          <span style={{ color: "#e8e8f2" }}>{d.stock_count}</span>
        </div>
        {d.ignition_alert && (
          <div style={{ color: "#fbbf24", marginTop: 4, fontFamily: "Inter, sans-serif", fontSize: 11 }}>
            🔥 IGNITION ACTIVE
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
  sectors: Sector[];
}

export default function SectorBubbleChart({ sectors }: Props) {
  const data = sectors.map((s) => ({
    ...s,
    x: s.median_truevx,
    y: s.momentum_7d,
    z: s.stock_count,
  }));

  return (
    <div style={{ width: "100%", height: 340, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <ScatterChart margin={{ top: 16, right: 16, bottom: 16, left: 8 }}>
          <CartesianGrid
            strokeDasharray="3 6"
            stroke="rgba(255,255,255,0.04)"
          />

          <XAxis
            type="number"
            dataKey="x"
            name="Signal Strength"
            domain={[15, 85]}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{
              value: "← Weaker · Sector Signal Strength · Stronger →",
              position: "insideBottom",
              offset: -8,
              fill: "#50506a",
              fontSize: 10,
              fontFamily: "Inter, sans-serif",
            }}
          />

          <YAxis
            type="number"
            dataKey="y"
            name="7d Momentum"
            domain={[-6, 7]}
            tick={{ fill: "#50506a", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
            tickLine={false}
            axisLine={false}
            label={{
              value: "7d Momentum ↑",
              angle: -90,
              position: "insideLeft",
              offset: 12,
              fill: "#50506a",
              fontSize: 10,
              fontFamily: "Inter, sans-serif",
            }}
          />

          <ZAxis type="number" dataKey="z" range={[200, 1400]} />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.06)" }} />

          {/* Quadrant lines */}
          <ReferenceLine x={50} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <ReferenceLine y={0} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

          <Scatter data={data}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={STATE_COLORS[entry.state]}
                fillOpacity={0.7}
                stroke={STATE_COLORS[entry.state]}
                strokeWidth={entry.ignition_alert ? 2 : 0}
                strokeOpacity={1}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
