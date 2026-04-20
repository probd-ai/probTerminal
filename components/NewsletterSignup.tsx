"use client";
import { useState } from "react";

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg(data.message || "Subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Try again.");
    }
  }

  if (compact) {
    return (
      <form onSubmit={submit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading" || status === "success"}
          style={{
            flex: 1, minWidth: 200, padding: "8px 12px", borderRadius: 8,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#e8e8f2", fontSize: 13, outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          style={{
            padding: "8px 16px", borderRadius: 8, background: "#14d9c4",
            color: "#07070e", fontWeight: 700, fontSize: 13, border: "none",
            cursor: status === "loading" ? "wait" : "pointer", whiteSpace: "nowrap",
          }}
        >
          {status === "loading" ? "..." : status === "success" ? "✓ Subscribed" : "Get Weekly Alert"}
        </button>
        {status === "error" && <p style={{ color: "#f43f5e", fontSize: 12, width: "100%", margin: 0 }}>{msg}</p>}
      </form>
    );
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(20,217,196,0.06), rgba(167,139,250,0.06))",
      border: "1px solid rgba(20,217,196,0.2)",
      borderRadius: 16, padding: "32px 36px", textAlign: "center",
    }}>
      <div style={{ fontSize: 28, marginBottom: 12 }}>📬</div>
      <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>
        Get the Weekly Regime Alert
      </h3>
      <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.7, maxWidth: 420, margin: "0 auto 24px" }}>
        Every week: NIFTY 500 breadth ratio R, active sector cascades, and F7 signal count.
        Free. No spam. Unsubscribe anytime.
      </p>

      {status === "success" ? (
        <div style={{
          background: "rgba(20,217,196,0.1)", border: "1px solid rgba(20,217,196,0.3)",
          borderRadius: 10, padding: "16px 24px", color: "#14d9c4", fontWeight: 600, fontSize: 14,
        }}>
          ✓ {msg} — check your inbox.
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
            style={{
              width: 260, padding: "10px 16px", borderRadius: 10,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              color: "#e8e8f2", fontSize: 14, outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              padding: "10px 20px", borderRadius: 10, background: "#14d9c4",
              color: "#07070e", fontWeight: 700, fontSize: 14, border: "none",
              cursor: status === "loading" ? "wait" : "pointer",
            }}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe Free →"}
          </button>
          {status === "error" && <p style={{ color: "#f43f5e", fontSize: 12, width: "100%", margin: 0 }}>{msg}</p>}
        </form>
      )}
      <p style={{ color: "var(--text-3)", fontSize: 11, marginTop: 12 }}>
        Join traders tracking NIFTY 500 with probability — no investment advice, research only.
      </p>
    </div>
  );
}
