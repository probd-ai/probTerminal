"use client";
import {
  AreaChart,
  Area,
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

// Format date for x-axis ticks (show every ~15 days)
function formatXTick(value: string): string {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function BreadthChart({ data }: Props) {
  // Show every 15th label
  const tickIndices = new Set<string>();
  data.forEach((d, i) => {
    if (i % 15 === 0 || i === data.length - 1) tickIndices.add(d.date);
  });

  return (
    <div style={{ width: "100%", height: 280, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
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
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
