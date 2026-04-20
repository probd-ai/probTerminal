"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, TrendingUp, Layers, BookOpen } from "lucide-react";

const NAV_ITEMS = [
  { label: "Market Pulse", href: "/", icon: BarChart2 },
  { label: "Sectors", href: "/sectors", icon: TrendingUp },
  { label: "Stocks", href: "/stocks", icon: Layers },
  { label: "Methodology", href: "/methodology", icon: BookOpen },
];

export default function Navigation({ updatedDate }: { updatedDate: string }) {
  const pathname = usePathname();

  return (
    <nav
      style={{
        background: "rgba(7,7,14,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          height: 60,
          gap: 0,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginRight: 40 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "linear-gradient(135deg, #14d9c4, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 800,
              color: "#07070e",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            P
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#14d9c4" }}>PROB</span>
            <span style={{ color: "#e8e8f2" }}> TERMINAL</span>
          </span>
          <span
            style={{
              marginLeft: 4,
              fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--text-3)",
              letterSpacing: "0.04em",
              display: "none",
            }}
            className="hidden md:inline"
          >
            β
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? "#e8e8f2" : "var(--text-2)",
                  background: active ? "rgba(255,255,255,0.06)" : "transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={14} style={{ opacity: active ? 1 : 0.6 }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Update badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            color: "var(--text-3)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#14d9c4",
              display: "inline-block",
            }}
            className="pulse-live"
          />
          <span>Updated {updatedDate}</span>
        </div>
      </div>
    </nav>
  );
}
