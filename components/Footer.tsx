import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "48px 24px 32px",
        marginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
              <span style={{ color: "#14d9c4" }}>PROB</span>
              <span style={{ color: "#e8e8f2" }}> TERMINAL</span>
            </div>
            <p style={{ color: "var(--text-3)", fontSize: 13, lineHeight: 1.6, maxWidth: 260 }}>
              Probability-based market intelligence for NIFTY 500 swing traders and investors. Based on 845,000+ observations spanning 2018–2026.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: 12 }}>
              Pages
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["Market Pulse", "/"], ["Sector Intelligence", "/sectors"], ["Stock Radar", "/stocks"], ["Methodology", "/methodology"]].map(([label, href]) => (
                <Link key={href} href={href} style={{ color: "var(--text-2)", fontSize: 13, textDecoration: "none" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Data */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: 12 }}>
              Research
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["TrueVX Framework", "/methodology#truevx"], ["State Analysis", "/methodology#states"], ["Sector Grammar", "/methodology#sectors"], ["Statistical Validation", "/methodology#validation"]].map(([label, href]) => (
                <Link key={href} href={href} style={{ color: "var(--text-2)", fontSize: 13, textDecoration: "none" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: 12 }}>
              Important
            </div>
            <p style={{ color: "var(--text-3)", fontSize: 12, lineHeight: 1.7 }}>
              Prob Terminal is a research and analysis tool. Nothing on this site constitutes investment advice. All probabilities are historical — past performance does not guarantee future results.
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ color: "var(--text-3)", fontSize: 12 }}>
            © 2026 Prob Terminal. NIFTY 500 universe · Data updated weekly.
          </span>
          <span style={{ color: "var(--text-3)", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
            845,220 observations · 475 symbols · 2018–2026
          </span>
        </div>
      </div>
    </footer>
  );
}
