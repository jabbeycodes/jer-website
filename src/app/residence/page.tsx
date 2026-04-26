import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResidencePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80')" }} />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative z-10 text-center px-4">
            <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">The Residence</p>
            <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              A Home Away from <span className="gold-gradient">Home</span>
            </h1>
          </div>
        </section>

        {/* Property Overview */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Jirapa Executive Residence is not another regional guest house — it is a controlled executive base built for high-trust stays. The property bundles presence, protection, and connectivity in one private compound.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you need a short-term stopover between field visits, an extended base for project operations, or a private setting for sensitive work, the residence adapts to your requirements while maintaining the security and connectivity that institutional travelers demand.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { title: "Security", items: ["Electric perimeter fencing", "24/7 CCTV surveillance", "Gated compound access", "On-site security personnel"] },
                { title: "Connectivity", items: ["Starlink high-speed internet", "Backup connectivity", "Video conferencing ready", "Reliable power supply"] },
                { title: "Living Spaces", items: ["Spacious multi-room layout", "Indoor-outdoor living areas", "Balcony and hosting spaces", "Private parking"] },
                { title: "Services", items: ["Housekeeping on request", "Meal preparation available", "Airport pickup arrangement", "Local logistics support"] },
              ].map((section) => (
                <div key={section.title} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6">
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
              ))}
            </div>

            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Interested in a Stay?</h3>
              <p className="text-gray-400 mb-6">Private bookings and institutional inquiries only.</p>
              <a href="/contact" className="btn-gold">Request Availability</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
