"use client";

import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PerformanceChartProps {
  dates: string[];
  longOnly: number[];
  longMeanRevert: number[];
  stats: {
    long_only: { cagr_pct: number; sharpe: number; max_drawdown_pct: number };
    long_meanrevert: { cagr_pct: number; sharpe: number; max_drawdown_pct: number };
  };
}

export default function PerformanceChart({ dates, longOnly, longMeanRevert, stats }: PerformanceChartProps) {
  // Prepare data for chart — sample every 5th point to reduce clutter
  const data = dates
    .map((date, i) => ({
      date: new Date(date).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
      long_only: longOnly[i],
      long_meanrevert: longMeanRevert[i],
    }))
    .filter((_, i) => i % 5 === 0 || i === dates.length - 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Chart */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px" }}>
        <div style={{ height: 320, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 40, left: 50 }}>
              <defs>
                <linearGradient id="gradLongOnly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradLMR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14d9c4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14d9c4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "var(--text-3)" }}
                axisLine={false}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-3)" }}
                axisLine={false}
                tickLine={false}
                domain={["dataMin * 0.9", "dataMax * 1.05"]}
                label={{ value: "Index (₹100 = 100)", angle: -90, position: "insideLeft", offset: 10, fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg)", border: "1px solid var(--border)",
                  borderRadius: 8, padding: 10, fontSize: 12,
                }}
                formatter={(v) => `₹${(v as number).toFixed(1)}`}
                labelStyle={{ color: "var(--text-1)" }}
              />
              <Legend wrapperStyle={{ paddingTop: 16 }} />
              <Area
                type="monotone"
                dataKey="long_only"
                name="Long-Only (18% CAGR)"
                fill="url(#gradLongOnly)"
                stroke="#a78bfa"
                strokeWidth={2}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="long_meanrevert"
                name="Long Mean-Revert + F7 (35% CAGR)"
                fill="url(#gradLMR)"
                stroke="#14d9c4"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { name: "Long-Only", data: stats.long_only, color: "#a78bfa" },
          { name: "Long Mean-Revert + F7", data: stats.long_meanrevert, color: "#14d9c4" },
        ].map((strategy) => (
          <div
            key={strategy.name}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${strategy.color}22`,
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: strategy.color, marginBottom: 10 }}>
              {strategy.name}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 11 }}>
              <div>
                <div style={{ color: "var(--text-3)", marginBottom: 2 }}>CAGR</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: strategy.color }}>{strategy.data.cagr_pct}%</div>
              </div>
              <div>
                <div style={{ color: "var(--text-3)", marginBottom: 2 }}>Sharpe</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fbbf24" }}>{strategy.data.sharpe}</div>
              </div>
              <div>
                <div style={{ color: "var(--text-3)", marginBottom: 2 }}>Max Drawdown</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#f43f5e" }}>{strategy.data.max_drawdown_pct}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
