import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LocationPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="section-padding min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">Find Us</p>
              <h1 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Our <span className="gold-gradient">Location</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-[#1F1F1F] h-[400px] lg:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15530.0!2d-2.69438!3d10.53963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfd1e5e5e5e5e5e5%3A0x0!2sJirapa%2C%20Upper%20West%20Region%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jirapa Executive Residence Location"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-6">
                <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6">
                  <h3 className="text-[#C9A96E] font-semibold mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Jirapa, Upper West Region</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Jirapa sits at the crossroads of the Upper West Region — accessible, connected, and central to Wa, Lawra, and the broader corridor. Ideal base for field operations, government visits, and diaspora stays.
                  </p>
                  <div className="bg-[#0A0A0A] rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Digital Address</span>
                      <span className="text-[#C9A96E] font-mono font-semibold">XJ-0002-1275</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Street</span>
                      <span className="text-gray-300">High Tension North St</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">District</span>
                      <span className="text-gray-300">Jirapa</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Region</span>
                      <span className="text-gray-300">Upper West</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Post Code</span>
                      <span className="text-gray-300">XJ0002</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Coordinates</span>
                      <span className="text-gray-300 font-mono text-xs">10.5396, -2.6944</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6">
                  <h3 className="text-[#C9A96E] font-semibold mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Getting Here</h3>
                  <ul className="space-y-3">
                    {[
                      "Wa Airport — regional flights from Accra",
                      "Road access from Tamale (3-4 hours)",
                      "Road access from Kumasi (5-6 hours)",
                      "Local transport and pickup arrangements available",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                        <svg className="w-4 h-4 text-[#C9A96E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#111111] border border-[#C9A96E]/20 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Need Directions?</h3>
                  <p className="text-gray-400 text-sm mb-4">We&apos;ll arrange pickup and provide detailed directions upon booking.</p>
                  <a href="/contact" className="btn-gold text-sm">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}