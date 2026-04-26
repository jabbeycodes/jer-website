import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jirapa Executive Residence | Secure. Connected. Private.",
  description: "A secure, high-connectivity executive residence in Jirapa, Upper West Ghana — designed for institutional travel, private stays, and repeat field operations.",
  keywords: ["executive residence", "Jirapa", "Upper West Ghana", "corporate stays", "secure accommodation", "Starlink internet", "private compound"],
  openGraph: {
    title: "Jirapa Executive Residence",
    description: "Secure. Connected. Private. — A private executive residence in Upper West Ghana",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
