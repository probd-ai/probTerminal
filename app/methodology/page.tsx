import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getSnapshot } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology — Research Paper",
  description:
    "Full research methodology: Universal Scaling Exponents in Cross-Sectional Equity Returns. β = 0.655 power law, LPPL crash analysis, 845,220 observations, NIFTY 500, 2015–2026. Walk-forward OOS/IS = 1.30.",
  alternates: { canonical: "https://prob-terminal.vercel.app/methodology" },
  openGraph: {
    title: "Methodology — Universal Scaling Exponents in NIFTY 500 Returns | Prob Terminal",
    description: "β = 0.655 power law, LPPL crash analysis, 845,220 observations. Walk-forward OOS/IS = 1.30. Full research paper.",
    url: "https://prob-terminal.vercel.app/methodology",
    type: "article",
    images: [{ url: "https://prob-terminal.vercel.app/opengraph-image", width: 1200, height: 630 }],
  },
};

const STATE_COLORS: Record<string, string> = {
  PEAK_ROLLOVER: "#a78bfa", LATE_DECLINE: "#f97316", ACCELERATING: "#14d9c4",
  EARLY_RECOVERY: "#fbbf24", DECELERATING: "#f43f5e", BASE_BUILDING: "#8888aa",
};

const FAQ = [
  {
    q: "What is the core research finding?",
    a: "Cross-sectional stock return predictability in the NIFTY 500 follows a damped power law SNR(t) = α·t^β·e^(−t/τ) with β = 0.655 — significantly above the random-walk value of 0.5. The same exponent (0.634) emerges independently from LPPL fits to pre-crash dynamics, suggesting a universal scaling exponent governing both slow quality outperformance and fast crash dynamics.",
  },
  {
    q: "What is the scoring indicator used?",
    a: "The indicator is a weighted composite of three percentile-ranked moving averages of relative performance: 22-day (short), 66-day (mid), and 222-day (long) windows. Longer timeframes receive higher weight (0.5, 1.0, 1.5). It is a deterministic function of past prices — no machine learning, no alternative data. The specific construction is proprietary.",
  },
  {
    q: "What is the F7 signal?",
    a: "F7 is the highest-quality stock filter requiring all three timeframes simultaneously in the high zone. Out-of-sample validation (2021–2026): Information Ratio = 1.347, CAGR = +35.7%. All 9 tested parameter configurations improved out-of-sample — a particularly strong finding since typical quant strategies degrade 40–60% OOS.",
  },
  {
    q: "What is the Breadth Ratio R?",
    a: "R = (structural bull stocks) ÷ (structural bear stocks). R > 1.5 = healthy bull. R < 0.7 = bear conditions. The 21-day slope of R is a leading regime-change indicator with Spearman ρ = +0.39 correlation to 44-day forward NIFTY returns.",
  },
  {
    q: "What does the β order parameter mean?",
    a: "β measures how much cross-sectional structure exists vs. random noise. Normal range 0.5–0.9. β > 1.2 is a historical crash precursor — the COVID crash had β = 1.84. When β rises abnormally, quality stocks are separating from the rest at an unsustainable rate, a classic pre-crash signature from critical phenomena physics.",
  },
  {
    q: "What is the 'Power of Average' concept?",
    a: "Research across 584,811 observations proves sector context predicts returns beyond individual stock quality. A strong stock in a hot sector earns +18.80% at 222 days. The same quality stock in a cold sector earns +13.82% — a 36% relative shortfall. p = 2.26 × 10⁻²⁵⁴.",
  },
  {
    q: "What is the sector cascade map?",
    a: "Empirically derived from 281 ignition events across 17 sectors (2018–2026). When Capital Goods breadth crosses 55%, Financial Services, Healthcare, IT, and FMCG follow in 100% of 10 confirmed historical events within 40 days. Granger causality tests confirm unidirectional flow.",
  },
  {
    q: "Is this investment advice?",
    a: "No. Prob Terminal is a quantitative research tool. All probabilities and expected returns are historical statistics from backtests. Past performance does not guarantee future results. Consult a SEBI-registered financial advisor before making investment decisions.",
  },
];

// ── tiny helpers ─────────────────────────────────────────────────────────────
function Eq({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 14,
      color: "#e8e8f2",
      background: "rgba(20,217,196,0.06)",
      border: "1px solid rgba(20,217,196,0.15)",
      borderRadius: 8,
      padding: "14px 20px",
      margin: "12px 0",
      overflowX: "auto",
      lineHeight: 1.8,
    }}>
      {children}
    </div>
  );
}

