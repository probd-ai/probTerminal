import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StockSearch from "@/components/StockSearch";
import SignalBar from "@/components/SignalBar";
import { getSnapshot, getStockStateLabel, getFlowBadgeClass, getFlowLabel } from "@/lib/data";
import type { Metadata } from "next";
import { Star, Eye, TrendingDown, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Stock Radar — F7 Signals & IN THE FLOW",
  description:
    "NIFTY 500 stock momentum signals. F7 prime quality stocks (TrueVX >90), IN THE FLOW stocks with sector tailwind, EARLY_RECOVERY watchlist, and S6 short candidates. Updated weekly.",
  alternates: { canonical: "https://prob-terminal.vercel.app/stocks" },
  openGraph: {
    title: "Stock Radar — F7 Signals & Momentum Watchlist | Prob Terminal",
    description: "NIFTY 500 stocks sorted by momentum strength. F7 signal stocks, IN THE FLOW movers, structural state analysis.",
    url: "https://prob-terminal.vercel.app/stocks",
    images: [{ url: "https://prob-terminal.vercel.app/opengraph-image", width: 1200, height: 630 }],
  },
};

const STATE_COLORS: Record<string, string> = {
  ACCELERATING: "#14d9c4",
  PEAK_ROLLOVER: "#a78bfa",
  EARLY_RECOVERY: "#fbbf24",
  LATE_DECLINE: "#f97316",
  DECELERATING: "#f43f5e",
  BASE_BUILDING: "#8888aa",
};

const STATE_SORT: Record<string, number> = {
  ACCELERATING: 0, PEAK_ROLLOVER: 1, EARLY_RECOVERY: 2, LATE_DECLINE: 3, DECELERATING: 4, BASE_BUILDING: 5,
};

