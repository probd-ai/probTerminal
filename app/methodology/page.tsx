import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getSnapshot } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology — TrueVX Research Framework",
  description:
    "The statistical methodology behind Prob Terminal. 845,220 observations, 475 NIFTY 500 stocks, 7.5 years (2018–2026). TrueVX scoring, Markov chain analysis, sector grammar, and F7/S6 signals explained.",
};

const FAQ = [
  {
    q: "What is TrueVX?",
    a: "TrueVX is a proprietary daily score (0–100) for each NIFTY 500 stock. It measures how strong the stock is relative to the index across three timeframes: 22-day (recent momentum), 66-day (medium-term trend), and 222-day (structural strength). Longer timeframes receive higher weights. The score is a weighted composite of percentile ranks — not price levels, not fundamentals.",
  },
  {
    q: "What is the F7 signal?",
    a: "F7 is the highest-quality stock filter: TrueVX >90, mean_short >80, mean_mid >60, mean_long >50. All three timeframes in the high zone simultaneously. Out-of-sample validation (2021–2026): IR = 1.347, CAGR = +35.7%. Only ~5% of the universe qualifies at any given time.",
  },
  {
    q: "What is the Breadth Ratio R?",
    a: "R = (number of stocks with mean_long >80) ÷ (number of stocks with mean_long <40). R > 1.5 = healthy bull. R < 0.7 = bear market conditions. The 21-day slope of R (rising vs declining) is a leading regime-change indicator with Spearman ρ = +0.39 correlation to 44-day forward NIFTY returns.",
  },
  {
    q: "What is the 'Power of Average' concept?",
    a: "Research across 584,811 stock-day observations proves that sector context predicts returns beyond individual stock quality alone. A strong stock (TrueVX >60) in a hot sector (IN THE FLOW) earns +18.80% at 222 days. The same quality stock in a cold sector (LONE WOLF) earns only +13.82% — a 36% relative shortfall. The difference is statistically irrefutable: p = 2.26 × 10⁻²⁵⁴.",
  },
  {
    q: "What does the β (beta) order parameter mean?",
    a: "β is derived from the statistical mechanics of the market. It measures how much cross-sectional structure exists vs. random noise. Normal range: 0.5–0.9 (mean β = 0.655 across 7.5 years). β > 1.2 is a historical crash precursor — the COVID crash had β = 1.84. When β rises abnormally, quality stocks are separating from junk at an unsustainable rate, a classic pre-crash signature.",
  },
  {
    q: "How often is the data updated?",
    a: "Prob Terminal is updated every week by our back-office pipeline. The snapshot is generated from the full NIFTY 500 indicator database, computed overnight on Sunday, and deployed by Monday morning. The 'Updated' badge in the navigation bar shows the current data date.",
  },
  {
    q: "What is the sector cascade map?",
    a: "Empirically derived from 281 ignition events across 17 sectors (2018–2026). When Capital Goods breadth crosses 55%, Financial Services, Healthcare, IT, and FMCG follow in 100% of 10 confirmed historical events within 40 days. Granger causality tests confirm: Capital Goods → Services (p=0.0000, unidirectional). Construction Materials and Chemicals are early-cycle barometers — they appear as pre-ignition leaders for 10/17 and 9/17 sectors respectively.",
  },
  {
    q: "Is this investment advice?",
    a: "No. Prob Terminal is a quantitative research and analysis tool. All probabilities and expected returns are historical statistics derived from backtests. Past performance does not guarantee future results. Always conduct your own research and consult a SEBI-registered financial advisor before making investment decisions.",
  },
];

