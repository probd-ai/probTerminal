"use client";

interface ContributingStock {
  symbol: string;
  contribution_pct: number;
  trades: number;
}

interface TopContributorsProps {
  stocks: ContributingStock[];
}

export default function TopContributors({ stocks }: TopContributorsProps) {
  const maxContribution = Math.max(...stocks.map(s => s.contribution_pct));

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(20,217,196,0.08), rgba(167,139,250,0.08))",
      border: "1px solid rgba(20,217,196,0.15)",
      borderRadius: 12,
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}>
        TOP 5 CONTRIBUTORS
        <div style={{ fontSize: 10, fontWeight: 400, color: "var(--text-3)", marginTop: 2, letterSpacing: 0 }}>
          Long Mean-Revert + F7 (5-year)
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {stocks.map((stock, i) => (
          <div key={stock.symbol} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Rank */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: i === 0 ? "#fbbf24" : i === 1 ? "#a78bfa" : "#14d9c4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 12,
                color: "#07070e",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>

            {/* Stock info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{stock.symbol}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>{stock.trades} trades</div>
            </div>

            {/* Bar + percentage */}
            <div style={{ width: 60, display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
              <div
                style={{
                  width: "100%",
                  height: 6,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 3,
                  overflow: "hidden",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: `${(stock.contribution_pct / maxContribution) * 100}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #14d9c4, #a78bfa)",
                    borderRadius: 3,
                  }}
                />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#14d9c4" }}>
                {stock.contribution_pct}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        fontSize: 11,
        color: "var(--text-3)",
        paddingTop: 12,
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        These 5 stocks contributed {stocks.reduce((sum, s) => sum + s.contribution_pct, 0).toFixed(1)}% of total strategy returns.
      </div>
    </div>
  );
}
