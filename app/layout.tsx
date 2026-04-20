import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Prob Terminal — NIFTY 500 Probability Intelligence", template: "%s | Prob Terminal" },
  description: "Prob Terminal provides probability-based market intelligence for NIFTY 500 swing traders and investors — market breadth analysis, sector rotation cascade maps, and momentum stock signals. Updated weekly.",
  keywords: ["NIFTY 500 market breadth","sector rotation India","swing trading signals India","market breadth ratio India","best momentum stocks NIFTY","sector cascade analysis India","probability trading India","NIFTY regime indicator"],
  openGraph: {
    type: "website", locale: "en_IN", url: "https://probterminal.in", siteName: "Prob Terminal",
    title: "Prob Terminal — NIFTY 500 Probability Intelligence",
    description: "Where is capital flowing in India's top 500 stocks? Quantified. Market breadth, sector rotation, momentum signals — updated weekly.",
  },
  twitter: { card: "summary_large_image", title: "Prob Terminal — NIFTY 500 Probability Intelligence", description: "Market breadth ratio, sector cascade alerts, F7 momentum signals for Indian equity traders." },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://probterminal.in" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org","@type":"WebSite","name":"Prob Terminal","url":"https://probterminal.in",
          "description":"Probability-based market intelligence for NIFTY 500",
          "potentialAction":{"@type":"SearchAction","target":"https://probterminal.in/stocks?q={search_term_string}","query-input":"required name=search_term_string"}
        })}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
