import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jirapaexecutive.com"),
  title: {
    default: "Jirapa Executive Residence | Secure. Connected. Private.",
    template: "%s | Jirapa Executive Residence",
  },
  description:
    "A secure, high-connectivity executive residence in Jirapa, Upper West Ghana — designed for institutional travel, private stays, and repeat field operations. Electric fencing, Starlink internet, private compound.",
  keywords: [
    "executive residence",
    "Jirapa",
    "Upper West Ghana",
    "corporate stays",
    "secure accommodation",
    "Starlink internet",
    "private compound",
    "executive lodging Ghana",
    "VIP residence Jirapa",
  ],
  authors: [{ name: "Jirapa Executive Residence" }],
  creator: "Jirapa Executive Residence",
  publisher: "Jirapa Executive Residence",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Jirapa Executive Residence | Secure. Connected. Private.",
    description: "A private executive residence in Jirapa, Upper West Ghana — secure compound, Starlink connectivity, designed for institutional and VIP stays.",
    type: "website",
    locale: "en_US",
    url: "https://www.jirapaexecutive.com",
    siteName: "Jirapa Executive Residence",
    images: [
      {
        url: "/og-image.png",
        width: 1280,
        height: 720,
        alt: "Jirapa Executive Residence — luxury mansion and private compound in Upper West Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jirapa Executive Residence | Secure. Connected. Private.",
    description: "A private executive residence in Jirapa, Upper West Ghana — secure compound, Starlink connectivity.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.jirapaexecutive.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
