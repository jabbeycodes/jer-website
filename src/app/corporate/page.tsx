import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem, AnimatedCard } from "@/components/AnimatedSection";
import Link from "next/link";
import { resolvePublicSiteMedia } from "@/lib/galleryLayout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Corporate Stays",
  description: "Corporate residence packages at Jirapa Executive Residence — secure compound housing, Starlink connectivity, and private accommodation for institutional teams in Upper West Ghana.",
  openGraph: {
    images: [{ url: "/og-image.png" }],
  },
};

export default async function CorporatePage() {
  const { corporateHero } = await resolvePublicSiteMedia();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div
            role="img"
            aria-label={corporateHero.alt}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${corporateHero.src}')` }}
          />
          <div className="hero-overlay absolute inset-0" />
          <AnimatedSection className="relative z-10 text-center px-4" delay={0.2}>
            <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">Corporate</p>
            <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Corporate <span className="gold-gradient">Stays</span>
            </h1>
          </AnimatedSection>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                High-value travelers care about safe arrival, private control, and working internet — not just a bed. Jirapa Executive Residence provides the infrastructure that institutional operations demand.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" staggerDelay={0.15}>
              {[
                {
                  title: "For Organizations",
                  description: "Contract-based stays for NGO teams, government delegations, and institutional partners. Secure, reliable, and professional.",
                  points: ["Retainer agreements available", "Team lodging for 2-6 guests", "Priority availability", "Institutional invoicing"],
                },
                {
                  title: "For Field Operations",
                  description: "A repeatable, trusted base between field visits. Return to the same security standard, the same connectivity, the same privacy.",
                  points: ["Consistent quality every visit", "Secure storage between stays", "Operational continuity", "Dedicated coordination support"],
                },
              ].map((card) => (
                <StaggerItem key={card.title}>
                  <AnimatedCard className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 h-full">
                    <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{card.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{card.description}</p>
                    <ul className="space-y-2">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm text-gray-300">
                          <svg className="w-4 h-4 text-[#C9A96E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Pricing — INTERACTIVE */}
            <AnimatedSection delay={0.2}>
              <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 text-center mb-12">
                <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Corporate Monthly Packages</h3>
                <p className="text-gray-400 text-sm mb-6">Custom pricing for NGO teams and institutional stays. Tap a tier to start your inquiry.</p>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-6" staggerDelay={0.1}>
                  {[
                    { label: "Standard Retainer", price: "$4,500", desc: "/ month (2–4 guests, core services)" },
                    { label: "Full Operations", price: "$6,000", desc: "/ month (5–6 guests, all services included)" },
                  ].map((pkg) => (
                    <StaggerItem key={pkg.label}>
                      <Link
                        href={`/contact?type=corporate&rate=${pkg.price.replace(/\D/g, "")}`}
                        className="block"
                      >
                        <AnimatedCard className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6 text-center group">
                          <p className="text-[#C9A96E] font-semibold text-sm tracking-wide uppercase mb-2">{pkg.label}</p>
                          <p className="text-3xl font-bold text-white">{pkg.price}</p>
                          <p className="text-gray-500 text-xs mt-1">{pkg.desc}</p>
                          <div className="mt-3 inline-flex items-center gap-1 text-xs text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Request this package</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                          </div>
                        </AnimatedCard>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <p className="text-gray-500 text-xs">All packages include: accommodation, Starlink internet, security, housekeeping, and airport coordination. Catering & event support available as add-ons.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 text-center">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Discuss Corporate Rates</h3>
                <p className="text-gray-400 mb-6">Custom pricing for NGO teams and institutional stays.</p>
                <Link href="/contact?type=corporate" className="btn-gold">Request a Proposal</Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
