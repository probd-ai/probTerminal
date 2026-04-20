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
      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginBottom: 10, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "var(--text-3)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 12, height: 2, background: "#14d9c4", display: "inline-block" }} /> Bull %
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 12, height: 2, background: "#f43f5e", display: "inline-block" }} /> Bear %
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 12, height: 2, background: "#a78bfa", borderTop: "1px dashed #a78bfa", display: "inline-block" }} /> R Ratio ×25
        </span>
      </div>
      <div style={{ width: "100%", height: 280, minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <ComposedChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="bullGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14d9c4" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#14d9c4" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="bearGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 6"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#50506a", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatXTick}
              interval="preserveStartEnd"
            />

            <YAxis
              tick={{ fill: "#50506a", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 80]}
              width={36}
            />

            <Tooltip content={<CustomTooltip />} />

            <ReferenceLine
              y={50}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="4 4"
            />
            {/* R=1.0 reference (25% on axis) */}
            <ReferenceLine
              y={25}
              stroke="rgba(167,139,250,0.2)"
              strokeDasharray="3 6"
            />

            <Area
              type="monotone"
              dataKey="bull_pct"
              name="Bull %"
              stroke="#14d9c4"
              strokeWidth={2}
              fill="url(#bullGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#14d9c4", strokeWidth: 0 }}
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
              strokeWidth={1.5}
              strokeDasharray="5 3"
              dot={false}
              activeDot={{ r: 3, fill: "#a78bfa", strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
