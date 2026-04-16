import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "carlovsk — Software Engineer",
  description:
    "Carlos Henrique — Software Engineer based in Porto Seguro, Brazil. Building digital experiences with code.",
  metadataBase: new URL("https://carlovsk.com"),
  openGraph: {
    title: "carlovsk — Software Engineer",
    description:
      "Carlos Henrique — Software Engineer based in Porto Seguro, Brazil. Building digital experiences with code.",
    url: "https://carlovsk.com",
    siteName: "carlovsk",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "carlovsk — Software Engineer",
    description:
      "Carlos Henrique — Software Engineer based in Porto Seguro, Brazil. Building digital experiences with code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
