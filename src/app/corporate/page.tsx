import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CorporatePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531498860502-7c67cf95f565?w=1400&q=80')" }} />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative z-10 text-center px-4">
            <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">Corporate</p>
            <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Corporate <span className="gold-gradient">Stays</span>
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              High-value travelers care about safe arrival, private control, and working internet — not just a bed. Jirapa Executive Residence provides the infrastructure that institutional operations demand.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                <div key={card.title} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8">
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
                </div>
              ))}
            </div>

            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Discuss Corporate Rates</h3>
              <p className="text-gray-400 mb-6">We offer retainer agreements and institutional pricing for organizations with recurring needs in the Upper West Region.</p>
              <a href="/contact" className="btn-gold">Request a Proposal</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}