function Sec({ id, title, badge, children }: { id?: string; title: string; badge?: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>{title}</h2>
        {badge && <span className="badge badge-regime" style={{ fontSize: 10 }}>{badge}</span>}
      </div>
      {children}
    </section>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="card" style={{ padding: "24px 28px", ...style }}>
      {children}
    </div>
  );
}

function StatRow({ label, value, color = "#e8e8f2", sub }: { label: string; value: string; color?: string; sub?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <span style={{ fontSize: 13, color: "var(--text-2)" }}>{label}</span>
      <div style={{ textAlign: "right" }}>
        <span className="stat-number" style={{ fontSize: 14, fontWeight: 600, color }}>{value}</span>
        {sub && <div style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "'JetBrains Mono', monospace" }}>{sub}</div>}
      </div>
    </div>
  );
}

export default async function MethodologyPage() {
  const snap = await getSnapshot();

  const scholarlyArticleLD = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "name": "Universal Scaling Exponents in Cross-Sectional Equity Returns: Evidence from a Statistical Mechanics Framework Applied to the Indian Stock Market",
    "headline": "Universal Scaling Exponents in Cross-Sectional Equity Returns",
    "description": "Cross-sectional stock return predictability in the NIFTY 500 follows a damped power law SNR(t) = α·t^β·e^(−t/τ) with β = 0.655 — significantly above the random-walk value of 0.5. 845,220 observations spanning 2015–2026.",
    "url": "https://prob-terminal.vercel.app/methodology",
    "datePublished": "2026-04-20",
    "author": { "@type": "Organization", "name": "Prob Terminal Research" },
    "publisher": { "@type": "Organization", "name": "Prob Terminal", "url": "https://prob-terminal.vercel.app" },
    "keywords": ["NIFTY 500", "power law", "market breadth", "LPPL", "sector rotation", "probability trading", "Indian stock market", "statistical mechanics", "quantitative finance"],
    "about": [
      { "@type": "Thing", "name": "NIFTY 500 market breadth" },
      { "@type": "Thing", "name": "Power law scaling in equity returns" },
      { "@type": "Thing", "name": "Log-Periodic Power Law crash prediction" },
      { "@type": "Thing", "name": "Sector rotation in Indian markets" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleLD) }} />
      <Navigation updatedDate={snap.meta.last_updated} />
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Paper Header ─────────────────────────────────────── */}
        <section style={{ padding: "56px 0 40px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            <span className="badge badge-regime">Research Paper</span>
            <span className="badge badge-gray">NIFTY 500 · 2015–2026</span>
            <span className="badge badge-gray">845,220 Observations</span>
          </div>
          <h1 style={{ fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.3, marginBottom: 16, maxWidth: 800 }}>
            Universal Scaling Exponents in Cross-Sectional Equity Returns: Evidence from a Statistical Mechanics Framework Applied to the Indian Stock Market
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-3)", fontStyle: "italic", fontFamily: "'JetBrains Mono', monospace" }}>
            Target: Quantitative Finance · Journal of Statistical Mechanics · April 2026 (draft)
          </p>
        </section>

        {/* ── Abstract ─────────────────────────────────────────── */}
        <Sec id="abstract" title="Abstract">
          <Card style={{ borderLeft: "3px solid var(--teal)" }}>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.9, marginBottom: 16 }}>
              We present empirical evidence that the signal-to-noise ratio (SNR) of cross-sectional stock return
              predictability follows a <strong style={{ color: "#e8e8f2" }}>damped power law with log-periodic corrections</strong>,
              structurally isomorphic to the partition function of a system exhibiting discrete scale invariance (DSI).
              Using a proprietary comparative strength indicator applied to the NIFTY 500 universe over 2015–2026
              (845,220 stock-day observations), we measure SNR across 15 forward-return horizons (5 to 222 trading days) and fit:
            </p>
            <Eq>SNR(t) = α · t^β · e^(−t/τ) &nbsp;&nbsp;&nbsp; → &nbsp;&nbsp;&nbsp; β = 0.655 &nbsp; τ = 185 days &nbsp; R² = 0.9956</Eq>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.9, marginBottom: 16 }}>
              The exponent <strong style={{ color: "#a78bfa" }}>β = 0.655 &gt; 0.5</strong> is a statistically significant departure from the
              random-walk null (β = 0.5), implying cross-sectional return structure grows faster than noise — a mathematical
              fingerprint of <strong style={{ color: "#e8e8f2" }}>non-random, exploitable structure</strong> in relative stock performance.
            </p>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.9, marginBottom: 16 }}>
              Independently, we fit the LPPL model to mean indicator scores preceding each of five major NIFTY drawdowns (&gt;15%).
              All five events exhibit statistically significant log-periodic oscillations (F-test p &lt; 0.0001), with
              mean exponent <strong style={{ color: "#fbbf24" }}>β_LPPL = 0.634 ± 0.327</strong>, angular frequency ω = 7.23,
              and scaling ratio λ = e^(2π/ω) = 2.38.
            </p>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.9, marginBottom: 0 }}>
              The agreement between β = 0.655 and β_LPPL = 0.634 — a <strong style={{ color: "#14d9c4" }}>3.1% difference from two entirely
              independent analyses</strong> — suggests a universal scaling exponent governing both the slow accumulation of
              cross-sectional return structure and the fast approach to market critical points. Walk-forward validation
              (IS: 2015–2020, OOS: 2021–2026) confirms the signal survives out-of-sample: long-side IR improves from 0.93 to 1.20 (OOS/IS = 1.30).
            </p>
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginTop: 16 }}>
            {[
              ["β (power law)", "0.655", "#a78bfa"],
              ["β_LPPL (crash)", "0.634", "#fbbf24"],
              ["Agreement", "3.1% diff", "#14d9c4"],
              ["R² of fit", "0.9956", "#4ade80"],
              ["OOS/IS ratio", "1.30", "#14d9c4"],
              ["λ (scaling)", "2.38", "#a78bfa"],
            ].map(([l, v, c]) => (
              <div key={l as string} style={{ padding: "14px 16px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{l}</div>
                <div className="stat-number" style={{ fontSize: 22, fontWeight: 700, color: c as string }}>{v}</div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ── Data Foundation ──────────────────────────────────── */}
        <Sec id="data" title="1. Data & Universe" badge="Section 2">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#14d9c4" }}>Dataset</h3>
              <StatRow label="Universe" value="NIFTY 500" />
              <StatRow label="Price history" value="2015-01 → 2026-04" />
              <StatRow label="Indicator period" value="2018-11 → 2026-04" sub="Requires 222d warm-up" />
              <StatRow label="Total observations" value="845,220" color="#fbbf24" />
              <StatRow label="Matched stocks" value="475 symbols" />
              <StatRow label="Sectors tracked" value="17" />
            </Card>
            <Card>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#a78bfa" }}>Walk-Forward Split</h3>
              <StatRow label="In-sample (IS)" value="2015 → 2020" color="#a78bfa" sub="1,488 trading days" />
              <StatRow label="Out-of-sample (OOS)" value="2021 → 2026" color="#14d9c4" sub="1,307 trading days" />
              <StatRow label="F7 signals in IS" value="3.3% of stock-days" />
              <StatRow label="F7 signals in OOS" value="5.4% of stock-days" color="#4ade80" sub="Factor strengthening OOS" />
              <StatRow label="Parameters fixed from IS" value="Yes — zero leakage" color="#4ade80" />
            </Card>
          </div>
          <Card style={{ marginTop: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Indicator Construction</h3>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 12 }}>
              The proprietary indicator scores each stock daily from 0–100 by measuring multi-timeframe relative strength.
              It is constructed as a weighted composite of three percentile-ranked moving averages:
            </p>
            <Eq>Score(i, t) = w_s · R_s(i,t) + w_m · R_m(i,t) + w_l · R_l(i,t)</Eq>
            <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.8, marginBottom: 0 }}>
              Where R_s, R_m, R_l are cross-sectional percentile ranks over 22-day, 66-day, and 222-day windows respectively,
              with weights w_s = 0.5, w_m = 1.0, w_l = 1.5. Longer-timeframe strength receives higher weight.
              The construction is deterministic — no ML, no alternative data, no look-ahead bias.
              <strong style={{ color: "#fbbf24" }}> The specific implementation is proprietary and not published.</strong>
            </p>
          </Card>
        </Sec>

        {/* ── Damped Power Law ─────────────────────────────────── */}
        <Sec id="power-law" title="2. The Damped Power Law (Core Finding)" badge="Section 3.1">
          <Card>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 16 }}>
              For 15 forward-return horizons from 5 to 222 trading days, we compute the signal-to-noise ratio:
              median return of top decile minus bottom decile, divided by pooled standard deviation across all stocks.
            </p>
            <Eq>SNR(t) = 0.0091 · t^0.655 · e^(−t/185) &nbsp;&nbsp; R² = 0.9956</Eq>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 20 }}>
              The SNR <strong style={{ color: "#e8e8f2" }}>peaks at t* = β·τ = 121 trading days (~5.5 months)</strong> — consistent with the
              well-documented momentum effect — and decays beyond 185 days, consistent with long-term reversal.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Horizon (days)</th>
                    <th>SNR (observed)</th>
                    <th>SNR (fitted)</th>
                    <th>Spearman ρ</th>
                    <th>Cohen's d</th>
                    <th>Observations (F7)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [5, "0.0259", "0.0254", "0.0169", "0.0259", "206,763"],
                    [10, "0.0401", "0.0390", "0.0231", "0.0401", "206,260"],
                    [15, "0.0495", "0.0495", "0.0281", "0.0495", "205,832"],
                    [22, "0.0618", "0.0612", "0.0348", "0.0618", "205,262"],
                    [33, "0.0708", "0.0752", "0.0450", "0.0708", "204,370"],
                    [44, "0.0812", "0.0855", "0.0527", "0.0812", "203,716"],
                    [66, "0.1014", "0.0991", "0.0688", "0.1014", "202,512"],
                    [88, "0.1094", "0.1062", "0.0720", "0.1094", "201,545"],
                    [110, "0.1098", "0.1091", "0.0748", "0.1098", "200,466"],
                    [132, "0.1064", "0.1092", "0.0771", "0.1064", "199,405"],
                    [176, "0.1071", "0.1039", "0.0822", "0.1071", "196,133"],
                    [222, "0.0914", "0.0944", "0.0784", "0.0914", "192,706"],
                  ].map(([h, obs, fit, rho, d, n]) => (
                    <tr key={h}>
                      <td><span className="stat-number" style={{ color: "#a78bfa" }}>{h}d</span></td>
                      <td><span className="stat-number" style={{ color: "#14d9c4", fontWeight: 700 }}>{obs}</span></td>
                      <td><span className="stat-number" style={{ color: "var(--text-3)" }}>{fit}</span></td>
                      <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{rho}</span></td>
                      <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{d}</span></td>
                      <td><span style={{ fontSize: 12, color: "var(--text-3)" }}>{n}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
              {[
                ["β = 0.655", "95% CI: [0.613, 0.698]", "Excludes 0.5 in 100% of 10,000 bootstrap resamples", "#a78bfa"],
                ["Likelihood Ratio Test", "F = 46.34, p = 0.000019", "Decisively rejects random-walk null β = 0.5", "#14d9c4"],
                ["Excess β", "0.655 − 0.5 = 0.155", "Cross-sectional signal grows 31% faster than noise", "#fbbf24"],
                ["Peak horizon", "t* = 121 trading days", "≈ 5.5 months — matches momentum literature", "#4ade80"],
              ].map(([title, val, desc, color]) => (
                <div key={title as string} style={{ padding: "14px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: `1px solid ${color}25` }}>
                  <div style={{ fontWeight: 600, fontSize: 12, color: color as string, marginBottom: 4 }}>{title}</div>
                  <div className="stat-number" style={{ fontSize: 13, color: "#e8e8f2", marginBottom: 4 }}>{val}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </Card>
        </Sec>

        {/* ── β Stability ──────────────────────────────────────── */}
        <Sec id="beta-stability" title="3. Stability of β Across Regimes" badge="Section 3.2">
          <Card>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 20 }}>
              β is not a fixed constant — it is a <strong style={{ color: "#e8e8f2" }}>time-varying order parameter</strong>. Re-fitted independently
              on six non-overlapping 2-year windows and 20 rolling 500-day windows.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#a78bfa", marginBottom: 12 }}>2-Year Windows</h3>
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr><th>Window</th><th>β</th><th>τ (days)</th><th>t* (days)</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ["2015–2016", "0.393", "220", "86"],
                        ["2017–2018", "0.757", "102", "77"],
                        ["2019–2020", "1.840", "156", "287", "#f43f5e"],
                        ["2021–2022", "0.725", "177", "128"],
                        ["2023–2024", "0.237", "434", "103"],
                        ["2025–2026", "0.420", "829", "348"],
                      ].map(([w, b, tau, ts, color]) => (
                        <tr key={w}>
                          <td style={{ fontSize: 12, color: "var(--text-3)" }}>{w}</td>
                          <td><span className="stat-number" style={{ color: color || "#e8e8f2", fontWeight: color ? 700 : 400 }}>{b}</span></td>
                          <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{tau}</span></td>
                          <td><span className="stat-number" style={{ color: "var(--text-3)" }}>{ts}</span></td>
                        </tr>
                      ))}
                      <tr style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                        <td style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 600 }}>Mean</td>
                        <td><span className="stat-number" style={{ color: "#fbbf24", fontWeight: 700 }}>0.729</span></td>
                        <td colSpan={2} />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#14d9c4", marginBottom: 12 }}>Rolling Window Summary</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    ["β > 0.5 in rolling windows", "90%", "#14d9c4"],
                    ["Mean β (rolling 500d)", "0.982", "#a78bfa"],
                    ["Median β (rolling 500d)", "0.765", "#a78bfa"],
                    ["COVID peak β (2019–2020)", "1.840", "#f43f5e"],
                    ["Coefficient of variation", "70–73%", "var(--text-2)"],
                    ["β > 1.2 = crash precursor", "Confirmed", "#fbbf24"],
                  ].map(([l, v, c]) => (
                    <StatRow key={l as string} label={l as string} value={v as string} color={c as string} />
                  ))}
                </div>
                <p style={{ marginTop: 16, fontSize: 12, color: "var(--text-3)", lineHeight: 1.7 }}>
                  High β (&gt;1.0) = strong trending markets or extreme dislocations.
                  Low β (&lt;0.5) = noise-dominated, low-conviction regimes.
                  The regime dependence of β is itself informative and tradeable.
                </p>
              </div>
            </div>
          </Card>
        </Sec>

        {/* ── LPPL ─────────────────────────────────────────────── */}
        <Sec id="lppl" title="4. LPPL Oscillations Before Crashes" badge="Section 3.3">
          <Card>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 16 }}>
              The LPPL model, applied to the 252 trading days of mean indicator score preceding each major NIFTY drawdown,
              fits the form:
            </p>
            <Eq>V̄(t) = A + B(t_c − t)^β_L · [1 + C · cos(ω · ln(t_c − t) + φ)]</Eq>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 20 }}>
              All five events exhibit statistically significant log-periodic oscillations. The F-test rejects no-oscillation
              (C = 0) at <strong style={{ color: "#14d9c4" }}>p &lt; 0.0001 for all five events</strong>.
            </p>
            <div style={{ overflowX: "auto", marginBottom: 20 }}>
              <table className="data-table">
                <thead>
                  <tr><th>Event Peak</th><th>Drawdown</th><th>β_LPPL</th><th>ω</th><th>R²</th><th>F-stat</th><th>p-value</th><th>λ</th></tr>
                </thead>
                <tbody>
                  {[
                    ["2015-03-03", "−22.5%", "0.900", "8.405", "0.641", "149.0", "< 0.0001", "2.11"],
                    ["2020-01-17", "−38.4%", "0.285", "6.574", "0.529", "39.7",  "< 0.0001", "2.60"],
                    ["2021-10-18", "−17.2%", "0.900", "6.590", "0.329", "49.6",  "< 0.0001", "2.59"],
                    ["2024-09-26", "−15.8%", "0.187", "6.135", "0.296", "30.0",  "< 0.0001", "2.78"],
                    ["2026-01-02", "−15.2%", "0.900", "8.467", "0.278", "117.5", "< 0.0001", "2.10"],
                  ].map(([date, dd, beta, omega, r2, f, p, lam]) => (
                    <tr key={date}>
                      <td><span className="stat-number" style={{ color: "#f43f5e", fontSize: 12 }}>{date}</span></td>
                      <td><span className="stat-number" style={{ color: "#f43f5e", fontWeight: 700 }}>{dd}</span></td>
                      <td><span className="stat-number" style={{ color: "#a78bfa", fontWeight: 700 }}>{beta}</span></td>
                      <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{omega}</span></td>
                      <td><span className="stat-number" style={{ color: "#14d9c4" }}>{r2}</span></td>
                      <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{f}</span></td>
                      <td><span className="stat-number" style={{ color: "#4ade80", fontWeight: 700 }}>{p}</span></td>
                      <td><span className="stat-number" style={{ color: "#fbbf24" }}>{lam}</span></td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <td colSpan={2} style={{ color: "var(--text-2)", fontWeight: 600, fontSize: 12 }}>Mean</td>
                    <td><span className="stat-number" style={{ color: "#a78bfa", fontWeight: 700 }}>0.634 ± 0.327</span></td>
                    <td><span className="stat-number" style={{ color: "var(--text-2)" }}>7.23</span></td>
                    <td colSpan={3} />
                    <td><span className="stat-number" style={{ color: "#fbbf24", fontWeight: 700 }}>2.38</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ padding: "16px 18px", borderRadius: 8, background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.2)" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#a78bfa", marginBottom: 8 }}>The Universal Exponent</div>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 8 }}>
                Cross-sectional β = 0.655 &nbsp;⟷&nbsp; Temporal β_LPPL = 0.634 &nbsp;→&nbsp; 3.1% difference from two entirely independent analyses.
              </p>
              <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.7 }}>
                In physics, universal exponents emerge when large-scale behaviour is independent of microscopic details —
                depending only on symmetry and dimensionality. That the same value appears in both cross-sectional structure
                and crash dynamics suggests the Indian equity market operates near a <strong style={{ color: "#e8e8f2" }}>self-organised critical state</strong>.
              </p>
            </div>
          </Card>
        </Sec>

        {/* ── Unified Equation ─────────────────────────────────── */}
        <Sec id="unified" title="5. The Unified Equation" badge="Section 3.6">
          <Card>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 12 }}>
              Combining the damped power law envelope with the LPPL oscillatory modulation:
            </p>
            <Eq>SNR(t) = α · t^β · e^(−t/τ) · [1 + C · cos(ω · ln(t) + φ)]</Eq>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 12 }}>
              This is structurally isomorphic to the spectral density of a partition function for a system with
              discrete scale invariance (DSI):
            </p>
            <Eq>Z(β, t) ~ t^β · e^(−t/τ) · [1 + Σ C_n · cos(nω · ln t + φ_n)]</Eq>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginTop: 16 }}>
              {[
                ["t^β term", "Density of states — accessible market configurations at scale t"],
                ["e^(−t/τ) term", "Thermal damping — noise suppression of high-scale structure"],
                ["Oscillatory term", "Discrete scale invariance of the trader hierarchy"],
              ].map(([term, desc]) => (
                <div key={term as string} style={{ padding: "12px 14px", borderRadius: 8, background: "rgba(20,217,196,0.04)", border: "1px solid rgba(20,217,196,0.12)" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#14d9c4", fontWeight: 600, marginBottom: 4 }}>{term}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 16, fontSize: 13, color: "var(--text-3)", lineHeight: 1.7 }}>
              The scaling ratio λ = 2.38 (from ω = 7.23) is consistent with Sornette's hierarchical cascade model
              where λ = 2 corresponds to binary branching. λ &gt; 2 suggests each influential market participant
              cascades to ~2.4 followers — consistent with India's ~45% retail participation amplifying institutional moves.
            </p>
          </Card>
        </Sec>

        {/* ── Six States ───────────────────────────────────────── */}
        <Sec id="states" title="6. The Six Structural States" badge="739,917 obs">
          <Card>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 20 }}>
              The relative ordering of the three moving averages defines six exhaustive, mutually-exclusive states.
              These are <strong style={{ color: "#e8e8f2" }}>return-magnitude predictors, not direction predictors</strong> —
              all states produced positive returns during the 2018–2026 period (predominantly bullish Indian market).
            </p>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr><th>State</th><th>Condition (s/m/l)</th><th>22d Return</th><th>222d Return</th><th>Win Rate 22d</th><th>Observations</th></tr>
                </thead>
                <tbody>
                  {[
                    ["PEAK_ROLLOVER",  "m > s > l", "+2.25%", "+23.45%", "57.5%", "98,593"],
                    ["LATE_DECLINE",   "m > l > s", "+1.79%", "+19.28%", "56.3%", "66,256"],
                    ["ACCELERATING",   "s > m > l", "+1.63%", "+24.09%", "55.6%", "205,199"],
                    ["EARLY_RECOVERY", "s > l > m", "+1.27%", "+17.07%", "54.7%", "75,926"],
                    ["DECELERATING",   "l > m > s", "+1.02%", "+11.36%", "52.9%", "201,585"],
                    ["BASE_BUILDING",  "l > s > m", "+0.58%", "+12.51%", "51.6%", "92,358"],
                  ].map(([state, cond, r22, r222, wr, obs]) => (
                    <tr key={state}>
                      <td>
                        <span className="badge" style={{ background: `${STATE_COLORS[state]}18`, color: STATE_COLORS[state], border: `1px solid ${STATE_COLORS[state]}30` }}>
                          {state}
                        </span>
                      </td>
                      <td><span className="stat-number" style={{ fontSize: 12, color: "var(--text-3)" }}>{cond}</span></td>
                      <td><span className="stat-number" style={{ color: "#14d9c4", fontWeight: 600 }}>{r22}</span></td>
                      <td><span className="stat-number" style={{ color: "#4ade80", fontWeight: 600 }}>{r222}</span></td>
                      <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{wr}</span></td>
                      <td><span style={{ fontSize: 12, color: "var(--text-3)" }}>{obs}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: 10, fontSize: 12, color: "var(--text-3)" }}>
              Kruskal-Wallis H = 10,215 at 222d, p ≈ 0. All 15 pairwise Mann-Whitney tests significant after Bonferroni correction.
              EARLY_RECOVERY → ACCELERATING transition probability: 53% within 22 days.
            </p>
          </Card>
        </Sec>

        {/* ── Walk-Forward Validation ──────────────────────────── */}
        <Sec id="validation" title="7. Walk-Forward Validation" badge="Section 3.7 / Appendix C">
          <Card>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 20 }}>
              Strict temporal split. Parameters fixed from IS (2015–2020), not modified for OOS (2021–2026).
              The F7 filter (all three timeframes in high zone) with 5-day ROC mean-reversion entry.
            </p>

            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#14d9c4", marginBottom: 10 }}>Panel A — Long Mean-Reversion (F7)</h3>
            <div style={{ overflowX: "auto", marginBottom: 20 }}>
              <table className="data-table">
                <thead><tr><th>Portfolio (N)</th><th>IS IR</th><th>OOS IR</th><th>OOS/IS</th><th>IS CAGR</th><th>OOS CAGR</th></tr></thead>
                <tbody>
                  {[
                    ["N = 5",  "0.958", "1.084", "1.13", "+30.9%", "+37.9%"],
                    ["N = 10", "0.978", "1.095", "1.12", "+25.6%", "+31.7%"],
                    ["N = 15", "0.791", "1.369", "1.73", "+18.4%", "+37.3%"],
                    ["N = 20", "0.988", "1.267", "1.28", "+22.6%", "+33.7%"],
                  ].map(([n, isir, oosir, ratio, iscagr, ooscagr]) => (
                    <tr key={n}>
                      <td style={{ color: "var(--text-2)", fontSize: 13 }}>{n}</td>
                      <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{isir}</span></td>
                      <td><span className="stat-number" style={{ color: "#14d9c4", fontWeight: 700 }}>{oosir}</span></td>
                      <td><span className="stat-number" style={{ color: "#4ade80", fontWeight: 700 }}>{ratio}</span></td>
                      <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{iscagr}</span></td>
                      <td><span className="stat-number" style={{ color: "#14d9c4", fontWeight: 700 }}>{ooscagr}</span></td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <td style={{ fontWeight: 600, color: "var(--text-2)" }}>Average</td>
                    <td><span className="stat-number">0.929</span></td>
                    <td><span className="stat-number" style={{ color: "#14d9c4", fontWeight: 700 }}>1.204</span></td>
                    <td><span className="stat-number" style={{ color: "#4ade80", fontWeight: 700 }}>1.30</span></td>
                    <td><span className="stat-number">+24.4%</span></td>
                    <td><span className="stat-number" style={{ color: "#14d9c4", fontWeight: 700 }}>+35.1%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#f43f5e", marginBottom: 10 }}>Panel B — Short Mean-Reversion (S6)</h3>
            <div style={{ overflowX: "auto", marginBottom: 20 }}>
              <table className="data-table">
                <thead><tr><th>Portfolio (N)</th><th>IS IR</th><th>OOS IR</th><th>OOS/IS</th><th>IS CAGR</th><th>OOS CAGR</th></tr></thead>
                <tbody>
                  {[
                    ["N = 5",  "0.842", "−0.183", "−0.22", "+36.0%", "−4.4%"],
                    ["N = 10", "0.871", "−0.179", "−0.21", "+35.3%", "−4.2%"],
                    ["N = 15", "0.835", "−0.102", "−0.12", "+33.2%", "−2.4%"],
                    ["N = 20", "0.809", "−0.128", "−0.16", "+31.9%", "−3.0%"],
                  ].map(([n, isir, oosir, ratio, iscagr, ooscagr]) => (
                    <tr key={n}>
                      <td style={{ color: "var(--text-2)", fontSize: 13 }}>{n}</td>
                      <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{isir}</span></td>
                      <td><span className="stat-number" style={{ color: "#f43f5e", fontWeight: 700 }}>{oosir}</span></td>
                      <td><span className="stat-number" style={{ color: "#f43f5e" }}>{ratio}</span></td>
                      <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{iscagr}</span></td>
                      <td><span className="stat-number" style={{ color: "#f43f5e", fontWeight: 700 }}>{ooscagr}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "14px 16px", borderRadius: 8, background: "rgba(244,63,94,0.05)", border: "1px solid rgba(244,63,94,0.15)", marginBottom: 20 }}>
              <span style={{ fontSize: 13, color: "var(--text-2)" }}>
                <strong style={{ color: "#f43f5e" }}>Short leg fails OOS</strong> — the short-side signal is not robust to regime changes. This is consistent with theory: short-selling dynamics are more regime-dependent than long-side quality selection. S6 signals on Prob Terminal are shown as <em>structural weakness indicators</em>, not short recommendations.
              </span>
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#a78bfa", marginBottom: 10 }}>Long-Only F7 (Best Config)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
              {[
                ["Best Config", "N=30, Weekly", "#a78bfa"],
                ["OOS IR", "1.347", "#14d9c4"],
                ["OOS CAGR", "+35.7%", "#4ade80"],
                ["OOS/IS", "1.96 (near-doubling)", "#14d9c4"],
                ["All 9 configs", "Improved OOS", "#4ade80"],
                ["Win rate @ 222d", "70%", "#fbbf24"],
              ].map(([l, v, c]) => (
                <div key={l as string} style={{ padding: "12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{l}</div>
                  <div className="stat-number" style={{ fontSize: 15, fontWeight: 700, color: c as string }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>
        </Sec>

        {/* ── Statistical Tests ────────────────────────────────── */}
        <Sec id="tests" title="8. Statistical Tests" badge="9 independent tests">
          <Card>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr><th>Test</th><th>Applied To</th><th>Key Result</th></tr>
                </thead>
                <tbody>
                  {[
                    ["Kruskal-Wallis (non-parametric)", "State ↔ returns", "H up to 10,215, p ≈ 0"],
                    ["One-way ANOVA + η²", "State ↔ returns", "F up to 2,195, η² up to 1.70%"],
                    ["Mann-Whitney U (pairwise)", "All 15 state pairs", "14/15 significant after Bonferroni"],
                    ["Cohen's d (effect size)", "State pairs", "0.03–0.14 (small but real)"],
                    ["Augmented Dickey-Fuller", "Sector series stationarity", "p = 0.0000 for all 17 sectors"],
                    ["Granger causality", "Sector lead-lag", "2 pure unidirectional flows found"],
                    ["Monte Carlo (10,000 paths)", "Markov model validation", "Valid at 66d+, diverges at 22d"],
                    ["Leave-one-out cross-validation", "Power of Average (sector flow)", "p = 2.26 × 10⁻²⁵⁴"],
                    ["Walk-forward OOS test", "F7 long strategy", "All 9 configurations improved OOS"],
                  ].map(([test, applied, result]) => (
                    <tr key={test}>
                      <td><span style={{ color: "var(--text-2)", fontSize: 13 }}>{test}</span></td>
                      <td><span style={{ color: "var(--text-3)", fontSize: 12 }}>{applied}</span></td>
                      <td><span className="stat-number" style={{ color: "#14d9c4", fontSize: 13 }}>{result}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Sec>

        {/* ── Limitations ──────────────────────────────────────── */}
        <Sec id="limitations" title="9. Honest Limitations">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["Single market", "All results are from the NIFTY 500. Universality of β ≈ 0.65 requires testing on US, Japan, Europe. Replication is the essential next step."],
              ["β match may be coincidental", "A 3% difference between two numbers, each with substantial uncertainty (β_LPPL σ = 0.327), is suggestive evidence — not proof. It warrants further investigation, not proclamation."],
              ["Bull market bias", "2018–2026 was predominantly bullish for Indian equities. All states show positive returns. In a prolonged bear market, bearish states may produce negative returns."],
              ["Small effect sizes", "State alone explains 0.16–1.70% of return variance. Power comes from combining state + level zone + sector context. This is a filter, not a standalone oracle."],
              ["Short leg failure", "S6 signals worked IS (IR = 0.84) but failed OOS (IR = −0.15). The short side is regime-dependent. We show it for structural awareness, not as a short recommendation."],
              ["Survivorship bias", "NIFTY 500 membership changes. Stocks removed due to poor performance are not fully represented, potentially inflating apparent top-decile performance."],
              ["Partition function analogy", "We note the structural isomorphism but do not derive the equation from first principles. A proper derivation requires specifying the Hamiltonian of the interacting-agent system."],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ padding: "14px 16px", borderRadius: 8, background: "rgba(244,63,94,0.03)", border: "1px solid rgba(244,63,94,0.08)", display: "flex", gap: 12 }}>
                <div style={{ flexShrink: 0, width: 8, borderRadius: 4, background: "#f43f5e", opacity: 0.4, marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#f43f5e", marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <Sec id="faq" title="Frequently Asked Questions">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {FAQ.map((item) => (
              <div key={item.q} className="card" style={{ padding: "20px 24px" }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e8e8f2", marginBottom: 8 }}>{item.q}</h3>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </Sec>

        {/* Schema FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />

      </main>
      <Footer />
    </>
  );
}
