import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CARLOVSK - PORTFOLIO",
  description:
    "Senior Bubble Developer Carlos Henrique (aka carlovsk) crafts AI-powered SaaS, Supabase back-ends, Stripe integrations & PropTech solutions. Explore his portfolio.",
  metadataBase: new URL("https://carlovsk.com"),
  openGraph: {
    title: "CARLOVSK - PORTFOLIO",
    description:
      "Senior Bubble Developer Carlos Henrique (aka carlovsk) crafts AI-powered SaaS, Supabase back-ends, Stripe integrations & PropTech solutions. Explore his portfolio.",
    url: "https://carlovsk.com",
    siteName: "carlovsk",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CARLOVSK - PORTFOLIO",
    description:
      "Senior Bubble Developer Carlos Henrique (aka carlovsk) crafts AI-powered SaaS, Supabase back-ends, Stripe integrations & PropTech solutions. Explore his portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