export default async function StocksPage() {
  const snap = await getSnapshot();
  const dist = snap.state_distribution;
  const total = Object.values(dist).reduce((a, b) => a + b, 0);

  const distEntries = Object.entries(dist).sort(([a], [b]) => STATE_SORT[a] - STATE_SORT[b]);

  // All stocks for the search explorer (combine all lists, deduplicate by symbol)
  const allStocksMap = new Map<string, typeof snap.f7_stocks[0]>();
  [...snap.f7_stocks, ...snap.in_the_flow, ...snap.watchlist, ...snap.s6_stocks].forEach((s) => {
    if (!allStocksMap.has(s.symbol)) allStocksMap.set(s.symbol, s);
  });
  const allStocks = Array.from(allStocksMap.values());
  const sectors = [...new Set(allStocks.map((s) => s.sector))].sort();

  return (
    <>
      <Navigation updatedDate={snap.meta.last_updated} />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <section style={{ padding: "48px 0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span className="badge badge-bull">NIFTY 500</span>
            <span style={{ color: "var(--text-3)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{snap.meta.total_stocks} Stocks · {snap.meta.week_of}</span>
          </div>
          <h1 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 12 }}>
            Stock Radar
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: 15, maxWidth: 580, lineHeight: 1.7 }}>
            Stocks the probability framework favors this week. F7 is the highest-quality signal — TrueVX {">"}90 with all three timeframes in the high zone, historically delivering +35.7% CAGR out-of-sample.
          </p>
        </section>

        {/* State Distribution */}
        <section className="card" style={{ padding: "24px", marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Universe State Distribution</h2>
          <p style={{ color: "var(--text-3)", fontSize: 13, marginBottom: 20 }}>
            How {total} NIFTY 500 stocks are distributed across the 6 structural states today
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {distEntries.map(([state, count]) => {
              const pct = (count / total * 100).toFixed(1);
              const color = STATE_COLORS[state] || "#888";
              return (
                <div key={state} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 140, fontSize: 12, color: "var(--text-2)", textAlign: "right", flexShrink: 0 }}>
                    {getStockStateLabel(state)}
                  </div>
                  <div style={{ flex: 1, height: 8, borderRadius: 4, background: "var(--border)", overflow: "hidden", maxWidth: 400 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, opacity: 0.85 }} />
                  </div>
                  <span className="stat-number" style={{ fontSize: 13, color, minWidth: 36 }}>{count}</span>
                  <span style={{ fontSize: 12, color: "var(--text-3)", minWidth: 40 }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stock Explorer */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 8 }}>
            <Search size={16} style={{ color: "var(--text-2)", marginBottom: 2 }} />
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>Stock Explorer</h2>
            <span className="badge badge-gray" style={{ marginBottom: 1 }}>{allStocks.length} stocks</span>
          </div>
          <p style={{ color: "var(--text-3)", fontSize: 13, marginBottom: 16, maxWidth: 700 }}>
            Search and filter across all stocks in the radar — F7, IN THE FLOW, Watchlist, and S6. Filter by sector, state, or minimum TrueVX score.
          </p>
          <StockSearch allStocks={allStocks} sectors={sectors} />
        </section>

        {/* F7 Signal */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 8 }}>
            <Star size={16} style={{ color: "#fbbf24", marginBottom: 2 }} />
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>F7 Prime Signal</h2>
            <span className="badge badge-watch" style={{ marginBottom: 1 }}>{snap.f7_stocks.length} stocks</span>
          </div>
          <p style={{ color: "var(--text-3)", fontSize: 13, marginBottom: 16, maxWidth: 700 }}>
            TrueVX &gt;90 · mean_short &gt;80 · mean_mid &gt;60 · mean_long &gt;50. Historically: IR 1.347 OOS · +35.7% CAGR · Win rate 70% at 222 days.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Sector</th>
                  <th>Signal</th>
                  <th>Short/Mid/Long</th>
                  <th>State</th>
                  <th>Zone</th>
                  <th>Flow</th>
                  <th>22d Expected</th>
                  <th>222d Expected</th>
                </tr>
              </thead>
              <tbody>
                {snap.f7_stocks.map((s) => (
                  <tr key={s.symbol}>
                    <td>
                      <span className="stat-number" style={{ fontWeight: 700, color: "#e8e8f2", fontSize: 13 }}>{s.symbol}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: 13, color: "var(--text-2)" }}>{s.name}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: 12, color: "var(--text-3)" }}>{s.sector}</span>
                    </td>
                    <td>
                      <SignalBar value={s.truevx} />
                    </td>
                    <td>
                      <span className="stat-number" style={{ fontSize: 12, color: "var(--text-2)" }}>
                        {s.mean_short} / {s.mean_mid} / {s.mean_long}
                      </span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background: `${STATE_COLORS[s.state] || "#888"}18`,
                          color: STATE_COLORS[s.state] || "#888",
                          border: `1px solid ${STATE_COLORS[s.state] || "#888"}30`,
                        }}
                      >
                        {s.state.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: 12, color: "var(--text-2)" }}>{s.level_zone}</span>
                    </td>
                    <td>
                      <span className={`badge ${getFlowBadgeClass(s.flow_status)}`}>{getFlowLabel(s.flow_status)}</span>
                    </td>
                    <td>
                      <span className="stat-number" style={{ color: "#14d9c4", fontWeight: 600 }}>+{s.expected_22d.toFixed(1)}%</span>
                    </td>
                    <td>
                      <span className="stat-number" style={{ color: "#4ade80", fontWeight: 600 }}>+{s.expected_222d.toFixed(1)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* IN THE FLOW */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 8 }}>
            <TrendingDown size={16} style={{ color: "#14d9c4", marginBottom: 2, transform: "rotate(180deg)" }} />
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>IN THE FLOW</h2>
          </div>
          <p style={{ color: "var(--text-3)", fontSize: 13, marginBottom: 4, maxWidth: 700 }}>
            High individual TrueVX score + high sector context score. This combination earns <span style={{ color: "#14d9c4", fontWeight: 600 }}>+18.80% at 222 days</span> vs. +13.82% for the same quality stock in a cold sector — a 36% relative improvement. p = 2.26 × 10⁻²⁵⁴.
          </p>
          <p style={{ color: "var(--text-3)", fontSize: 12, marginBottom: 16 }}>
            Sector context explains 0.86% of return variance at 222 days — small but statistically unshakeable across 584,811 observations.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
            {snap.in_the_flow.map((s) => (
              <div key={s.symbol} className="card" style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="stat-number" style={{ fontWeight: 700, fontSize: 14, color: "#e8e8f2" }}>{s.symbol}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{s.sector}</div>
                    <div style={{ marginTop: 6 }}><SignalBar value={s.truevx} size="sm" /></div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <span className="badge badge-bull">In the Flow</span>
                  <span
                    className="badge"
                    style={{ background: `${STATE_COLORS[s.state]}18`, color: STATE_COLORS[s.state], border: `1px solid ${STATE_COLORS[s.state]}30` }}
                  >
                    {s.state.replace("_", " ")}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "var(--text-3)", fontSize: 10, marginBottom: 2 }}>22d</div>
                    <div style={{ color: "#14d9c4", fontWeight: 600 }}>+{s.expected_22d.toFixed(1)}%</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "var(--text-3)", fontSize: 10, marginBottom: 2 }}>222d</div>
                    <div style={{ color: "#4ade80", fontWeight: 600 }}>+{s.expected_222d.toFixed(1)}%</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "var(--text-3)", fontSize: 10, marginBottom: 2 }}>Zone</div>
                    <div style={{ color: "var(--text-2)" }}>{s.level_zone}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Watchlist */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 8 }}>
            <Eye size={16} style={{ color: "#fbbf24", marginBottom: 2 }} />
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>Watchlist — Early Recovery</h2>
          </div>
          <p style={{ color: "var(--text-3)", fontSize: 13, marginBottom: 16, maxWidth: 700 }}>
            EARLY_RECOVERY stocks in hot sectors — 53% probability of transitioning to ACCELERATING within 22 days (the strongest entry signal in the dataset). Watch these for confirmation.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
            {snap.watchlist.map((s) => (
              <div key={s.symbol} className="card" style={{ padding: "14px 16px", border: "1px solid rgba(251,191,36,0.15)" }}>
                <div style={{ marginBottom: 8 }}>
                  <div className="stat-number" style={{ fontWeight: 700, fontSize: 13, color: "#fbbf24" }}>{s.symbol}</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 1, marginBottom: 4 }}>{s.sector}</div>
                  <SignalBar value={s.truevx} size="sm" />
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-3)", fontFamily: "'JetBrains Mono', monospace" }}>
                  {s.mean_short} / {s.mean_mid} / {s.mean_long} · {s.level_zone}
                </div>
                <div style={{ marginTop: 6, fontSize: 11, color: "#a78bfa" }}>53% → ACCELERATING in 22d</div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Note */}
        <section className="card dot-grid" style={{ padding: "28px", marginBottom: 40 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>📐 The Research Behind These Numbers</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20, color: "var(--text-2)", fontSize: 13, lineHeight: 1.7 }}>
            <div>
              <div style={{ color: "#14d9c4", fontWeight: 600, marginBottom: 4 }}>F7 Signal Validation</div>
              Out-of-sample (2021–2026): IR = 1.347, CAGR = +35.7%, best configuration N=30 weekly. All 9 parameter configurations improved OOS. F7-qualifying signals increased from 3.3% → 5.4% OOS (factor strengthening over time).
            </div>
            <div>
              <div style={{ color: "#a78bfa", fontWeight: 600, marginBottom: 4 }}>State Analysis (739,917 obs)</div>
              ACCELERATING at STRETCHED zone: +2.1% mean 22d return (highest). EARLY_RECOVERY → ACCELERATING: 53% probability. Kruskal-Wallis H=10,215 at 222d, p≈0. States rank by momentum magnitude, not direction.
            </div>
            <div>
              <div style={{ color: "#fbbf24", fontWeight: 600, marginBottom: 4 }}>Power of Average (584,811 obs)</div>
              IN THE FLOW vs LONE WOLF at 222d: +18.80% vs +13.82%. Lift of +4.98%. Kruskal-Wallis H=5,052, p≈0. Sector context alone explains 0.86% of return variance at 222 days (growing from 0.14% at 22d).
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
