import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://prob-terminal.vercel.app";

export const metadata: Metadata = {
  title: { default: "Prob Terminal — NIFTY 500 Probability Intelligence", template: "%s | Prob Terminal" },
  description: "Prob Terminal provides probability-based market intelligence for NIFTY 500 swing traders and investors — market breadth analysis, sector rotation cascade maps, and momentum stock signals. Updated weekly.",
  keywords: ["NIFTY 500 market breadth","sector rotation India","swing trading signals India","market breadth ratio India","best momentum stocks NIFTY","sector cascade analysis India","probability trading India","NIFTY regime indicator"],
  openGraph: {
    type: "website", locale: "en_IN", url: SITE_URL, siteName: "Prob Terminal",
    title: "Prob Terminal — NIFTY 500 Probability Intelligence",
    description: "Where is capital flowing in India's top 500 stocks? Quantified. Market breadth, sector rotation, momentum signals — updated weekly.",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Prob Terminal — NIFTY 500 Probability Intelligence" }],
  },
  twitter: { card: "summary_large_image", title: "Prob Terminal — NIFTY 500 Probability Intelligence", description: "Market breadth ratio, sector cascade alerts, F7 momentum signals for Indian equity traders.", images: [`${SITE_URL}/opengraph-image`] },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  verification: { google: "96bbb9e922de901b" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org","@type":"WebSite","name":"Prob Terminal","url":"https://prob-terminal.vercel.app",
          "description":"Probability-based market intelligence for NIFTY 500",
          "potentialAction":{"@type":"SearchAction","target":"https://prob-terminal.vercel.app/stocks?q={search_term_string}","query-input":"required name=search_term_string"}
        })}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
