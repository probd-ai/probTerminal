"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { Stock } from "@/lib/types";
import { getFlowBadgeClass, getFlowLabel } from "@/lib/data";

interface Props {
  allStocks: Stock[];
  sectors: string[];
}

const STATE_COLORS: Record<string, string> = {
  ACCELERATING: "#14d9c4",
  PEAK_ROLLOVER: "#a78bfa",
  EARLY_RECOVERY: "#fbbf24",
  LATE_DECLINE: "#f97316",
  DECELERATING: "#f43f5e",
  BASE_BUILDING: "#8888aa",
};

const ALL_STATES = ["ACCELERATING", "PEAK_ROLLOVER", "EARLY_RECOVERY", "LATE_DECLINE", "DECELERATING", "BASE_BUILDING"];

export default function StockSearch({ allStocks, sectors }: Props) {
  const [query, setQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("ALL");
  const [selectedState, setSelectedState] = useState("ALL");
  const [minTvx, setMinTvx] = useState(0);
  const [sortBy, setSortBy] = useState<"truevx" | "expected_22d" | "expected_222d">("truevx");

  const filtered = useMemo(() => {
    let list = allStocks;

    if (query.trim()) {
      const q = query.trim().toUpperCase();
      list = list.filter(
        (s) =>
          s.symbol.includes(q) ||
          s.name.toUpperCase().includes(q)
      );
    }
    if (selectedSector !== "ALL") {
      list = list.filter((s) => s.sector === selectedSector);
    }
    if (selectedState !== "ALL") {
      list = list.filter((s) => s.state === selectedState);
    }
    if (minTvx > 0) {
      list = list.filter((s) => s.truevx >= minTvx);
    }

    return [...list].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [allStocks, query, selectedSector, selectedState, minTvx, sortBy]);

  const hasFilter = query || selectedSector !== "ALL" || selectedState !== "ALL" || minTvx > 0;

  function reset() {
    setQuery("");
    setSelectedSector("ALL");
    setSelectedState("ALL");
    setMinTvx(0);
  }

  return (
    <div>
      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        {/* Search box */}
        <div style={{ position: "relative", flex: "1 1 200px", minWidth: 160, maxWidth: 280 }}>
          <Search
            size={14}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-3)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Symbol or name..."
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "8px 12px 8px 32px",
              color: "var(--text-1)",
              fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Sector */}
        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "8px 12px",
            color: selectedSector === "ALL" ? "var(--text-3)" : "var(--text-1)",
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            outline: "none",
            cursor: "pointer",
            flex: "1 1 160px",
            maxWidth: 220,
          }}
        >
          <option value="ALL">All Sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* State */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "8px 12px",
            color: selectedState === "ALL" ? "var(--text-3)" : (STATE_COLORS[selectedState] || "var(--text-1)"),
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            outline: "none",
            cursor: "pointer",
            flex: "0 0 auto",
          }}
        >
          <option value="ALL">All States</option>
          {ALL_STATES.map((st) => (
            <option key={st} value={st}>{st.replace("_", " ")}</option>
          ))}
        </select>

        {/* Min TVX */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
          <span style={{ fontSize: 12, color: "var(--text-3)", fontFamily: "'JetBrains Mono', monospace" }}>
            TVX≥
          </span>
          <input
            type="number"
            value={minTvx || ""}
            onChange={(e) => setMinTvx(Number(e.target.value) || 0)}
            placeholder="0"
            min={0}
            max={100}
            style={{
              width: 56,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "8px 10px",
              color: "var(--text-1)",
              fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace",
              outline: "none",
              textAlign: "center",
            }}
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "8px 12px",
            color: "var(--text-2)",
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            outline: "none",
            cursor: "pointer",
            flex: "0 0 auto",
          }}
        >
          <option value="truevx">Sort: TVX</option>
          <option value="expected_22d">Sort: 22d Return</option>
          <option value="expected_222d">Sort: 222d Return</option>
        </select>

        {/* Clear */}
        {hasFilter && (
          <button
            onClick={reset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "8px 12px",
              background: "transparent",
              border: "1px solid rgba(244,63,94,0.3)",
              borderRadius: 8,
              color: "#f43f5e",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <X size={12} /> Clear
          </button>
        )}

        <span
          style={{
            marginLeft: "auto",
            fontSize: 12,
            color: "var(--text-3)",
            fontFamily: "'JetBrains Mono', monospace",
            flexShrink: 0,
          }}
        >
          {filtered.length} stocks
        </span>
      </div>

      {/* Results table */}
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Company</th>
              <th>Sector</th>
              <th>TVX</th>
              <th>S / M / L</th>
              <th>State</th>
              <th>Zone</th>
              <th>Flow</th>
              <th>22d</th>
              <th>222d</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 100).map((s) => (
              <tr key={s.symbol}>
                <td>
                  <span
                    className="stat-number"
                    style={{ fontWeight: 700, color: "#e8e8f2", fontSize: 13 }}
                  >
                    {s.symbol}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: 12, color: "var(--text-2)" }}>{s.name}</span>
                </td>
                <td>
                  <span style={{ fontSize: 11, color: "var(--text-3)" }}>{s.sector}</span>
                </td>
                <td>
                  <span
                    className="stat-number"
                    style={{ fontWeight: 700, color: "#fbbf24", fontSize: 14 }}
                  >
                    {s.truevx}
                  </span>
                </td>
                <td>
                  <span
                    className="stat-number"
                    style={{ fontSize: 12, color: "var(--text-2)" }}
                  >
                    {s.mean_short}/{s.mean_mid}/{s.mean_long}
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
                  <span style={{ fontSize: 11, color: "var(--text-3)" }}>{s.level_zone}</span>
                </td>
                <td>
                  <span className={`badge ${getFlowBadgeClass(s.flow_status)}`}>
                    {getFlowLabel(s.flow_status)}
                  </span>
                </td>
                <td>
                  <span
                    className="stat-number"
                    style={{ color: "#14d9c4", fontWeight: 600 }}
                  >
                    +{s.expected_22d.toFixed(1)}%
                  </span>
                </td>
                <td>
                  <span
                    className="stat-number"
                    style={{ color: "#4ade80", fontWeight: 600 }}
                  >
                    +{s.expected_222d.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  style={{
                    textAlign: "center",
                    padding: "32px",
                    color: "var(--text-3)",
                    fontStyle: "italic",
                    fontSize: 14,
                  }}
                >
                  No stocks match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {filtered.length > 100 && (
          <p
            style={{
              textAlign: "center",
              color: "var(--text-3)",
              fontSize: 12,
              marginTop: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Showing top 100 of {filtered.length} results — refine your filters to narrow down
          </p>
        )}
      </div>
    </div>
  );
}
