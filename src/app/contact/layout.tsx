import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book your stay or inquire about corporate residence packages at Jirapa Executive Residence. Secure, connected, private accommodation in Upper West Ghana.",
  openGraph: {
    images: [{ url: "/og-image.png" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
