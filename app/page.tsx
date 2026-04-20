import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BreadthChart from "@/components/charts/BreadthChart";
import NewsletterSignup from "@/components/NewsletterSignup";
import ShareBar from "@/components/ShareBar";
import TelegramBanner from "@/components/TelegramBanner";
import { getSnapshot, getRegimeBadge, getSectorStateColor } from "@/lib/data";
import type { Metadata } from "next";
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Market Pulse — NIFTY 500 Breadth & Regime",
  description: "Live market breadth analysis for NIFTY 500. Current regime, bull/bear ratio R, 22-day win probability, and 90-day breadth timeline. Updated every week.",
  alternates: { canonical: "https://prob-terminal.vercel.app" },
  openGraph: {
    title: "Market Pulse — NIFTY 500 Breadth & Regime | Prob Terminal",
    description: "Live market breadth analysis for NIFTY 500. Current regime, bull/bear ratio R, 22-day win probability. Updated weekly.",
    url: "https://prob-terminal.vercel.app",
    images: [{ url: "https://prob-terminal.vercel.app/opengraph-image", width: 1200, height: 630 }],
  },
};

export default async function Home() {
  const snap = await getSnapshot();
  const mp = snap.market_pulse;

  const regimeBadge = getRegimeBadge(mp.regime);
  const isRising = mp.R_slope_21d === "RISING";
  const isDeclining = mp.R_slope_21d === "DECLINING";
  const cascade = snap.cascade_alert;

  return (
    <>
      <Navigation updatedDate={snap.meta.last_updated} />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Cascade Alert Banner ────────────────────────────────── */}
        {cascade.active && (
          <div className="cascade-alert" style={{ margin: "24px 0", padding: "14px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <Zap size={16} style={{ color: "#fbbf24", flexShrink: 0, marginTop: 2 }} />
            <div>
              <span style={{ color: "#fbbf24", fontWeight: 600, fontSize: 13 }}>
                Sector Cascade Active — {cascade.triggered_by} ignited {cascade.days_since_trigger} days ago
              </span>
              <p style={{ color: "var(--text-2)", fontSize: 12, marginTop: 2 }}>
                {cascade.expected_followers.join(", ")} historically follow with{" "}
                <span style={{ color: "#a78bfa", fontWeight: 600 }}>{Math.round(cascade.probability * 100)}% probability</span> within 10 trading days.
                {cascade.regime_note && (
                  <span style={{ color: "#f97316", display: "block", marginTop: 4 }}>⚠ {cascade.regime_note}</span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section style={{ padding: "48px 0 36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span className={`badge ${regimeBadge}`}>{mp.regime} REGIME</span>
            <span style={{ color: "var(--text-3)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
              NIFTY 500 · {snap.meta.week_of}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16, maxWidth: 700 }}>
            The{" "}
            <span className="gradient-text">Probability Engine</span>
            {" "}for Indian Equity Markets
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: 16, maxWidth: 560, lineHeight: 1.7 }}>
            Where is capital flowing in NIFTY 500? Quantified. Market breadth, sector rotation cascade maps,
            and momentum signals — backed by 845,000+ observations across 7.5 years.
          </p>
        </section>

        {/* ── 4 Key Stats ─────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 40 }}>
          {/* R Ratio */}
          <div className="card" style={{ padding: "20px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: 8 }}>
              Breadth Ratio R
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="stat-number" style={{ fontSize: 36, fontWeight: 700, color: "#14d9c4" }}>
                {mp.R_ratio.toFixed(2)}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, color: isRising ? "#14d9c4" : isDeclining ? "#f43f5e" : "var(--text-2)" }}>
                {isRising ? <ArrowUpRight size={14}/> : isDeclining ? <ArrowDownRight size={14}/> : null}
                {mp.R_slope_21d}
              </span>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>Bull÷Bear stocks ratio</div>
          </div>

          {/* Win Probability */}
          <div className="card glow-teal" style={{ padding: "20px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: 8 }}>
              22-Day Win Probability
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span className="stat-number" style={{ fontSize: 36, fontWeight: 700, color: "#a78bfa" }}>
                {mp.win_prob_22d}
              </span>
              <span style={{ fontSize: 20, color: "#a78bfa", fontWeight: 600 }}>%</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>Based on R quintile {mp.R_quintile}</div>
          </div>

          {/* Bull % */}
          <div className="card" style={{ padding: "20px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: 8 }}>
              Structural Bulls
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span className="stat-number" style={{ fontSize: 36, fontWeight: 700, color: "#e8e8f2" }}>
                {mp.bull_pct.toFixed(1)}
              </span>
              <span style={{ fontSize: 20, color: "var(--text-2)", fontWeight: 600 }}>%</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>Stocks with structural long-term strength</div>
          </div>

          {/* F7 Count */}
          <div className="card" style={{ padding: "20px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: 8 }}>
              F7 Signal Stocks
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span className="stat-number" style={{ fontSize: 36, fontWeight: 700, color: "#fbbf24" }}>
                {mp.f7_count}
              </span>
              <span style={{ fontSize: 14, color: "var(--text-3)", marginLeft: 4 }}>/ 475</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>Top quality, all MA zones high</div>
          </div>
        </div>

        {/* ── Breadth Timeline ─────────────────────────────────────── */}
        <section className="card" style={{ padding: "28px", marginBottom: 32 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>Market Breadth — Last 90 Days</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 2, background: "#14d9c4", display: "inline-block", borderRadius: 1 }} />
                  <span style={{ color: "var(--text-2)" }}>Bull %</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 2, background: "#f43f5e", display: "inline-block", borderRadius: 1 }} />
                  <span style={{ color: "var(--text-2)" }}>Bear %</span>
                </span>
              </div>
            </div>
            <p style={{ color: "var(--text-3)", fontSize: 13, marginTop: 4 }}>
              % of NIFTY 500 stocks in structural bull vs. bear state (mean_long &gt;80 / &lt;40)
            </p>
          </div>
          <BreadthChart data={mp.breadth_history} />
        </section>

        {/* ── β Order Parameter ─────────────────────────────────── */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16, marginBottom: 32 }}>
          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-2)" }}>β Order Parameter</h3>
              <span className="badge badge-regime" style={{ fontSize: 10 }}>NORMAL</span>
            </div>
            <div className="stat-number" style={{ fontSize: 40, fontWeight: 700, color: "#a78bfa", marginBottom: 8 }}>
              {mp.beta_order.toFixed(2)}
            </div>
            <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.6 }}>
              Market structure exponent. Normal range: 0.5–0.9. β&gt;1.2 is a historical crash precursor (COVID peak: 1.84). Current reading: structurally normal.
            </p>
            <div style={{ marginTop: 12, height: 4, borderRadius: 2, background: "var(--border)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(mp.beta_order / 2.0) * 100}%`, background: "linear-gradient(90deg, #14d9c4, #a78bfa)", borderRadius: 2 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: "var(--text-3)", fontFamily: "'JetBrains Mono', monospace" }}>
              <span>0.0 (chaos)</span>
              <span>1.2 (⚠ warning)</span>
              <span>2.0 (crash)</span>
            </div>
          </div>

          <div className="card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-2)", marginBottom: 12 }}>Regime Context</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "R > 2.0", desc: "Broad bull — most stocks structurally strong", color: "#14d9c4" },
                { label: "1.5 – 2.0", desc: "Healthy bull — above-balance breadth", color: "#4ade80", active: true },
                { label: "1.0 – 1.5", desc: "Neutral — bulls slightly outnumber bears", color: "#fbbf24" },
                { label: "0.7 – 1.0", desc: "Caution — bears approaching balance", color: "#f97316" },
                { label: "< 0.7", desc: "Bear market — structural deterioration", color: "#f43f5e" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", borderRadius: 6, background: row.active ? "rgba(255,255,255,0.04)" : "transparent", border: row.active ? "1px solid var(--border-hi)" : "1px solid transparent" }}>
                  <span className="stat-number" style={{ fontSize: 12, color: row.color, minWidth: 64 }}>{row.label}</span>
                  <span style={{ fontSize: 12, color: row.active ? "var(--text-1)" : "var(--text-3)" }}>{row.desc}</span>
                  {row.active && <span style={{ marginLeft: "auto", fontSize: 10, color: "#14d9c4" }}>← now</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sector Flash ──────────────────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>Sector Temperature</h2>
            <a href="/sectors" style={{ fontSize: 13, color: "#14d9c4", textDecoration: "none" }}>See all 17 sectors →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
            {snap.sectors.slice(0, 6).map((s) => (
              <div key={s.name} className="card" style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{s.short_name}</span>
                  {s.ignition_alert && <span style={{ fontSize: 10 }}>🔥</span>}
                </div>
                <div className="stat-number" style={{ fontSize: 14, fontWeight: 700, color: getSectorStateColor(s.state), marginBottom: 6 }}>
                  {s.state}
                </div>
                <div style={{ height: 3, borderRadius: 2, background: "var(--border)", overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ height: "100%", width: `${s.breadth_pct * 100}%`, background: getSectorStateColor(s.state), borderRadius: 2, opacity: 0.8 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-3)", fontFamily: "'JetBrains Mono', monospace" }}>
                  <span>{(s.breadth_pct * 100).toFixed(0)}% breadth</span>
                  <span style={{ color: s.momentum_7d >= 0 ? "#14d9c4" : "#f43f5e" }}>
                    {s.momentum_7d >= 0 ? "+" : ""}{s.momentum_7d.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Weekly Intelligence Brief (SEO KEY) ──────────────── */}
        <section className="card dot-grid" style={{ padding: "32px", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <TrendingUp size={16} style={{ color: "#a78bfa" }} />
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>Market Intelligence Brief</h2>
            <span className="badge badge-regime" style={{ fontSize: 10 }}>{snap.meta.week_of}</span>
          </div>
          <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.8, maxWidth: 860 }}>
            {snap.weekly_brief}
          </p>
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { label: "Universe", value: snap.meta.universe },
              { label: "Total Stocks", value: snap.meta.total_stocks },
              { label: "Observations", value: "845,220" },
              { label: "Data Period", value: "2018 – 2026" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: 2 }}>{item.label}</div>
                <div className="stat-number" style={{ fontSize: 14, color: "var(--text-1)" }}>{item.value}</div>
              </div>
            ))}
          </div>
          <ShareBar
            regime={mp.regime}
            R={mp.R_ratio}
            prob22d={mp.win_prob_22d}
            week={snap.meta.week_of}
          />
        </section>

        {/* ── Telegram CTA ─────────────────────────────────────── */}
        <div style={{ marginBottom: 32 }}>
          <TelegramBanner />
        </div>

        {/* ── Newsletter Signup ─────────────────────────────────── */}
        <div style={{ marginBottom: 56 }}>
          <NewsletterSignup />
        </div>

      </main>
      <Footer />
    </>
  );
}
