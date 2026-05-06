import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem, AnimatedCard } from "@/components/AnimatedSection";
import Link from "next/link";

const tiers = [
  { guests: "1–2", rate: "$250 – $280", minGuests: 1, maxGuests: 2, rateLabel: "250" },
  { guests: "3–4", rate: "$300 – $350", minGuests: 3, maxGuests: 4, rateLabel: "300" },
  { guests: "5–6", rate: "$380 – $450", minGuests: 5, maxGuests: 6, rateLabel: "380" },
  { guests: "7–8", rate: "$480 – $600", minGuests: 7, maxGuests: 8, rateLabel: "480" },
];

export default function ResidencePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/interior-living.jpg')" }} />
          <div className="hero-overlay absolute inset-0" />
          <AnimatedSection className="relative z-10 text-center px-4" delay={0.2}>
            <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">The Residence</p>
            <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              A Home Away from <span className="gold-gradient">Home</span>
            </h1>
          </AnimatedSection>
        </section>

        {/* Property Overview */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Jirapa Executive Residence is not another regional guest house — it is a controlled executive base built for high-trust stays. The property bundles presence, protection, and connectivity in one private compound.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-gray-400 leading-relaxed mb-8">
                Whether you need a short-term stopover between field visits, an extended base for project operations, or a private setting for sensitive work, the residence adapts to your requirements while maintaining the security and connectivity that institutional travelers demand.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" staggerDelay={0.15}>
              {[
                { title: "Security", items: ["Electric perimeter fencing", "24/7 CCTV surveillance", "Gated compound access", "On-site security personnel"] },
                { title: "Connectivity", items: ["Starlink high-speed internet", "Backup connectivity", "Video conferencing ready", "Reliable power supply"] },
                { title: "Living Spaces", items: ["Spacious multi-room layout", "Indoor-outdoor living areas", "Balcony and hosting spaces", "Private parking"] },
                { title: "Services", items: ["Housekeeping on request", "Catering & meal preparation", "Airport pickup coordination", "Event & retreat support", "Concierge & logistics"] },
              ].map((section) => (
                <StaggerItem key={section.title}>
                  <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6 card-hover">
                    <h3 className="text-[#C9A96E] font-semibold mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4 text-[#C9A96E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Nightly Rates — INTERACTIVE */}
            <AnimatedSection delay={0.2}>
              <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-semibold mb-2 text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Nightly Rates</h3>
                <p className="text-gray-400 text-center mb-2">Tap a tier to pre-fill your booking inquiry.</p>
                <p className="text-gray-500 text-center text-sm mb-6">Starting from <span className="text-[#C9A96E] font-bold">$250/night</span>. Rates vary by occupancy.</p>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.1}>
                  {tiers.map((tier) => (
                    <StaggerItem key={tier.guests}>
                      <Link
                        href={`/contact?guests=${tier.maxGuests}&rate=${tier.rateLabel}&nights=3`}
                        className="block"
                      >
                        <AnimatedCard className="bg-[#111111] border border-[#1F1F1F] rounded-lg p-5 text-center relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative">
                            <p className="text-[#C9A96E] font-semibold text-lg">{tier.guests} guests</p>
                            <p className="text-gray-300 text-xl font-bold mt-1">{tier.rate}</p>
                            <p className="text-gray-500 text-xs mt-1">per night</p>
                            <div className="mt-3 inline-flex items-center gap-1 text-xs text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity">
                              <span>Book this rate</span>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                          </div>
                        </AnimatedCard>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <p className="text-gray-500 text-xs mt-4 text-center">Final pricing depends on duration and service requirements. Longer stays receive customized rates.</p>
              </div>
            </AnimatedSection>

            {/* Corporate teaser */}
            <AnimatedSection delay={0.2}>
              <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 mb-12 text-center">
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Extended Stays</h3>
                <p className="text-gray-400 mb-2">Monthly corporate packages available for NGO and institutional teams.</p>
                <p className="text-[#C9A96E] font-semibold mb-4">$4,500 – $6,000 / month</p>
                <Link href="/corporate" className="btn-outline text-sm">View Corporate Packages</Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 text-center">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Interested in a Stay?</h3>
                <p className="text-gray-400 mb-6">Private bookings and institutional inquiries only.</p>
                <Link href="/contact" className="btn-gold">Request Availability</Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
