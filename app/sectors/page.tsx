import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectorBubbleChart from "@/components/charts/SectorBubble";
import SignalBar from "@/components/SignalBar";
import { getSnapshot, getSectorStateColor } from "@/lib/data";
import type { Metadata } from "next";
import { Zap, TrendingUp, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Sector Intelligence — Rotation & Cascade Maps",
  description:
    "Sector rotation analysis for NIFTY 500. Track sector breadth, momentum, ignition events, and cascade propagation maps. Identify where money is flowing before it happens.",
};

export default async function SectorsPage() {
  const snap = await getSnapshot();
  const sectors = snap.sectors;
  const cascade = snap.cascade_alert;

  const sortedSectors = [...sectors].sort((a, b) => b.median_truevx - a.median_truevx);

  return (
    <>
      <Navigation updatedDate={snap.meta.last_updated} />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <section style={{ padding: "48px 0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span className="badge badge-bull">17 Sectors</span>
            <span style={{ color: "var(--text-3)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>NIFTY 500 · {snap.meta.week_of}</span>
          </div>
          <h1 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 12 }}>
            Sector Intelligence
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: 15, maxWidth: 600, lineHeight: 1.7 }}>
            Follow the money before the crowd notices. Construction Materials and Chemicals are the early-cycle barometers. When they heat up, the cascade begins.
          </p>
        </section>

        {/* Cascade Alert */}
        {cascade.active && (
          <div className="cascade-alert" style={{ padding: "20px 24px", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Zap size={18} style={{ color: "#fbbf24" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#fbbf24", marginBottom: 4 }}>
                  🔥 SECTOR CASCADE ACTIVE — {cascade.triggered_by} Ignited
                </div>
                <p style={{ color: "var(--text-2)", fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
                  {cascade.triggered_by} crossed the 55% breadth threshold on {cascade.triggered_date} (Day {cascade.days_since_trigger} of cascade). Based on 10 historical events with 100% follow rate:
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {cascade.expected_followers.map((f) => (
                    <span key={f} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.22)", color: "#a78bfa", fontSize: 12, fontWeight: 500 }}>
                      {f}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-3)" }}>
                  Historical probability: <span style={{ color: "#14d9c4", fontWeight: 600 }}>{Math.round(cascade.probability * 100)}%</span> follow within 10 trading days · Expected window closes in ~{10 - cascade.days_since_trigger} days
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rotation Bubble Chart */}
        <section className="card" style={{ padding: "28px", marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 4 }}>Sector Rotation Map</h2>
            <p style={{ color: "var(--text-3)", fontSize: 13 }}>
              X = current signal strength · Y = 7-day momentum · Bubble size = number of stocks in sector
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            {[["HOT", "#14d9c4"], ["WARM", "#4ade80"], ["COOLING", "#fbbf24"], ["COLD", "#f43f5e"]].map(([label, color]) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-2)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color as string, display: "inline-block" }} />
                {label}
              </span>
            ))}
          </div>
          <SectorBubbleChart sectors={sectors} />
          <p style={{ marginTop: 8, fontSize: 12, color: "var(--text-3)" }}>
            Upper-right quadrant = Hot sectors with rising momentum. Target: stocks from these sectors.
          </p>
        </section>

        {/* Pre-ignition Monitor */}
        <section className="card" style={{ padding: "24px", marginBottom: 32, background: "rgba(20,217,196,0.04)", border: "1px solid rgba(20,217,196,0.12)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Info size={16} style={{ color: "#14d9c4", marginTop: 2, flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#14d9c4", marginBottom: 6 }}>Early-Cycle Barometers — Watch These First</h3>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7, maxWidth: 800 }}>
                Research across 281 ignition events shows that <strong style={{ color: "#e8e8f2" }}>Construction Materials</strong> appears as a pre-ignition leader for 10/17 sectors, and <strong style={{ color: "#e8e8f2" }}>Chemicals</strong> for 9/17 sectors. When these two sectors cross 60% breadth, broader market expansion follows within 10–15 days in the majority of historical cases.
              </p>
              <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
                {sectors.filter((s) => s.pre_ignition_leader).map((s) => (
                  <div key={s.name} style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#e8e8f2" }}>{s.name}</div>
                    <div className="stat-number" style={{ fontSize: 16, color: getSectorStateColor(s.state), marginTop: 2 }}>
                      {(s.breadth_pct * 100).toFixed(0)}% breadth
                    </div>
                    <div style={{ fontSize: 11, color: s.breadth_pct >= 0.60 ? "#14d9c4" : "var(--text-3)", marginTop: 2 }}>
                      {s.breadth_pct >= 0.60 ? "🟢 THRESHOLD MET" : `${((0.60 - s.breadth_pct) * 100).toFixed(0)}pp below 60% trigger`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sector Strength Grid */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16 }}>
            All 17 Sectors — Sorted by Strength
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sector</th>
                  <th>TrueVX Score</th>
                  <th>Breadth</th>
                  <th>State</th>
                  <th>7d Momentum</th>
                  <th>Cascade Followers</th>
                  <th>Stocks</th>
                </tr>
              </thead>
              <tbody>
                {sortedSectors.map((s, i) => (
                  <tr key={s.name}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 20, height: 20, borderRadius: 4, background: `${getSectorStateColor(s.state)}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: getSectorStateColor(s.state), fontWeight: 700 }}>
                          {i + 1}
                        </span>
                        <span style={{ fontWeight: 500, fontSize: 13 }}>{s.name}</span>
                        {s.ignition_alert && <span>🔥</span>}
                        {s.pre_ignition_leader && <span title="Early-cycle barometer" style={{ fontSize: 10, color: "#14d9c4" }}>★</span>}
                      </div>
                    </td>
                    <td>
                      <SignalBar value={s.median_truevx} size="sm" />
                    </td>
                    <td>
                      <span className="stat-number" style={{ color: "var(--text-1)" }}>
                        {(s.breadth_pct * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background: `${getSectorStateColor(s.state)}18`,
                          color: getSectorStateColor(s.state),
                          border: `1px solid ${getSectorStateColor(s.state)}30`,
                        }}
                      >
                        {s.state}
                      </span>
                    </td>
                    <td>
                      <span className="stat-number" style={{ color: s.momentum_7d >= 0 ? "#14d9c4" : "#f43f5e", fontWeight: 600 }}>
                        {s.momentum_7d >= 0 ? "+" : ""}{s.momentum_7d.toFixed(1)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", maxWidth: 260 }}>
                        {s.cascade_followers.slice(0, 3).map((f) => (
                          <span key={f} style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: "rgba(167,139,250,0.1)", color: "#a78bfa" }}>
                            {f.split(" ")[0]}
                          </span>
                        ))}
                        {s.cascade_followers.length > 3 && (
                          <span style={{ fontSize: 10, color: "var(--text-3)" }}>+{s.cascade_followers.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="stat-number" style={{ color: "var(--text-2)", fontSize: 13 }}>{s.stock_count}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 8, fontSize: 12, color: "var(--text-3)" }}>
            ★ Early-cycle barometer &nbsp;·&nbsp; 🔥 Ignition alert active
          </p>
        </section>

        {/* Cascade Research Callout */}
        <section className="card dot-grid" style={{ padding: "28px", marginBottom: 40 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>📡 The Cascade Research</h3>
          <p style={{ color: "var(--text-2)", fontSize: 13, lineHeight: 1.8, maxWidth: 800 }}>
            Across 215 ignition events analysed from 2018–2026 on the NIFTY 500 universe: when Capital Goods ignites (breadth crosses 55%), Financial Services, Healthcare, IT, and FMCG follow in 100% of 10 confirmed events — within a 40-day window. When Auto ignites, Chemicals, Consumer Durables, FMCG, and Healthcare follow with 100% follow rate (8 events). Telecommunication is the consistent laggard, with a median cascade lag of +2.2 days vs. 0 days for all other sectors. This directional flow was confirmed via Granger causality tests (Capital Goods → Services: p=0.0000; Financial Services → Services: p=0.0000).
          </p>
        </section>

      </main>
      <Footer />
    </>
  );
}
