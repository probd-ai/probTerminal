"use client";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { BreadthPoint } from "@/lib/types";

interface Props {
  data: BreadthPoint[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload as BreadthPoint;
  return (
    <div
      style={{
        background: "#121226",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 8,
        padding: "10px 14px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        minWidth: 180,
      }}
    >
      <div style={{ color: "var(--text-3)", marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "#14d9c4" }}>Bull</span>
          <span style={{ color: "#e8e8f2" }}>{d.bull_pct}%</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "#f43f5e" }}>Bear</span>
          <span style={{ color: "#e8e8f2" }}>{d.bear_pct}%</span>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 4,
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <span style={{ color: "var(--text-2)" }}>R Ratio</span>
          <span style={{ color: "#a78bfa", fontWeight: 600 }}>{d.R_ratio.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function formatXTick(value: string): string {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// Scale R_ratio to % axis for dual-axis overlay (R=1.0 → 50%)
function rToAxis(r: number) {
  return Math.min(80, Math.max(0, r * 25));
}

export default function BreadthChart({ data }: Props) {
  const chartData = data.map((d) => ({ ...d, R_axis: rToAxis(d.R_ratio) }));

  return (
    <div style={{ width: "100%", minWidth: 0 }}>
      {/* Enhanced Legend */}
      <div style={{
        display: "flex",
        gap: 16,
        marginBottom: 16,
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        padding: "12px 16px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 8,
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#14d9c4", fontWeight: 600 }}>
          <span style={{ width: 3, height: 12, background: "#14d9c4", display: "inline-block", borderRadius: 2 }} /> Bull Momentum
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#f43f5e", fontWeight: 600 }}>
          <span style={{ width: 3, height: 12, background: "#f43f5e", display: "inline-block", borderRadius: 2 }} /> Bear Pressure
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#a78bfa", fontWeight: 600, marginLeft: "auto" }}>
          <span style={{ width: 3, height: 12, borderTop: "2px dashed #a78bfa", display: "inline-block", borderRadius: 1 }} /> R-Ratio Signal
        </span>
      </div>
      <div style={{ width: "100%", height: 340, minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <ComposedChart data={chartData} margin={{ top: 12, right: 20, bottom: 8, left: 50 }}>
            <defs>
              <linearGradient id="bullGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14d9c4" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#14d9c4" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="bearGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#696a82", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatXTick}
              interval="preserveStartEnd"
            />

            <YAxis
              tick={{ fill: "#696a82", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 80]}
              width={42}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Neutral zone */}
            <ReferenceLine
              y={50}
              stroke="rgba(255,255,255,0.1)"
              strokeDasharray="5 5"
              label={{ value: "50% (Neutral)", position: "right", fill: "var(--text-3)", fontSize: 10, offset: 10 }}
            />
            {/* R=1.0 reference (25% on axis) */}
            <ReferenceLine
              y={25}
              stroke="rgba(167,139,250,0.15)"
              strokeDasharray="4 4"
              label={{ value: "R=1.0", position: "right", fill: "#a78bfa", fontSize: 10, offset: 10 }}
            />

            <Area
              type="monotone"
              dataKey="bull_pct"
              name="Bull %"
              stroke="#14d9c4"
              strokeWidth={2.5}
              fill="url(#bullGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#14d9c4", strokeWidth: 0 }}
            />

            <Area
              type="monotone"
              dataKey="bear_pct"
              name="Bear %"
              stroke="#f43f5e"
              strokeWidth={2}
              fill="url(#bearGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#f43f5e", strokeWidth: 0 }}
            />

            <Line
              type="monotone"
              dataKey="R_axis"
              name="R Ratio"
              stroke="#a78bfa"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
              activeDot={{ r: 4, fill: "#a78bfa", strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