export default async function MethodologyPage() {
  const snap = await getSnapshot();

  return (
    <>
      <Navigation updatedDate={snap.meta.last_updated} />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <section style={{ padding: "48px 0 40px" }}>
          <span className="badge badge-regime" style={{ marginBottom: 12, display: "inline-block" }}>Research Framework</span>
          <h1 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 16 }}>
            Methodology
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: 15, maxWidth: 640, lineHeight: 1.7 }}>
            Every number on Prob Terminal is derived from empirical analysis — not opinion. This page explains the research, the data, the validation methods, and the honest limitations.
          </p>
        </section>

        {/* Data Foundation */}
        <section className="card" style={{ padding: "28px", marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 16 }} id="truevx">Data Foundation</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {[
              ["Universe", "NIFTY 500", "#14d9c4"],
              ["Matched Stocks", "475 symbols", "#14d9c4"],
              ["Observation Period", "2018-11-26 → 2026-04-08", "#a78bfa"],
              ["Total Observations", "845,220 stock-days", "#fbbf24"],
              ["Core Metric", "TrueVX (0–100)", "#4ade80"],
              ["Sectors Tracked", "17 sectors", "#4ade80"],
              ["Price History", "2015 → 2026", "#a78bfa"],
              ["Research Notebooks", "9 independent analyses", "#fbbf24"],
            ].map(([label, value, color]) => (
              <div key={label} style={{ padding: "14px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>
                <div className="stat-number" style={{ fontSize: 14, fontWeight: 600, color: color as string }}>{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TrueVX Construction */}
        <section className="card" style={{ padding: "28px", marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>TrueVX Construction</h2>
          <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.8, marginBottom: 16, maxWidth: 800 }}>
            TrueVX is built from three moving-average windows of relative performance. Each component is the percentile rank (0–100) of where the stock sits relative to its own moving average of the stock-to-index ratio at that window length. The composite score weights longer-term strength more heavily — a stock trending up for a year matters more than one that bounced last week.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr><th>Component</th><th>Window</th><th>Weight</th><th>What It Captures</th></tr>
              </thead>
              <tbody>
                {[
                  ["mean_short", "22 days (~1 month)", "0.5×", "Recent momentum, timing"],
                  ["mean_mid", "66 days (~3 months)", "1.0×", "Medium-term trend"],
                  ["mean_long", "222 days (~1 year)", "1.5×", "Structural, secular strength"],
                ].map(([c, w, wt, d]) => (
                  <tr key={c}>
                    <td><span className="stat-number" style={{ color: "#14d9c4", fontSize: 13 }}>{c}</span></td>
                    <td><span style={{ color: "var(--text-2)", fontSize: 13 }}>{w}</span></td>
                    <td><span className="stat-number" style={{ color: "#fbbf24", fontSize: 13 }}>{wt}</span></td>
                    <td><span style={{ color: "var(--text-3)", fontSize: 13 }}>{d}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 12, fontSize: 13, color: "var(--text-3)", lineHeight: 1.7 }}>
            There is nothing exotic here. No machine learning. No sentiment data. No alternative data. It is a weighted multi-timeframe relative-strength percentile. The question the research answers is whether this simple construction, applied systematically, produces results that are real. The answer, across 845,220 observations, is: yes.
          </p>
        </section>

        {/* Six States */}
        <section className="card" style={{ padding: "28px", marginBottom: 24 }} id="states">
          <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>The Six Structural States</h2>
          <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.8, marginBottom: 16, maxWidth: 800 }}>
            The relative ordering of the three moving averages (short, mid, long) defines six exhaustive, mutually-exclusive states. These states are return-magnitude predictors — not direction predictors. All states produced positive forward returns during the 2018–2026 observation period (predominantly bullish Indian market).
          </p>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr><th>State</th><th>Condition</th><th>22d Return</th><th>222d Return</th><th>Win Rate 22d</th><th>Observations</th></tr>
              </thead>
              <tbody>
                {[
                  ["PEAK_ROLLOVER", "m > s > l", "+2.25%", "+23.45%", "57.5%", "98,593"],
                  ["LATE_DECLINE", "m > l > s", "+1.79%", "+19.28%", "56.3%", "66,256"],
                  ["ACCELERATING", "s > m > l", "+1.63%", "+24.09%", "55.6%", "205,199"],
                  ["EARLY_RECOVERY", "s > l > m", "+1.27%", "+17.07%", "54.7%", "75,926"],
                  ["DECELERATING", "l > m > s", "+1.02%", "+11.36%", "52.9%", "201,585"],
                  ["BASE_BUILDING", "l > s > m", "+0.58%", "+12.51%", "51.6%", "92,358"],
                ].map(([state, cond, r22, r222, wr, obs]) => (
                  <tr key={state}>
                    <td><span className="badge" style={{ background: `${({PEAK_ROLLOVER:"#a78bfa",LATE_DECLINE:"#f97316",ACCELERATING:"#14d9c4",EARLY_RECOVERY:"#fbbf24",DECELERATING:"#f43f5e",BASE_BUILDING:"#8888aa"} as any)[state]}18`, color: ({PEAK_ROLLOVER:"#a78bfa",LATE_DECLINE:"#f97316",ACCELERATING:"#14d9c4",EARLY_RECOVERY:"#fbbf24",DECELERATING:"#f43f5e",BASE_BUILDING:"#8888aa"} as any)[state], border: `1px solid ${({PEAK_ROLLOVER:"#a78bfa",LATE_DECLINE:"#f97316",ACCELERATING:"#14d9c4",EARLY_RECOVERY:"#fbbf24",DECELERATING:"#f43f5e",BASE_BUILDING:"#8888aa"} as any)[state]}30` }}>{state}</span></td>
                    <td><span className="stat-number" style={{ fontSize: 12, color: "var(--text-3)" }}>{cond}</span></td>
                    <td><span className="stat-number" style={{ color: "#14d9c4", fontWeight: 600 }}>{r22}</span></td>
                    <td><span className="stat-number" style={{ color: "#4ade80", fontWeight: 600 }}>{r222}</span></td>
                    <td><span className="stat-number" style={{ color: "var(--text-2)" }}>{wr}</span></td>
                    <td><span className="stat-number" style={{ color: "var(--text-3)", fontSize: 12 }}>{obs}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 10, fontSize: 12, color: "var(--text-3)" }}>
            Kruskal-Wallis H = 10,215 at 222d, p ≈ 0. All 15 pairwise Mann-Whitney tests significant after Bonferroni correction.
          </p>
        </section>

        {/* Statistical Validation */}
        <section className="card" style={{ padding: "28px", marginBottom: 24 }} id="validation">
          <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>Statistical Validation</h2>
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
                  ["Monte Carlo (10K paths)", "Markov model validation", "Valid at 66d+, diverges at 22d"],
                  ["Leave-one-out cross-validation", "Power of Average", "p = 2.26 × 10⁻²⁵⁴"],
                  ["Walk-forward OOS test", "F7 long strategy", "All 9 configs improved OOS"],
                ].map(([test, applied, result]) => (
                  <tr key={test}>
                    <td><span style={{ color: "var(--text-2)", fontSize: 13 }}>{test}</span></td>
                    <td><span style={{ color: "var(--text-3)", fontSize: 13 }}>{applied}</span></td>
                    <td><span className="stat-number" style={{ color: "#14d9c4", fontSize: 13 }}>{result}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Limitations */}
        <section className="card" style={{ padding: "28px", marginBottom: 32, border: "1px solid rgba(244,63,94,0.15)" }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: "#f43f5e" }}>Honest Limitations</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Bull market bias", "The 2018–2026 period was predominantly bullish for Indian equities. All states show positive returns. In a prolonged bear market, the bearish states may produce negative returns."],
              ["Small effect sizes", "Individual state alone explains only 0.16–1.70% of return variance. This is a filter/ranking tool, not a standalone oracle. Power comes from combining state + level zone + sector context."],
              ["Survivorship bias", "NIFTY 500 membership changes over time. Stocks that exited the index due to poor performance are not fully represented in the dataset."],
              ["Execution gap", "0-day median cascade lag means real-world execution must be faster than daily data suggests. Intraday data would reveal the true propagation speed."],
              ["Regime dependence", "Lead-lag and cascade sequences may shift across different market regimes (risk-on vs risk-off, liquidity-driven vs earnings-driven)."],
            ].map(([title, desc]) => (
              <div key={title} style={{ padding: "12px 14px", borderRadius: 8, background: "rgba(244,63,94,0.04)", border: "1px solid rgba(244,63,94,0.08)" }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#f43f5e", marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 20 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FAQ.map((item) => (
              <div key={item.q} className="card" style={{ padding: "20px 24px" }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e8e8f2", marginBottom: 8 }}>{item.q}</h3>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Schema FAQ markup */}
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
