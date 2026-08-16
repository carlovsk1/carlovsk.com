import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "CARLOVSK · Software Engineer",
  description:
    "Carlos Gonçalves (carlovsk), software engineer from Brazil. He never fell in love with code. He fell in love with the experience. Code is how he shapes it.",
  metadataBase: new URL("https://carlovsk.com"),
  openGraph: {
    title: "CARLOVSK · Software Engineer",
    description:
      "Carlos Gonçalves (carlovsk), software engineer from Brazil. He never fell in love with code. He fell in love with the experience. Code is how he shapes it.",
    url: "https://carlovsk.com",
    siteName: "carlovsk",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CARLOVSK · Software Engineer",
    description:
      "Carlos Gonçalves (carlovsk), software engineer from Brazil. He never fell in love with code. He fell in love with the experience. Code is how he shapes it.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2B25",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoBlack.variable} ${plexMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
